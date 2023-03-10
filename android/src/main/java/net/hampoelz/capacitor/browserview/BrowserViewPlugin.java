package net.hampoelz.capacitor.browserview;

import android.Manifest;
import android.annotation.SuppressLint;
import android.graphics.Color;
import android.view.ViewGroup;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.widget.FrameLayout;

import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.Logger;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginConfig;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.annotation.Permission;
import com.getcapacitor.util.WebColor;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@CapacitorPlugin(
    name = "BrowserView",
    permissions = {@Permission(
        alias = "network",
        strings = {
            Manifest.permission.ACCESS_NETWORK_STATE,
            Manifest.permission.INTERNET
        }
    )}
)
public class BrowserViewPlugin extends Plugin {

    private BrowserView implementation;
    private ViewGroup rootView;

    public void load() {
        implementation = new BrowserView(this);
        rootView = (ViewGroup) getActivity().getWindow().getDecorView().getRootView();
    }

    private class PluginSettings {
        public final String url;
        public final boolean allowMultipleWindows;
        public final String[] allowNavigation;
        public final boolean enableBridge;
        public final String overrideUserAgent;
        public final String appendUserAgent;
        public final String backgroundColor;
        public final boolean allowMixedContent;

        public PluginSettings() throws JSONException {
            PluginConfig config = getConfig();
            JSONObject androidConfigJSON = config.getObject("android");
            JSObject androidConfig = new JSObject();
            if (androidConfigJSON != null) {
                androidConfig = JSObject.fromJSONObject(androidConfigJSON);
            }

            String overrideUserAgentDefault = config.getString("overrideUserAgent");
            String appendUserAgentDefault = config.getString("appendUserAgent");
            String backgroundColorDefault = config.getString("backgroundColor");

            url = config.getString("url");
            allowMultipleWindows = config.getBoolean("allowMultipleWindows", true);
            allowNavigation = config.getArray("allowNavigation");
            enableBridge = config.getBoolean("enableBridge", false);
            overrideUserAgent = androidConfig.getString("overrideUserAgent", overrideUserAgentDefault);
            appendUserAgent = androidConfig.getString("appendUserAgent", appendUserAgentDefault);
            backgroundColor = androidConfig.getString("backgroundColor", backgroundColorDefault);
            allowMixedContent = Boolean.TRUE.equals(androidConfig.getBoolean("allowMixedContent", false));
        }
    }

    //region PluginMethods
    //---------------------------------------------------------------------------------------

    // TODO: create BrowserView class instead of using JSObject
    @PluginMethod
    @SuppressLint("SetJavaScriptEnabled")
    public void createBrowserView(PluginCall call) {
        PluginSettings pluginSettings;

        try {
            pluginSettings = new PluginSettings();
        } catch (JSONException ex) {
            // TODO: custom reject message
            call.reject(ex.toString());
            return;
        }

        boolean enableBridge = Boolean.TRUE.equals(call.getBoolean("enableBridge", pluginSettings.enableBridge));

        getActivity().runOnUiThread(() -> {
            WebView webView = new WebView(getContext());
            WebSettings settings = webView.getSettings();

            settings.setJavaScriptEnabled(true);
            settings.setDomStorageEnabled(true);
            settings.setGeolocationEnabled(true);
            settings.setDatabaseEnabled(true);
            settings.setAppCacheEnabled(true);
            settings.setJavaScriptCanOpenWindowsAutomatically(true);
            settings.setSupportMultipleWindows(pluginSettings.allowMultipleWindows);
            if (pluginSettings.allowMixedContent) {
                settings.setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
            }

            if (pluginSettings.overrideUserAgent == null && pluginSettings.appendUserAgent != null) {
                String defaultUserAgent = settings.getUserAgentString();
                settings.setUserAgentString(defaultUserAgent + " " + pluginSettings.appendUserAgent);
            } else if (pluginSettings.overrideUserAgent != null) {
                settings.setUserAgentString(pluginSettings.overrideUserAgent);
            }

            try {
                if (pluginSettings.backgroundColor != null) {
                    webView.setBackgroundColor(WebColor.parseColor(pluginSettings.backgroundColor));
                }
            } catch (IllegalArgumentException ex) {
                Logger.debug("WebView background color not applied");
            }

            // TODO: Implement Capacitor <-> BrowserView Bridge

            JSObject browserView = implementation.CreateBrowserView(webView);

            if (pluginSettings.allowNavigation != null) {
                implementation.SetAllowedNavigation(browserView, pluginSettings.allowNavigation);
            }

            if (pluginSettings.url != null) {
                implementation.LoadUrl(browserView, pluginSettings.url);
            }

            rootView.addView(webView);
            call.resolve(new JSObject().put("value", browserView));
        });
    }

