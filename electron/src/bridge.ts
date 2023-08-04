import { contextBridge, ipcRenderer } from 'electron';

import { CapacitorBrowserView } from  '../../src/bridge';

window._capacitorBrowserViewNativeBridge = {
    send: (eventName: string, data: string) => {
        const channelData = { eventName, data };
        ipcRenderer.send("capacitorBrowserViewNativeBridgeChannel", channelData);
    }
};

contextBridge.exposeInMainWorld("CapacitorBrowserView", CapacitorBrowserView);
