import type { CapacitorException} from '@capacitor/core';
import { WebPlugin } from '@capacitor/core';

import type {
  BoundsResult,
  UrlResult,
  TitleResult,
  CanGoBackResult,
  CanGoForwardResult,
  UserAgentResult,
  CodeExecuteResult,
  AllowMultipleWindowsResult,
  AllowedNavigationResult
} from './definitions';
import type { BrowserViewUUID, CapacitorBrowserViewPlugin } from './implementation';

export class CapacitorBrowserViewWeb extends WebPlugin implements CapacitorBrowserViewPlugin {
  protected unavailableBrowserView(): CapacitorException {
    return this.unavailable('WebViews are not available in browser.');
  }

  create(): Promise<BrowserViewUUID> {
    throw this.unavailableBrowserView();
  }
  destroy(): void {
    throw this.unavailableBrowserView();
  }
  setBounds(): void {
    throw this.unavailableBrowserView();
  }
  getBounds(): Promise<BoundsResult> {
    throw this.unavailableBrowserView();
  }
  setBackgroundColor(): void {
    throw this.unavailableBrowserView();
  }
  loadUrl(): void {
    throw this.unavailableBrowserView();
  }
  getUrl(): Promise<UrlResult> {
    throw this.unavailableBrowserView();
  }
  getTitle(): Promise<TitleResult> {
    throw this.unavailableBrowserView();
  }
  stop(): void {
    throw this.unavailableBrowserView();
  }
  reload(): void {
    throw this.unavailableBrowserView();
  }
  canGoBack(): Promise<CanGoBackResult> {
    throw this.unavailableBrowserView();
  }
  canGoForward(): Promise<CanGoForwardResult> {
    throw this.unavailableBrowserView();
  }
  clearHistory(): void {
    throw this.unavailableBrowserView();
  }
  goBack(): void {
    throw this.unavailableBrowserView();
  }
  goForward(): void {
    throw this.unavailableBrowserView();
  }
  setUserAgent(): void {
    throw this.unavailableBrowserView();
  }
  appendUserAgent(): void {
    throw this.unavailableBrowserView();
  }
  getUserAgent(): Promise<UserAgentResult> {
    throw this.unavailableBrowserView();
  }
  executeJavaScript(): Promise<CodeExecuteResult> {
    throw this.unavailableBrowserView();
  }
  setAllowMultipleWindows(): void {
    throw this.unavailableBrowserView();
  }
  getAllowMultipleWindows(): Promise<AllowMultipleWindowsResult> {
    throw this.unavailableBrowserView();
  }
  setAllowedNavigation(): void {
    throw this.unavailableBrowserView();
  }
  getAllowedNavigation(): Promise<AllowedNavigationResult> {
    throw this.unavailableBrowserView();
  }
  sendMessage(): void {
    throw this.unavailableBrowserView();
  }
}
