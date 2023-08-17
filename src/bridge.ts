declare global {
  interface Window {
    _capacitorBrowserViewNativeBridge: {
      send: (eventName: string, data: string) => void;
    };

    CapacitorBrowserView: CapacitorBrowserViewBridge;
  }
}

interface CapacitorBrowserViewBridge {
  send: (eventName: string, ...args: any[]) => void;
  addListener: (eventName: string, callback: (args: any[]) => void) => void;
}

const CapacitorBrowserView: CapacitorBrowserViewBridge = {
  send(eventName, ...args) {
    const data = JSON.stringify([args]);
    window._capacitorBrowserViewNativeBridge.send(eventName, data);
  },
  addListener(eventName, callback) {
    window.addEventListener('channel-' + eventName, ((event: CustomEvent) => {
      const data = JSON.parse(event.detail);
      callback(data);
    }) as EventListener);
  }
};

window.CapacitorBrowserView = CapacitorBrowserView;

export { CapacitorBrowserView, CapacitorBrowserViewBridge };
