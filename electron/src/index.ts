import { app, BrowserWindow } from 'electron';
import { EventEmitter } from 'events';
import { existsSync } from 'fs';
import { join } from 'path';

import type {
  CreateOptions,
  BoundsPayloadData,
  UrlPayloadData,
  TitlePayloadData,
  CanGoBackPayloadData,
  CanGoForwardPayloadData,
  UserAgentPayloadData,
  CodeExecuteResultData,
  AllowMultipleWindowsPayloadData,
  AllowedNavigationPayloadData,
  WebResourceError,
  WebResourceResponse,
  RenderProcessGoneDetail
} from '../../src/definitions';
import type {
  BrowserViewUUID,
  BrowserViewEmptyArgs,
  BrowserViewBoundsArgs,
  BrowserViewColorArgs,
  BrowserViewUrlArgs,
  BrowserViewUserAgentArgs,
  BrowserViewCodeExecuteArgs,
  BrowserViewAllowMultipleWindowsArgs,
  BrowserViewAllowedNavigationArgs,
  BrowserViewMessageArgs,
  BrowserViewEmptyCallbackData,
  BrowserViewUrlCallbackData,
  BrowserViewIconCallbackData,
  BrowserViewTitleCallbackData,
  BrowserViewErrorCallbackData,
  BrowserViewResponseCallbackData,
  BrowserViewRenderProcessGoneCallbackData,
  BrowserViewChannelCallbackData
} from '../../src/implementation';

import { CapacitorBrowserViewImplementation } from './implementation';

class PluginSettings {
  url: string | undefined;
  allowMultipleWindows = true;
  allowNavigation: string[] | undefined;
  enableBridge = false;
  overrideUserAgent: string | undefined;
  appendUserAgent: string | undefined;
  backgroundColor: string | undefined;
  allowMixedContent = false;
}

export class CapacitorBrowserView extends EventEmitter {
  //private config?: Record<string, any>;
  private implementation: CapacitorBrowserViewImplementation;

  constructor(/*config?: Record<string, any>*/) {
    super();

    const browserWindow = BrowserWindow.getAllWindows()[0];

    //this.config = config;
    this.implementation = new CapacitorBrowserViewImplementation(browserWindow, this.PluginEventNotifier);
  }

  private async readPluginSettings(): Promise<PluginSettings> {
    //!-------------------------- workaround ---------------------------
    // the configuration exposed by the capacitor-community/electron platform
    // is always empty for some reason
    const configPathBase = join(app.getAppPath(), 'capacitor.config.');
    const configPathExt =
      existsSync(configPathBase + 'json') ? 'json' :
        existsSync(configPathBase + 'js') ? 'js' :
          existsSync(configPathBase + 'ts') ? 'ts' : undefined;
    const configPath = configPathBase + configPathExt;
    const configFile = await require(configPath);
    const capacitorConfig = configFile.default || configFile;
    const config = capacitorConfig?.plugins?.CapacitorBrowserView;
    //!-----------------------------------------------------------------

    const settings = new PluginSettings();
    settings.url = config?.url;
    settings.allowMultipleWindows = config?.allowMultipleWindows || settings.allowMultipleWindows;
    settings.allowNavigation = config?.allowNavigation;
    settings.enableBridge = config?.enableBridge || settings.enableBridge;
    settings.overrideUserAgent = config?.electronOverrideUserAgent || config?.overrideUserAgent;
    settings.appendUserAgent = config?.electronAppendUserAgent || config?.appendUserAgent;
    settings.backgroundColor = config?.electronBackgroundColor || config?.backgroundColor;
    settings.allowMixedContent = config?.electronAllowMixedContent || settings.allowMixedContent;

    return settings;
  }

  //#region PluginMethods
  //---------------------------------------------------------------------------------------

