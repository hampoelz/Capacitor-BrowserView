import { randomUUID } from 'crypto';
import type {
  BrowserWindow,
  BrowserViewConstructorOptions as WebViewConstructorOptions
} from 'electron';
import { shell, ipcMain, BrowserView as WebView } from 'electron';
import { get as httpGet } from 'http';
import { get as httpsGet } from 'https';
import { join } from 'path';

import type {
  BrowserViewArgs,
  BrowserViewMessageArgs
} from '../../src/implementation';

import type { CapacitorBrowserView } from './index';

interface BrowserView extends WebView {
  uuid: string;

  setAllowMultipleWindows(allowMultipleWindows: boolean): void;
  getAllowMultipleWindows(): boolean;
  setAllowedNavigation(allowedNavigation: string[]): void;
  getAllowedNavigation(): string[];
  allowNavigation(url: string): boolean | undefined;
  loadURL(url: string): Promise<void>;
}

interface BrowserViewConstructorOptions extends WebViewConstructorOptions {
  enableBridge?: boolean;
}

export class CapacitorBrowserViewImplementation {
  private browserViews = new Map<string, BrowserView>();
  private browserWindow: BrowserWindow;
  private eventNotifier: CapacitorBrowserView['PluginEventNotifier'];

  constructor(browserWindow: BrowserWindow, eventNotifier: CapacitorBrowserView['PluginEventNotifier']) {
    this.browserWindow = browserWindow;
    this.eventNotifier = eventNotifier;
  }

