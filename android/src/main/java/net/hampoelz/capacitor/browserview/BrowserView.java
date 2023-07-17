package net.hampoelz.capacitor.browserview;

import android.content.Intent;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Build;
import android.os.Message;
import android.view.View;
import android.webkit.RenderProcessGoneDetail;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.WebViewRenderProcess;
import android.webkit.WebViewRenderProcessClient;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.annotation.RequiresApi;

import com.getcapacitor.JSObject;
import com.getcapacitor.util.HostMask;

import java.io.ByteArrayOutputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

public class BrowserView {

    private final Map<UUID, WebView> browserViews = new HashMap<>();
    private final Map<UUID, String> currentHosts = new HashMap<>();
    private final Map<UUID, HostMask> allowedNavigations = new HashMap<>();
    private final Map<UUID, List<String>> allowedNavigationsPlain = new HashMap<>();
    private final BrowserViewPlugin plugin;

    public BrowserView(BrowserViewPlugin plugin) {
        this.plugin = plugin;
    }

    public boolean BrowserViewExists(@Nullable JSObject browserView) {
        UUID uuid = UUIDFromBrowserView(browserView);
        return BrowserViewExists(uuid);
    }

    public boolean BrowserViewExists(@Nullable UUID uuid) {
        return browserViews.containsKey(uuid);
    }

    public @Nullable UUID UUIDFromBrowserView(@Nullable JSObject browserView) {
        if (browserView == null) return null;
        String uuid = browserView.getString("uuid", null);

        if (uuid == null) return null;
        return UUID.fromString(uuid);
    }

    public @Nullable JSObject BrowserViewFromUUID(@Nullable UUID uuid) {
        if (uuid == null || !BrowserViewExists(uuid)) return null;

        JSObject browserView = new JSObject();
        browserView.put("uuid", uuid.toString());
        return browserView;
    }

    public @Nullable WebView WebViewFromBrowserView(@Nullable JSObject browserView) {
        UUID uuid = UUIDFromBrowserView(browserView);
        return WebViewFromUUID(uuid);
    }

    public @Nullable WebView WebViewFromUUID(@Nullable UUID uuid) {
        return browserViews.get(uuid);
    }

    public void SetAllowedNavigation(JSObject browserView, List<String> allowedNavigation) {
        UUID uuid = UUIDFromBrowserView(browserView);
        if (uuid == null || allowedNavigation == null) return;

        String[] allowedNavigationArray = new String[allowedNavigation.size()];
        allowedNavigation.toArray(allowedNavigationArray);

        allowedNavigations.put(uuid, HostMask.Parser.parse(allowedNavigationArray));
        allowedNavigationsPlain.put(uuid, allowedNavigation);
    }

    public @Nullable List<String> GetAllowedNavigation(JSObject browserView) {
        UUID uuid = UUIDFromBrowserView(browserView);
        if (uuid == null) return null;

        List<String> allowedNavigation = allowedNavigationsPlain.get(uuid);
        return allowedNavigation;
    }

    public void LoadUrl(JSObject browserView, String url) {
        UUID uuid = UUIDFromBrowserView(browserView);
        WebView webView = WebViewFromUUID(uuid);
        String hostname = Uri.parse(url).getHost();

        if (uuid == null || webView == null || url == null) return;

        webView.loadUrl(url);
        currentHosts.put(uuid, hostname);
    }

    public @Nullable Boolean PreventNavigation(JSObject browserView, String url) {
        UUID uuid = UUIDFromBrowserView(browserView);
        HostMask allowedNavigation = allowedNavigations.get(uuid);

        if (uuid == null || url == null) return null;

        String appHost = currentHosts.get(uuid);
        if ((appHost != null && url.contains(appHost)) || (allowedNavigation != null && allowedNavigation.matches(Uri.parse(url).getHost()))) return false;

        Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
        plugin.getContext().startActivity(browserIntent);
        return true;
    }

