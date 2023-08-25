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
} from './definitions';
import type {
  BrowserViewCallbackData,
  BrowserViewUUID
} from './implementation';
import { CapacitorBrowserView } from './implementation';

export interface BrowserViewInterface {
  /**
   * Creates a new BrowserView with properties as set by the `options`.
   *
   * @since 1.0.0
   */
  create(options?: CreateOptions): Promise<BrowserView>;

  /**
   * Removes the BrowserView from you App and destroys its internal state.
   * No other methods may be called on this BrowserView after destroy.
   *
   * @since 1.0.0
   */
  destroy(): Promise<void>;

  /**
   * Resizes and moves the view to the supplied bounds relative to the window.
   *
   * @since 1.0.0
   */
  setBounds(args: BoundsPayloadData): Promise<void>;

  /**
   * Gets the bounds of the view relative to the window.
   *
   * @since 1.0.0
   */
  getBounds(): Promise<BoundsPayloadData>;

  /**
   * Sets the background color for this view.
   *
   * @since 1.0.0
   */
  setBackgroundColor(args: ColorPayloadData): Promise<void>;

  /**
   * Loads the given url in the view.
   * The url must contain the protocol prefix, e.g. the `https://`.
   *
   * @since 1.0.0
   */
  loadUrl(args: UrlPayloadData): Promise<void>;

  /**
   * Gets the url of the current page.
   * This is not always the same as the url passed to `BrowserView.addListener('will-navigate', callback)`
   * because although the load for that url has begun, the current page may not have changed.
   *
   * @since 1.0.0
   */
  getUrl(): Promise<UrlPayloadData>;

  /**
   * Gets the title of the current page.
   * This is the title of the current page until `BrowserView.addListener('page-title-updated', callback)` is called.
   *
   * @since 1.0.0
   */
  getTitle(): Promise<TitlePayloadData>;

  /**
   * Stops any pending navigation.
   *
   * @since 1.0.0
   */
  stop(): Promise<void>;

  /**
   * Reloads the current web page.
   *
   * @since 1.0.0
   */
  reload(): Promise<void>;

  /**
   * Gets whether the browser can go back to previous web page.
   *
   * @since 1.0.0
   */
  canGoBack(): Promise<CanGoBackPayloadData>;

  /**
   * Gets whether the browser can go forward to next web page.
   *
   * @since 1.0.0
   */
  canGoForward(): Promise<CanGoForwardPayloadData>;

  /**
   * Clears the internal back/forward navigation history list.
   *
   * @since 1.0.0
   */
  clearHistory(): Promise<void>;

  /**
   * Makes the browser go back a web page.
   *
   * @since 1.0.0
   */
  goBack(): Promise<void>;

  /**
   * Makes the browser go forward a web page.
   *
   * @since 1.0.0
   */
  goForward(): Promise<void>;

  /**
   * Overrides the user-agent string for this web page.
   * If the string empty, the system default value will be used.
   *
   * **Note:** Starting from Android KitKat (4.4), changing the user-agent while
   * loading a web page causes the BrowserView to initiate loading once again.
   *
   * @since 1.0.0
   */
  setUserAgent(args: UserAgentPayloadData): Promise<void>;

  /**
   * Appends the specified user-agent to the current user-agent string for this web page.
   *
   * **Note:** Starting from Android KitKat (4.4), changing the user-agent while
   * loading a web page causes the BrowserView to initiate loading once again.
   *
   * @since 1.0.0
   */
  appendUserAgent(args: UserAgentPayloadData): Promise<void>;

  /**
   * Gets the user-agent string for this web page.
   *
   * @since 1.0.0
   */
  getUserAgent(): Promise<UserAgentPayloadData>;

  /**
   * Asynchronously evaluates JavaScript in the context of the currently displayed page.
   * Returns a promise that resolves with the result of the executed code.
   *
   * @since 1.0.0
   */
  executeJavaScript(args: CodeExecutePayloadData): Promise<CodeExecuteResultData>;

  /**
   * Sets whether the BrowserView supports multiple windows.
   * If set to true, links that request a new tab or window _(e.g. by `window.open()`, a link with `target="_blank"`,
   * shift+clicking on a link, or submitting a form with `<form target="_blank">`.)_ open in the external browser
   * instead of the BrowserView.
   *
   * @since 1.0.0
   */
  setAllowMultipleWindows(args: AllowMultipleWindowsPayloadData): Promise<void>;

  /**
   * Gets whether the BrowserView supports multiple windows.
   *
   * @since 1.0.0
   */
  getAllowMultipleWindows(): Promise<AllowMultipleWindowsPayloadData>;

