package net.hampoelz.capacitor.browserview;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Build;
import android.os.Message;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.JavascriptInterface;
import android.webkit.RenderProcessGoneDetail;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.WebViewRenderProcess;
import android.webkit.WebViewRenderProcessClient;
import android.widget.FrameLayout;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.annotation.RequiresApi;
import com.getcapacitor.JSArray;
import com.getcapacitor.Logger;
import com.getcapacitor.PluginCall;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.regex.PatternSyntaxException;

public class CapacitorBrowserView {

    private final ViewGroup rootView;
    private final Context context;
    private final CapacitorBrowserViewPlugin.PluginEventNotifier eventNotifier;
    private final Map<String, BrowserView> browserViews = new HashMap<>();

    protected CapacitorBrowserView(ViewGroup rootView, Context context, CapacitorBrowserViewPlugin.PluginEventNotifier eventNotifier) {
        this.rootView = rootView;
        this.context = context;
        this.eventNotifier = eventNotifier;
    }

    @SuppressLint("ViewConstructor")
    protected static class BrowserView extends WebView {

        public final String uuid;
        private String currentHost;
        private String[] allowedNavigation = new String[0];

        protected BrowserView(String uuid, Context context) {
            super(context);
            this.uuid = uuid;
        }

        public void setAllowedNavigation(String[] allowedNavigation) throws Exception {
            if (allowedNavigation == null) return;

            for (final String regex : allowedNavigation) {
                try {
                    Pattern.compile(regex);
                } catch (PatternSyntaxException e) {
                    throw new Exception("Syntax error in regular-expression pattern '" + regex + "'. " + e);
                }
            }

            this.allowedNavigation = allowedNavigation;
        }

        public String[] getAllowedNavigation() {
            return allowedNavigation;
        }

        public @Nullable Boolean allowNavigation(String url) {
            final String newHost = Uri.parse(url).getHost();

            if (url == null || newHost == null) return null;

            if (currentHost != null && newHost.contains(currentHost)) return true;

            for (final String regex : allowedNavigation) {
                final Pattern pattern = Pattern.compile(regex, Pattern.CASE_INSENSITIVE);
                final Matcher matcher = pattern.matcher(newHost);
                final boolean match = matcher.find();
                if (match) return true;
            }

            return false;
        }

        @Override
        public void loadUrl(@NonNull String url) {
            super.loadUrl(url);
            currentHost = Uri.parse(url).getHost();
        }
    }

    private class NativeBridge {

        private final String uuid;

        protected NativeBridge(String uuid) {
            this.uuid = uuid;
        }

        @JavascriptInterface
        public void send(String eventName, String data) {
            eventNotifier.channelReceive(uuid, eventName, data);
        }
    }

