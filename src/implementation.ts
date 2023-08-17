import type { PluginListenerHandle } from '@capacitor/core';
import { registerPlugin } from '@capacitor/core';

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

export interface BrowserViewUUID {
  uuid: string;
}

export type BrowserViewArgs<T> = BrowserViewUUID & T;

export type BrowserViewEmptyArgs = BrowserViewArgs<EmptyPayloadData>;
export type BrowserViewBoundsArgs = BrowserViewArgs<BoundsPayloadData>;
export type BrowserViewColorArgs = BrowserViewArgs<ColorPayloadData>;
export type BrowserViewUrlArgs = BrowserViewArgs<UrlPayloadData>;
export type BrowserViewUserAgentArgs = BrowserViewArgs<UserAgentPayloadData>;
export type BrowserViewCodeExecuteArgs = BrowserViewArgs<CodeExecutePayloadData>;
export type BrowserViewAllowMultipleWindowsArgs = BrowserViewArgs<AllowMultipleWindowsPayloadData>;
export type BrowserViewAllowedNavigationArgs = BrowserViewArgs<AllowedNavigationPayloadData>;
export type BrowserViewMessageArgs = BrowserViewArgs<MessageChannelPayloadData>;

export type BrowserViewCallbackData<T> = BrowserViewUUID & T;

export type BrowserViewEmptyCallbackData = BrowserViewCallbackData<EmptyPayloadData>;
export type BrowserViewUrlCallbackData = BrowserViewCallbackData<UrlPayloadData>;
export type BrowserViewIconCallbackData = BrowserViewCallbackData<IconPayloadData>;
export type BrowserViewTitleCallbackData = BrowserViewCallbackData<TitlePayloadData>;
export type BrowserViewErrorCallbackData = BrowserViewCallbackData<ErrorPayloadData>;
export type BrowserViewResponseCallbackData = BrowserViewCallbackData<ResponsePayloadData>;
export type BrowserViewRenderProcessGoneCallbackData = BrowserViewCallbackData<RenderProcessGonePayloadData>;
export type BrowserViewChannelCallbackData = BrowserViewCallbackData<MessageChannelCallbackData>;

export interface CapacitorBrowserViewPlugin {
  create(options?: CreateOptions | undefined): Promise<BrowserViewUUID>;
  destroy(args: BrowserViewEmptyArgs): Promise<void>;
  setBounds(args: BrowserViewBoundsArgs): Promise<void>;
  getBounds(args: BrowserViewEmptyArgs): Promise<BoundsPayloadData>;
  setBackgroundColor(args: BrowserViewColorArgs): Promise<void>;
  loadUrl(args: BrowserViewUrlArgs): Promise<void>;
  getUrl(args: BrowserViewEmptyArgs): Promise<UrlPayloadData>;
  getTitle(args: BrowserViewEmptyArgs): Promise<TitlePayloadData>;
  stop(args: BrowserViewEmptyArgs): Promise<void>;
  reload(args: BrowserViewEmptyArgs): Promise<void>;
  canGoBack(args: BrowserViewEmptyArgs): Promise<CanGoBackPayloadData>;
  canGoForward(args: BrowserViewEmptyArgs): Promise<CanGoForwardPayloadData>;
  clearHistory(args: BrowserViewEmptyArgs): Promise<void>;
  goBack(args: BrowserViewEmptyArgs): Promise<void>;
  goForward(args: BrowserViewEmptyArgs): Promise<void>;
  setUserAgent(args: BrowserViewUserAgentArgs): Promise<void>;
  appendUserAgent(args: BrowserViewUserAgentArgs): Promise<void>;
  getUserAgent(args: BrowserViewEmptyArgs): Promise<UserAgentPayloadData>;
  executeJavaScript(args: BrowserViewCodeExecuteArgs): Promise<CodeExecuteResultData>;
  setAllowMultipleWindows(args: BrowserViewAllowMultipleWindowsArgs): Promise<void>;
  getAllowMultipleWindows(args: BrowserViewEmptyArgs): Promise<AllowMultipleWindowsPayloadData>;
  setAllowedNavigation(args: BrowserViewAllowedNavigationArgs): Promise<void>;
  getAllowedNavigation(args: BrowserViewEmptyArgs): Promise<AllowedNavigationPayloadData>;
  sendMessage(args: BrowserViewMessageArgs): Promise<void>;

