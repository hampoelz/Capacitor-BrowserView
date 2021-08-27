import { WebPlugin } from '@capacitor/core';

import type { BrowserViewPlugin } from './definitions';

export class BrowserViewWeb extends WebPlugin implements BrowserViewPlugin {
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
}
