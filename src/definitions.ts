/// <reference types="@capacitor/cli" />

import type { PluginListenerHandle } from '@capacitor/core';

declare module '@capacitor/cli' {
  export interface PluginsConfig {
    /**
     * These config values are available:
     */
    BrowserView?: {
      /**
       * Default external URL loaded in BrowserViews.
       * 
       * @since 1.0.0
       */
      url?: string;

      /**
       * Open links that request a new tab or window _(`target="_blank"`)_
       * in the external browser instead of the BrowserViews.
       * 
       * @since 1.0.0
       * @default true
       */
      allowMultipleWindows?: boolean;

      /**
       * Set additional URLs the BrowserViews can navigate to.
       * 
       * By default, all external URLs are opened in the external browser (not
       * the BrowserView).
       * 
       * @since 1.0.0
       * @default []
       */
      allowNavigation?: string[];

      /**
       * TODO
       * 
       * @since 1.0.0
       * @default false
       */
      enableBridge?: boolean;

      /**
       * Default user agent for BrowserViews.
       *
       * @since 1.0.0
       */
      overrideUserAgent?: string;
      
      /**
       * String to append to the original user agent for BrowserViews.
       *
       * This is disregarded if `overrideUserAgent` is used.
       *
       * @since 1.0.0
       */
      appendUserAgent?: string;

      /**
       * Background color for BrowserViews.
       *
       * @since 1.0.0
       */
      backgroundColor?: string;

      android?: {
        /**
         * Default user agent for BrowserViews on Android.
         * 
         * Overrides global `overrideUserAgent` option.
         * 
         * @since 1.0.0
         */
        overrideUserAgent?: string;

        /**
         * String to append to the original user agent for BrowserViews for Android.
         * 
         * Overrides global `appendUserAgent` option.
         * 
         * This is disregarded if `overrideUserAgent` is used.
         * 
         * @since 1.0.0
         */
        appendUserAgent?: string;

        /**
         * Background color for BrowserViews for Android.
         * 
         * Overrides global `backgroundColor` option.
         * 
         * @since 1.0.0
         */
        backgroundColor?: string;

        /**
         * Enable mixed content in the BrowserViews for Android.
         * 
         * [Mixed content](https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content)
         * is disabled by default for security. During development, you may need to
         * enable it to allow the BrowserViews to load files from different schemes.
         * 
         * **This is not intended for use in production.**
         * 
         * @since 1.0.0
         * @default false
         */
        allowMixedContent?: boolean;
      };

      electron?: {
        /**
         * Default user agent for BrowserViews on Electron.
         * 
         * Overrides global `overrideUserAgent` option.
         * 
         * @since 1.0.0
         */
        overrideUserAgent?: string;

        /**
         * String to append to the original user agent for BrowserViews for Electron.
         * 
         * Overrides global `appendUserAgent` option.
         * 
         * This is disregarded if `overrideUserAgent` is used.
         * 
         * @since 1.0.0
         */
        appendUserAgent?: string;

        /**
         * Background color for BrowserViews for Electron.
         * 
         * Overrides global `backgroundColor` option.
         * 
         * @since 1.0.0
         */
        backgroundColor?: string;

        /**
         * Enable mixed content in the BrowserViews for Electron.
         * 
         * [Mixed content](https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content)
         * is disabled by default for security. During development, you may need to
         * enable it to allow the BrowserViews to load files from different schemes.
         * 
         * **This is not intended for use in production.**
         * 
         * @since 1.0.0
         * @default false
         */
        allowMixedContent?: boolean;
      };
    };
  }
}

export interface BrowserViewPlugin {
  createBrowserView(options?: CreateBrowserViewOptions): Promise<{ value: BrowserView }>;

  removeBrowserView(options: BrowserViewBoundsOptions): void;

  // android:   WebView#setLayoutParams
  //            ViewGroup.MarginLayoutParams
  // electron:  browser-view#viewsetboundsbounds-experimental
  setBounds(options: BrowserViewBoundsOptions): void;

  // android:   WebView#getLayoutParams
  //            ViewGroup.MarginLayoutParams
  // electron:  browser-view#viewgetbounds-experimental
  getBounds(options: BrowserViewOptions): Promise<{ value: Rectangle }>;

  // android:   WebView#setBackgroundColor
  // electron:  browser-view#viewsetbackgroundcolorcolor-experimental
  setBackgroundColor(options: BrowserViewColorOptions): void;

  // android:   WebView#loadUrl
  // electron:  web-contents#contentsloadurlurl-options
  loadURL(options: BrowserViewUrlOptions): void;

  // android:   WebView#getUrl
  // electron:  web-contents#contentsgeturl
  getURL(options: BrowserViewOptions): Promise<{ value: string }>;

  // android:   WebView#getTitle
  // electron:  web-contents#contentsgettitle
  getTitle(options: BrowserViewOptions): Promise<{ value: string }>;

