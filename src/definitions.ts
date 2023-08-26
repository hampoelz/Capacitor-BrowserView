/// <reference types="@capacitor/cli" />

declare module '@capacitor/cli' {
  export interface PluginsConfig {
    /**
     * The following configurations are applied globally to all BrowserViews.
     * However, most of them can be overridden individually when a
     * BrowserView is created or changed later via methods.
     *
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
       * Open links that request a new tab or window _(e.g. by `window.open()`,
       * a link with `target="_blank"`, shift+clicking on a link, or submitting
       * a form with `<form target="_blank">`.)_ in the external browser instead
       * of the BrowserViews.
       *
       * @since 1.0.0
       * @default true
       * @example false
       */
      allowMultipleWindows?: boolean;

      /**
       * Set regular expressions to which the BrowserViews can navigate additional.
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
       * Enable a bridge between the Capacitor layer and the loaded web page.
       *
       * @since 1.0.0
       * @default false
       * @example true
       */
      enableBridge?: boolean;

      /**
       * Default user-agent for BrowserViews.
       *
       * @since 1.0.0
       * @example "Mozilla/5.0 (CapacitorJS) CapacitorApp/1.0"
       */
      overrideUserAgent?: string;

      /**
       * String to append to the original user-agent for BrowserViews.
       *
       * This is disregarded if `overrideUserAgent` is used.
       *
       * @since 1.0.0
       * @example "CapacitorApp/1.0"
       */
      appendUserAgent?: string;

      /**
       * Default background color for BrowserViews.
       *
       * @since 1.0.0
       * @example "#ffffff"
       */
      backgroundColor?: Color;

      /**
       * Default user-agent for BrowserViews on Android.
       *
       * Overrides global `overrideUserAgent` option.
       *
       * @since 1.0.0
       * @example "Mozilla/5.0 (Android) CapacitorApp/1.0"
       */
      androidOverrideUserAgent?: string;

      /**
       * String to append to the original user-agent for BrowserViews for Android.
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
       * Default background color for BrowserViews for Android.
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
       * is disabled by default for security. During development, this option may need to
       * be enabled to allow the BrowserViews to load files from different schemes.
       *
       * **This is not intended for use in production.**
       *
       * @since 1.0.0
       * @default false
       * @example false
       */
      androidAllowMixedContent?: boolean;

      /**
       * Default user-agent for BrowserViews on Electron.
       *
       * Overrides global `overrideUserAgent` option.
       *
       * @since 1.0.0
       * @example "Mozilla/5.0 (Electron) CapacitorApp/1.0"
       */
      electronOverrideUserAgent?: string;

      /**
       * String to append to the original user-agent for BrowserViews for Electron.
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
       * Default background color for BrowserViews for Electron.
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
       * is disabled by default for security. During development, this option may need to
       * be enabled to allow the BrowserViews to load files from different schemes.
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

/**
 * An interface containing the options used when creating a BrowserView.
 * They override the global plugin configurations for this specific BrowserView.
 */
export interface CreateOptions {
  /**
   * Initial URL that is loaded immediately after the BrowserView has been created.
   *
   * @since 1.0.0
   */
  url?: string;

  /**
   * Open links that request a new tab or window _(e.g. by `window.open()`,
   * a link with `target="_blank"`, shift+clicking on a link, or submitting
   * a form with `<form target="_blank">`.)_ in the external browser instead
   * of the BrowserViews.
   *
   * @since 1.0.0
   * @default true
   */
  allowMultipleWindows?: boolean;

  /**
   * Enable a bridge between the Capacitor layer and the loaded web page.
   *
   * @since 1.0.0
   * @default false
   */
  enableBridge?: boolean;

  /**
   * Default user-agent.
   *
   * @since 1.0.0
   */
  overrideUserAgent?: string;

  /**
   * String to append to the original user-agent.
   *
   * This is disregarded if `overrideUserAgent` is used.
   *
   * @since 1.0.0
   */
  appendUserAgent?: string;

  /**
   * Default background color.
   *
   * @since 1.0.0
   */
  backgroundColor?: Color;
}

/**
 * An empty interface that represents no data.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface EmptyPayloadData {}

export interface BoundsPayloadData {
  /**
   * @since 1.0.0
   */
  bounds: Rectangle;
}

export interface ColorPayloadData {
  /**
   * @since 1.0.0
   */
  color: Color;
}

export interface UrlPayloadData {
  /**
   * The URL of a web page.
   *
   * @since 1.0.0
   */
  url: string;
}

export interface IconPayloadData {
  /**
   * The favicon of a web page as base64 encoded string.
   *
   * @since 1.0.0
   */
  icon: string;
}

export interface TitlePayloadData {
  /**
   * The title of a web page.
   *
   * @since 1.0.0
   */
  title: string;
}

export interface CanGoBackPayloadData {
  /**
   * Whether the browser can go back to previous web page.
   *
   * @since 1.0.0
   */
  canGoBack: boolean;
}

export interface CanGoForwardPayloadData {
  /**
   * Whether the browser can go forward to next web page.
   *
   * @since 1.0.0
   */
  canGoForward: boolean;
}

export interface UserAgentPayloadData {
  /**
   * The BrowserView's user-agent string.
   *
   * @since 1.0.0
   */
  userAgent: string;
}

export interface CodeExecutePayloadData {
  /**
   * The JavaScript to execute.
   *
   * @since 1.0.0
   */
  code: string;
}

export interface CodeExecuteResultData {
  /**
   * The result of the execution (if any).
   *
   * @since 1.0.0
   */
  result: any;
}

export interface AllowMultipleWindowsPayloadData {
  /**
   * Whether the BrowserView supports multiple windows.
   *
   * If set to true, links that request a new tab or window _(e.g. by `window.open()`, a link with `target="_blank"`,
   * shift+clicking on a link, or submitting a form with `<form target="_blank">`.)_ open in the external browser
   * instead of the BrowserView.
   *
   * @since 1.0.0
   */
  allowMultipleWindows: boolean;
}

export interface AllowedNavigationPayloadData {
  /**
   * The list of regular expressions that the BrowserView can additional navigate to.
   *
   * @since 1.0.0
   */
  allowedNavigation: string[];
}

export interface ErrorPayloadData {
  /**
   * Information about the error occurred.
   *
   * @since 1.0.0
   */
  error: WebResourceError;
}

export interface ResponsePayloadData {
  /**
   * The URL that failed to load.
   *
   * @since 1.0.0
   */
  url: string;

