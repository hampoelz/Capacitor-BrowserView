package net.hampoelz.capacitor.browserview;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "BrowserView")
public class BrowserViewPlugin extends Plugin {

    private BrowserView implementation = new BrowserView();

    @PluginMethod
    public void createBrowserView(PluginCall call) {
        JSObject options = call.getObject("options");
        String type = options.getString("type");

        Boolean useCapacitor = type.equals("CapacitorWebView");

        JSObject browserView = new JSObject();

        // TODO

        call.resolve(browserView);
    }

    // ------------------------------------------------------------------------------------------ \\

    @PluginMethod
    public void setAutoResize(PluginCall call) {
        JSObject browserView = call.getObject("browserView");
        if (!implementation.BrowserViewExists(browserView))
            call.reject("The specified BrowserView doesn't exist");

        JSObject options = call.getObject("options");
        Boolean width = options.getBoolean("width", false);
        Boolean height = options.getBoolean("height", false);
        Boolean horizontal = options.getBoolean("horizontal", false);
        Boolean vertical = options.getBoolean("vertical", false);

        // TODO

        call.resolve();
    }

    @PluginMethod
    public void setBounds(PluginCall call) {
        JSObject browserView = call.getObject("browserView");
        if (!implementation.BrowserViewExists(browserView))
            call.reject("The specified BrowserView doesn't exist");

        JSObject options = call.getObject("options");
        JSObject bounds = options.getJSObject("bounds");
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
            call.reject("The specified BrowserView doesn't exist");

        Number x = Double.NaN;
        Number y = Double.NaN;
        Number width = Double.NaN;
        Number height = Double.NaN;

        // TODO

        JSObject bounds = new JSObject();
        browserView.put("x", x);
        browserView.put("y", y);
        browserView.put("width", width);
        browserView.put("height", height);

        JSObject ret = new JSObject();
        ret.put("value", bounds);

        call.resolve(ret);
    }

    @PluginMethod
    public void setBackgroundColor(PluginCall call) {
        JSObject browserView = call.getObject("browserView");
        if (!implementation.BrowserViewExists(browserView))
            call.reject("The specified BrowserView doesn't exist");

        JSObject options = call.getObject("options");
        JSObject color = options.getJSObject("color");
        Number red = color.getInteger("red", 255);
        Number green = color.getInteger("green", 255);
        Number blue = color.getInteger("blue", 255);
        Number alpha = color.getInteger("alpha", 100);

        // TODO

        call.resolve();
    }

    // ------------------------------------------------------------------------------------------ \\

    @PluginMethod
    public void loadURL(PluginCall call) {
        JSObject browserView = call.getObject("browserView");
        if (!implementation.BrowserViewExists(browserView))
            call.reject("The specified BrowserView doesn't exist");

        JSObject options = call.getObject("options");
        String url = options.getString("url");

        // TODO

        call.resolve();
    }

    @PluginMethod
    public void getURL(PluginCall call) {
        JSObject browserView = call.getObject("browserView");
        if (!implementation.BrowserViewExists(browserView))
            call.reject("The specified BrowserView doesn't exist");

        String url = "";

        // TODO

        JSObject ret = new JSObject();
        ret.put("value", url);

        call.resolve(ret);
    }

    @PluginMethod
    public void getTitle(PluginCall call) {
        JSObject browserView = call.getObject("browserView");
        if (!implementation.BrowserViewExists(browserView))
            call.reject("The specified BrowserView doesn't exist");

        String title = "";

        // TODO

        JSObject ret = new JSObject();
        ret.put("value", title);

        call.resolve(ret);
    }

    @PluginMethod
    public void stop(PluginCall call) {
        JSObject browserView = call.getObject("browserView");
        if (!implementation.BrowserViewExists(browserView))
            call.reject("The specified BrowserView doesn't exist");

        // TODO
    }

    @PluginMethod
    public void reload(PluginCall call) {
        JSObject browserView = call.getObject("browserView");
        if (!implementation.BrowserViewExists(browserView))
            call.reject("The specified BrowserView doesn't exist");

        // TODO
    }

    @PluginMethod
    public void canGoBack(PluginCall call) {
        JSObject browserView = call.getObject("browserView");
        if (!implementation.BrowserViewExists(browserView))
            call.reject("The specified BrowserView doesn't exist");

        Boolean canGoBack = false;

        // TODO

        JSObject ret = new JSObject();
        ret.put("value", canGoBack);

        call.resolve(ret);
    }

    @PluginMethod
    public void canGoForward(PluginCall call) {
        JSObject browserView = call.getObject("browserView");
        if (!implementation.BrowserViewExists(browserView))
            call.reject("The specified BrowserView doesn't exist");

        Boolean canGoForward = false;

        // TODO

        JSObject ret = new JSObject();
        ret.put("value", canGoForward);

        call.resolve(ret);
    }

    @PluginMethod
    public void clearHistory(PluginCall call) {
        JSObject browserView = call.getObject("browserView");
        if (!implementation.BrowserViewExists(browserView))
            call.reject("The specified BrowserView doesn't exist");

        // TODO
    }

