import type { CapacitorException} from '@capacitor/core';
import { WebPlugin } from '@capacitor/core';

import type { BrowserView, BrowserViewPlugin, Rectangle } from './definitions';

export class BrowserViewWeb extends WebPlugin implements BrowserViewPlugin {
  protected unavailableBrowserView(): CapacitorException {
    return this.unavailable('WebViews are not available in browser.');
  }
  createBrowserView(): Promise<{ value: BrowserView; }> {
    throw this.unavailableBrowserView();
  }
  removeBrowserView(): void {
    throw this.unavailableBrowserView();
  }
  setBounds(): void {
    throw this.unavailableBrowserView();
  }
  getBounds(): Promise<{ value: Rectangle; }> {
    throw this.unavailableBrowserView();
  }
  setBackgroundColor(): void {
    throw this.unavailableBrowserView();
  }
  loadURL(): void {
    throw this.unavailableBrowserView();
  }
  getURL(): Promise<{ value: string; }> {
    throw this.unavailableBrowserView();
  }
  getTitle(): Promise<{ value: string; }> {
    throw this.unavailableBrowserView();
  }
  stop(): void {
    throw this.unavailableBrowserView();
  }
  reload(): void {
    throw this.unavailableBrowserView();
  }
  canGoBack(): Promise<{ value: boolean; }> {
    throw this.unavailableBrowserView();
  }
  canGoForward(): Promise<{ value: boolean; }> {
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
  getUserAgent(): Promise<{ value: string; }> {
    throw this.unavailableBrowserView();
  }
  executeJavaScript(): Promise<any> {
    throw this.unavailableBrowserView();
  }
  setAllowMultipleWindows(): void {
    throw this.unavailableBrowserView();
  }
  getAllowMultipleWindows(): Promise<{ value: boolean; }> {
    throw this.unavailableBrowserView();
  }
  setAllowedNavigation(): void {
    throw this.unavailableBrowserView();
  }
  getAllowedNavigation(): Promise<{ value: string[]; }> {
    throw this.unavailableBrowserView();
  }
  sendMessage(): Promise<{ value: boolean; }> {
    throw this.unavailableBrowserView();
  }
}
