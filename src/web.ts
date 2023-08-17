import type { CapacitorException } from '@capacitor/core';
import { WebPlugin } from '@capacitor/core';

import type {
  BoundsPayloadData,
  UrlPayloadData,
  TitlePayloadData,
  CanGoBackPayloadData,
  CanGoForwardPayloadData,
  UserAgentPayloadData,
  CodeExecuteResultData,
  AllowMultipleWindowsPayloadData,
  AllowedNavigationPayloadData
} from './definitions';
import type { BrowserViewUUID, CapacitorBrowserViewPlugin } from './implementation';

export class CapacitorBrowserViewWeb extends WebPlugin implements CapacitorBrowserViewPlugin {
  protected unavailableBrowserView(): CapacitorException {
    return this.unavailable('WebViews are not available in browser.');
  }

  create(): Promise<BrowserViewUUID> {
    throw this.unavailableBrowserView();
  }
  destroy(): Promise<void> {
    throw this.unavailableBrowserView();
  }
  setBounds(): Promise<void> {
    throw this.unavailableBrowserView();
  }
  getBounds(): Promise<BoundsPayloadData> {
    throw this.unavailableBrowserView();
  }
  setBackgroundColor(): Promise<void> {
    throw this.unavailableBrowserView();
  }
  loadUrl(): Promise<void> {
    throw this.unavailableBrowserView();
  }
  getUrl(): Promise<UrlPayloadData> {
    throw this.unavailableBrowserView();
  }
  getTitle(): Promise<TitlePayloadData> {
    throw this.unavailableBrowserView();
  }
  stop(): Promise<void> {
    throw this.unavailableBrowserView();
  }
  reload(): Promise<void> {
    throw this.unavailableBrowserView();
  }
  canGoBack(): Promise<CanGoBackPayloadData> {
    throw this.unavailableBrowserView();
  }
  canGoForward(): Promise<CanGoForwardPayloadData> {
    throw this.unavailableBrowserView();
  }
  clearHistory(): Promise<void> {
    throw this.unavailableBrowserView();
  }
  goBack(): Promise<void> {
    throw this.unavailableBrowserView();
  }
  goForward(): Promise<void> {
    throw this.unavailableBrowserView();
  }
  setUserAgent(): Promise<void> {
    throw this.unavailableBrowserView();
  }
  appendUserAgent(): Promise<void> {
    throw this.unavailableBrowserView();
  }
  getUserAgent(): Promise<UserAgentPayloadData> {
    throw this.unavailableBrowserView();
  }
  executeJavaScript(): Promise<CodeExecuteResultData> {
    throw this.unavailableBrowserView();
  }
  setAllowMultipleWindows(): Promise<void> {
    throw this.unavailableBrowserView();
  }
  getAllowMultipleWindows(): Promise<AllowMultipleWindowsPayloadData> {
    throw this.unavailableBrowserView();
  }
  setAllowedNavigation(): Promise<void> {
    throw this.unavailableBrowserView();
  }
  getAllowedNavigation(): Promise<AllowedNavigationPayloadData> {
    throw this.unavailableBrowserView();
  }
  sendMessage(): Promise<void> {
    throw this.unavailableBrowserView();
  }
}
