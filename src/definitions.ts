import type { PluginListenerHandle } from '@capacitor/core';

export type uint8 = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 60 | 61 | 62 | 63 | 64 | 65 | 66 | 67 | 68 | 69 | 70 | 71 | 72 | 73 | 74 | 75 | 76 | 77 | 78 | 79 | 80 | 81 | 82 | 83 | 84 | 85 | 86 | 87 | 88 | 89 | 90 | 91 | 92 | 93 | 94 | 95 | 96 | 97 | 98 | 99 | 100 | 101 | 102 | 103 | 104 | 105 | 106 | 107 | 108 | 109 | 110 | 111 | 112 | 113 | 114 | 115 | 116 | 117 | 118 | 119 | 120 | 121 | 122 | 123 | 124 | 125 | 126 | 127 | 128 | 129 | 130 | 131 | 132 | 133 | 134 | 135 | 136 | 137 | 138 | 139 | 140 | 141 | 142 | 143 | 144 | 145 | 146 | 147 | 148 | 149 | 150 | 151 | 152 | 153 | 154 | 155 | 156 | 157 | 158 | 159 | 160 | 161 | 162 | 163 | 164 | 165 | 166 | 167 | 168 | 169 | 170 | 171 | 172 | 173 | 174 | 175 | 176 | 177 | 178 | 179 | 180 | 181 | 182 | 183 | 184 | 185 | 186 | 187 | 188 | 189 | 190 | 191 | 192 | 193 | 194 | 195 | 196 | 197 | 198 | 199 | 200 | 201 | 202 | 203 | 204 | 205 | 206 | 207 | 208 | 209 | 210 | 211 | 212 | 213 | 214 | 215 | 216 | 217 | 218 | 219 | 220 | 221 | 222 | 223 | 224 | 225 | 226 | 227 | 228 | 229 | 230 | 231 | 232 | 233 | 234 | 235 | 236 | 237 | 238 | 239 | 240 | 241 | 242 | 243 | 244 | 245 | 246 | 247 | 248 | 249 | 250 | 251 | 252 | 253 | 254 | 255;
export type percent = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 60 | 61 | 62 | 63 | 64 | 65 | 66 | 67 | 68 | 69 | 70 | 71 | 72 | 73 | 74 | 75 | 76 | 77 | 78 | 79 | 80 | 81 | 82 | 83 | 84 | 85 | 86 | 87 | 88 | 89 | 90 | 91 | 92 | 93 | 94 | 95 | 96 | 97 | 98 | 99 | 100;

export type WebViewType = "WebView" | "CapacitorWebView";

export interface BrowserViewPlugin {
  createBrowserView(options?: { type: WebViewType}): Promise<BrowserView>;

  setAutoResize(browserView: BrowserView, options: AutoResizeOptions): void;
  setBounds(browserView: BrowserView, options: { bounds: Rectangle }): void;
  getBounds(browserView: BrowserView): Promise<{ value: Rectangle }>;
  setBackgroundColor(browserView: BrowserView, options: { color: RGBA }): void;

  // WebView#loadUrl(java.lang.String)
  loadURL(browserView: BrowserView, options: { url: string }): void;
  // WebView#getUrl()
  getURL(browserView: BrowserView): Promise<{ value: string }>;
  // WebView#getTitle()
  getTitle(browserView: BrowserView): Promise<{ value: string }>;
  // WebView#stopLoading()
  stop(browserView: BrowserView): void;
  // WebView#reload()
  reload(browserView: BrowserView): void;
  // WebView#canGoBack()
  canGoBack(browserView: BrowserView): Promise<{ value: boolean }>
  // WebView#canGoForward()
  canGoForward(browserView: BrowserView): Promise<{ value: boolean }>
  // WebView#clearHistory()
  clearHistory(browserView: BrowserView): void;
  // WebView#goBack()
  goBack(browserView: BrowserView): void;
  // WebView#goForward()
  goForward(browserView: BrowserView): void;
  // WebSettings#setUserAgentString(java.lang.String)
  setUserAgent(browserView: BrowserView, options: { userAgent: string }): void;
  // WebSettings#getUserAgentString()
  getUserAgent(browserView: BrowserView): Promise<{ value: string }>;
  // WebView#evaluateJavascript(java.lang.String, android.webkit.ValueCallback<java.lang.String>)
  executeJavaScript(browserView: BrowserView, options: { code: string }): Promise<any>;
  // WebView#setInitialScale(int)
  setZoomFactor(browserView: BrowserView, options: { factor: number }): void;