    @PluginMethod
    public void removeBrowserView(PluginCall call) {
        JSObject browserView = call.getObject("browserView");
        UUID uuid = implementation.UUIDFromBrowserView(browserView);
        WebView webView = implementation.WebViewFromUUID(uuid);

        if (uuid == null || webView == null) {
            call.reject("The specified BrowserView does not exist");
            return;
        }

        getActivity().runOnUiThread(() -> rootView.removeView(webView));

        implementation.RemoveBrowserView(uuid);
    }

    // Visual -------------------------------------------------------------------------------

    @PluginMethod
    public void setBounds(PluginCall call) {
        JSObject browserView = call.getObject("browserView");
        WebView webView = implementation.WebViewFromBrowserView(browserView);

        if (webView == null) {
            call.reject("The specified BrowserView does not exist");
            return;
        }

        JSObject bounds = call.getObject("bounds");

        float density = getActivity().getResources().getDisplayMetrics().density;

        getActivity().runOnUiThread(() -> {
            FrameLayout.LayoutParams defaultLayoutParams = (FrameLayout.LayoutParams) webView.getLayoutParams();

            Integer x = bounds.getInteger("x");
            Integer y = bounds.getInteger("y");
            Integer width = bounds.getInteger("width");
            Integer height = bounds.getInteger("height");

            if (defaultLayoutParams != null) {
                if (width == null || width < 0)
                    width = (int) (defaultLayoutParams.width / density);
                if (height == null || height < 0)
                    height = (int) (defaultLayoutParams.height / density);
            }

            if (width == null || height == null || width < 0 || height < 0) {
                // TODO: reject message
                call.reject("");
                return;
            }

            FrameLayout.LayoutParams layoutParams = new FrameLayout.LayoutParams((int) (width * density), (int) (height * density));

            if (x != null && x >= 0)
                layoutParams.leftMargin = (int) (x * density);
            if (y != null && y >= 0)
                layoutParams.topMargin = (int) (y * density);

            webView.setLayoutParams(layoutParams);
            webView.bringToFront();
            call.resolve();
        });
    }

    @PluginMethod
    public void getBounds(PluginCall call) {
        JSObject browserView = call.getObject("browserView");
        WebView webView = implementation.WebViewFromBrowserView(browserView);

        if (webView == null) {
            call.reject("The specified BrowserView does not exist");
            return;
        }

        float density = getActivity().getResources().getDisplayMetrics().density;

        getActivity().runOnUiThread(() -> {
            FrameLayout.LayoutParams layoutParams = (FrameLayout.LayoutParams) webView.getLayoutParams();

            if (layoutParams == null) {
                // TODO: reject message
                call.reject("");
                return;
            }

            JSObject bounds = new JSObject();
            bounds.put("x", (int) (layoutParams.leftMargin / density));
            bounds.put("y", (int) (layoutParams.topMargin / density));
            bounds.put("width", (int) (layoutParams.width / density));
            bounds.put("height", (int) (layoutParams.height / density));

            call.resolve(new JSObject().put("value", bounds));
        });
    }

