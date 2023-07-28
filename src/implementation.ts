import type { PluginListenerHandle } from '@capacitor/core';
import { registerPlugin } from '@capacitor/core';

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
    UrlCallbackData,
    IconCallbackData,
    TitleCallbackData,
    ErrorCallbackData,
    ResponseCallbackData,
    RenderProcessGoneCallbackData,
    ChannelCallbackData,
    ChannelEventName,
} from './definitions';

export interface BrowserViewUUID {
    uuid: string;
}

export type BrowserViewArgs<T> = BrowserViewUUID & T;

// eslint-disable-next-line @typescript-eslint/ban-types
export type BrowserViewEmptyArgs = BrowserViewArgs<{}>;
export type BrowserViewBoundsArgs = BrowserViewArgs<BoundsArgs>;
export type BrowserViewColorArgs = BrowserViewArgs<ColorArgs>;
export type BrowserViewUrlArgs = BrowserViewArgs<UrlArgs>;
export type BrowserViewUserAgentArgs = BrowserViewArgs<UserAgentArgs>;
export type BrowserViewCodeExecuteArgs = BrowserViewArgs<CodeExecuteArgs>;
export type BrowserViewAllowMultipleWindowsArgs = BrowserViewArgs<AllowMultipleWindowsArgs>;
export type BrowserViewAllowedNavigationArgs = BrowserViewArgs<AllowedNavigationArgs>;
export type BrowserViewMessageArgs = BrowserViewArgs<MessageArgs>;

export type BrowserViewListener<T extends BrowserViewListenerEvent<any>> = (event: T) => void;

// eslint-disable-next-line @typescript-eslint/ban-types
export type BrowserViewEmptyListener = BrowserViewListener<{}>;
export type BrowserViewUrlListener = BrowserViewListener<BrowserViewUrlListenerEvent>;
export type BrowserViewIconListener = BrowserViewListener<BrowserViewIconListenerEvent>;
export type BrowserViewTitleListener = BrowserViewListener<BrowserViewTitleListenerEvent>;
export type BrowserViewErrorListener = BrowserViewListener<BrowserViewErrorListenerEvent>;
export type BrowserViewResponseListener = BrowserViewListener<BrowserViewResponseListenerEvent>;
export type BrowserViewRenderProcessGoneListener = BrowserViewListener<BrowserViewRenderProcessGoneListenerEvent>;
export type BrowserViewChannelListener = BrowserViewListener<BrowserViewChannelListenerEvent>;

export type BrowserViewListenerEvent<T> = BrowserViewUUID & T;

// eslint-disable-next-line @typescript-eslint/ban-types
export type BrowserViewEmptyListenerEvent = BrowserViewListenerEvent<{}>;
export type BrowserViewUrlListenerEvent = BrowserViewListenerEvent<UrlCallbackData>;
export type BrowserViewIconListenerEvent = BrowserViewListenerEvent<IconCallbackData>;
export type BrowserViewTitleListenerEvent = BrowserViewListenerEvent<TitleCallbackData>;
export type BrowserViewErrorListenerEvent = BrowserViewListenerEvent<ErrorCallbackData>;
export type BrowserViewResponseListenerEvent = BrowserViewListenerEvent<ResponseCallbackData>;
export type BrowserViewRenderProcessGoneListenerEvent = BrowserViewListenerEvent<RenderProcessGoneCallbackData>;
export type BrowserViewChannelListenerEvent = BrowserViewListenerEvent<ChannelCallbackData>;

