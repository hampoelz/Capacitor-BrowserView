import type { PluginListenerHandle } from '@capacitor/core';

import type {
  CreateOptions,
  BoundsArgs,
  BoundsResult,
  ColorArgs,
  UrlArgs,
  UrlResult,
  TitleResult,
  CanGoBackResult,
  CanGoForwardResult,
  UserAgentArgs,
  UserAgentResult,
  CodeExecuteArgs,
  CodeExecuteResult,
  AllowMultipleWindowsArgs,
  AllowMultipleWindowsResult,
  AllowedNavigationArgs,
  AllowedNavigationResult,
  MessageArgs,
  ListenerCallback,
  EmptyListenerCallback,
  UrlListenerCallback,
  IconListenerCallback,
  TitleListenerCallback,
  ErrorListenerCallback,
  ResponseListenerCallback,
  RenderProcessGoneListenerCallback,
  ChannelListenerCallback,
  ChannelEventName,
} from './definitions'
import type { BrowserViewListenerEvent, BrowserViewUUID } from './implementation';
import { CapacitorBrowserView  } from './implementation';

export interface BrowserViewInterface {
  create(options?: CreateOptions): Promise<BrowserView>;

  destroy(): void;

  // android:   WebView#setLayoutParams
  //            ViewGroup.MarginLayoutParams
  // electron:  browser-view#viewsetboundsbounds-experimental
  setBounds(args: BoundsArgs): void;

  // android:   WebView#getLayoutParams
  //            ViewGroup.MarginLayoutParams
  // electron:  browser-view#viewgetbounds-experimental
  getBounds(): Promise<BoundsResult>;

  // android:   WebView#setBackgroundColor
  // electron:  browser-view#viewsetbackgroundcolorcolor-experimental
  setBackgroundColor(args: ColorArgs): void;

  // android:   WebView#loadUrl
  // electron:  web-contents#contentsloadurlurl-options
  loadUrl(args: UrlArgs): void;

  // android:   WebView#getUrl
  // electron:  web-contents#contentsgeturl
  getUrl(): Promise<UrlResult>;

  // android:   WebView#getTitle
  // electron:  web-contents#contentsgettitle
  getTitle(): Promise<TitleResult>;

  // android:   WebView#stopLoading
  // electron:  web-contents#contentsstop
  stop(): void;

  // android:   WebView#reload
  // electron:  web-contents#contentsreload
  reload(): void;

  // android:   WebView#canGoBack
  // electron:  web-contents#contentscangoback
  canGoBack(): Promise<CanGoBackResult>

  // android:   WebView#canGoForward
  // electron:  web-contents#contentscangoforward
  canGoForward(): Promise<CanGoForwardResult>

  // android:   WebView#clearHistory
  // electron:  web-contents#contentsclearhistory
  clearHistory(): void;

  // android:   WebView#goBack
  // electron:  web-contents#contentsgoback
  goBack(): void;

  // android:   WebView#goForward
  // electron:  web-contents#contentsgoforward
  goForward(): void;

  // android:   WebSettings#setUserAgentString
  // electron:  web-contents#contentssetuseragentuseragent
  setUserAgent(args: UserAgentArgs): void;

  // android:   WebSettings#getUserAgentString
  //            WebSettings#setUserAgentString
  // electron:  web-contents#contentsgetuseragent
  //            web-contents#contentssetuseragentuseragent
  appendUserAgent(args: UserAgentArgs): void;

  // android:   WebSettings#getUserAgentString
  // electron:  web-contents#contentsgetuseragent
  getUserAgent(): Promise<UserAgentResult>;

  // android:   WebView#evaluateJavascript
  // electron:  web-contents#contentsexecutejavascriptcode-usergesture
  executeJavaScript(args: CodeExecuteArgs): Promise<CodeExecuteResult>;

  // android:   WebSettings#setSupportMultipleWindows
  // electron:  breaking-changes#removed-webcontents-new-window-event
  //            web-contents#contentssetwindowopenhandlerhandler
  setAllowMultipleWindows(args: AllowMultipleWindowsArgs): void;
  getAllowMultipleWindows(): Promise<AllowMultipleWindowsResult>;

  // android:   WebChromeClient#onCreateWindow
  //            WebViewClient#shouldOverrideUrlLoading
  // electron:  breaking-changes#removed-webcontents-new-window-event
  //            web-contents#contentssetwindowopenhandlerhandler
  //            web-contents#event-will-navigate
  setAllowedNavigation(args: AllowedNavigationArgs): void;
  getAllowedNavigation(): Promise<AllowedNavigationResult>;

  //
  sendMessage(args: MessageArgs): void;

