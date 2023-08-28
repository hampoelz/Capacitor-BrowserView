package net.hampoelz.capacitor.browserview;

import android.Manifest;
import android.annotation.SuppressLint;
import android.content.Context;
import android.graphics.Color;
import android.util.Base64;
import android.view.ViewGroup;
import android.webkit.WebSettings;
import android.widget.FrameLayout;
import androidx.annotation.Nullable;
import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.Logger;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginConfig;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.annotation.Permission;
import java.util.Arrays;
import java.util.List;
import org.json.JSONException;

@CapacitorPlugin(
    name = "CapacitorBrowserView",
    permissions = { @Permission(alias = "network", strings = { Manifest.permission.ACCESS_NETWORK_STATE, Manifest.permission.INTERNET }) }
)
public class CapacitorBrowserViewPlugin extends Plugin {

    protected static final String LOGGER_TAG = "CapacitorBrowserView";

    private final PluginEventNotifier eventNotifier = new PluginEventNotifier();
    private CapacitorBrowserView implementation;

    public void load() {
        ViewGroup rootView = (ViewGroup) getActivity().getWindow().getDecorView().getRootView();
        Context context = getContext();

        implementation = new CapacitorBrowserView(rootView, context, eventNotifier);
    }

    /** @noinspection InnerClassMayBeStatic*/
    private class PluginSettings {

        @Nullable
        protected String url = null;

        protected boolean allowMultipleWindows = true;

        @Nullable
        protected String[] allowNavigation = null;

        protected boolean enableBridge = false;

        @Nullable
        protected String overrideUserAgent = null;

        @Nullable
        protected String appendUserAgent = null;

        @Nullable
        protected String backgroundColor = null;

        protected boolean allowMixedContent = false;
    }

    private PluginSettings readPluginSettings() {
        PluginSettings settings = new PluginSettings();

        PluginConfig config = getConfig();

        String overrideUserAgentDefault = config.getString("overrideUserAgent");
        String appendUserAgentDefault = config.getString("appendUserAgent");
        String backgroundColorDefault = config.getString("backgroundColor");

        settings.url = config.getString("url");
        settings.allowMultipleWindows = config.getBoolean("allowMultipleWindows", settings.allowMultipleWindows);
        settings.allowNavigation = config.getArray("allowNavigation");
        settings.enableBridge = config.getBoolean("enableBridge", settings.enableBridge);
        settings.overrideUserAgent = config.getString("androidOverrideUserAgent", overrideUserAgentDefault);
        settings.appendUserAgent = config.getString("androidAppendUserAgent", appendUserAgentDefault);
        settings.backgroundColor = config.getString("androidBackgroundColor", backgroundColorDefault);
        settings.allowMixedContent = Boolean.TRUE.equals(config.getBoolean("androidAllowMixedContent", settings.allowMixedContent));

        return settings;
    }

    //region PluginMethods
    //---------------------------------------------------------------------------------------

    @PluginMethod
    @SuppressLint("SetJavaScriptEnabled")
    public void create(PluginCall call) {
        final PluginSettings pluginSettings = readPluginSettings();

        final String url = call.getString("url", pluginSettings.url);
        final boolean allowMultipleWindows = Boolean.TRUE.equals(call.getBoolean("allowMultipleWindows", pluginSettings.allowMultipleWindows));
        final boolean enableBridge = Boolean.TRUE.equals(call.getBoolean("enableBridge", pluginSettings.enableBridge));
        final String overrideUserAgent = call.getString("overrideUserAgent", pluginSettings.overrideUserAgent);
        final String appendUserAgent = call.getString("appendUserAgent", pluginSettings.appendUserAgent);
        final String backgroundColor = call.getString("backgroundColor", pluginSettings.backgroundColor);

        getActivity().runOnUiThread(() -> {
            final CapacitorBrowserView.BrowserView browserView = implementation.createBrowserView(enableBridge);
            final WebSettings settings = browserView.getSettings();

            if (pluginSettings.allowMixedContent) {
                settings.setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
            }

            if (pluginSettings.allowNavigation != null) {
                try {
                    browserView.setAllowedNavigation(pluginSettings.allowNavigation);
                } catch (Exception e) {
                    call.reject("Failed to set the allowed navigation for a BrowserView.", e);
                    return;
                }
            }

            if (overrideUserAgent == null && appendUserAgent != null) {
                final String defaultUserAgent = settings.getUserAgentString();
                settings.setUserAgentString(defaultUserAgent + " " + appendUserAgent);
            } else if (overrideUserAgent != null) {
                settings.setUserAgentString(overrideUserAgent);
            }

            if (backgroundColor != null) {
                try {
                    browserView.setBackgroundColor(Color.parseColor(backgroundColor));
                } catch (IllegalArgumentException e) {
                    Logger.error(CapacitorBrowserViewPlugin.LOGGER_TAG, "Failed to set the background color '" + backgroundColor + "' for a BrowserView. (Invalid color)", e);
                }
            }

            settings.setSupportMultipleWindows(allowMultipleWindows);

            if (url != null) {
                browserView.loadUrl(url);
            }

            call.resolve(new JSObject().put("uuid", browserView.uuid));
        });
    }

