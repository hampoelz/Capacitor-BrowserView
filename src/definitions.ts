/// <reference types="@capacitor/cli" />

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

export interface CreateOptions {
  url?: string;

  /**
   * @default true
   */
  allowMultipleWindows?: boolean;

  /**
   * @default false
   */
  enableBridge?: boolean;

  overrideUserAgent?: string;

  appendUserAgent?: string;
  
  backgroundColor?: string;
}

export interface BoundsArgs {
  bounds: Rectangle;
}

export interface ColorArgs {
  color: string;
}

export interface UrlArgs {
  url: string;
}

export interface UserAgentArgs {
  userAgent: string;
}

export interface CodeExecuteArgs {
  code: string;
}

export interface AllowMultipleWindowsArgs {
  allowMultipleWindows: boolean;
}

export interface AllowedNavigationArgs {
  allowedNavigation: string[];
}

export interface MessageArgs {
  eventName: ChannelEventName<string>;
  args: any[];
}

export interface BoundsResult {
  bounds: Rectangle
}

export interface UrlResult {
  url: string;
}

export interface TitleResult {
  title: string;
}

export interface CanGoBackResult {
  canGoBack: boolean;
}

export interface CanGoForwardResult {
  canGoForward: boolean;
}

export interface UserAgentResult {
  userAgent: string;
}

export interface CodeExecuteResult {
  result: any
}

export interface AllowMultipleWindowsResult {
  allowMultipleWindows: boolean;
}

export interface AllowedNavigationResult {
  allowedNavigation: string[]
}

export type ChannelEventName<TChannel extends string> = `channel-${TChannel}`;

export interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}

export type ListenerCallback<T> = (data: T) => void;

// eslint-disable-next-line @typescript-eslint/ban-types
export type EmptyListenerCallback = ListenerCallback<{}>
export type UrlListenerCallback = ListenerCallback<UrlCallbackData>;
export type IconListenerCallback = ListenerCallback<IconCallbackData>;
export type TitleListenerCallback = ListenerCallback<TitleCallbackData>;
export type ErrorListenerCallback = ListenerCallback<ErrorCallbackData>;
export type ResponseListenerCallback = ListenerCallback<ResponseCallbackData>;
export type RenderProcessGoneListenerCallback = ListenerCallback<RenderProcessGoneCallbackData>;
export type ChannelListenerCallback = ListenerCallback<ChannelCallbackData>;

export interface UrlCallbackData {
  url: string;
}

export interface IconCallbackData {
  icon: string;
}

export interface TitleCallbackData {
  title: string;
}

export interface ErrorCallbackData {
  error: WebResourceError;
}

export interface ResponseCallbackData {
  url: string;
  errorResponse: WebResourceResponse;
}

export interface RenderProcessGoneCallbackData {
  details: RenderProcessGoneDetail;
}

export interface ChannelCallbackData {
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