  /**
   * Sets regular expressions to which the BrowserView can navigate additional.
   *
   * By default, all external URLs are opened in the external browser (not
   * the BrowserView).
   *
   * @since 1.0.0
   */
  setAllowedNavigation(args: AllowedNavigationPayloadData): Promise<void>;

  /**
   * Gets the list of regular expressions that the BrowserView can additional navigate to.
   *
   * @since 1.0.0
   */
  getAllowedNavigation(): Promise<AllowedNavigationPayloadData>;

  /**
   * Sends a message to the current page in the BrowserView.
   *
   * **Note:** This method is only available if the bridge was enabled during the BrowserView creation or globally via the plugin configuration.
   *
   * @since 1.0.0
   */
  sendMessage(args: MessageChannelPayloadData): Promise<void>;

  /**
   * Calls `listenerFunc(data)` when the current page request a new tab or window, e.g. by `window.open()`,
   * a link with `target="_blank"`, shift+clicking on a link, or submitting a form with `<form target="_blank">`.
   *
   * Whether links should be opened in the external browser or in the BrowserView itself can be set with
   * the method `BrowserView.setAllowMultipleWindows()` or with the global option `allowMultipleWindows`.
   *
   * **Note:** When using the Electron platform, [`PluginListenerHandle.remove()`](#pluginlistenerhandle) does not work due to limitations.
   * Use [`removeListener(listenerFunc)`](#removelistener) instead.
   *
   * @since 1.0.0
   */
  addListener(
    eventName: 'new-window',
    listenerFunc: BrowserViewListenerCallback<UrlPayloadData>
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  /**
   * Calls `listenerFunc()` when the browser has stopped any loading in this window
   * and has removed any cross-scripting ability in javascript.
   *
   * The application's implementation of this callback should remove the specific BrowserView if this is not already done
   * and ensure that any URL or security indicator displayed is updated so that the user can tell that the page they were
   * interacting with has been closed.
   *
   * **Note:** When using the Electron platform, [`PluginListenerHandle.remove()`](#pluginlistenerhandle) does not work due to limitations.
   * Use [`removeListener(listenerFunc)`](#removelistener) instead.
   *
   * @since 1.0.0
   */
  addListener(
    eventName: 'close-window',
    listenerFunc: BrowserViewListenerCallback<EmptyPayloadData>
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  /**
   * Calls `listenerFunc(data)` when the current page receives a new favicon.
   *
   * **Note:** When using the Electron platform, [`PluginListenerHandle.remove()`](#pluginlistenerhandle) does not work due to limitations.
   * Use [`removeListener(listenerFunc)`](#removelistener) instead.
   *
   * @since 1.0.0
   */
  addListener(
    eventName: 'page-favicon-updated',
    listenerFunc: BrowserViewListenerCallback<IconPayloadData>
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  /**
   * Calls `listenerFunc(data)` when the document title changes.
   *
   * **Note:** When using the Electron platform, [`PluginListenerHandle.remove()`](#pluginlistenerhandle) does not work due to limitations.
   * Use [`removeListener(listenerFunc)`](#removelistener) instead.
   *
   * @since 1.0.0
   */
  addListener(
    eventName: 'page-title-updated',
    listenerFunc: BrowserViewListenerCallback<TitlePayloadData>
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  /**
   * Calls `listenerFunc()` when the window enters a full-screen state triggered by HTML API.
   *
   * **Note:** On Android this event requires API level 7 or higher to be fired.
   *
   * **Note:** When using the Electron platform, [`PluginListenerHandle.remove()`](#pluginlistenerhandle) does not work due to limitations.
   * Use [`removeListener(listenerFunc)`](#removelistener) instead.
   *
   * @since 1.0.0
   */
  addListener(
    eventName: 'enter-html-full-screen',
    listenerFunc: BrowserViewListenerCallback<EmptyPayloadData>
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  /**
   * Calls `listenerFunc()` when the window leaves a full-screen state triggered by HTML API.
   *
   * **Note:** On Android this event requires API level 7 or higher to be fired.
   *
   * **Note:** When using the Electron platform, [`PluginListenerHandle.remove()`](#pluginlistenerhandle) does not work due to limitations.
   * Use [`removeListener(listenerFunc)`](#removelistener) instead.
   *
   * @since 1.0.0
   */
  addListener(
    eventName: 'leave-html-full-screen',
    listenerFunc: BrowserViewListenerCallback<EmptyPayloadData>
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  /**
   * Calls `listenerFunc(data)` when a user or the page wants to start navigation on the main frame.
   * It can happen when the `window.location` object is changed or a user clicks a link in the page.
   *
   * This event will not emit when the navigation is started programmatically with APIs
   * like `BrowserView.loadUrl()` and `BrowserView.goBack()` or for POST requests.
   *
   * It is also not emitted for in-page navigations, such as clicking anchor links or
   * updating the `window.location.hash`.
   *
   * _On Android it may be called for subframes too._
   *
   * **Note:** When using the Electron platform, [`PluginListenerHandle.remove()`](#pluginlistenerhandle) does not work due to limitations.
   * Use [`removeListener(listenerFunc)`](#removelistener) instead.
   *
   * @since 1.0.0
   */
  addListener(
    eventName: 'will-navigate',
    listenerFunc: BrowserViewListenerCallback<UrlPayloadData>
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  /**
   * Calls `listenerFunc()` when the page has started loading.
   * Corresponds to the points in time when the spinner of the tab started spinning.
   *
   * On Android, this callback is called only once for each main frame load so a page with iframes or framesets will
   * call this only one time for the main frame. This also means that this callback will not be called when the contents of an
   * embedded frame changes.
   *
   * **Note:** When using the Electron platform, [`PluginListenerHandle.remove()`](#pluginlistenerhandle) does not work due to limitations.
   * Use [`removeListener(listenerFunc)`](#removelistener) instead.
   *
   * @since 1.0.0
   */
  addListener(
    eventName: 'did-start-loading',
    listenerFunc: BrowserViewListenerCallback<EmptyPayloadData>
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  /**
   * Calls `listenerFunc()` when the page has finished loading, i.e. the spinner of the tab has stopped spinning.
   * This does not guarantee that the next frame drawn by BrowserView will reflect the state of the DOM at this point.
   *
   * **Note:** When using the Electron platform, [`PluginListenerHandle.remove()`](#pluginlistenerhandle) does not work due to limitations.
   * Use [`removeListener(listenerFunc)`](#removelistener) instead.
   *
   * @since 1.0.0
   */
  addListener(
    eventName: 'did-finish-load',
    listenerFunc: BrowserViewListenerCallback<EmptyPayloadData>
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  /**
   * Calls `listenerFunc(data)` when the page failed to load. These errors usually indicate inability to connect to the server.
   *
   * On Android at API level 23 or higher, this event is fired for any resource (iframe, image, etc.), not just for the main page.
   *
   * The full list of error codes and their meaning is available [here](https://source.chromium.org/chromium/chromium/src/+/main:net/base/net_error_list.h).
   *
   * **Note:** When using the Electron platform, [`PluginListenerHandle.remove()`](#pluginlistenerhandle) does not work due to limitations.
   * Use [`removeListener(listenerFunc)`](#removelistener) instead.
   *
   * @since 1.0.0
   */
  addListener(
    eventName: 'did-fail-load',
    listenerFunc: BrowserViewListenerCallback<ErrorPayloadData>
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  /**
   * Calls `listenerFunc()` when the document in the top-level frame is loaded.
   *
   * This callback is called when the body of the HTTP response has started loading, is reflected in the DOM,
   * and will be visible in subsequent draws. This callback occurs early in the document loading process,
   * and as such you should expect that linked resources (for example, CSS and images) may not be available.
   *
   * **Note:** On Android this event requires API level 23 or higher to be fired.
   *
   * **Note:** When using the Electron platform, [`PluginListenerHandle.remove()`](#pluginlistenerhandle) does not work due to limitations.
   * Use [`removeListener(listenerFunc)`](#removelistener) instead.
   *
   * @since 1.0.0
   */
  addListener(
    eventName: 'dom-ready',
    listenerFunc: BrowserViewListenerCallback<EmptyPayloadData>
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  /**
   * Calls `listenerFunc(data)` when an HTTP error has been received from the server while loading a resource.
   * HTTP errors have status codes >= 400.
   *
   * This callback will be called for any resource (iframe, image, etc.), not just for the main page.
   *
   * **Note:** On Android this event requires API level 23 or higher to be fired.
   *
   * **Note:** When using the Electron platform, [`PluginListenerHandle.remove()`](#pluginlistenerhandle) does not work due to limitations.
   * Use [`removeListener(listenerFunc)`](#removelistener) instead.
   *
   * @since 1.0.0
   */
  addListener(
    eventName: 'http-error',
    listenerFunc: BrowserViewListenerCallback<ResponsePayloadData>
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  /**
   * Calls `listenerFunc(data)` when the renderer process unexpectedly disappears.
   * This is normally because it was crashed or killed.
   *
   * Multiple BrowserView instances may be associated with a single render process.
   * This callback will be called for each BrowserView that was affected.
   *
   * The application's implementation of this callback should only attempt to clean up the specific BrowserView,
   * and should not assume that other BrowserView instances are affected.
   *
   * The BrowserView can't be used, and should be removed from the application.
   *
   * To cause an render process crash for test purpose, the application can
   * call `BrowserView.loadUrl("chrome://crash")` on the BrowserView.
   * Note that multiple BrowserView instances may be affected if they share a render process,
   * not just the specific BrowserView which loaded `chrome://crash`.
   *
   * **Note:** On Android this event requires API level 26 or higher to be fired.
   *
   * **Note:** When using the Electron platform, [`PluginListenerHandle.remove()`](#pluginlistenerhandle) does not work due to limitations.
   * Use [`removeListener(listenerFunc)`](#removelistener) instead.
   *
   * @since 1.0.0
   */
  addListener(
    eventName: 'render-process-gone',
    listenerFunc: BrowserViewListenerCallback<RenderProcessGonePayloadData>
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  /**
   * Calls `listenerFunc()` when the renderer of the web page becomes unresponsive as a result
   * of a long running blocking task such as the execution of JavaScript.
   *
   * If a BrowserView fails to process an input event, or successfully navigate to a new URL within a reasonable time frame,
   * the renderer is considered to be unresponsive, and this callback will be called.
   *
   * **Note:** On Android this event requires API level 29 or higher to be fired.
   *
   * **Note:** When using the Electron platform, [`PluginListenerHandle.remove()`](#pluginlistenerhandle) does not work due to limitations.
   * Use [`removeListener(listenerFunc)`](#removelistener) instead.
   *
   * @since 1.0.0
   */
  addListener(
    eventName: 'unresponsive',
    listenerFunc: BrowserViewListenerCallback<EmptyPayloadData>
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  /**
   * Calls `listenerFunc()` when the unresponsive renderer of the web page becomes responsive.
   *
   * **Note:** On Android this event requires API level 29 or higher to be fired.
   *
   * **Note:** When using the Electron platform, [`PluginListenerHandle.remove()`](#pluginlistenerhandle) does not work due to limitations.
   * Use [`removeListener(listenerFunc)`](#removelistener) instead.
   *
   * @since 1.0.0
   */
  addListener(
    eventName: 'responsive',
    listenerFunc: BrowserViewListenerCallback<EmptyPayloadData>
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  /**
   * Listens to `eventName` and calls `listenerFunc(data)` when a new message arrives from the web page.
   *
   * **Note:** This listener is only available if the bridge was enabled during the BrowserView creation or globally via the plugin configuration.
   *
   * **Note:** When using the Electron platform, [`PluginListenerHandle.remove()`](#pluginlistenerhandle) does not work due to limitations.
   * Use [`removeListener(listenerFunc)`](#removelistener) instead.
   *
   * @since 1.0.0
   */
  addMessageListener(
    eventName: string,
    listenerFunc: BrowserViewListenerCallback<MessageChannelCallbackData>
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  /**
   * Removes the specified `listenerHandle` from the listener array for the event it refers to.
   *
   * @since 1.0.0
   */
  removeListener(listenerHandle: PluginListenerHandle): Promise<void>;

  /**
   * Removes all listeners, or those of the specified `eventName`, of the BrowserView.
   *
   * @since 1.0.0
   */
  removeAllListeners(eventName?: string): Promise<void>;
}

export class BrowserView implements BrowserViewInterface {
  private readonly listenerList: { eventName: string, listenerHandle: Promise<PluginListenerHandle> & PluginListenerHandle }[] = [];
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
    this.removeAllListeners();
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

    this.listenerList.push({ eventName, listenerHandle });
    return listenerHandle;
  }

  addMessageListener(eventName: string, listenerFunc: BrowserViewListenerCallback<MessageChannelCallbackData>): Promise<PluginListenerHandle> & PluginListenerHandle {
    return this.addListener(`channel-${eventName}`, listenerFunc);
  }

  async removeListener(listenerHandle: PluginListenerHandle): Promise<void> {
    if (Capacitor.getPlatform() === 'electron') {
      await (CapacitorBrowserView as any).removeListener(listenerHandle);
    } else {
      await listenerHandle.remove();
    }

    for (let index = 0; index < this.listenerList.length; index++) {
      const listener = this.listenerList[index];

      if (listenerHandle === (await listener.listenerHandle)) {
        this.listenerList.splice(index, 1);
        break;
      }
    }
  }

  async removeAllListeners(eventName?: string): Promise<void> {
    for (const listener of [...this.listenerList]) {
      if (!eventName || eventName === listener.eventName) {
        const listenerHandle = await listener.listenerHandle;
        await this.removeListener(listenerHandle);
      }
    }
  }
}