  addListener(eventName: 'new-window', listenerFunc: BrowserViewListenerCallback<BrowserViewUrlCallbackData>): Promise<PluginListenerHandle> & PluginListenerHandle;
  addListener(eventName: 'close-window', listenerFunc: BrowserViewListenerCallback<BrowserViewEmptyCallbackData>): Promise<PluginListenerHandle> & PluginListenerHandle;
  addListener(eventName: 'page-favicon-updated', listenerFunc: BrowserViewListenerCallback<BrowserViewIconCallbackData>): Promise<PluginListenerHandle> & PluginListenerHandle;
  addListener(eventName: 'page-title-updated', listenerFunc: BrowserViewListenerCallback<BrowserViewTitleCallbackData>): Promise<PluginListenerHandle> & PluginListenerHandle;
  addListener(eventName: 'enter-html-full-screen', listenerFunc: BrowserViewListenerCallback<BrowserViewEmptyCallbackData>): Promise<PluginListenerHandle> & PluginListenerHandle;
  addListener(eventName: 'leave-html-full-screen', listenerFunc: BrowserViewListenerCallback<BrowserViewEmptyCallbackData>): Promise<PluginListenerHandle> & PluginListenerHandle;
  addListener(eventName: 'will-navigate', listenerFunc: BrowserViewListenerCallback<BrowserViewUrlCallbackData>): Promise<PluginListenerHandle> & PluginListenerHandle;
  addListener(eventName: 'did-start-loading', listenerFunc: BrowserViewListenerCallback<BrowserViewEmptyCallbackData>): Promise<PluginListenerHandle> & PluginListenerHandle;
  addListener(eventName: 'did-frame-finish-load', listenerFunc: BrowserViewListenerCallback<BrowserViewEmptyCallbackData>): Promise<PluginListenerHandle> & PluginListenerHandle;
  addListener(eventName: 'did-finish-load', listenerFunc: BrowserViewListenerCallback<BrowserViewEmptyCallbackData>): Promise<PluginListenerHandle> & PluginListenerHandle;
  addListener(eventName: 'did-fail-load', listenerFunc: BrowserViewListenerCallback<BrowserViewErrorCallbackData>): Promise<PluginListenerHandle> & PluginListenerHandle;
  addListener(eventName: 'dom-ready', listenerFunc: BrowserViewListenerCallback<BrowserViewEmptyCallbackData>): Promise<PluginListenerHandle> & PluginListenerHandle;
  addListener(eventName: 'http-error', listenerFunc: BrowserViewListenerCallback<BrowserViewResponseCallbackData>): Promise<PluginListenerHandle> & PluginListenerHandle;
  addListener(eventName: 'render-process-gone', listenerFunc: BrowserViewListenerCallback<BrowserViewRenderProcessGoneCallbackData>): Promise<PluginListenerHandle> & PluginListenerHandle;
  addListener(eventName: 'unresponsive', listenerFunc: BrowserViewListenerCallback<BrowserViewEmptyCallbackData>): Promise<PluginListenerHandle> & PluginListenerHandle;
  addListener(eventName: 'responsive', listenerFunc: BrowserViewListenerCallback<BrowserViewEmptyCallbackData>): Promise<PluginListenerHandle> & PluginListenerHandle;
  addListener(eventName: `channel-${string}`, listenerFunc: BrowserViewListenerCallback<BrowserViewChannelCallbackData>): Promise<PluginListenerHandle> & PluginListenerHandle;

  removeAllListeners(): Promise<void>;
}

const CapacitorBrowserView = registerPlugin<CapacitorBrowserViewPlugin>('CapacitorBrowserView', {
  web: () => import('./web').then(m => new m.CapacitorBrowserViewWeb()),
  electron: () => (window as any).CapacitorCustomPlatform.plugins.CapacitorBrowserView
});

export { CapacitorBrowserView };
