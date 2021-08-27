export interface BrowserViewPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
