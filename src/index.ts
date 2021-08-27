import { registerPlugin } from '@capacitor/core';

import type { BrowserViewPlugin } from './definitions';

const BrowserView = registerPlugin<BrowserViewPlugin>('BrowserView', {
  web: () => import('./web').then(m => new m.BrowserViewWeb()),
});

export * from './definitions';
export { BrowserView };