  async create(options?: CreateOptions | undefined): Promise<BrowserViewUUID> {
    const pluginSettings = await this.readPluginSettings();

    const url = options?.url || pluginSettings?.url;
    const allowMultipleWindows = options?.allowMultipleWindows || pluginSettings?.allowMultipleWindows;
    const enableBridge = options?.enableBridge || pluginSettings?.enableBridge;
    const overrideUserAgent = options?.overrideUserAgent || pluginSettings?.overrideUserAgent;
    const appendUserAgent = options?.appendUserAgent || pluginSettings?.appendUserAgent;
    const backgroundColor = options?.backgroundColor || pluginSettings?.backgroundColor;

    const browserView = this.implementation.createBrowserView({
      enableBridge,
      webPreferences: {
        allowRunningInsecureContent: pluginSettings?.allowMixedContent,
      }
    });

    if (overrideUserAgent == undefined && appendUserAgent !== undefined) {
      const defaultUserAgent = browserView.webContents.getUserAgent();
      browserView.webContents.setUserAgent(defaultUserAgent + ' ' + appendUserAgent);
    } else if (overrideUserAgent !== undefined) {
      browserView.webContents.setUserAgent(overrideUserAgent);
    }

    if (backgroundColor !== undefined) {
      browserView.setBackgroundColor(backgroundColor);
    }

    if (allowMultipleWindows !== undefined) {
      browserView.setAllowMultipleWindows(allowMultipleWindows);
    }

    if (pluginSettings?.allowNavigation !== undefined) {
      browserView.setAllowedNavigation(pluginSettings.allowNavigation);
    }

    if (url !== undefined) {
      browserView.loadURL(url);
    }

    return { uuid: browserView.uuid };
  }

  async destroy(args: BrowserViewEmptyArgs): Promise<void> {
    this.implementation.destroyBrowserView(args);
  }

  async setBounds(args: BrowserViewBoundsArgs): Promise<void> {
    const browserView = this.implementation.getBrowserView(args);

    const bounds = args.bounds;

    if (bounds === undefined) {
      throw new Error("Required parameter 'bounds' was not specified.");
    }

    const x = Math.floor(bounds.x);
    const y = Math.floor(bounds.y);
    const width = Math.floor(bounds.width);
    const height = Math.floor(bounds.height);

    if (x === undefined || x < 0 || y === undefined || y < 0 || width === undefined || width < 0 || height === undefined || height < 0) {
      throw new Error("One of the required parameters 'x', 'y', 'width' and/or 'height' was not specified or is invalid.");
    }

    browserView.setBounds({ x, y, width, height });
  }

  async getBounds(args: BrowserViewEmptyArgs): Promise<BoundsPayloadData> {
    const browserView = this.implementation.getBrowserView(args);
    const bounds = browserView.getBounds();

    if (!bounds) {
      throw new Error('Failed to get BrowserView bounds.');
    }

    return { bounds };
  }

  async setBackgroundColor(args: BrowserViewColorArgs): Promise<void> {
    const browserView = this.implementation.getBrowserView(args);

    const color = args.color;
    if (color === undefined) {
      throw new Error("Required parameter 'color' was not specified.");
    }

    browserView.setBackgroundColor(color);
  }

  async loadUrl(args: BrowserViewUrlArgs): Promise<void> {
    const browserView = this.implementation.getBrowserView(args);

    const url = args.url;
    if (url === undefined) {
      throw new Error("Required parameter 'url' was not specified.");
    }

    browserView.loadURL(url);
  }

  async getUrl(args: BrowserViewEmptyArgs): Promise<UrlPayloadData> {
    const browserView = this.implementation.getBrowserView(args);
    const url = browserView.webContents.getURL();
    return { url };
  }

  async getTitle(args: BrowserViewEmptyArgs): Promise<TitlePayloadData> {
    const browserView = this.implementation.getBrowserView(args);
    const title = browserView.webContents.getTitle();
    return { title };
  }

  async stop(args: BrowserViewEmptyArgs): Promise<void> {
    const browserView = this.implementation.getBrowserView(args);
    browserView.webContents.stop();
  }

  async reload(args: BrowserViewEmptyArgs): Promise<void> {
    const browserView = this.implementation.getBrowserView(args);
    browserView.webContents.reload();
  }

  async canGoBack(args: BrowserViewEmptyArgs): Promise<CanGoBackPayloadData> {
    const browserView = this.implementation.getBrowserView(args);
    const canGoBack = browserView.webContents.canGoBack();
    return { canGoBack };
  }

  async canGoForward(args: BrowserViewEmptyArgs): Promise<CanGoForwardPayloadData> {
    const browserView = this.implementation.getBrowserView(args);
    const canGoForward = browserView.webContents.canGoForward();
    return { canGoForward };
  }

  async clearHistory(args: BrowserViewEmptyArgs): Promise<void> {
    const browserView = this.implementation.getBrowserView(args);
    browserView.webContents.clearHistory();
  }

