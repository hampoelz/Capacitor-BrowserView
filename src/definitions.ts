/// <reference types="@capacitor/cli" />

declare module '@capacitor/cli' {
  export interface PluginsConfig {
    /**
     * These config values are available:
     */
    CapacitorBrowserView?: {
      /**
       * Default external URL loaded in BrowserViews.
       * 
       * @since 1.0.0
       * @example "https://capacitorjs.com/"
       */
      url?: string;

      /**
       * Open links that request a new tab or window _(`target="_blank"`)_
       * in the external browser instead of the BrowserViews.
       * 
       * @since 1.0.0
       * @default true
       * @example false
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
       * @example [ "capacitorjs\.com", "ionic\.io\/blog\/.*capacitor.*" ]
       */
      allowNavigation?: string[];

      /**
       * TODO
       * 
       * @since 1.0.0
       * @default false
       * @example true
       */
      enableBridge?: boolean;

      /**
       * Default user agent for BrowserViews.
       *
       * @since 1.0.0
       * @example "Mozilla/5.0 (CapacitorJS) CapacitorApp/1.0"
       */
      overrideUserAgent?: string;
      
      /**
       * String to append to the original user agent for BrowserViews.
       *
       * This is disregarded if `overrideUserAgent` is used.
       *
       * @since 1.0.0
       * @example "CapacitorApp/1.0"
       */
      appendUserAgent?: string;

      /**
       * Background color for BrowserViews.
       *
       * @since 1.0.0
       * @example "#ffffff"
       */
      backgroundColor?: Color;

      /**
       * Default user agent for BrowserViews on Android.
       * 
       * Overrides global `overrideUserAgent` option.
       * 
       * @since 1.0.0
       * @example "Mozilla/5.0 (Android) CapacitorApp/1.0"
       */
      androidOverrideUserAgent?: string;

      /**
       * String to append to the original user agent for BrowserViews for Android.
       * 
       * Overrides global `appendUserAgent` option.
       * 
       * This is disregarded if `overrideUserAgent` is used.
       * 
       * @since 1.0.0
       * @example "CapacitorApp/1.0 (Android)"
       */
      androidAppendUserAgent?: string;

      /**
       * Background color for BrowserViews for Android.
       * 
       * Overrides global `backgroundColor` option.
       * 
       * @since 1.0.0
       * @example "#ffffff"
       */
      androidBackgroundColor?: Color;

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
       * @example false
       */
      androidAllowMixedContent?: boolean;

      /**
       * Default user agent for BrowserViews on Electron.
       * 
       * Overrides global `overrideUserAgent` option.
       * 
       * @since 1.0.0
       * @example "Mozilla/5.0 (Electron) CapacitorApp/1.0"
       */
      electronOverrideUserAgent?: string;

      /**
       * String to append to the original user agent for BrowserViews for Electron.
       * 
       * Overrides global `appendUserAgent` option.
       * 
       * This is disregarded if `overrideUserAgent` is used.
       * 
       * @since 1.0.0
       * @example "CapacitorApp/1.0 (Electron)"
       */
      electronAppendUserAgent?: string;

      /**
       * Background color for BrowserViews for Electron.
       * 
       * Overrides global `backgroundColor` option.
       * 
       * @since 1.0.0
       * @example "#ffffff"
       */
      electronBackgroundColor?: Color;

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
       * @example false
       */
      electronAllowMixedContent?: boolean;
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
  
  backgroundColor?: Color;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface EmptyPayloadData { }

export interface BoundsPayloadData {
  bounds: Rectangle;
}

export interface ColorPayloadData {
  color: Color;
}

export interface UrlPayloadData {
  url: string;
}

export interface IconPayloadData {
  icon: string;
}

export interface TitlePayloadData {
  title: string;
}

export interface CanGoBackPayloadData {
  canGoBack: boolean;
}

export interface CanGoForwardPayloadData {
  canGoForward: boolean;
}

export interface UserAgentPayloadData {
  userAgent: string;
}

export interface CodeExecutePayloadData {
  code: string;
}

export interface CodeExecuteResultData {
  result: any
}

export interface AllowMultipleWindowsPayloadData {
  allowMultipleWindows: boolean;
}

export interface AllowedNavigationPayloadData {
  allowedNavigation: string[];
}

export interface ErrorPayloadData {
  error: WebResourceError;
}

export interface ResponsePayloadData {
  url: string;
  errorResponse: WebResourceResponse;
}

export interface RenderProcessGonePayloadData {
  details: RenderProcessGoneDetail;
}

export interface MessageChannelPayloadData {
  eventName: string;

  args: any[];
}

export interface MessageChannelCallbackData {
  args: any[]
}

export type BrowserViewListenerCallback<T> = (data: T) => void;

export interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
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

export type Color = `#${string}` | 'red' | 'blue' | 'green' | 'black' | 'white' | 'gray' | 'cyan' | 'magenta' | 'yellow' | 'darkgray' | 'lightgrey' | 'aqua' | 'fuchsia' | 'lime' | 'maroon' | 'navy' | 'olive' | 'purple' | 'silver' | 'teal';