package net.hampoelz.capacitor.browserview;

import android.webkit.WebView;

import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

@CapacitorPlugin(name = "BrowserView")
public class BrowserViewPlugin extends Plugin {

    private BrowserView implementation;

    public void load() {
        implementation = new BrowserView(this);
    }

    //region PluginMethods
    //---------------------------------------------------------------------------------------

    @PluginMethod
    public void createBrowserView(PluginCall call) {
        boolean enableBridge = call.getBoolean("enableBridge", false);

        // TODO: Parse global plugin settings

        getActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                WebView webView = new WebView(getContext());

                // TODO: Set WebView settings
                // TODO: Implement Capacitor <-> BrowserView Bridge

                JSObject browserView = implementation.CreateBrowserView(webView);
                call.resolve(new JSObject().put("value", browserView));
            }
        });
    }

    // Visual -------------------------------------------------------------------------------

    @PluginMethod
    public void setBounds(PluginCall call) {
        JSObject browserView = call.getObject("browserView");
        if (!implementation.BrowserViewExists(browserView))
            call.reject("The specified BrowserView does not exist");

        JSObject bounds = call.getObject("bounds");
        Number x = bounds.getInteger("x");
        Number y = bounds.getInteger("y");
        Number width = bounds.getInteger("width");
        Number height = bounds.getInteger("height");

        // TODO

        call.resolve();
    }

    @PluginMethod
    public void getBounds(PluginCall call) {
        JSObject browserView = call.getObject("browserView");
        if (!implementation.BrowserViewExists(browserView))
            call.reject("The specified BrowserView does not exist");

        Number x = Double.NaN;
        Number y = Double.NaN;
        Number width = Double.NaN;
        Number height = Double.NaN;

        // TODO

        JSObject bounds = new JSObject();
        bounds.put("x", x);
        bounds.put("y", y);
        bounds.put("width", width);
        bounds.put("height", height);

        call.resolve(new JSObject().put("value", bounds));
    }

    @PluginMethod
    public void setBackgroundColor(PluginCall call) {
        JSObject browserView = call.getObject("browserView");
        if (!implementation.BrowserViewExists(browserView))
            call.reject("The specified BrowserView does not exist");

        String color = call.getString("color");

        // TODO

        call.resolve();
    }

    // Actions ------------------------------------------------------------------------------

    @PluginMethod
    public void loadURL(PluginCall call) {
        JSObject browserView = call.getObject("browserView");
        if (!implementation.BrowserViewExists(browserView))
            call.reject("The specified BrowserView does not exist");

        String url = call.getString("url");

        // TODO

        call.resolve();
    }

    @PluginMethod
    public void getURL(PluginCall call) {
        JSObject browserView = call.getObject("browserView");
        if (!implementation.BrowserViewExists(browserView))
            call.reject("The specified BrowserView does not exist");

        String url = "";

        // TODO

        call.resolve(new JSObject().put("value", url));
    }

    @PluginMethod
    public void getTitle(PluginCall call) {
        JSObject browserView = call.getObject("browserView");
        if (!implementation.BrowserViewExists(browserView))
            call.reject("The specified BrowserView does not exist");

        String title = "";

        // TODO

        call.resolve(new JSObject().put("value", title));
    }

    @PluginMethod
    public void stop(PluginCall call) {
        JSObject browserView = call.getObject("browserView");
        if (!implementation.BrowserViewExists(browserView))
            call.reject("The specified BrowserView does not exist");

        // TODO

        call.resolve();
    }

    @PluginMethod
    public void reload(PluginCall call) {
        JSObject browserView = call.getObject("browserView");
        if (!implementation.BrowserViewExists(browserView))
            call.reject("The specified BrowserView does not exist");

        // TODO

        call.resolve();
    }

    @PluginMethod
    public void canGoBack(PluginCall call) {
        JSObject browserView = call.getObject("browserView");
        if (!implementation.BrowserViewExists(browserView))
            call.reject("The specified BrowserView does not exist");

        boolean canGoBack = false;

        // TODO

        call.resolve(new JSObject().put("value", canGoBack));
    }

    @PluginMethod
    public void canGoForward(PluginCall call) {
        JSObject browserView = call.getObject("browserView");
        if (!implementation.BrowserViewExists(browserView))
            call.reject("The specified BrowserView does not exist");

        boolean canGoForward = false;

        // TODO

        call.resolve(new JSObject().put("value", canGoForward));
    }

    @PluginMethod
    public void clearHistory(PluginCall call) {
        JSObject browserView = call.getObject("browserView");
        if (!implementation.BrowserViewExists(browserView))
            call.reject("The specified BrowserView does not exist");

        // TODO

        call.resolve();
    }

    @PluginMethod
    public void goBack(PluginCall call) {
        JSObject browserView = call.getObject("browserView");
        if (!implementation.BrowserViewExists(browserView))
            call.reject("The specified BrowserView does not exist");

        // TODO

        call.resolve();
    }

    @PluginMethod
    public void goForward(PluginCall call) {
        JSObject browserView = call.getObject("browserView");
        if (!implementation.BrowserViewExists(browserView))
            call.reject("The specified BrowserView does not exist");

        // TODO

        call.resolve();
    }

    @PluginMethod
    public void setUserAgent(PluginCall call) {
        JSObject browserView = call.getObject("browserView");
        if (!implementation.BrowserViewExists(browserView))
            call.reject("The specified BrowserView does not exist");

        String userAgent = call.getString("userAgent");

        // TODO

        call.resolve();
    }

    @PluginMethod
    public void getUserAgent(PluginCall call) {
        JSObject browserView = call.getObject("browserView");
        if (!implementation.BrowserViewExists(browserView))
            call.reject("The specified BrowserView does not exist");

        String userAgent = "";

        // TODO

        call.resolve(new JSObject().put("value", userAgent));
    }

    @PluginMethod
    public void appendUserAgent(PluginCall call) {
        JSObject browserView = call.getObject("browserView");
        if (!implementation.BrowserViewExists(browserView))
            call.reject("The specified BrowserView does not exist");

        String userAgent = "";

        // TODO

        call.resolve();
    }

    @PluginMethod
    public void executeJavaScript(PluginCall call) {
        JSObject browserView = call.getObject("browserView");
        if (!implementation.BrowserViewExists(browserView))
            call.reject("The specified BrowserView does not exist");

        String code = call.getString("code");

        // TODO

        call.resolve();

        // TODO: resolve with the result of the executed code or reject if the result of the code is a rejected promise.
    }

    @PluginMethod
    public void setAllowMultipleWindows(PluginCall call) {
        JSObject browserView = call.getObject("browserView");
        if (!implementation.BrowserViewExists(browserView))
            call.reject("The specified BrowserView does not exist");

        boolean allowMultipleWindows = call.getBoolean("allowMultipleWindows", true);

        // TODO

        call.resolve();
    }

    @PluginMethod
    public void getAllowMultipleWindows(PluginCall call) {
        JSObject browserView = call.getObject("browserView");
        if (!implementation.BrowserViewExists(browserView))
            call.reject("The specified BrowserView does not exist");

        boolean allowMultipleWindows = true;

        // TODO

        call.resolve(new JSObject().put("value", allowMultipleWindows));
    }

    @PluginMethod
    public void setAllowedNavigation(PluginCall call) {
        JSObject browserView = call.getObject("browserView");
        if (!implementation.BrowserViewExists(browserView))
            call.reject("The specified BrowserView does not exist");

        try {
            JSArray allowNavigationArray = call.getArray("allowNavigation");
            List<String> allowNavigation = new ArrayList<>();

            for(int i=0; i < allowNavigationArray.length(); i++) {
                allowNavigation.add(allowNavigationArray.getString(i));
            }

            // TODO

            call.resolve();
        } catch (JSONException e) {
            call.reject(e.toString());
        }
    }

    @PluginMethod
    public void getAllowedNavigation(PluginCall call) {
        JSObject browserView = call.getObject("browserView");
        if (!implementation.BrowserViewExists(browserView))
            call.reject("The specified BrowserView does not exist");

        List<String> allowNavigation = new ArrayList<>();

        // TODO

        JSArray allowNavigationArray = new JSArray(allowNavigation);

        call.resolve(new JSObject().put("value", allowNavigationArray));
    }

    // Bridge -------------------------------------------------------------------------------

    @PluginMethod
    public void sendMessage(PluginCall call) {
        JSObject browserView = call.getObject("browserView");
        if (!implementation.BrowserViewExists(browserView))
            call.reject("The specified BrowserView does not exist");

        String eventName = call.getString("eventName");
        JSArray args = call.getArray("args");

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

        for(int i=0; i < icon.length; i++) {
            byteArray.put(icon[i]);
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