  async goBack(args: BrowserViewEmptyArgs): Promise<void> {
    const browserView = this.implementation.getBrowserView(args);
    browserView.webContents.goBack();
  }

  async goForward(args: BrowserViewEmptyArgs): Promise<void> {
    const browserView = this.implementation.getBrowserView(args);
    browserView.webContents.goForward();
  }

  async setUserAgent(args: BrowserViewUserAgentArgs): Promise<void> {
    const browserView = this.implementation.getBrowserView(args);

    const userAgent = args.userAgent;
    if (userAgent === undefined) {
      throw new Error("Required parameter 'userAgent' was not specified.");
    }

    browserView.webContents.setUserAgent(userAgent);
  }

  async appendUserAgent(args: BrowserViewUserAgentArgs): Promise<void> {
    const browserView = this.implementation.getBrowserView(args);

    const userAgent = args.userAgent;
    if (userAgent === undefined) {
      throw new Error("Required parameter 'userAgent' was not specified.");
    }

    const defaultUserAgent = browserView.webContents.getUserAgent();
    browserView.webContents.setUserAgent(defaultUserAgent + ' ' + userAgent);
  }

  async getUserAgent(args: BrowserViewEmptyArgs): Promise<UserAgentPayloadData> {
    const browserView = this.implementation.getBrowserView(args);
    const userAgent = browserView.webContents.getUserAgent();
    return { userAgent };
  }

  async executeJavaScript(args: BrowserViewCodeExecuteArgs): Promise<CodeExecuteResultData> {
    const browserView = this.implementation.getBrowserView(args);

    const code = args.code;
    if (code === undefined) {
      throw new Error("Required parameter 'code' was not specified.");
    }

    const result = await browserView.webContents.executeJavaScript(code, true);
    return { result };
  }

  async setAllowMultipleWindows(args: BrowserViewAllowMultipleWindowsArgs): Promise<void> {
    const browserView = this.implementation.getBrowserView(args);

    const allowMultipleWindows = true === args.allowMultipleWindows;

    browserView.setAllowMultipleWindows(allowMultipleWindows);
  }

  async getAllowMultipleWindows(args: BrowserViewEmptyArgs): Promise<AllowMultipleWindowsPayloadData> {
    const browserView = this.implementation.getBrowserView(args);

    const allowMultipleWindows = browserView.getAllowMultipleWindows();

    return { allowMultipleWindows };
  }

  async setAllowedNavigation(args: BrowserViewAllowedNavigationArgs): Promise<void> {
    const browserView = this.implementation.getBrowserView(args);

    const allowedNavigation = args.allowedNavigation;
    if (allowedNavigation === undefined) {
      throw new Error("Required parameter 'allowedNavigation' was not specified.");
    }

    browserView.setAllowedNavigation(allowedNavigation);
  }

  async getAllowedNavigation(args: BrowserViewEmptyArgs): Promise<AllowedNavigationPayloadData> {
    const browserView = this.implementation.getBrowserView(args);
    const allowedNavigation = browserView.getAllowedNavigation();
    return { allowedNavigation };
  }

  async sendMessage(args: BrowserViewMessageArgs): Promise<void> {
    const eventName = args.eventName;
    if (eventName === undefined) {
      throw new Error("Required parameter 'eventName' was not specified.");
    }

    if (args.args === undefined) {
      args.args = [];
    }

    this.implementation.sendMessage(args);
  }

  // removeAllListeners() method is missing (https://github.com/capacitor-community/electron/pull/185)

  //---------------------------------------------------------------------------------------
  //#endregion

  //#region PluginEvents
  //---------------------------------------------------------------------------------------