    @PluginMethod
    public void setBackgroundColor(PluginCall call) {
        JSObject browserView = call.getObject("browserView");
        WebView webView = implementation.WebViewFromBrowserView(browserView);

        if (webView == null) {
            call.reject("The specified BrowserView does not exist");
            return;
        }

        String color = call.getString("color");

        getActivity().runOnUiThread(() -> {
            try {
                if (color != null) {
                    webView.setBackgroundColor(Color.parseColor(color));
                }
            } catch (IllegalArgumentException ex) {
                call.reject("WebView background color not applied");
                return;
            }

            call.resolve();
        });
    }

    // Actions ------------------------------------------------------------------------------

    @PluginMethod
    public void loadURL(PluginCall call) {
        JSObject browserView = call.getObject("browserView");

        if (!implementation.BrowserViewExists(browserView)) {
            call.reject("The specified BrowserView does not exist");
            return;
        }

        String url = call.getString("url");

        if (url == null) {
            // TODO: reject message
            call.reject("");
            return;
        }

        getActivity().runOnUiThread(() -> {
            boolean result = implementation.LoadUrl(browserView, url);

            if (!result) {
                // TODO: reject message
                call.reject("");
                return;
            }

            call.resolve();
        });
    }

    @PluginMethod
    public void getURL(PluginCall call) {
        JSObject browserView = call.getObject("browserView");
        WebView webView = implementation.WebViewFromBrowserView(browserView);

        if (webView == null) {
            call.reject("The specified BrowserView does not exist");
            return;
        }

        getActivity().runOnUiThread(() -> {
            String url = webView.getUrl();
            call.resolve(new JSObject().put("value", url));
        });
    }

    @PluginMethod
    public void getTitle(PluginCall call) {
        JSObject browserView = call.getObject("browserView");
        WebView webView = implementation.WebViewFromBrowserView(browserView);

        if (webView == null) {
            call.reject("The specified BrowserView does not exist");
            return;
        }

        getActivity().runOnUiThread(() -> {
            String title = webView.getTitle();
            call.resolve(new JSObject().put("value", title));
        });
    }

    @PluginMethod
    public void stop(PluginCall call) {
        JSObject browserView = call.getObject("browserView");
        WebView webView = implementation.WebViewFromBrowserView(browserView);

        if (webView == null) {
            call.reject("The specified BrowserView does not exist");
            return;
        }

        getActivity().runOnUiThread(() -> {
            webView.stopLoading();
            call.resolve();
        });
    }

    @PluginMethod
    public void reload(PluginCall call) {
        JSObject browserView = call.getObject("browserView");
        WebView webView = implementation.WebViewFromBrowserView(browserView);

        if (webView == null) {
            call.reject("The specified BrowserView does not exist");
            return;
        }

        getActivity().runOnUiThread(() -> {
            webView.reload();
            call.resolve();
        });
    }

    @PluginMethod
    public void canGoBack(PluginCall call) {
        JSObject browserView = call.getObject("browserView");
        WebView webView = implementation.WebViewFromBrowserView(browserView);

        if (webView == null) {
            call.reject("The specified BrowserView does not exist");
            return;
        }

        getActivity().runOnUiThread(() -> {
            boolean canGoBack = webView.canGoBack();
            call.resolve(new JSObject().put("value", canGoBack));
        });
    }

    @PluginMethod
    public void canGoForward(PluginCall call) {
        JSObject browserView = call.getObject("browserView");
        WebView webView = implementation.WebViewFromBrowserView(browserView);

        if (webView == null) {
            call.reject("The specified BrowserView does not exist");
            return;
        }

        getActivity().runOnUiThread(() -> {
            boolean canGoForward = webView.canGoForward();
            call.resolve(new JSObject().put("value", canGoForward));
        });
    }

    @PluginMethod
    public void clearHistory(PluginCall call) {
        JSObject browserView = call.getObject("browserView");
        WebView webView = implementation.WebViewFromBrowserView(browserView);

        if (webView == null) {
            call.reject("The specified BrowserView does not exist");
            return;
        }

        getActivity().runOnUiThread(() -> {
            webView.clearHistory();
            call.resolve();
        });
    }