  // android:   WebView#stopLoading
  // electron:  web-contents#contentsstop
  stop(options: BrowserViewOptions): void;

  // android:   WebView#reload
  // electron:  web-contents#contentsreload
  reload(options: BrowserViewOptions): void;

  // android:   WebView#canGoBack
  // electron:  web-contents#contentscangoback
  canGoBack(options: BrowserViewOptions): Promise<{ value: boolean }>

  // android:   WebView#canGoForward
  // electron:  web-contents#contentscangoforward
  canGoForward(options: BrowserViewOptions): Promise<{ value: boolean }>

  // android:   WebView#clearHistory
  // electron:  web-contents#contentsclearhistory
  clearHistory(options: BrowserViewOptions): void;

  // android:   WebView#goBack
  // electron:  web-contents#contentsgoback
  goBack(options: BrowserViewOptions): void;

  // android:   WebView#goForward
  // electron:  web-contents#contentsgoforward
  goForward(options: BrowserViewOptions): void;

  // android:   WebSettings#setUserAgentString
  // electron:  web-contents#contentssetuseragentuseragent
  setUserAgent(options: BrowserViewUserAgentOptions): void;

  // android:   WebSettings#getUserAgentString
  //            WebSettings#setUserAgentString
  // electron:  web-contents#contentsgetuseragent
  //            web-contents#contentssetuseragentuseragent
  appendUserAgent(options: BrowserViewUserAgentOptions): void;

  // android:   WebSettings#getUserAgentString
  // electron:  web-contents#contentsgetuseragent
  getUserAgent(options: BrowserViewOptions): Promise<{ value: string }>;

  // android:   WebView#evaluateJavascript
  // electron:  web-contents#contentsexecutejavascriptcode-usergesture
  executeJavaScript(options: BrowserViewExecuteOptions): void | Promise<{ value: string }>;

  // android:   WebSettings#setSupportMultipleWindows
  // electron:  breaking-changes#removed-webcontents-new-window-event
  //            web-contents#contentssetwindowopenhandlerhandler
  setAllowMultipleWindows(options: BrowserViewWindowOptions): void;
  getAllowMultipleWindows(options: BrowserViewOptions): Promise<{ value: boolean }>;

  // android:   WebChromeClient#onCreateWindow
  //            WebViewClient#shouldOverrideUrlLoading
  // electron:  breaking-changes#removed-webcontents-new-window-event
  //            web-contents#contentssetwindowopenhandlerhandler
  //            web-contents#event-will-navigate
  setAllowedNavigation(options: BrowserViewNavigationOptions): void;
  getAllowedNavigation(options: BrowserViewOptions): Promise<{ value: string[] }>;

  //
  sendMessage(options: BrowserViewMessageOptions): Promise<{ value: boolean }>;