    @SuppressLint("SetJavaScriptEnabled")
    protected BrowserView createBrowserView(Boolean _enableBridge) {
        final String uuid = UUID.randomUUID().toString();

        final BrowserView browserView = new BrowserView(uuid, context);
        final WebSettings settings = browserView.getSettings();

        browserViews.put(uuid, browserView);

        settings.setDatabaseEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setGeolocationEnabled(true);
        settings.setJavaScriptEnabled(true);
        settings.setJavaScriptCanOpenWindowsAutomatically(true);

        String _bridgeCode = null;
        try {
            _bridgeCode = FileOperations.ReadRawFile(context, R.raw.bridge);
        } catch (IOException e) {
            Logger.error(CapacitorBrowserViewPlugin.LOGGER_TAG, "Failed to load the bridge module.", e);
            _enableBridge = false;
        }

        final Boolean enableBridge = _enableBridge;
        final String bridgeCode = _bridgeCode;

        if (enableBridge) {
            final NativeBridge bridge = new NativeBridge(uuid);
            browserView.addJavascriptInterface(bridge, "_capacitorBrowserViewNativeBridge");
        }

        browserView.setWebChromeClient(
            new WebChromeClient() {
                @Override
                public boolean onCreateWindow(WebView view, boolean isDialog, boolean isUserGesture, Message resultMsg) {
                    final WebView.HitTestResult result = view.getHitTestResult();
                    final String url = result.getExtra();

                    eventNotifier.newWindow(uuid, url);

                    if (url == null) return false;

                    final Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
                    context.startActivity(browserIntent);

                    return false;
                }

                @Override
                public void onCloseWindow(WebView window) {
                    super.onCloseWindow(window);
                    eventNotifier.closeWindow(uuid);
                }

                @Override
                public void onReceivedIcon(WebView view, Bitmap icon) {
                    super.onReceivedIcon(view, icon);

                    final ByteArrayOutputStream stream = new ByteArrayOutputStream();
                    icon.compress(Bitmap.CompressFormat.PNG, 100, stream);
                    final byte[] bytes = stream.toByteArray();
                    icon.recycle();

                    eventNotifier.pageFaviconUpdated(uuid, bytes);
                }

                @Override
                public void onReceivedTitle(WebView view, String title) {
                    super.onReceivedTitle(view, title);
                    eventNotifier.pageTitleUpdated(uuid, title);
                }

                View fullscreenBrowserView;
                int originalSystemUiVisibility;

                @Override
                public void onShowCustomView(View view, CustomViewCallback callback) {
                    super.onShowCustomView(view, callback);

                    fullscreenBrowserView = view;
                    originalSystemUiVisibility = rootView.getSystemUiVisibility();

                    browserView.setVisibility(View.GONE);
                    rootView.addView(fullscreenBrowserView, new FrameLayout.LayoutParams(-1, -1));
                    rootView.setSystemUiVisibility(
                        View.SYSTEM_UI_FLAG_LAYOUT_STABLE |
                        View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION |
                        View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN |
                        View.SYSTEM_UI_FLAG_HIDE_NAVIGATION |
                        View.SYSTEM_UI_FLAG_FULLSCREEN |
                        View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
                    );
                    fullscreenBrowserView.setVisibility(View.VISIBLE);
                    fullscreenBrowserView.requestFocus();

                    eventNotifier.enterHtmlFullScreen(uuid);
                }

                @Override
                public void onHideCustomView() {
                    super.onHideCustomView();

                    fullscreenBrowserView.setVisibility(View.GONE);
                    rootView.removeView(fullscreenBrowserView);
                    rootView.setSystemUiVisibility(originalSystemUiVisibility);
                    browserView.setVisibility(View.VISIBLE);

                    eventNotifier.leaveHtmlFullScreen(uuid);
                }
            }
        );

        browserView.setWebViewClient(
            new WebViewClient() {
                @Override
                public boolean shouldOverrideUrlLoading(WebView view, String url) {
                    final Boolean allowNavigation = browserView.allowNavigation(url);

                    if (Boolean.FALSE.equals(allowNavigation)) {
                        final Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
                        context.startActivity(browserIntent);
                    }

                    final boolean preventDefault;

                    if (allowNavigation == null) {
                        preventDefault = super.shouldOverrideUrlLoading(view, url);
                    } else {
                        preventDefault = !allowNavigation;
                    }

                    eventNotifier.willNavigate(uuid, url);
                    return preventDefault;
                }

                @RequiresApi(api = Build.VERSION_CODES.N)
                @Override
                public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                    final String url = request.getUrl().toString();
                    final Boolean allowNavigation = browserView.allowNavigation(url);

                    if (Boolean.FALSE.equals(allowNavigation)) {
                        final Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
                        context.startActivity(browserIntent);
                    }

                    final boolean preventDefault;

                    if (allowNavigation == null) {
                        preventDefault = super.shouldOverrideUrlLoading(view, url);
                    } else {
                        preventDefault = !allowNavigation;
                    }

                    eventNotifier.willNavigate(uuid, url);
                    return preventDefault;
                }

                @Override
                public void onPageStarted(WebView view, String url, Bitmap favicon) {
                    super.onPageStarted(view, url, favicon);

                    if (enableBridge) {
                        browserView.evaluateJavascript(bridgeCode, null);
                    }

                    eventNotifier.didStartLoading(uuid);
                }

                @Override
                public void onPageFinished(WebView view, String url) {
                    super.onPageFinished(view, url);

                    if (browserView.getProgress() == 100) {
                        eventNotifier.didFinishLoad(uuid);
                    }
                }

                @Override
                public void onReceivedError(WebView view, int errorCode, String description, String failingUrl) {
                    super.onReceivedError(view, errorCode, description, failingUrl);
                    eventNotifier.didFailLoad(uuid, errorCode, description, failingUrl);
                }

                @RequiresApi(api = Build.VERSION_CODES.M)
                @Override
                public void onReceivedError(WebView view, WebResourceRequest request, WebResourceError error) {
                    super.onReceivedError(view, request, error);

                    final int errorCode = error.getErrorCode();
                    final String description = error.getDescription().toString();
                    final String failingUrl = request.getUrl().toString();

                    eventNotifier.didFailLoad(uuid, errorCode, description, failingUrl);
                }

                @RequiresApi(api = Build.VERSION_CODES.M)
                @Override
                public void onPageCommitVisible(WebView view, String url) {
                    super.onPageCommitVisible(view, url);
                    eventNotifier.domReady(uuid);
                }

                @RequiresApi(api = Build.VERSION_CODES.M)
                @Override
                public void onReceivedHttpError(WebView view, WebResourceRequest request, WebResourceResponse errorResponse) {
                    super.onReceivedHttpError(view, request, errorResponse);

                    final String url = request.getUrl().toString();
                    final int statusCode = errorResponse.getStatusCode();
                    final String reasonPhrase = errorResponse.getReasonPhrase();

                    eventNotifier.httpError(uuid, url, statusCode, reasonPhrase);
                }

                @RequiresApi(api = Build.VERSION_CODES.O)
                @Override
                public boolean onRenderProcessGone(WebView view, RenderProcessGoneDetail detail) {
                    final boolean crashed = detail.didCrash();

                    eventNotifier.renderProcessGone(uuid, crashed);
                    return super.onRenderProcessGone(view, detail);
                }
            }
        );

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            browserView.setWebViewRenderProcessClient(
                new WebViewRenderProcessClient() {
                    @RequiresApi(api = Build.VERSION_CODES.Q)
                    @Override
                    public void onRenderProcessUnresponsive(@NonNull WebView view, @Nullable WebViewRenderProcess renderer) {
                        eventNotifier.unresponsive(uuid);
                    }

                    @RequiresApi(api = Build.VERSION_CODES.Q)
                    @Override
                    public void onRenderProcessResponsive(@NonNull WebView view, @Nullable WebViewRenderProcess renderer) {
                        eventNotifier.responsive(uuid);
                    }
                }
            );
        }

        rootView.addView(browserView);
        return browserView;
    }

    protected @Nullable BrowserView getBrowserView(PluginCall call) {
        final String uuid = call.getString("uuid");
        final BrowserView browserView = browserViews.get(uuid);

        if (browserView == null) {
            call.reject("Specified BrowserView does not exist.");
            return null;
        }

        return browserView;
    }

    protected void destroyBrowserView(PluginCall call) {
        final String uuid = call.getString("uuid");
        final BrowserView browserView = getBrowserView(call);

        if (uuid == null || browserView == null) return;

        rootView.removeView(browserView);
        browserView.clearHistory();
        browserView.loadUrl("about:blank");
        browserView.onPause();
        browserView.removeAllViews();
        browserView.destroyDrawingCache();
        browserView.destroy();

        browserViews.remove(uuid);
    }

    protected void sendMessage(PluginCall call) {
        final BrowserView browserView = getBrowserView(call);
        final String eventName = call.getString("eventName");
        final JSArray data = call.getArray("args", new JSArray());

        if (browserView == null || eventName == null || data == null) return;

        final String dispatchEventCode = "window.dispatchEvent(new CustomEvent('channel-" + eventName + "', { detail: '" + data + "' }))";
        browserView.evaluateJavascript(dispatchEventCode, null);
    }
}