  /**
   * Information about the error occurred.
   *
   * @since 1.0.0
   */
  errorResponse: WebResourceResponse;
}

export interface RenderProcessGonePayloadData {
  /**
   * The reason why the renderer process exited.
   *
   * @since 1.0.0
   */
  details: RenderProcessGoneDetail;
}

/**
 * The payload data to send a message to the web page via `eventName`,
 * along with arguments. Arguments will be serialized with JSON.
 */
export interface MessageChannelPayloadData {
  /**
   * The name of the event being send to.
   *
   * @since 1.0.0
   */
  eventName: string;

  /**
   * The array of arguments to send.
   *
   * @since 1.0.0
   */
  args: any[];
}

/**
 * The callback data object when a message from the web page arrives.
 */
export interface MessageChannelCallbackData {
  /**
   * The received array of arguments.
   *
   * @since 1.0.0
   */
  args: any[];
}

/**
 * The callback function to be called when events are emitted.
 */
export type BrowserViewListenerCallback<T> = (data: T) => void;

/**
 * An interface that holds two integer coordinates and two integer dimensions for a rectangle.
 * The coordinates are specified in terms of the upper-left corner of the rectangle.
 * The width and height are the dimensions of the rectangle.
 * These fields can be accessed directly.
 */
export interface Rectangle {
  /**
   * The x coordinate of the origin of the rectangle (must be an integer).
   *
   * @since 1.0.0
   */
  x: number;

  /**
   * The y coordinate of the origin of the rectangle (must be an integer).
   *
   * @since 1.0.0
   */
  y: number;

  /**
   * The width of the rectangle (must be an integer).
   *
   * @since 1.0.0
   */
  width: number;

  /**
   * The height of the rectangle (must be an integer).
   *
   * @since 1.0.0
   */
  height: number;
}

/**
 * An interface that encapsulates information about the error that occurred during loading of web resources.
 */
export interface WebResourceError {
  /**
   * The error code of the error.
   *
   * The full list of error codes and their meaning is available [here](https://source.chromium.org/chromium/chromium/src/+/main:net/base/net_error_list.h).
   *
   * @since 1.0.0
   */
  errorCode: number;

  /**
   * A string describing the error.
   * Descriptions are localized, and thus can be used for communicating the problem to the user.
   *
   * @since 1.0.0
   */
  errorDescription: string;

  /**
   * The URL that failed to load.
   *
   * @since 1.0.0
   */
  validatedURL: string;
}

/**
 * An interface that encapsulates a resource response about the error that occurred.
 */
export interface WebResourceResponse {
  /**
   * The status code of the error response.
   *
   * @since 1.0.0
   */
  httpResponseCode: number;

  /**
   * The description of the status code of the error response.
   *
   * @since 1.0.0
   */
  httpStatusText: string;
}

/**
 * An interface that encapsulates information about why the render process exited.
 * The application may use this to decide how to handle the situation.
 */
export interface RenderProcessGoneDetail {
  /**
   * Indicates whether the render process was observed to crash, or whether it was killed by the system.
   * If the render process was killed, this is most likely caused by the system being low on memory.
   *
   * @since 1.0.0
   */
  crashed: boolean;
}

/**
 * A string that represents a color.
 *
 * Supported formats are `#RRGGBB` and `#AARRGGBB`. The following names are also accepted: `red`, `blue`, `green`, `black`, `white`, `gray`,
 * `cyan`, `magenta`, `yellow`, `darkgray`, `lightgrey`, `aqua`, `fuchsia`, `lime`, `maroon`, `navy`, `olive`, `purple`, `silver`, and `teal`.
 */
export type Color =
  | `#${string}`
  | 'red'
  | 'blue'
  | 'green'
  | 'black'
  | 'white'
  | 'gray'
  | 'cyan'
  | 'magenta'
  | 'yellow'
  | 'darkgray'
  | 'lightgrey'
  | 'aqua'
  | 'fuchsia'
  | 'lime'
  | 'maroon'
  | 'navy'
  | 'olive'
  | 'purple'
  | 'silver'
  | 'teal';