    @PluginMethod
    public void goBack(PluginCall call) {
        JSObject browserView = call.getObject("browserView");
        if (!implementation.BrowserViewExists(browserView))
            call.reject("The specified BrowserView doesn't exist");

        // TODO
    }

    @PluginMethod
    public void goForward(PluginCall call) {
        JSObject browserView = call.getObject("browserView");
        if (!implementation.BrowserViewExists(browserView))
            call.reject("The specified BrowserView doesn't exist");

        // TODO
    }

    @PluginMethod
    public void setUserAgent(PluginCall call) {
        JSObject browserView = call.getObject("browserView");
        if (!implementation.BrowserViewExists(browserView))
            call.reject("The specified BrowserView doesn't exist");

        JSObject options = call.getObject("options");
        String userAgent = options.getString("userAgent");

        // TODO

        call.resolve();
    }

    @PluginMethod
    public void getUserAgent(PluginCall call) {
        JSObject browserView = call.getObject("browserView");
        if (!implementation.BrowserViewExists(browserView))
            call.reject("The specified BrowserView doesn't exist");

        String userAgent = "";

        // TODO

        JSObject ret = new JSObject();
        ret.put("value", userAgent);

        call.resolve(ret);
    }

    @PluginMethod
    public void executeJavaScript(PluginCall call) {
        JSObject browserView = call.getObject("browserView");
        if (!implementation.BrowserViewExists(browserView))
            call.reject("The specified BrowserView doesn't exist");

        JSObject options = call.getObject("options");
        String code = options.getString("code");

        // TODO

        call.resolve(); // TODO: resolve with the result of the executed code or reject if the result of the code is a rejected promise.
    }

    @PluginMethod
    public void setZoomFactor(PluginCall call) {
        JSObject browserView = call.getObject("browserView");
        if (!implementation.BrowserViewExists(browserView))
            call.reject("The specified BrowserView doesn't exist");

        JSObject options = call.getObject("options");
        Number factor = options.getInteger("factor");

        // TODO

        call.resolve();
    }

    // ------------------------------------------------------------------------------------------ \\

    public void didFinishLoad(JSObject browserView, String url) {
        if (browserView == null) return;

        JSObject ret = new JSObject();
        ret.put("browserView", browserView);
        ret.put("url", url);

        notifyListeners("did-finish-load", ret);
    }

    public void didStopLoading(JSObject browserView) {
        if (browserView == null) return;

        JSObject ret = new JSObject();
        ret.put("browserView", browserView);

        notifyListeners("did-stop-loading", ret);
    }

    public void didFailLoad(JSObject browserView, Integer errorCode, String errorDescription, String validatedURL) {
        if (browserView == null) return;

        JSObject error = new JSObject();
        error.put("errorCode", errorCode);
        error.put("errorDescription", errorDescription);
        error.put("validatedURL", validatedURL);

        JSObject ret = new JSObject();
        ret.put("browserView", browserView);
        ret.put("error", error);

        notifyListeners("did-fail-load", ret);
    }

    public void didStartLoading(JSObject browserView) {
        if (browserView == null) return;

        JSObject ret = new JSObject();
        ret.put("browserView", browserView);

        notifyListeners("did-start-loading", ret);
    }

    public void didStartNavigation(JSObject browserView, String url) {
        if (browserView == null) return;

        JSObject ret = new JSObject();
        ret.put("browserView", browserView);
        ret.put("url", url);

        notifyListeners("did-start-navigation", ret);
    }

    public void domReady(JSObject browserView) {
        if (browserView == null) return;

        JSObject ret = new JSObject();
        ret.put("browserView", browserView);

        notifyListeners("dom-ready", ret);
    }

    public void willNavigate(JSObject browserView, String url) {
        if (browserView == null) return;

        JSObject ret = new JSObject();
        ret.put("browserView", browserView);
        ret.put("url", url);

        notifyListeners("will-navigate", ret);
    }

    public void httpError(JSObject browserView, String url, Integer httpResponseCode, String httpStatusText) {
        if (browserView == null) return;

        JSObject errorResponse = new JSObject();
        errorResponse.put("httpResponseCode", httpResponseCode);
        errorResponse.put("httpStatusText", httpStatusText);

        JSObject ret = new JSObject();
        ret.put("browserView", browserView);
        ret.put("url", url);
        ret.put("errorResponse", errorResponse);

        notifyListeners("http-error", ret);
    }

    public void unresponsive(JSObject browserView) {
        if (browserView == null) return;

        JSObject ret = new JSObject();
        ret.put("browserView", browserView);

        notifyListeners("unresponsive", ret);
    }

    public void responsive(JSObject browserView) {
        if (browserView == null) return;

        JSObject ret = new JSObject();
        ret.put("browserView", browserView);

        notifyListeners("responsive", ret);
    }

    public void renderProcessGone(JSObject browserView, Boolean crashed) {
        if (browserView == null) return;

        JSObject details = new JSObject();
        details.put("crashed", crashed);

        JSObject ret = new JSObject();
        ret.put("browserView", browserView);
        ret.put("details", details);

        notifyListeners("render-process-gone", ret);
    }
}