    @PluginMethod
    public void destroy(PluginCall call) {
        getActivity().runOnUiThread(() -> {
            implementation.destroyBrowserView(call);
            call.resolve();
        });
    }

    // Visual -------------------------------------------------------------------------------

    @PluginMethod
    public void setBounds(PluginCall call) {
        final CapacitorBrowserView.BrowserView browserView = implementation.getBrowserView(call);
        if (browserView == null) return;

        final JSObject bounds = call.getObject("bounds");
        if (bounds == null) {
            call.reject("Required parameter 'bounds' was not specified.");
            return;
        }

        final Integer x = bounds.getInteger("x");
        final Integer y = bounds.getInteger("y");
        final Integer width = bounds.getInteger("width");
        final Integer height = bounds.getInteger("height");

        if (x == null || x < 0 || y == null || y < 0 || width == null || width < 0 || height == null || height < 0) {
            call.reject("One of the required parameters 'x', 'y', 'width' and/or 'height' was not specified or is invalid.");
            return;
        }

        final float density = getActivity().getResources().getDisplayMetrics().density;

        getActivity().runOnUiThread(() -> {
            final FrameLayout.LayoutParams layoutParams = new FrameLayout.LayoutParams((int) (width * density), (int) (height * density));
            layoutParams.leftMargin = (int) (x * density);
            layoutParams.topMargin = (int) (y * density);

            browserView.setLayoutParams(layoutParams);
            browserView.bringToFront();
            call.resolve();
        });
    }

    @PluginMethod
    public void getBounds(PluginCall call) {
        final CapacitorBrowserView.BrowserView browserView = implementation.getBrowserView(call);
        if (browserView == null) return;

        final float density = getActivity().getResources().getDisplayMetrics().density;

        getActivity().runOnUiThread(() -> {
            final FrameLayout.LayoutParams layoutParams = (FrameLayout.LayoutParams) browserView.getLayoutParams();

            if (layoutParams == null) {
                call.reject("Unable to get BrowserView bounds.");
                return;
            }

            final JSObject bounds = new JSObject();
            bounds.put("x", (int) (layoutParams.leftMargin / density));
            bounds.put("y", (int) (layoutParams.topMargin / density));
            bounds.put("width", (int) (layoutParams.width / density));
            bounds.put("height", (int) (layoutParams.height / density));

            call.resolve(new JSObject().put("bounds", bounds));
        });
    }

    @PluginMethod
    public void setBackgroundColor(PluginCall call) {
        final CapacitorBrowserView.BrowserView browserView = implementation.getBrowserView(call);
        if (browserView == null) return;

        final String color = call.getString("color");
        if (color == null || color.isEmpty()) {
            call.reject("Required parameter 'color' was not specified.");
            return;
        }

        getActivity().runOnUiThread(() -> {
            try {
                browserView.setBackgroundColor(Color.parseColor(color));
                call.resolve();
            } catch (Exception e) {
                call.reject("Failed to set the background color for a BrowserView. (Invalid color)", e);
            }
        });
    }

    // Actions ------------------------------------------------------------------------------

    @PluginMethod
    public void loadUrl(PluginCall call) {
        final CapacitorBrowserView.BrowserView browserView = implementation.getBrowserView(call);
        if (browserView == null) return;

        final String url = call.getString("url");
        if (url == null || url.isEmpty()) {
            call.reject("Required parameter 'url' was not specified.");
            return;
        }

        getActivity().runOnUiThread(() -> {
            browserView.loadUrl(url);
            call.resolve();
        });
    }

    @PluginMethod
    public void getUrl(PluginCall call) {
        final CapacitorBrowserView.BrowserView browserView = implementation.getBrowserView(call);
        if (browserView == null) return;

        getActivity().runOnUiThread(() -> {
            final String url = browserView.getUrl();
            call.resolve(new JSObject().put("url", url));
        });
    }