    @PluginMethod
    public void goBack(PluginCall call) {
        JSObject browserView = call.getObject("browserView");
        WebView webView = implementation.WebViewFromBrowserView(browserView);

        if (webView == null) {
            call.reject("The specified BrowserView does not exist");
            return;
        }

        getActivity().runOnUiThread(() -> {
            webView.goBack();
            call.resolve();
        });
    }

    @PluginMethod
    public void goForward(PluginCall call) {
        JSObject browserView = call.getObject("browserView");
        WebView webView = implementation.WebViewFromBrowserView(browserView);

        if (webView == null) {
            call.reject("The specified BrowserView does not exist");
            return;
        }

        getActivity().runOnUiThread(() -> {
            webView.goForward();
            call.resolve();
        });
    }

    @PluginMethod
    public void setUserAgent(PluginCall call) {
        JSObject browserView = call.getObject("browserView");
        WebView webView = implementation.WebViewFromBrowserView(browserView);

        if (webView == null) {
            call.reject("The specified BrowserView does not exist");
            return;
        }

        String userAgent = call.getString("userAgent");

        if (userAgent == null) {
            // TODO: reject message
            call.reject("");
            return;
        }

        getActivity().runOnUiThread(() -> {
            WebSettings settings = webView.getSettings();
            settings.setUserAgentString(userAgent);
            call.resolve();
        });
    }

    @PluginMethod
    public void getUserAgent(PluginCall call) {
        JSObject browserView = call.getObject("browserView");
        WebView webView = implementation.WebViewFromBrowserView(browserView);

        if (webView == null) {
            call.reject("The specified BrowserView does not exist");
            return;
        }

        getActivity().runOnUiThread(() -> {
            WebSettings settings = webView.getSettings();
            String userAgent = settings.getUserAgentString();
            call.resolve(new JSObject().put("value", userAgent));
        });
    }

    @PluginMethod
    public void appendUserAgent(PluginCall call) {
        JSObject browserView = call.getObject("browserView");
        WebView webView = implementation.WebViewFromBrowserView(browserView);

        if (webView == null) {
            call.reject("The specified BrowserView does not exist");
            return;
        }

        String userAgent = call.getString("userAgent");

        if (userAgent == null) {
            // TODO: reject message
            call.reject("");
            return;
        }

        getActivity().runOnUiThread(() -> {
            WebSettings settings = webView.getSettings();
            String defaultUserAgent = settings.getUserAgentString();
            settings.setUserAgentString(defaultUserAgent + " " + userAgent);
            call.resolve();
        });
    }

    @PluginMethod
    public void executeJavaScript(PluginCall call) {
        JSObject browserView = call.getObject("browserView");
        WebView webView = implementation.WebViewFromBrowserView(browserView);

        if (webView == null) {
            call.reject("The specified BrowserView does not exist");
            return;
        }

        String code = call.getString("code");

        if (code == null) {
            // TODO: reject message
            call.reject("");
            return;
        }

        getActivity().runOnUiThread(() -> webView.evaluateJavascript(code, value -> {
            if (value == null) {
                call.resolve();
            } else {
                call.resolve(new JSObject().put("value", value));
            }
        }));

        // TODO: Note: call never resolves or rejects when no callback occurs
    }

    @PluginMethod
    public void setAllowMultipleWindows(PluginCall call) {
        JSObject browserView = call.getObject("browserView");
        WebView webView = implementation.WebViewFromBrowserView(browserView);

        if (webView == null) {
            call.reject("The specified BrowserView does not exist");
            return;
        }

        boolean allowMultipleWindows = Boolean.TRUE.equals(call.getBoolean("allowMultipleWindows", true));

        WebSettings settings = webView.getSettings();
        settings.setSupportMultipleWindows(allowMultipleWindows);

        call.resolve();
    }