  public createBrowserView(options?: BrowserViewConstructorOptions): BrowserView {
    const enableBridge = options?.enableBridge ?? false;
    const browserViewOptions = {
      ...options,
      webPreferences: {
        ...options?.webPreferences,
        preload: enableBridge ? join(__dirname, 'bridge.js') : undefined,
      }
    };

    const uuid = randomUUID();

    const browserView = new WebView(browserViewOptions) as BrowserView;
    browserView.webContents.openDevTools({ mode: 'undocked' });

    browserView.uuid = uuid;

    let _currentHost: string;
    let _allowMultipleWindows = true;
    let _allowedNavigation: string[] = [];

    browserView.setAllowMultipleWindows = (allowMultipleWindows: boolean): void => {
      _allowMultipleWindows = allowMultipleWindows;
    };

    browserView.getAllowMultipleWindows = (): boolean => {
      return _allowMultipleWindows;
    };

    browserView.setAllowedNavigation = (allowedNavigation: string[]): void => {
      for (const regex in allowedNavigation) {
        try {
          new RegExp(regex);
        } catch {
          throw new Error('Syntax error in regular-expression pattern.');
        }
      }

      _allowedNavigation = allowedNavigation;
    };

    browserView.getAllowedNavigation = (): string[] => {
      return _allowedNavigation;
    };

    browserView.allowNavigation = (url: string): boolean | undefined => {
      const newHost: string = new URL(url).hostname;

      if (_currentHost == newHost) {
        return true;
      }

      for (const regex of _allowedNavigation) {
        const pattern = new RegExp(regex);
        const match = pattern.test(newHost);
        if (match) return true;
      }

      return false;
    };

    browserView.loadURL = (url: string): Promise<void> => {
      _currentHost = new URL(url).hostname;
      return browserView.webContents.loadURL(url);
    };

    // disable default Content-Security-Policy
    browserView.webContents.session.webRequest.onHeadersReceived((details, callback) => {
      callback({ responseHeaders: details.responseHeaders });
    });

    // fallback
    browserView.webContents.on('new-window', (event, url) => {
      event.preventDefault();

      if (_allowMultipleWindows) {
        this.eventNotifier.newWindow(uuid, url);
        shell.openExternal(url);
      } else {
        const allowNavigation = browserView.allowNavigation(url);

        if (!allowNavigation) {
          shell.openExternal(url);
        } else {
          browserView.webContents.loadURL(url);
        }

        this.eventNotifier.willNavigate(uuid, url);
      }
    });

    browserView.webContents.setWindowOpenHandler(details => {
      const url = details.url;

      if (_allowMultipleWindows) {
        this.eventNotifier.newWindow(uuid, url);
        shell.openExternal(url);
      } else {
        const allowNavigation = browserView.allowNavigation(url);

        if (!allowNavigation) {
          shell.openExternal(url);
        } else {
          browserView.webContents.loadURL(url);
        }

        this.eventNotifier.willNavigate(uuid, url);
      }

      return { action: 'deny' };
    });

    browserView.webContents.addListener('destroyed', () => {
      this.eventNotifier.closeWindow(uuid);
    });

    browserView.webContents.addListener('page-favicon-updated', (_, favicons) => {
      const url = new URL(favicons[0]);

      const get = url.protocol == 'https:' ? httpsGet : httpGet;
      get(url, response => {
        response.setEncoding('base64');
        let base64 = 'data:' + response.headers['content-type'] + ';base64,';
        response.on('data', data => (base64 += data));
        response.on('end', () => {
          this.eventNotifier.pageFaviconUpdated(uuid, base64);
        });
      });
    });

    browserView.webContents.addListener('page-title-updated', (_, title) => {
      this.eventNotifier.pageTitleUpdated(uuid, title);
    });

    browserView.webContents.addListener('enter-html-full-screen', () => {
      this.eventNotifier.enterHtmlFullScreen(uuid);
    });

    browserView.webContents.addListener('leave-html-full-screen', () => {
      this.eventNotifier.leaveHtmlFullScreen(uuid);
    });

    browserView.webContents.addListener('will-navigate', (event, url) => {
      const allowNavigation = browserView.allowNavigation(url);

      if (!allowNavigation) {
        event.preventDefault();
        shell.openExternal(url);
      }

      this.eventNotifier.willNavigate(uuid, url);
    });

    browserView.webContents.addListener('did-start-loading', () => {
      this.eventNotifier.didStartLoading(uuid);
    });

    browserView.webContents.addListener('did-finish-load', () => {
      this.eventNotifier.didFinishLoad(uuid);
    });

    browserView.webContents.addListener('did-fail-load', (_, errorCode, errorDescription, validatedURL) => {
      this.eventNotifier.didFailLoad(uuid, errorCode, errorDescription, validatedURL);
    });

    browserView.webContents.addListener('dom-ready', () => {
      this.eventNotifier.domReady(uuid);
    });

    browserView.webContents.addListener('did-frame-navigate', (_, url, httpResponseCode, httpStatusText) => {
      if (httpResponseCode >= 400) {
        this.eventNotifier.httpError(uuid, url, httpResponseCode, httpStatusText);
      }
    });

    browserView.webContents.addListener('render-process-gone', (_, details) => {
      const crashed = details.reason == 'crashed';
      this.eventNotifier.renderProcessGone(uuid, crashed);
    });

    browserView.webContents.addListener('unresponsive', () => {
      this.eventNotifier.unresponsive(uuid);
    });

    browserView.webContents.addListener('responsive', () => {
      this.eventNotifier.responsive(uuid);
    });

    if (enableBridge) {
      ipcMain.on('capacitorBrowserViewNativeBridgeChannel', (event, args) => {
        if (event.sender.id === browserView.webContents.id) {
          this.eventNotifier.channelReceive(uuid, args.eventName, args.data);
        }
      });
    }

    this.browserWindow.addBrowserView(browserView);
    this.browserViews.set(uuid, browserView);

    return browserView;
  }

  public getBrowserView(args: BrowserViewArgs<unknown>): BrowserView {
    const uuid = args.uuid;
    const browserView = this.browserViews.get(uuid);

    if (browserView === undefined) {
      throw new Error('Specified BrowserView does not exist.');
    }

    return browserView;
  }

  public destroyBrowserView(args: BrowserViewArgs<unknown>): void {
    const uuid = args.uuid;
    const browserView = this.getBrowserView(args);

    if (!uuid || browserView === undefined) return;

    this.browserViews.delete(uuid);
    this.browserWindow.removeBrowserView(browserView);

    // https://github.com/electron/electron/issues/10096
    (browserView.webContents as any).destroy();
  }

  public sendMessage(args: BrowserViewMessageArgs): void {
    const browserView = this.getBrowserView(args);
    const eventName = args.eventName;
    const data = args.args;

    if (browserView === undefined || !eventName || !data) return;

    const dispatchEventCode = `window.dispatchEvent(new CustomEvent('channel-${eventName}', { detail: '${JSON.stringify(data)}' }))`;
    browserView.webContents.executeJavaScript(dispatchEventCode);
  }
}