    @PluginMethod
    public void getTitle(PluginCall call) {
        final CapacitorBrowserView.BrowserView browserView = implementation.getBrowserView(call);
        if (browserView == null) return;

        getActivity().runOnUiThread(() -> {
            final String title = browserView.getTitle();
            call.resolve(new JSObject().put("title", title));
        });
    }

    @PluginMethod
    public void stop(PluginCall call) {
        final CapacitorBrowserView.BrowserView browserView = implementation.getBrowserView(call);
        if (browserView == null) return;

        getActivity().runOnUiThread(() -> {
            browserView.stopLoading();
            call.resolve();
        });
    }

    @PluginMethod
    public void reload(PluginCall call) {
        final CapacitorBrowserView.BrowserView browserView = implementation.getBrowserView(call);
        if (browserView == null) return;

        getActivity().runOnUiThread(() -> {
            browserView.reload();
            call.resolve();
        });
    }

    @PluginMethod
    public void canGoBack(PluginCall call) {
        final CapacitorBrowserView.BrowserView browserView = implementation.getBrowserView(call);
        if (browserView == null) return;

        getActivity().runOnUiThread(() -> {
            final boolean canGoBack = browserView.canGoBack();
            call.resolve(new JSObject().put("canGoBack", canGoBack));
        });
    }

    @PluginMethod
    public void canGoForward(PluginCall call) {
        final CapacitorBrowserView.BrowserView browserView = implementation.getBrowserView(call);
        if (browserView == null) return;

        getActivity().runOnUiThread(() -> {
            final boolean canGoForward = browserView.canGoForward();
            call.resolve(new JSObject().put("canGoForward", canGoForward));
        });
    }

    @PluginMethod
    public void clearHistory(PluginCall call) {
        final CapacitorBrowserView.BrowserView browserView = implementation.getBrowserView(call);
        if (browserView == null) return;

        getActivity().runOnUiThread(() -> {
            browserView.clearHistory();
            call.resolve();
        });
    }

    @PluginMethod
    public void goBack(PluginCall call) {
        final CapacitorBrowserView.BrowserView browserView = implementation.getBrowserView(call);
        if (browserView == null) return;

        getActivity().runOnUiThread(() -> {
            browserView.goBack();
            call.resolve();
        });
    }

    @PluginMethod
    public void goForward(PluginCall call) {
        final CapacitorBrowserView.BrowserView browserView = implementation.getBrowserView(call);
        if (browserView == null) return;

        getActivity().runOnUiThread(() -> {
            browserView.goForward();
            call.resolve();
        });
    }

    @PluginMethod
    public void setUserAgent(PluginCall call) {
        final CapacitorBrowserView.BrowserView browserView = implementation.getBrowserView(call);
        if (browserView == null) return;

        final String userAgent = call.getString("userAgent");
        if (userAgent == null) {
            call.reject("Required parameter 'userAgent' was not specified.");
            return;
        }

        getActivity().runOnUiThread(() -> {
            final WebSettings settings = browserView.getSettings();
            settings.setUserAgentString(userAgent);
            call.resolve();
        });
    }

    @PluginMethod
    public void appendUserAgent(PluginCall call) {
        final CapacitorBrowserView.BrowserView browserView = implementation.getBrowserView(call);
        if (browserView == null) return;

        final String userAgent = call.getString("userAgent");
        if (userAgent == null || userAgent.isEmpty()) {
            call.reject("Required parameter 'userAgent' was not specified.");
            return;
        }

        getActivity().runOnUiThread(() -> {
            final WebSettings settings = browserView.getSettings();
            final String defaultUserAgent = settings.getUserAgentString();
            settings.setUserAgentString(defaultUserAgent + " " + userAgent);
            call.resolve();
        });
    }

    @PluginMethod
    public void getUserAgent(PluginCall call) {
        final CapacitorBrowserView.BrowserView browserView = implementation.getBrowserView(call);
        if (browserView == null) return;

        getActivity().runOnUiThread(() -> {
            final WebSettings settings = browserView.getSettings();
            final String userAgent = settings.getUserAgentString();
            call.resolve(new JSObject().put("userAgent", userAgent));
        });
    }

