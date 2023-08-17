import type { PluginListenerHandle } from '@capacitor/core';
import { Capacitor } from '@capacitor/core';

import type {
  CreateOptions,
  EmptyPayloadData,
  BoundsPayloadData,
  ColorPayloadData,
  UrlPayloadData,
  IconPayloadData,
  TitlePayloadData,
  CanGoBackPayloadData,
  CanGoForwardPayloadData,
  UserAgentPayloadData,
  CodeExecutePayloadData,
  CodeExecuteResultData,
  AllowMultipleWindowsPayloadData,
  AllowedNavigationPayloadData,
  ErrorPayloadData,
  ResponsePayloadData,
  RenderProcessGonePayloadData,
  MessageChannelPayloadData,
  MessageChannelCallbackData,
  BrowserViewListenerCallback
} from './definitions'
import type { BrowserViewCallbackData, BrowserViewUUID } from './implementation';
import { CapacitorBrowserView  } from './implementation';

export interface BrowserViewInterface {
  create(options?: CreateOptions): Promise<BrowserView>;

  destroy(): Promise<void>;

  setBounds(args: BoundsPayloadData): Promise<void>;

  getBounds(): Promise<BoundsPayloadData>;

  setBackgroundColor(args: ColorPayloadData): Promise<void>;

  loadUrl(args: UrlPayloadData): Promise<void>;

  getUrl(): Promise<UrlPayloadData>;

  getTitle(): Promise<TitlePayloadData>;

  stop(): Promise<void>;

  reload(): Promise<void>;

  canGoBack(): Promise<CanGoBackPayloadData>

  canGoForward(): Promise<CanGoForwardPayloadData>

  clearHistory(): Promise<void>;

  goBack(): Promise<void>;

  goForward(): Promise<void>;

  setUserAgent(args: UserAgentPayloadData): Promise<void>;

  appendUserAgent(args: UserAgentPayloadData): Promise<void>;

  getUserAgent(): Promise<UserAgentPayloadData>;

  executeJavaScript(args: CodeExecutePayloadData): Promise<CodeExecuteResultData>;

  setAllowMultipleWindows(args: AllowMultipleWindowsPayloadData): Promise<void>;
  
  getAllowMultipleWindows(): Promise<AllowMultipleWindowsPayloadData>;

  setAllowedNavigation(args: AllowedNavigationPayloadData): Promise<void>;
  
  getAllowedNavigation(): Promise<AllowedNavigationPayloadData>;

  sendMessage(args: MessageChannelPayloadData): Promise<void>;