    public JSObject CreateBrowserView(WebView webView) {
        UUID uuid = UUID.randomUUID();
        browserViews.put(uuid, webView);
        JSObject browserView = BrowserViewFromUUID(uuid);

        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public boolean onCreateWindow(WebView view, boolean isDialog, boolean isUserGesture, Message resultMsg) {
                WebView.HitTestResult result = view.getHitTestResult();
                String url = result.getExtra();

                plugin.onNewWindow(browserView, url);

                if (url == null) return false;

                Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
                plugin.getContext().startActivity(browserIntent);

                return false;
            }

            @Override
            public void onCloseWindow(WebView window) {
                super.onCloseWindow(window);
                plugin.onCloseWindow(browserView);
            }

            @Override
            public void onReceivedIcon(WebView view, Bitmap icon) {
                super.onReceivedIcon(view, icon);

                ByteArrayOutputStream stream = new ByteArrayOutputStream();
                icon.compress(Bitmap.CompressFormat.PNG, 100, stream);
                final byte[] bytes = stream.toByteArray();
                icon.recycle();

                plugin.onPageFaviconUpdated(browserView, bytes);
            }

            @Override
            public void onReceivedTitle(WebView view, String title) {
                super.onReceivedTitle(view, title);
                plugin.onPageTitleUpdated(browserView, title);
            }

            @Override
            public void onShowCustomView(View view, CustomViewCallback callback) {
                super.onShowCustomView(view, callback);
                plugin.onEnterHtmlFullScreen(browserView);
            }

            @Override
            public void onHideCustomView() {
                super.onHideCustomView();
                plugin.onLeaveHtmlFullScreen(browserView);
            }
        });

        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                plugin.onWillNavigate(browserView, url);

                Boolean preventDefault = PreventNavigation(browserView, url);
                if (preventDefault == null)
                    preventDefault = super.shouldOverrideUrlLoading(view, url);

                return preventDefault;
            }

            @RequiresApi(api = Build.VERSION_CODES.N)
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                final String url = request.getUrl().toString();

                plugin.onWillNavigate(browserView, url);

                Boolean preventDefault = PreventNavigation(browserView, url);
                if (preventDefault == null)
                    preventDefault = super.shouldOverrideUrlLoading(view, request);

                return preventDefault;
            }

            @Override
            public void onPageStarted(WebView view, String url, Bitmap favicon) {
                super.onPageStarted(view, url, favicon);
                plugin.onDidStartLoading(browserView);
            }

            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                plugin.onDidFrameFinishLoad(browserView);

                if (webView.getProgress() == 100) {
                    plugin.onDidFinishLoad(browserView);
                }
            }

            @Override
            public void onReceivedError(WebView view, int errorCode, String description, String failingUrl) {
                super.onReceivedError(view, errorCode, description, failingUrl);
                plugin.onDidFailLoad(browserView, errorCode, description, failingUrl);
            }

            @RequiresApi(api = Build.VERSION_CODES.M)
            @Override
            public void onReceivedError(WebView view, WebResourceRequest request, WebResourceError error) {
                super.onReceivedError(view, request, error);

                final int errorCode = error.getErrorCode();
                final String description = error.getDescription().toString();
                final String failingUrl = request.getUrl().toString();

                plugin.onDidFailLoad(browserView, errorCode, description, failingUrl);
            }

            @RequiresApi(api = Build.VERSION_CODES.M)
            @Override
            public void onPageCommitVisible(WebView view, String url) {
                super.onPageCommitVisible(view, url);
                plugin.onDomReady(browserView);
            }

            @RequiresApi(api = Build.VERSION_CODES.M)
            @Override
            public void onReceivedHttpError(WebView view, WebResourceRequest request, WebResourceResponse errorResponse) {
                super.onReceivedHttpError(view, request, errorResponse);

                final String url = request.getUrl().toString();
                final int statusCode = errorResponse.getStatusCode();
                final String reasonPhrase = errorResponse.getReasonPhrase();

                plugin.onHttpError(browserView, url, statusCode, reasonPhrase);
            }

            @RequiresApi(api = Build.VERSION_CODES.O)
            @Override
            public boolean onRenderProcessGone(WebView view, RenderProcessGoneDetail detail) {
                final boolean crashed = detail.didCrash();
                plugin.onRenderProcessGone(browserView, crashed);
                return super.onRenderProcessGone(view, detail);
            }
        });

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            webView.setWebViewRenderProcessClient(new WebViewRenderProcessClient() {
                @RequiresApi(api = Build.VERSION_CODES.Q)
                @Override
                public void onRenderProcessUnresponsive(@NonNull WebView view, @Nullable WebViewRenderProcess renderer) {
                    plugin.onUnresponsive(browserView);
                }

                @RequiresApi(api = Build.VERSION_CODES.Q)
                @Override
                public void onRenderProcessResponsive(@NonNull WebView view, @Nullable WebViewRenderProcess renderer) {
                    plugin.onResponsive(browserView);
                }
            });
        }

        return browserView;
    }

    public void RemoveBrowserView(UUID uuid) {
        browserViews.remove(uuid);
        currentHosts.remove(uuid);
        allowedNavigations.remove(uuid);
        allowedNavigationsPlain.remove(uuid);
    }
}
