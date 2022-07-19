import { WebPlugin } from '@capacitor/core';

import type { BrowserViewPlugin } from './definitions';

export class BrowserViewWeb extends WebPlugin implements BrowserViewPlugin {
  createBrowserView(): Promise<any> {
    throw this.unavailable('WebViews are not available in browser.');
  }
  setAutoResize(): void {
    throw this.unavailable('WebViews are not available in browser.');
  }
  setBounds(): void {
    throw this.unavailable('WebViews are not available in browser.');
  }
  getBounds(): Promise<any> {
    throw this.unavailable('WebViews are not available in browser.');
  }
  setBackgroundColor(): void {
    throw this.unavailable('WebViews are not available in browser.');
  }
  loadURL(): void {
    throw this.unavailable('WebViews are not available in browser.');
  }
  getURL(): Promise<any> {
    throw this.unavailable('WebViews are not available in browser.');
  }
  getTitle(): Promise<any> {
    throw this.unavailable('WebViews are not available in browser.');
  }
  stop(): void {
    throw this.unavailable('WebViews are not available in browser.');
  }
  reload(): void {
    throw this.unavailable('WebViews are not available in browser.');
  }
  canGoBack(): Promise<any> {
    throw this.unavailable('WebViews are not available in browser.');
  }
  canGoForward(): Promise<any> {
    throw this.unavailable('WebViews are not available in browser.');
  }
  clearHistory(): void {
    throw this.unavailable('WebViews are not available in browser.');
  }
  goBack(): void {
    throw this.unavailable('WebViews are not available in browser.');
  }
  goForward(): void {
    throw this.unavailable('WebViews are not available in browser.');
  }
  setUserAgent(): void {
    throw this.unavailable('WebViews are not available in browser.');
  }
  getUserAgent(): Promise<any> {
    throw this.unavailable('WebViews are not available in browser.');
  }
  executeJavaScript(): Promise<any> {
    throw this.unavailable('WebViews are not available in browser.');
  }
  setZoomFactor(): void {
    throw this.unavailable('WebViews are not available in browser.');
  }
  
}