    @PluginMethod
    public void getAllowMultipleWindows(PluginCall call) {
        JSObject browserView = call.getObject("browserView");
        WebView webView = implementation.WebViewFromBrowserView(browserView);

        if (webView == null) {
            call.reject("The specified BrowserView does not exist");
            return;
        }

        getActivity().runOnUiThread(() -> {
            WebSettings settings = webView.getSettings();
            boolean allowMultipleWindows = settings.supportMultipleWindows();
            call.resolve(new JSObject().put("value", allowMultipleWindows));
        });
    }

    @PluginMethod
    public void setAllowedNavigation(PluginCall call) {
        JSObject browserView = call.getObject("browserView");
        UUID uuid = implementation.UUIDFromBrowserView(browserView);

        if (uuid == null) {
            call.reject("The specified BrowserView does not exist");
            return;
        }

        try {
            JSArray allowNavigationArray = call.getArray("allowNavigation");
            List<String> allowNavigation = new ArrayList<>();

            for(int i=0; i < allowNavigationArray.length(); i++) {
                allowNavigation.add(allowNavigationArray.getString(i));
            }

            boolean result = implementation.SetAllowedNavigation(browserView, allowNavigation.toArray(new String[0]));

            if (!result) {
                // TODO: reject message
                call.reject("");
                return;
            }

            call.resolve();
        } catch (JSONException ex) {
            call.reject(ex.toString());
        }
    }

    // Bridge -------------------------------------------------------------------------------

    @PluginMethod
    public void sendMessage(PluginCall call) {
        JSObject browserView = call.getObject("browserView");
        WebView webView = implementation.WebViewFromBrowserView(browserView);

        if (webView == null) {
            call.reject("The specified BrowserView does not exist");
            return;
        }

        String eventName = call.getString("eventName");
        JSArray args = call.getArray("args");

        if (eventName == null) {
            // TODO: reject message
            call.reject("");
            return;
        }

        // Serialize data
        JSObject data = new JSObject();
        data.put("event", eventName);
        data.put("payload", args.toString());

        // TODO

        boolean result = false;

        call.resolve(new JSObject().put("value", result));
    }

    //---------------------------------------------------------------------------------------
    //endregion

    //region PluginEvents
    //---------------------------------------------------------------------------------------

    public void onNewWindow(JSObject browserView, String url) {
        notifyBrowserViewUrlListeners("new-window", browserView, url);
    }

    public void onCloseWindow(JSObject browserView) {
        notifyBrowserViewListeners("close-window", browserView);
    }

    public void onPageFaviconUpdated(JSObject browserView, byte[] bytes) {
        // TODO: Test byteArray vs String encodedIcon = Base64.encodeToString(icon, Base64.NO_WRAP);
        notifyBrowserViewIconListeners("page-favicon-updated", browserView, bytes);
    }

    public void onPageTitleUpdated(JSObject browserView, String title) {
        notifyBrowserViewTitleListeners("page-title-updated", browserView, title);
    }

    public void onEnterHtmlFullScreen(JSObject browserView) {
        notifyBrowserViewListeners("enter-html-full-screen", browserView);
    }

    public void onLeaveHtmlFullScreen(JSObject browserView) {
        notifyBrowserViewListeners("leave-html-full-screen", browserView);
    }

    public void onWillNavigate(JSObject browserView, String url) {
        notifyBrowserViewUrlListeners("will-navigate", browserView, url);
    }

    public void onDidStartLoading(JSObject browserView) {
        notifyBrowserViewListeners("did-start-loading", browserView);
    }

    public void onDidFrameFinishLoad(JSObject browserView) {
        notifyBrowserViewListeners("did-frame-finish-load", browserView);
    }

    public void onDidFinishLoad(JSObject browserView) {
        notifyBrowserViewListeners("did-finish-load", browserView);
    }

    public void onDidFailLoad(JSObject browserView, int errorCode, String errorDescription, String validatedURL) {
        notifyBrowserViewErrorListeners("did-fail-load", browserView, errorCode, errorDescription, validatedURL);
    }

    public void onDomReady(JSObject browserView) {
        notifyBrowserViewListeners("dom-ready", browserView);
    }