  // android:   WebChromeClient#onCreateWindow
  // electron:  breaking-changes#removed-webcontents-new-window-event
  //            web-contents#contentssetwindowopenhandlerhandler
  addListener(
    eventName: 'new-window',
    listenerFunc: UrlListenerCallback
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  // android:   WebChromeClient#onCloseWindow
  // electron:  web-contents#event-destroyed
  addListener(
    eventName: 'close-window',
    listenerFunc: EmptyListenerCallback
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  // android:   WebChromeClient#onReceivedIcon
  // electron:  web-contents#event-page-favicon-updated
  addListener(
    eventName: 'page-favicon-updated',
    listenerFunc: IconListenerCallback
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  // android:   WebChromeClient#onReceivedTitle
  // electron:  web-contents#event-page-title-updated
  addListener(
    eventName: 'page-title-updated',
    listenerFunc: TitleListenerCallback
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  // android:   WebChromeClient#onShowCustomView
  //            requires min level 7
  // electron:  web-contents#event-enter-html-full-screen
  addListener(
    eventName: 'enter-html-full-screen',
    listenerFunc: EmptyListenerCallback
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  // android:   WebChromeClient#onHideCustomView
  //            requires min level 7
  // electron:  web-contents#event-leave-html-full-screen
  addListener(
    eventName: 'leave-html-full-screen',
    listenerFunc: EmptyListenerCallback
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  // android:   WebViewClient#shouldOverrideUrlLoading
  // electron:  web-contents#event-will-navigate
  addListener(
    eventName: 'will-navigate',
    listenerFunc: UrlListenerCallback
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  // android    WebViewClient#onPageStarted
  // electron:  web-contents#event-did-start-loading
  addListener(
    eventName: 'did-start-loading',
    listenerFunc: EmptyListenerCallback
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  // android:   WebViewClient#onPageFinished
  // electron:  web-contents#event-did-frame-finish-load
  addListener(
    eventName: 'did-frame-finish-load',
    listenerFunc: EmptyListenerCallback
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  // android:   WebViewClient#onPageFinished
  // electron:  web-contents#event-did-finish-load
  addListener(
    eventName: 'did-finish-load',
    listenerFunc: EmptyListenerCallback
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  // android:   WebViewClient#onReceivedError
  // electron:  web-contents#event-did-fail-load
  addListener(
    eventName: 'did-fail-load',
    listenerFunc: ErrorListenerCallback
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  // android:   WebViewClient#
  // !          requires min level 23
  // electron:  web-contents#event-dom-ready
  addListener(
    eventName: 'dom-ready',
    listenerFunc: EmptyListenerCallback
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  // android:   WebViewClient#onReceivedHttpError
  // !          requires min level 23
  // electron:  web-contents#event-did-navigate
  // !          using httpResponseCode
  addListener(
    eventName: 'http-error',
    listenerFunc: ResponseListenerCallback
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  // android:   WebViewClient#onRenderProcessGone
  // !          requires min level 26
  // electron:  web-contents#event-render-process-gone
  addListener(
    eventName: 'render-process-gone',
    listenerFunc: RenderProcessGoneListenerCallback
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  // android:   WebViewRenderProcessClient#onRenderProcessUnresponsive
  // !          requires min level 29
  // electron:  web-contents#event-unresponsive
  addListener(
    eventName: 'unresponsive',
    listenerFunc: EmptyListenerCallback
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  // android:   WebViewRenderProcessClient#onRenderProcessResponsive
  // !          requires min level 29
  // electron:  web-contents#event-responsive
  addListener(
    eventName: 'responsive',
    listenerFunc: EmptyListenerCallback
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  //
  addListener(
    eventName: ChannelEventName<string>,
    listenerFunc: ChannelListenerCallback
  ): Promise<PluginListenerHandle> & PluginListenerHandle;
}

export class BrowserView implements BrowserViewInterface {
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

  destroy(): void {
    CapacitorBrowserView.destroy(this.browserViewUUID);
  }

  setBounds(args: BoundsArgs): void {
    CapacitorBrowserView.setBounds({ ...this.browserViewUUID, ...args });
  }

  getBounds(): Promise<BoundsResult> {
    return CapacitorBrowserView.getBounds(this.browserViewUUID);
  }

  setBackgroundColor(args: ColorArgs): void {
    CapacitorBrowserView.setBackgroundColor({ ...this.browserViewUUID, ...args });
  }

  loadUrl(args: UrlArgs): void {
    CapacitorBrowserView.loadUrl({ ...this.browserViewUUID, ...args });
  }

  getUrl(): Promise<UrlResult> {
    return CapacitorBrowserView.getUrl(this.browserViewUUID);
  }

  getTitle(): Promise<TitleResult> {
    return CapacitorBrowserView.getTitle(this.browserViewUUID);
  }

  stop(): void {
    CapacitorBrowserView.stop(this.browserViewUUID);
  }

  reload(): void {
    CapacitorBrowserView.reload(this.browserViewUUID);
  }

  canGoBack(): Promise<CanGoBackResult> {
    return CapacitorBrowserView.canGoBack(this.browserViewUUID);
  }

  canGoForward(): Promise<CanGoForwardResult> {
    return CapacitorBrowserView.canGoForward(this.browserViewUUID);
  }

  clearHistory(): void {
    CapacitorBrowserView.clearHistory(this.browserViewUUID);
  }

  goBack(): void {
    CapacitorBrowserView.goBack(this.browserViewUUID);
  }

  goForward(): void {
    CapacitorBrowserView.goForward(this.browserViewUUID);
  }

  setUserAgent(args: UserAgentArgs): void {
    CapacitorBrowserView.setUserAgent({ ...this.browserViewUUID, ...args });
  }

  appendUserAgent(args: UserAgentArgs): void {
    CapacitorBrowserView.appendUserAgent({ ...this.browserViewUUID, ...args });
  }

  getUserAgent(): Promise<UserAgentResult> {
    return CapacitorBrowserView.getUserAgent(this.browserViewUUID);
  }

  executeJavaScript(args: CodeExecuteArgs): Promise<CodeExecuteResult> {
    return CapacitorBrowserView.executeJavaScript({ ...this.browserViewUUID, ...args });
  }

  setAllowMultipleWindows(args: AllowMultipleWindowsArgs): void {
    CapacitorBrowserView.setAllowMultipleWindows({ ...this.browserViewUUID, ...args });
  }

  getAllowMultipleWindows(): Promise<AllowMultipleWindowsResult> {
    return CapacitorBrowserView.getAllowMultipleWindows(this.browserViewUUID);
  }

  setAllowedNavigation(args: AllowedNavigationArgs): void {
    CapacitorBrowserView.setAllowedNavigation({ ...this.browserViewUUID, ...args });
  }

  getAllowedNavigation(): Promise<AllowedNavigationResult> {
    return CapacitorBrowserView.getAllowedNavigation(this.browserViewUUID);
  }

  sendMessage(args: MessageArgs): void {
    CapacitorBrowserView.sendMessage({ ...this.browserViewUUID, ...args });
  }

  addListener(
    eventName: 'new-window',
    listenerFunc: UrlListenerCallback
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  addListener(
    eventName: 'close-window',
    listenerFunc: EmptyListenerCallback
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  addListener(
    eventName: 'page-favicon-updated',
    listenerFunc: IconListenerCallback
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  addListener(
    eventName: 'page-title-updated',
    listenerFunc: TitleListenerCallback
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  addListener(
    eventName: 'enter-html-full-screen',
    listenerFunc: EmptyListenerCallback
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  addListener(
    eventName: 'leave-html-full-screen',
    listenerFunc: EmptyListenerCallback
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  addListener(
    eventName: 'will-navigate',
    listenerFunc: UrlListenerCallback
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  addListener(
    eventName: 'did-start-loading',
    listenerFunc: EmptyListenerCallback
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  addListener(
    eventName: 'did-frame-finish-load',
    listenerFunc: EmptyListenerCallback
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  addListener(
    eventName: 'did-finish-load',
    listenerFunc: EmptyListenerCallback
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  addListener(
    eventName: 'did-fail-load',
    listenerFunc: ErrorListenerCallback
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  addListener(
    eventName: 'dom-ready',
    listenerFunc: EmptyListenerCallback
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  addListener(
    eventName: 'http-error',
    listenerFunc: ResponseListenerCallback
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  addListener(
    eventName: 'render-process-gone',
    listenerFunc: RenderProcessGoneListenerCallback
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  addListener(
    eventName: 'unresponsive',
    listenerFunc: EmptyListenerCallback
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  addListener(
    eventName: 'responsive',
    listenerFunc: EmptyListenerCallback
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  addListener(
    eventName: ChannelEventName<string>,
    listenerFunc: ChannelListenerCallback
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  addListener(eventName: any, listenerFunc: ListenerCallback<any>): Promise<PluginListenerHandle> & PluginListenerHandle {
    return CapacitorBrowserView.addListener(eventName, (event: BrowserViewListenerEvent<unknown>) => {
      const { uuid, ...data } = event;
      if (this.browserViewUUID.uuid === uuid) {
        listenerFunc(data);
      }
    });
  }
}
