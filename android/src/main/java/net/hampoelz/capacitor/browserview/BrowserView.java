package net.hampoelz.capacitor.browserview;

import android.webkit.WebView;

import com.getcapacitor.CapacitorWebView;
import com.getcapacitor.JSObject;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class BrowserView {

    private Map<UUID, WebView> browserViews = new HashMap<UUID, WebView>();

    public Boolean BrowserViewExists(JSObject browserView) {
        UUID uuid = UUIDFromBrowserView(browserView);
        return BrowserViewExists(uuid);
    }

    public Boolean BrowserViewExists(UUID uuid) {
        return browserViews.containsKey(uuid);
    }

    public UUID UUIDFromBrowserView(JSObject browserView) {
        String uuid = browserView.getString("uuid", null);

        if (uuid == null) return null;
        return UUID.fromString(uuid);
    }

    public JSObject BrowserViewFromUUID(UUID uuid) {
        if (!BrowserViewExists(uuid)) return null;

        JSObject browserView = new JSObject();
        browserView.put("uuid", uuid.toString());
        return browserView;
    }
}