  protected PluginEventNotifier = {
    newWindow: (uuid: string, url: string): void => {
      this.notifyBrowserViewUrlListeners('new-window', uuid, url);
    },

    closeWindow: (uuid: string): void => {
      this.notifyBrowserViewListeners('close-window', uuid);
    },

    pageFaviconUpdated: (uuid: string, base64: string): void => {
      this.notifyBrowserViewIconListeners('page-favicon-updated', uuid, base64);
    },

    pageTitleUpdated: (uuid: string, title: string): void => {
      this.notifyBrowserViewTitleListeners('page-title-updated', uuid, title);
    },

    enterHtmlFullScreen: (uuid: string): void => {
      this.notifyBrowserViewListeners('enter-html-full-screen', uuid);
    },

    leaveHtmlFullScreen: (uuid: string): void => {
      this.notifyBrowserViewListeners('leave-html-full-screen', uuid);
    },

    willNavigate: (uuid: string, url: string): void => {
      this.notifyBrowserViewUrlListeners('will-navigate', uuid, url);
    },

    didStartLoading: (uuid: string): void => {
      this.notifyBrowserViewListeners('did-start-loading', uuid);
    },

    didFinishLoad: (uuid: string): void => {
      this.notifyBrowserViewListeners('did-finish-load', uuid);
    },

    didFailLoad: (uuid: string, errorCode: number, errorDescription: string, validatedURL: string): void => {
      this.notifyBrowserViewErrorListeners('did-fail-load', uuid, errorCode, errorDescription, validatedURL);
    },

    domReady: (uuid: string): void => {
      this.notifyBrowserViewListeners('dom-ready', uuid);
    },

    httpError: (uuid: string, url: string, httpResponseCode: number, httpStatusText: string): void => {
      this.notifyBrowserViewResponseListeners('http-error', uuid, url, httpResponseCode, httpStatusText);
    },

    renderProcessGone: (uuid: string, crashed: boolean): void => {
      this.notifyBrowserViewRenderProcessGoneListeners('render-process-gone', uuid, crashed);
    },

    unresponsive: (uuid: string): void => {
      this.notifyBrowserViewListeners('unresponsive', uuid);
    },

    responsive: (uuid: string): void => {
      this.notifyBrowserViewListeners('responsive', uuid);
    },

    // Bridge -------------------------------------------------------------------------------

    channelReceive: (uuid: string, eventName: string, data: string): void => {
      // Deserialize data
      let payloadArray = [];
      try {
        payloadArray = JSON.parse(data);
        if (!Array.isArray(payloadArray)) {
          payloadArray = [payloadArray];
        }
      } catch {
        payloadArray = [data];
      }

      this.notifyBrowserViewChannelListeners(`channel-${eventName}`, uuid, payloadArray);
    }
  }

  //---------------------------------------------------------------------------------------
  //#endregion

  //#region PluginListeners
  //---------------------------------------------------------------------------------------

  private notifyBrowserViewListeners(eventName: string, uuid: string): void {
    const args: BrowserViewEmptyCallbackData = { uuid };
    this.emit(eventName, args);
  }

  private notifyBrowserViewUrlListeners(eventName: string, uuid: string, url: string): void {
    const args: BrowserViewUrlCallbackData = { uuid, url };
    this.emit(eventName, args);
  }

  private notifyBrowserViewIconListeners(eventName: string, uuid: string, icon: string): void {
    const args: BrowserViewIconCallbackData = { uuid, icon };
    this.emit(eventName, args);
  }

  private notifyBrowserViewTitleListeners(eventName: string, uuid: string, title: string): void {
    const args: BrowserViewTitleCallbackData = { uuid, title };
    this.emit(eventName, args);
  }

  private notifyBrowserViewErrorListeners(eventName: string, uuid: string, errorCode: number, errorDescription: string, validatedURL: string): void {
    const error: WebResourceError = { errorCode, errorDescription, validatedURL };
    const args: BrowserViewErrorCallbackData = { uuid, error };
    this.emit(eventName, args);
  }

  private notifyBrowserViewResponseListeners(eventName: string, uuid: string, url: string, httpResponseCode: number, httpStatusText: string): void {
    const errorResponse: WebResourceResponse = { httpResponseCode, httpStatusText };
    const args: BrowserViewResponseCallbackData = { uuid, url, errorResponse };
    this.emit(eventName, args);
  }

  private notifyBrowserViewRenderProcessGoneListeners(eventName: string, uuid: string, crashed: boolean): void {
    const details: RenderProcessGoneDetail = { crashed };
    const args: BrowserViewRenderProcessGoneCallbackData = { uuid, details };
    this.emit(eventName, args);
  }

  private notifyBrowserViewChannelListeners(eventName: string, uuid: string, payloadArray: any[]): void {
    const args: BrowserViewChannelCallbackData = { uuid, args: payloadArray };
    this.emit(eventName, args);
  }

  //---------------------------------------------------------------------------------------
  //#endregion
}