  // WebViewClient#onPageFinished(android.webkit.WebView, java.lang.String)
  addListener(
    eventName: 'did-finish-load',
    listenerFunc: FinishLoadListener,
  ): Promise<PluginListenerHandle> & PluginListenerHandle;
  addListener(
    eventName: 'did-stop-loading',
    listenerFunc: StopLoadingListener,
  ): Promise<PluginListenerHandle> & PluginListenerHandle;
  // WebViewClient#onReceivedError(android.webkit.WebView, android.webkit.WebResourceRequest, android.webkit.WebResourceError)
  addListener(
    eventName: 'did-fail-load',
    listenerFunc: FailLoadListener,
  ): Promise<PluginListenerHandle> & PluginListenerHandle;
  // WebViewClient#onPageStarted(android.webkit.WebView, java.lang.String, android.graphics.Bitmap)
  addListener(
    eventName: 'did-start-loading',
    listenerFunc: StartLoadingListener,
  ): Promise<PluginListenerHandle> & PluginListenerHandle;
  addListener(
    eventName: 'did-start-navigation',
    listenerFunc: StartNavigationListener,
  ): Promise<PluginListenerHandle> & PluginListenerHandle;
  // WebViewClient#onPageCommitVisible(android.webkit.WebView, java.lang.String)
  addListener(
    eventName: 'dom-ready',
    listenerFunc: DomReadyListener,
  ): Promise<PluginListenerHandle> & PluginListenerHandle;
  // WebViewClient#onLoadResource(android.webkit.WebView, java.lang.String)
  addListener(
    eventName: 'will-navigate',
    listenerFunc: WillNavigateListener,
  ): Promise<PluginListenerHandle> & PluginListenerHandle;
  // WebViewClient#onReceivedHttpError(android.webkit.WebView, android.webkit.WebResourceRequest, android.webkit.WebResourceResponse)
  // did-navigate
  addListener(
    eventName: 'http-error',
    listenerFunc: HttpErrorListener,
  ): Promise<PluginListenerHandle> & PluginListenerHandle;
  // WebViewRenderProcessClient#onRenderProcessUnresponsive(android.webkit.WebView, android.webkit.WebViewRenderProcess)
  addListener(
    eventName: 'unresponsive',
    listenerFunc: UnresponsiveListener,
  ): Promise<PluginListenerHandle> & PluginListenerHandle;
  // WebViewRenderProcessClient#onRenderProcessResponsive(android.webkit.WebView, android.webkit.WebViewRenderProcess)
  addListener(
    eventName: 'responsive',
    listenerFunc: ResponsiveListener,
  ): Promise<PluginListenerHandle> & PluginListenerHandle;
  // WebViewClient#onRenderProcessGone(android.webkit.WebView, android.webkit.RenderProcessGoneDetail)
  addListener(
    eventName: 'render-process-gone',
    listenerFunc: RenderProcessGoneListener,
  ): Promise<PluginListenerHandle> & PluginListenerHandle;
}

export interface BrowserView {
  uuid: string
}

export interface AutoResizeOptions {
  width: boolean;
  height: boolean;
  horizontal: boolean;
  vertical: boolean;
}

export interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface RGBA {
  red: uint8;
  green: uint8;
  blue: uint8;
  alpha: percent;
}

export type FinishLoadListener = (browserView: BrowserView, url: string) => void;
export type StopLoadingListener = (browserView: BrowserView) => void;
export type FailLoadListener = (browserView: BrowserView, error: WebResourceError) => void;
export type StartLoadingListener = (browserView: BrowserView) => void;
export type StartNavigationListener = (browserView: BrowserView, url: string) => void;
export type DomReadyListener = (browserView: BrowserView) => void;
export type WillNavigateListener = (browserView: BrowserView, url: string) => void;
export type HttpErrorListener = (browserView: BrowserView, url: string, errorResponse: WebResourceResponse) => void;
export type UnresponsiveListener = (browserView: BrowserView) => void;
export type ResponsiveListener = (browserView: BrowserView) => void;
export type RenderProcessGoneListener = (browserView: BrowserView, details: RenderProcessGoneDetail) => void;

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