  // android:   WebChromeClient#onCreateWindow
  // electron:  breaking-changes#removed-webcontents-new-window-event
  //            web-contents#contentssetwindowopenhandlerhandler
  addListener(
    eventName: 'new-window',
    listenerFunc: BrowserViewUrlListener
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  // android:   WebChromeClient#onCloseWindow
  // electron:  web-contents#event-destroyed
  addListener(
    eventName: 'close-window',
    listenerFunc: BrowserViewListener
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  // android:   WebChromeClient#onReceivedIcon
  // electron:  web-contents#event-page-favicon-updated
  addListener(
    eventName: 'page-favicon-updated',
    listenerFunc: BrowserViewIconListener
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  // android:   WebChromeClient#onReceivedTitle
  // electron:  web-contents#event-page-title-updated
  addListener(
    eventName: 'page-title-updated',
    listenerFunc: BrowserViewTitleListener
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  // android:   WebChromeClient#onShowCustomView
  //            requires min level 7
  // electron:  web-contents#event-enter-html-full-screen
  addListener(
    eventName: 'enter-html-full-screen',
    listenerFunc: BrowserViewListener
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  // android:   WebChromeClient#onHideCustomView
  //            requires min level 7
  // electron:  web-contents#event-leave-html-full-screen
  addListener(
    eventName: 'leave-html-full-screen',
    listenerFunc: BrowserViewListener
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  // android:   WebViewClient#shouldOverrideUrlLoading
  // electron:  web-contents#event-will-navigate
  addListener(
    eventName: 'will-navigate',
    listenerFunc: BrowserViewUrlListener
  ): Promise<PluginListenerHandle> & PluginListenerHandle;
  
  // android    WebViewClient#onPageStarted
  // electron:  web-contents#event-did-start-loading
  addListener(
    eventName: 'did-start-loading',
    listenerFunc: BrowserViewListener
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  // android:   WebViewClient#onPageFinished
  // electron:  web-contents#event-did-frame-finish-load
  addListener(
    eventName: 'did-frame-finish-load',
    listenerFunc: BrowserViewListener
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  // android:   WebViewClient#onPageFinished
  // electron:  web-contents#event-did-finish-load
  addListener(
    eventName: 'did-finish-load',
    listenerFunc: BrowserViewListener
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  // android:   WebViewClient#onReceivedError
  // electron:  web-contents#event-did-fail-load
  addListener(
    eventName: 'did-fail-load',
    listenerFunc: BrowserViewErrorListener
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  // android:   WebViewClient#
  // !          requires min level 23
  // electron:  web-contents#event-dom-ready
  addListener(
    eventName: 'dom-ready',
    listenerFunc: BrowserViewListener
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  // android:   WebViewClient#onReceivedHttpError
  // !          requires min level 23
  // electron:  web-contents#event-did-navigate
  // !          using httpResponseCode
  addListener(
    eventName: 'http-error',
    listenerFunc: BrowserViewResponseListener
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  // android:   WebViewClient#onRenderProcessGone
  // !          requires min level 26
  // electron:  web-contents#event-render-process-gone
  addListener(
    eventName: 'render-process-gone',
    listenerFunc: BrowserViewRenderProcessGoneListener
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  // android:   WebViewRenderProcessClient#onRenderProcessUnresponsive
  // !          requires min level 29
  // electron:  web-contents#event-unresponsive
  addListener(
    eventName: 'unresponsive',
    listenerFunc: BrowserViewListener
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  // android:   WebViewRenderProcessClient#onRenderProcessResponsive
  // !          requires min level 29
  // electron:  web-contents#event-responsive
  addListener(
    eventName: 'responsive',
    listenerFunc: BrowserViewListener
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  //
  addListener(
    eventName: ChannelEventName<string>,
    listenerFunc: BrowserViewChannelListener
  ): Promise<PluginListenerHandle> & PluginListenerHandle;
}

export interface BrowserView {
  uuid: string;
}

export interface CreateBrowserViewOptions {
  /**
   * @default false
   */
  enableBridge: boolean;
}

export interface BrowserViewOptions {
  browserView: BrowserView;
}

export interface BrowserViewBoundsOptions {
  browserView: BrowserView;
  bounds: Rectangle;
}

export interface BrowserViewColorOptions {
  browserView: BrowserView;
  color: string;
}

export interface BrowserViewUrlOptions {
  browserView: BrowserView;
  url: string;
}

export interface BrowserViewUserAgentOptions {
  browserView: BrowserView;
  userAgent: string;
}

export interface BrowserViewExecuteOptions {
  browserView: BrowserView;
  code: string;
}

export interface BrowserViewWindowOptions {
  browserView: BrowserView;
  /**
   * @default true
   */
  allowMultipleWindows: boolean;
}

export interface BrowserViewNavigationOptions {
  browserView: BrowserView;
  allowNavigation: string[];
}

export interface BrowserViewMessageOptions {
  browserView: BrowserView;
  eventName: ChannelEventName<string>;
  args: any[];
}

export interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}

export type ChannelEventName<TChannel extends string> = `channel-${TChannel}`;

export type BrowserViewListener = (event: BrowserViewListenerEvent) => void;
export type BrowserViewUrlListener = (event: BrowserViewUrlListenerEvent) => void;
export type BrowserViewIconListener = (event: BrowserViewIconListenerEvent) => void;
export type BrowserViewTitleListener = (event: BrowserViewTitleListenerEvent) => void;
export type BrowserViewErrorListener = (event: BrowserViewErrorListenerEvent) => void;
export type BrowserViewResponseListener = (event: BrowserViewResponseListenerEvent) => void;
export type BrowserViewRenderProcessGoneListener = (event: BrowserViewRenderProcessGoneListenerEvent) => void;
export type BrowserViewChannelListener = (event: BrowserViewChannelListenerEvent) => void;

export interface BrowserViewListenerEvent {
  browserView: BrowserView;
}

export interface BrowserViewUrlListenerEvent {
  browserView: BrowserView;
  url: string;
}

export interface BrowserViewIconListenerEvent {
  browserView: BrowserView;
  icon: Int8Array;
}

export interface BrowserViewTitleListenerEvent {
  browserView: BrowserView;
  title: string;
}

export interface BrowserViewErrorListenerEvent {
  browserView: BrowserView;
  error: WebResourceError;
}

export interface BrowserViewResponseListenerEvent {
  browserView: BrowserView;
  url: string;
  errorResponse: WebResourceResponse;
}

export interface BrowserViewRenderProcessGoneListenerEvent {
  browserView: BrowserView;
  details: RenderProcessGoneDetail;
}

export interface BrowserViewChannelListenerEvent {
  browserView: BrowserView;
  args: any[]
}

export interface WebResourceError {
  errorCode: number;
  errorDescription: string;
  validatedURL: string;
}

export interface WebResourceResponse {
  httpResponseCode: number;
  httpStatusText: string;
}

export interface RenderProcessGoneDetail {
  crashed: boolean;
}

export interface ChannelListenerEvent {
  args: any[];
}