export interface CapacitorBrowserViewPlugin {
    create(options?: CreateOptions | undefined): Promise<BrowserViewUUID>;
    destroy(args: BrowserViewEmptyArgs): void;
    setBounds(args: BrowserViewBoundsArgs): void;
    getBounds(args: BrowserViewEmptyArgs): Promise<BoundsResult>;
    setBackgroundColor(args: BrowserViewColorArgs): void;
    loadUrl(args: BrowserViewUrlArgs): void;
    getUrl(args: BrowserViewEmptyArgs): Promise<UrlResult>;
    getTitle(args: BrowserViewEmptyArgs): Promise<TitleResult>;
    stop(args: BrowserViewEmptyArgs): void;
    reload(args: BrowserViewEmptyArgs): void;
    canGoBack(args: BrowserViewEmptyArgs): Promise<CanGoBackResult>
    canGoForward(args: BrowserViewEmptyArgs): Promise<CanGoForwardResult>
    clearHistory(args: BrowserViewEmptyArgs): void;
    goBack(args: BrowserViewEmptyArgs): void;
    goForward(args: BrowserViewEmptyArgs): void;
    setUserAgent(args: BrowserViewUserAgentArgs): void;
    appendUserAgent(args: BrowserViewUserAgentArgs): void;
    getUserAgent(args: BrowserViewEmptyArgs): Promise<UserAgentResult>;
    executeJavaScript(args: BrowserViewCodeExecuteArgs): Promise<CodeExecuteResult>;
    setAllowMultipleWindows(args: BrowserViewAllowMultipleWindowsArgs): void;
    getAllowMultipleWindows(args: BrowserViewEmptyArgs): Promise<AllowMultipleWindowsResult>;
    setAllowedNavigation(args: BrowserViewAllowedNavigationArgs): void;
    getAllowedNavigation(args: BrowserViewEmptyArgs): Promise<AllowedNavigationResult>;
    sendMessage(args: BrowserViewMessageArgs): void;

    addListener(eventName: 'new-window', listenerFunc: BrowserViewUrlListener): Promise<PluginListenerHandle> & PluginListenerHandle;
    addListener(eventName: 'close-window', listenerFunc: BrowserViewEmptyListener): Promise<PluginListenerHandle> & PluginListenerHandle;
    addListener(eventName: 'page-favicon-updated', listenerFunc: BrowserViewIconListener): Promise<PluginListenerHandle> & PluginListenerHandle;
    addListener(eventName: 'page-title-updated', listenerFunc: BrowserViewTitleListener): Promise<PluginListenerHandle> & PluginListenerHandle;
    addListener(eventName: 'enter-html-full-screen', listenerFunc: BrowserViewEmptyListener): Promise<PluginListenerHandle> & PluginListenerHandle;
    addListener(eventName: 'leave-html-full-screen', listenerFunc: BrowserViewEmptyListener): Promise<PluginListenerHandle> & PluginListenerHandle;
    addListener(eventName: 'will-navigate', listenerFunc: BrowserViewUrlListener): Promise<PluginListenerHandle> & PluginListenerHandle;
    addListener(eventName: 'did-start-loading', listenerFunc: BrowserViewEmptyListener): Promise<PluginListenerHandle> & PluginListenerHandle;
    addListener(eventName: 'did-frame-finish-load', listenerFunc: BrowserViewEmptyListener): Promise<PluginListenerHandle> & PluginListenerHandle;
    addListener(eventName: 'did-finish-load', listenerFunc: BrowserViewEmptyListener): Promise<PluginListenerHandle> & PluginListenerHandle;
    addListener(eventName: 'did-fail-load', listenerFunc: BrowserViewErrorListener): Promise<PluginListenerHandle> & PluginListenerHandle;
    addListener(eventName: 'dom-ready', listenerFunc: BrowserViewEmptyListener): Promise<PluginListenerHandle> & PluginListenerHandle;
    addListener(eventName: 'http-error', listenerFunc: BrowserViewResponseListener): Promise<PluginListenerHandle> & PluginListenerHandle;
    addListener(eventName: 'render-process-gone', listenerFunc: BrowserViewRenderProcessGoneListener): Promise<PluginListenerHandle> & PluginListenerHandle;
    addListener(eventName: 'unresponsive', listenerFunc: BrowserViewEmptyListener): Promise<PluginListenerHandle> & PluginListenerHandle;
    addListener(eventName: 'responsive', listenerFunc: BrowserViewEmptyListener): Promise<PluginListenerHandle> & PluginListenerHandle;
    addListener(eventName: ChannelEventName<string>, listenerFunc: BrowserViewChannelListener): Promise<PluginListenerHandle> & PluginListenerHandle;
}

const CapacitorBrowserView = registerPlugin<CapacitorBrowserViewPlugin>('CapacitorBrowserView', {
    web: () => import('./web').then(m => new m.CapacitorBrowserViewWeb()),
});

export { CapacitorBrowserView }