    @PluginMethod
    public void executeJavaScript(PluginCall call) {
        final CapacitorBrowserView.BrowserView browserView = implementation.getBrowserView(call);
        if (browserView == null) return;

        final String code = call.getString("code");
        if (code == null) {
            call.reject("Required parameter 'code' was not specified.");
            return;
        }

        getActivity().runOnUiThread(() -> browserView.evaluateJavascript(code, value -> {
            JSObject data;
            try {
                final String result = "{ \"result\": " + value + " }";
                data = new JSObject(result);
            } catch (JSONException e) {
                data = new JSObject();
                data.put("result", value);
            }
            call.resolve(data);
        }));
    }

    @PluginMethod
    public void setAllowMultipleWindows(PluginCall call) {
        final CapacitorBrowserView.BrowserView browserView = implementation.getBrowserView(call);
        if (browserView == null) return;

        final boolean allowMultipleWindows = Boolean.TRUE.equals(call.getBoolean("allowMultipleWindows", true));

        getActivity().runOnUiThread(() -> {
            final WebSettings settings = browserView.getSettings();
            settings.setSupportMultipleWindows(allowMultipleWindows);
            call.resolve();
        });
    }

    @PluginMethod
    public void getAllowMultipleWindows(PluginCall call) {
        final CapacitorBrowserView.BrowserView browserView = implementation.getBrowserView(call);
        if (browserView == null) return;

        getActivity().runOnUiThread(() -> {
            final WebSettings settings = browserView.getSettings();
            final boolean allowMultipleWindows = settings.supportMultipleWindows();
            call.resolve(new JSObject().put("allowMultipleWindows", allowMultipleWindows));
        });
    }

    @PluginMethod
    public void setAllowedNavigation(PluginCall call) {
        final CapacitorBrowserView.BrowserView browserView = implementation.getBrowserView(call);
        if (browserView == null) return;

        final JSArray allowedNavigation = call.getArray("allowedNavigation", new JSArray());
        if (allowedNavigation == null) {
            call.reject("Required parameter 'allowedNavigation' was not specified.");
            return;
        }

        final String[] allowedNavigationArray = new String[allowedNavigation.length()];

        try {
            for (int i = 0; i < allowedNavigation.length(); i++) {
                allowedNavigationArray[i] = allowedNavigation.getString(i);
            }
        } catch (JSONException e) {
            call.reject("Parameter 'allowedNavigation' is not valid.", e);
            return;
        }

        try {
            browserView.setAllowedNavigation(allowedNavigationArray);
            call.resolve();
        } catch (Exception e) {
            call.reject("Failed to set the allowed navigation for a BrowserView.", e);
        }
    }

    @PluginMethod
    public void getAllowedNavigation(PluginCall call) {
        final CapacitorBrowserView.BrowserView browserView = implementation.getBrowserView(call);
        if (browserView == null) return;

        final String[] allowedNavigationArray = browserView.getAllowedNavigation();
        final List<String> allowedNavigationList = Arrays.asList(allowedNavigationArray);
        final JSArray allowedNavigation = new JSArray(allowedNavigationList);

        call.resolve(new JSObject().put("allowedNavigation", allowedNavigation));
    }

    // Bridge -------------------------------------------------------------------------------

    @PluginMethod
    public void sendMessage(PluginCall call) {
        final CapacitorBrowserView.BrowserView browserView = implementation.getBrowserView(call);
        if (browserView == null) return;

        final String eventName = call.getString("eventName");
        if (eventName == null || eventName.isEmpty()) {
            call.reject("Required parameter 'eventName' was not specified.");
            return;
        }

        getActivity().runOnUiThread(() -> {
            implementation.sendMessage(call);
            call.resolve();
        });
    }

    //---------------------------------------------------------------------------------------
    //endregion

    //region PluginEvents
    //---------------------------------------------------------------------------------------

    protected class PluginEventNotifier {

        protected void newWindow(String uuid, String url) {
            notifyBrowserViewNavigationListeners("new-window", uuid, url, true);
        }

        protected void closeWindow(String uuid) {
            notifyBrowserViewListeners("close-window", uuid);
        }

        protected void pageFaviconUpdated(String uuid, byte[] bytes) {
            notifyBrowserViewIconListeners("page-favicon-updated", uuid, bytes);
        }

        protected void pageTitleUpdated(String uuid, String title) {
            notifyBrowserViewTitleListeners("page-title-updated", uuid, title);
        }

        protected void enterHtmlFullScreen(String uuid) {
            notifyBrowserViewListeners("enter-html-full-screen", uuid);
        }

        protected void leaveHtmlFullScreen(String uuid) {
            notifyBrowserViewListeners("leave-html-full-screen", uuid);
        }

        protected void willNavigate(String uuid, String url, boolean isExternal) {
            notifyBrowserViewNavigationListeners("will-navigate", uuid, url, isExternal);
        }