  addListener(
    eventName: 'new-window',
    listenerFunc: BrowserViewListenerCallback<UrlPayloadData>
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  addListener(
    eventName: 'close-window',
    listenerFunc: BrowserViewListenerCallback<EmptyPayloadData>
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  addListener(
    eventName: 'page-favicon-updated',
    listenerFunc: BrowserViewListenerCallback<IconPayloadData>
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  addListener(
    eventName: 'page-title-updated',
    listenerFunc: BrowserViewListenerCallback<TitlePayloadData>
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  addListener(
    eventName: 'enter-html-full-screen',
    listenerFunc: BrowserViewListenerCallback<EmptyPayloadData>
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  addListener(
    eventName: 'leave-html-full-screen',
    listenerFunc: BrowserViewListenerCallback<EmptyPayloadData>
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  addListener(
    eventName: 'will-navigate',
    listenerFunc: BrowserViewListenerCallback<UrlPayloadData>
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  addListener(
    eventName: 'did-start-loading',
    listenerFunc: BrowserViewListenerCallback<EmptyPayloadData>
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  addListener(
    eventName: 'did-finish-load',
    listenerFunc: BrowserViewListenerCallback<EmptyPayloadData>
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  addListener(
    eventName: 'did-fail-load',
    listenerFunc: BrowserViewListenerCallback<ErrorPayloadData>
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  addListener(
    eventName: 'dom-ready',
    listenerFunc: BrowserViewListenerCallback<EmptyPayloadData>
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  addListener(
    eventName: 'http-error',
    listenerFunc: BrowserViewListenerCallback<ResponsePayloadData>
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  addListener(
    eventName: 'render-process-gone',
    listenerFunc: BrowserViewListenerCallback<RenderProcessGonePayloadData>
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  addListener(
    eventName: 'unresponsive',
    listenerFunc: BrowserViewListenerCallback<EmptyPayloadData>
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  addListener(
    eventName: 'responsive',
    listenerFunc: BrowserViewListenerCallback<EmptyPayloadData>
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  addMessageListener(
    eventName: string,
    listenerFunc: BrowserViewListenerCallback<MessageChannelCallbackData>
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  removeListener(
    listenerHandle: PluginListenerHandle
  ): Promise<void>;

  removeAllListeners(): Promise<void>;
}

export class BrowserView implements BrowserViewInterface {
  private readonly listenerHandleList: (Promise<PluginListenerHandle> & PluginListenerHandle)[] = [];
  private readonly browserViewUUID: BrowserViewUUID;

  constructor(browserViewUUID: BrowserViewUUID) {
    this.browserViewUUID = browserViewUUID;
  }

  static async create(options?: CreateOptions | undefined): Promise<BrowserView> {
    const browserViewUUID = await CapacitorBrowserView.create(options);
    return new BrowserView(browserViewUUID);
  }

  create(options?: CreateOptions | undefined): Promise<BrowserView> {
    return BrowserView.create(options);
  }

  destroy(): Promise<void> {
    return CapacitorBrowserView.destroy(this.browserViewUUID);
  }

  setBounds(args: BoundsPayloadData): Promise<void> {
    return CapacitorBrowserView.setBounds({ ...this.browserViewUUID, ...args });
  }

  getBounds(): Promise<BoundsPayloadData> {
    return CapacitorBrowserView.getBounds(this.browserViewUUID);
  }

  setBackgroundColor(args: ColorPayloadData): Promise<void> {
    return CapacitorBrowserView.setBackgroundColor({ ...this.browserViewUUID, ...args });
  }

  loadUrl(args: UrlPayloadData): Promise<void> {
    return CapacitorBrowserView.loadUrl({ ...this.browserViewUUID, ...args });
  }

  getUrl(): Promise<UrlPayloadData> {
    return CapacitorBrowserView.getUrl(this.browserViewUUID);
  }

  getTitle(): Promise<TitlePayloadData> {
    return CapacitorBrowserView.getTitle(this.browserViewUUID);
  }

  stop(): Promise<void> {
    return CapacitorBrowserView.stop(this.browserViewUUID);
  }

  reload(): Promise<void> {
    return CapacitorBrowserView.reload(this.browserViewUUID);
  }

  canGoBack(): Promise<CanGoBackPayloadData> {
    return CapacitorBrowserView.canGoBack(this.browserViewUUID);
  }

  canGoForward(): Promise<CanGoForwardPayloadData> {
    return CapacitorBrowserView.canGoForward(this.browserViewUUID);
  }

  clearHistory(): Promise<void> {
    return CapacitorBrowserView.clearHistory(this.browserViewUUID);
  }

  goBack(): Promise<void> {
    return CapacitorBrowserView.goBack(this.browserViewUUID);
  }

  goForward(): Promise<void> {
    return CapacitorBrowserView.goForward(this.browserViewUUID);
  }

  setUserAgent(args: UserAgentPayloadData): Promise<void> {
    return CapacitorBrowserView.setUserAgent({ ...this.browserViewUUID, ...args });
  }

  appendUserAgent(args: UserAgentPayloadData): Promise<void> {
    return CapacitorBrowserView.appendUserAgent({ ...this.browserViewUUID, ...args });
  }

  getUserAgent(): Promise<UserAgentPayloadData> {
    return CapacitorBrowserView.getUserAgent(this.browserViewUUID);
  }

  executeJavaScript(args: CodeExecutePayloadData): Promise<CodeExecuteResultData> {
    return CapacitorBrowserView.executeJavaScript({ ...this.browserViewUUID, ...args });
  }

  setAllowMultipleWindows(args: AllowMultipleWindowsPayloadData): Promise<void> {
    return CapacitorBrowserView.setAllowMultipleWindows({ ...this.browserViewUUID, ...args });
  }

  getAllowMultipleWindows(): Promise<AllowMultipleWindowsPayloadData> {
    return CapacitorBrowserView.getAllowMultipleWindows(this.browserViewUUID);
  }

  setAllowedNavigation(args: AllowedNavigationPayloadData): Promise<void> {
    return CapacitorBrowserView.setAllowedNavigation({ ...this.browserViewUUID, ...args });
  }

  getAllowedNavigation(): Promise<AllowedNavigationPayloadData> {
    return CapacitorBrowserView.getAllowedNavigation(this.browserViewUUID);
  }

  sendMessage(args: MessageChannelPayloadData): Promise<void> {
    return CapacitorBrowserView.sendMessage({ ...this.browserViewUUID, ...args });
  }

  addListener(
    eventName: 'new-window',
    listenerFunc: BrowserViewListenerCallback<UrlPayloadData>
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  addListener(
    eventName: 'close-window',
    listenerFunc: BrowserViewListenerCallback<EmptyPayloadData>
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  addListener(
    eventName: 'page-favicon-updated',
    listenerFunc: BrowserViewListenerCallback<IconPayloadData>
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  addListener(
    eventName: 'page-title-updated',
    listenerFunc: BrowserViewListenerCallback<TitlePayloadData>
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  addListener(
    eventName: 'enter-html-full-screen',
    listenerFunc: BrowserViewListenerCallback<EmptyPayloadData>
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  addListener(
    eventName: 'leave-html-full-screen',
    listenerFunc: BrowserViewListenerCallback<EmptyPayloadData>
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  addListener(
    eventName: 'will-navigate',
    listenerFunc: BrowserViewListenerCallback<UrlPayloadData>
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  addListener(
    eventName: 'did-start-loading',
    listenerFunc: BrowserViewListenerCallback<EmptyPayloadData>
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  addListener(
    eventName: 'did-frame-finish-load',
    listenerFunc: BrowserViewListenerCallback<EmptyPayloadData>
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  addListener(
    eventName: 'did-finish-load',
    listenerFunc: BrowserViewListenerCallback<EmptyPayloadData>
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  addListener(
    eventName: 'did-fail-load',
    listenerFunc: BrowserViewListenerCallback<ErrorPayloadData>
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  addListener(
    eventName: 'dom-ready',
    listenerFunc: BrowserViewListenerCallback<EmptyPayloadData>
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  addListener(
    eventName: 'http-error',
    listenerFunc: BrowserViewListenerCallback<ResponsePayloadData>
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  addListener(
    eventName: 'render-process-gone',
    listenerFunc: BrowserViewListenerCallback<RenderProcessGonePayloadData>
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  addListener(
    eventName: 'unresponsive',
    listenerFunc: BrowserViewListenerCallback<EmptyPayloadData>
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  addListener(
    eventName: 'responsive',
    listenerFunc: BrowserViewListenerCallback<EmptyPayloadData>
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  addListener(
    eventName: string,
    listenerFunc: BrowserViewListenerCallback<MessageChannelCallbackData>
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  addListener(eventName: any, listenerFunc: BrowserViewListenerCallback<any>): Promise<PluginListenerHandle> & PluginListenerHandle {
    const listenerHandle = CapacitorBrowserView.addListener(eventName, (event: BrowserViewCallbackData<unknown>) => {
      const { uuid, ...data } = event;
      if (this.browserViewUUID.uuid === uuid) {
        listenerFunc(data);
      }
    });

    this.listenerHandleList.push(listenerHandle);
    return listenerHandle;
  }

  addMessageListener(eventName: string, listenerFunc: BrowserViewListenerCallback<MessageChannelCallbackData>): Promise<PluginListenerHandle> & PluginListenerHandle {
    return this.addListener(`channel-${eventName}`, listenerFunc);
  }

  removeListener(listenerHandle: PluginListenerHandle): Promise<void> {
    if (Capacitor.getPlatform() === "electron") {
      return (CapacitorBrowserView as any).removeListener(listenerHandle);
    }

    return listenerHandle.remove();
  }

  async removeAllListeners(): Promise<void> {
    for (const listenerHandle of this.listenerHandleList) {
      this.removeListener(await listenerHandle);
    }
  }
}