    public void onHttpError(JSObject browserView, String url, int httpResponseCode, String httpStatusText) {
        notifyBrowserViewResponseListeners("http-error", browserView, url, httpResponseCode, httpStatusText);
    }

    public void onRenderProcessGone(JSObject browserView, boolean crashed) {
        notifyBrowserViewRenderProcessGoneListeners("render-process-gone", browserView, crashed);
    }

    public void onUnresponsive(JSObject browserView) {
        notifyBrowserViewListeners("unresponsive", browserView);
    }

    public void onResponsive(JSObject browserView) {
        notifyBrowserViewListeners("responsive", browserView);
    }

    // Bridge -------------------------------------------------------------------------------

    public void onChannelReceive(JSObject browserView, JSONObject data) throws JSONException {
        String eventName = data.getString("event");
        String payload = data.getString("payload");

        notifyBrowserViewChannelListeners("channel-" + eventName, browserView, payload);
    }

    //---------------------------------------------------------------------------------------
    //endregion

    //region PluginListeners
    //---------------------------------------------------------------------------------------

    public void notifyBrowserViewListeners(String eventName, JSObject browserView) {
        if (browserView == null) return;

        JSObject args = new JSObject();
        args.put("browserView", browserView);

        notifyListeners(eventName, args);
    }

    public void notifyBrowserViewUrlListeners(String eventName, JSObject browserView, String url) {
        if (browserView == null) return;

        JSObject args = new JSObject();
        args.put("browserView", browserView);
        args.put("url", url);

        notifyListeners(eventName, args);
    }

    public void notifyBrowserViewIconListeners(String eventName, JSObject browserView, byte[] icon) {
        if (browserView == null) return;

        JSArray byteArray = new JSArray();

        for (byte b : icon) {
            byteArray.put(b);
        }

        JSObject args = new JSObject();
        args.put("browserView", browserView);
        args.put("icon", byteArray);

        notifyListeners(eventName, args);
    }

    public void notifyBrowserViewTitleListeners(String eventName, JSObject browserView, String title) {
        if (browserView == null) return;

        JSObject args = new JSObject();
        args.put("browserView", browserView);
        args.put("title", title);

        notifyListeners(eventName, args);
    }

    public void notifyBrowserViewErrorListeners(String eventName, JSObject browserView, int errorCode, String errorDescription, String validatedURL) {
        if (browserView == null) return;

        JSObject error = new JSObject();
        error.put("errorCode", errorCode);
        error.put("errorDescription", errorDescription);
        error.put("validatedURL", validatedURL);

        JSObject args = new JSObject();
        args.put("browserView", browserView);
        args.put("error", error);

        notifyListeners(eventName, args);
    }

    public void notifyBrowserViewResponseListeners(String eventName, JSObject browserView, String url, int httpResponseCode, String httpStatusText) {
        if (browserView == null) return;

        JSObject errorResponse = new JSObject();
        errorResponse.put("httpResponseCode", httpResponseCode);
        errorResponse.put("httpStatusText", httpStatusText);

        JSObject args = new JSObject();
        args.put("browserView", browserView);
        args.put("url", url);
        args.put("errorResponse", errorResponse);

        notifyListeners(eventName, args);
    }

    public void notifyBrowserViewRenderProcessGoneListeners(String eventName, JSObject browserView, boolean crashed) {
        if (browserView == null) return;

        JSObject details = new JSObject();
        details.put("crashed", crashed);

        JSObject args = new JSObject();
        args.put("browserView", browserView);
        args.put("details", details);

        notifyListeners(eventName, args);
    }

    public void notifyBrowserViewChannelListeners(String eventName, JSObject browserView, String payload) throws JSONException {
        if (browserView == null) return;

        // Deserialize data
        JSArray payloadArray = new JSArray(payload);

        JSObject event = new JSObject();
        event.put("args", payloadArray);

        JSObject args = new JSObject();
        args.put("browserView", browserView);
        args.put("event", event);

        notifyListeners(eventName, args);
    }

    //---------------------------------------------------------------------------------------
    //endregion
}