        protected void didStartLoading(String uuid) {
            notifyBrowserViewListeners("did-start-loading", uuid);
        }

        protected void didFinishLoad(String uuid) {
            notifyBrowserViewListeners("did-finish-load", uuid);
        }

        protected void didFailLoad(String uuid, int errorCode, String errorDescription, String validatedURL) {
            notifyBrowserViewErrorListeners("did-fail-load", uuid, errorCode, errorDescription, validatedURL);
        }

        protected void domReady(String uuid) {
            notifyBrowserViewListeners("dom-ready", uuid);
        }

        protected void httpError(String uuid, String url, int httpResponseCode, String httpStatusText) {
            notifyBrowserViewResponseListeners("http-error", uuid, url, httpResponseCode, httpStatusText);
        }

        protected void renderProcessGone(String uuid, boolean crashed) {
            notifyBrowserViewRenderProcessGoneListeners("render-process-gone", uuid, crashed);
        }

        protected void unresponsive(String uuid) {
            notifyBrowserViewListeners("unresponsive", uuid);
        }

        protected void responsive(String uuid) {
            notifyBrowserViewListeners("responsive", uuid);
        }

        // Bridge -------------------------------------------------------------------------------

        protected void channelReceive(String uuid, String eventName, String data) {
            // Deserialize data
            JSArray payloadArray;
            try {
                payloadArray = new JSArray(data);
            } catch (JSONException e) {
                payloadArray = new JSArray();
                try {
                    JSObject payload = new JSObject(data);
                    payloadArray.put(payload);
                } catch (JSONException ex) {
                    payloadArray.put(data);
                }
            }

            notifyBrowserViewChannelListeners("channel-" + eventName, uuid, payloadArray);
        }
    }

    //---------------------------------------------------------------------------------------
    //endregion

    //region PluginListeners
    //---------------------------------------------------------------------------------------

    private void notifyBrowserViewListeners(String eventName, String uuid) {
        final JSObject args = new JSObject();
        args.put("uuid", uuid);

        notifyListeners(eventName, args);
    }

    private void notifyBrowserViewNavigationListeners(String eventName, String uuid, String url, boolean isExternal) {
        final JSObject args = new JSObject();
        args.put("uuid", uuid);
        args.put("url", url);
        args.put("isExternal", isExternal);

        notifyListeners(eventName, args);
    }

    private void notifyBrowserViewIconListeners(String eventName, String uuid, byte[] icon) {
        final String encoded = Base64.encodeToString(icon, Base64.NO_WRAP);

        final JSObject args = new JSObject();
        args.put("uuid", uuid);
        args.put("icon", encoded);

        notifyListeners(eventName, args);
    }

    private void notifyBrowserViewTitleListeners(String eventName, String uuid, String title) {
        final JSObject args = new JSObject();
        args.put("uuid", uuid);
        args.put("title", title);

        notifyListeners(eventName, args);
    }

    private void notifyBrowserViewErrorListeners(String eventName, String uuid, int errorCode, String errorDescription, String validatedURL) {
        final JSObject error = new JSObject();
        error.put("errorCode", errorCode);
        error.put("errorDescription", errorDescription);
        error.put("validatedURL", validatedURL);

        final JSObject args = new JSObject();
        args.put("uuid", uuid);
        args.put("error", error);

        notifyListeners(eventName, args);
    }

    private void notifyBrowserViewResponseListeners(String eventName, String uuid, String url, int httpResponseCode, String httpStatusText) {
        final JSObject errorResponse = new JSObject();
        errorResponse.put("httpResponseCode", httpResponseCode);
        errorResponse.put("httpStatusText", httpStatusText);

        final JSObject args = new JSObject();
        args.put("uuid", uuid);
        args.put("url", url);
        args.put("errorResponse", errorResponse);

        notifyListeners(eventName, args);
    }

    private void notifyBrowserViewRenderProcessGoneListeners(String eventName, String uuid, boolean crashed) {
        final JSObject details = new JSObject();
        details.put("crashed", crashed);

        final JSObject args = new JSObject();
        args.put("uuid", uuid);
        args.put("details", details);

        notifyListeners(eventName, args);
    }

    private void notifyBrowserViewChannelListeners(String eventName, String uuid, JSArray payloadArray) {
        final JSObject args = new JSObject();
        args.put("uuid", uuid);
        args.put("args", payloadArray);

        notifyListeners(eventName, args);
    }

    //---------------------------------------------------------------------------------------
    //endregion
}
