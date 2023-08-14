# 📱 Capacitor BrowserView

➡️ Embed additional web content into [Capacitor](https://capacitorjs.com) apps.

> **⚠ WIP - Work in Progress ⚠**
>
> The project is part of my diploma thesis, an overview can be found at [hampoelz/HTL_Diplomarbeit](https://github.com/hampoelz/HTL_Diplomarbeit).
>
> ⏰ Planed Deadline: September 2023
>
> Notes:
> - The project is still very unstable, if you have any problems or suggestions it would be nice if you create an issue.
> - When the project is stable it will be published on NPM.
> - Features like IOS support will be added in the future.

### Supported Platforms
- [x] Android
- [ ] IOS _(coming soon)_
- [x] Using the [`capacitor-community/electron` plugin](https://github.com/capacitor-community/electron):
  - [x] Windows
  - [x] Linux
  - [x] macOS

## Install

**You've to use Capacitor v3 or newer. This project isn't compatible with lower versions of Capacitor.**

```bash
npm install https://github.com/hampoelz/capacitor-browserview
npx cap sync
```

## Getting Started

To embed an additional web page to your app, you first need to create a new BrowserView.
This is done by importing the BrowserView class from the Capacitor plugin and calling the create method.
After that, all you have to do is set its bounds and load a website.


```typescript
import { BrowserView } from 'capacitor-browserview';

// Create a new BrowserView, set its bounds and load a website.
const myView = await BrowserView.create();
myView.setBounds({ bounds: { x: 0, y: 0, width: 300, height: 600 } });
myView.loadUrl({ url: "https://capacitorjs.com/" });
```

At this point, your BrowserView should be created within your application and the website should start loading.
Using the returned reference to the BrowserView, you can easily interact with it, as shown here in a few examples:


```typescript
// Reload the current web page.
myView.reload();

// Get the user agent for this web page.
const { userAgent } = await myView.getUserAgent();
console.log("The following UserAgent is used for this web page: " + userAgent);

// Handle finished page load.
myView.addListener('did-finish-load', () => {
    console.log("Congratulations! The web page loaded successfully.");
});

// Handle title changes of the web page.
myView.addListener('page-title-updated', event => {
    console.log(`The web page has changed its title to '${event.title}'.`);
});

// Remove the BrowserView from your app, and clean up references.
myView.destroy();
```

For details about the communication between the capacitor layer and the loaded web page, see the [Bridge](#bridge) section.

## Configuration

<docgen-config>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

These config values are available:

| Prop                            | Type                  | Description                                                                                                                                                                                                                                                                                                                                    | Default            | Since |
| ------------------------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ----- |
| **`url`**                       | <code>string</code>   | Default external URL loaded in BrowserViews.                                                                                                                                                                                                                                                                                                   |                    | 1.0.0 |
| **`allowMultipleWindows`**      | <code>boolean</code>  | Open links that request a new tab or window _(`target="_blank"`)_ in the external browser instead of the BrowserViews.                                                                                                                                                                                                                         | <code>true</code>  | 1.0.0 |
| **`allowNavigation`**           | <code>string[]</code> | Set additional URLs the BrowserViews can navigate to. By default, all external URLs are opened in the external browser (not the BrowserView).                                                                                                                                                                                                  | <code>[]</code>    | 1.0.0 |
| **`enableBridge`**              | <code>boolean</code>  | TODO                                                                                                                                                                                                                                                                                                                                           | <code>false</code> | 1.0.0 |
| **`overrideUserAgent`**         | <code>string</code>   | Default user agent for BrowserViews.                                                                                                                                                                                                                                                                                                           |                    | 1.0.0 |
| **`appendUserAgent`**           | <code>string</code>   | String to append to the original user agent for BrowserViews. This is disregarded if `overrideUserAgent` is used.                                                                                                                                                                                                                              |                    | 1.0.0 |
| **`backgroundColor`**           | <code>string</code>   | Background color for BrowserViews.                                                                                                                                                                                                                                                                                                             |                    | 1.0.0 |
| **`androidOverrideUserAgent`**  | <code>string</code>   | Default user agent for BrowserViews on Android. Overrides global `overrideUserAgent` option.                                                                                                                                                                                                                                                   |                    | 1.0.0 |
| **`androidAppendUserAgent`**    | <code>string</code>   | String to append to the original user agent for BrowserViews for Android. Overrides global `appendUserAgent` option. This is disregarded if `overrideUserAgent` is used.                                                                                                                                                                       |                    | 1.0.0 |
| **`androidBackgroundColor`**    | <code>string</code>   | Background color for BrowserViews for Android. Overrides global `backgroundColor` option.                                                                                                                                                                                                                                                      |                    | 1.0.0 |
| **`androidAllowMixedContent`**  | <code>boolean</code>  | Enable mixed content in the BrowserViews for Android. [Mixed content](https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content) is disabled by default for security. During development, you may need to enable it to allow the BrowserViews to load files from different schemes. **This is not intended for use in production.**  | <code>false</code> | 1.0.0 |
| **`electronOverrideUserAgent`** | <code>string</code>   | Default user agent for BrowserViews on Electron. Overrides global `overrideUserAgent` option.                                                                                                                                                                                                                                                  |                    | 1.0.0 |
| **`electronAppendUserAgent`**   | <code>string</code>   | String to append to the original user agent for BrowserViews for Electron. Overrides global `appendUserAgent` option. This is disregarded if `overrideUserAgent` is used.                                                                                                                                                                      |                    | 1.0.0 |
| **`electronBackgroundColor`**   | <code>string</code>   | Background color for BrowserViews for Electron. Overrides global `backgroundColor` option.                                                                                                                                                                                                                                                     |                    | 1.0.0 |
| **`electronAllowMixedContent`** | <code>boolean</code>  | Enable mixed content in the BrowserViews for Electron. [Mixed content](https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content) is disabled by default for security. During development, you may need to enable it to allow the BrowserViews to load files from different schemes. **This is not intended for use in production.** | <code>false</code> | 1.0.0 |

### Examples

In `capacitor.config.json`:

```json
{
  "plugins": {
    "CapacitorBrowserView": {
      "url": "https://capacitorjs.com/",
      "allowMultipleWindows": false,
      "allowNavigation": [ "capacitorjs\.com", "ionic\.io\/blog\/.*capacitor.*" ],
      "enableBridge": true,
      "overrideUserAgent": "Mozilla/5.0 (CapacitorJS) CapacitorApp/1.0",
      "appendUserAgent": "CapacitorApp/1.0",
      "backgroundColor": "#ffffff",
      "androidOverrideUserAgent": "Mozilla/5.0 (Android) CapacitorApp/1.0",
      "androidAppendUserAgent": "CapacitorApp/1.0 (Android)",
      "androidBackgroundColor": "#ffffff",
      "androidAllowMixedContent": false,
      "electronOverrideUserAgent": "Mozilla/5.0 (Electron) CapacitorApp/1.0",
      "electronAppendUserAgent": "CapacitorApp/1.0 (Electron)",
      "electronBackgroundColor": "#ffffff",
      "electronAllowMixedContent": false
    }
  }
}
```

In `capacitor.config.ts`:

```ts
/// <reference types="capacitor-browserview" />

import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  plugins: {
    CapacitorBrowserView: {
      url: "https://capacitorjs.com/",
      allowMultipleWindows: false,
      allowNavigation: [ "capacitorjs\.com", "ionic\.io\/blog\/.*capacitor.*" ],
      enableBridge: true,
      overrideUserAgent: "Mozilla/5.0 (CapacitorJS) CapacitorApp/1.0",
      appendUserAgent: "CapacitorApp/1.0",
      backgroundColor: "#ffffff",
      androidOverrideUserAgent: "Mozilla/5.0 (Android) CapacitorApp/1.0",
      androidAppendUserAgent: "CapacitorApp/1.0 (Android)",
      androidBackgroundColor: "#ffffff",
      androidAllowMixedContent: false,
      electronOverrideUserAgent: "Mozilla/5.0 (Electron) CapacitorApp/1.0",
      electronAppendUserAgent: "CapacitorApp/1.0 (Electron)",
      electronBackgroundColor: "#ffffff",
      electronAllowMixedContent: false,
    },
  },
};

export default config;
```

</docgen-config>

## Bridge

This extension includes a bridge between the capacitor layer and the loaded web page in the BrowserView(s).
However, this feature is disabled by default. It can be enabled either globally via the plugin configuration or for each BrowserView individually during its creation.

If the bridge feature is enabled, the `window.CapacitorBrowserView` object is available on web pages within the corresponding BrowserView.

### API

The `window.CapacitorBrowserView` object provides a few methods so you can send messages from your web page to the capacitor layer.
You can also receive replies from the capacitor layer.

It has the following methods to listen for events and send messages:

#### `CapacitorBrowserView.send(eventName, ...args)`

* `eventName` String
* `...args` any[]

Send a message to the capacitor layer via `eventName`, along with
arguments. Arguments will be serialized with JSON.

#### `CapacitorBrowserView.addListener(eventName, callback)`

* `eventName` String
* `listener` Function
  * `...args` any[]

Listens to `eventName`, when a new message arrives `listener` would be called with
`listener(args...)`.


### Example

To use the bridge, you first need to modify your web page so that it can receive and return messages.
For example, you can add the following sample code to your web page.

```javascript
// Listens to "msg-from-capacitor" from the capacitor layer.
CapacitorBrowserView.addListener("msg-from-capacitor", message => {
    console.log('Message from Capacitor-App: ' + message);

    // Send a message back to the capacitor layer.
    CapacitorBrowserView.send("msg-from-web", "Replying to this message: " + message, "And optionally add further args");
});
```

After that, you need to set up a new BrowserView with an enabled Bridge.
In addition, your capacitor app should also be able to receive messages and send a message to your website.
Note that the web page must be loaded entirely before it can receive messages.
This could look something like this:

```typescript
import { BrowserView } from 'capacitor-browserview';

const myView = await BrowserView.create({ enableBridge: true });
myView.setBounds({ bounds: { x: 0, y: 0, width: 300, height: 600 } });

// Listens to "msg-from-web" from the web page.
myView.addListener('channel-msg-from-web', event => {
    console.log("Message from web page: ", event.args);
});

// Wait for the web page to finish loading.
myView.addListener('did-finish-load', () => {

    // Send a message to the web page.
    myView.sendMessage({
        eventName: "msg-from-capacitor",
        args: [ "Hello from Capacitor!" ]
    });

});

myView.loadUrl({ url: "https://your_webpage.dev/" });
```

## API

<docgen-index>

* [`create(...)`](#create)
* [`destroy()`](#destroy)
* [`setBounds(...)`](#setbounds)
* [`getBounds()`](#getbounds)
* [`setBackgroundColor(...)`](#setbackgroundcolor)
* [`loadUrl(...)`](#loadurl)
* [`getUrl()`](#geturl)
* [`getTitle()`](#gettitle)
* [`stop()`](#stop)
* [`reload()`](#reload)
* [`canGoBack()`](#cangoback)
* [`canGoForward()`](#cangoforward)
* [`clearHistory()`](#clearhistory)
* [`goBack()`](#goback)
* [`goForward()`](#goforward)
* [`setUserAgent(...)`](#setuseragent)
* [`appendUserAgent(...)`](#appenduseragent)
* [`getUserAgent()`](#getuseragent)
* [`executeJavaScript(...)`](#executejavascript)
* [`setAllowMultipleWindows(...)`](#setallowmultiplewindows)
* [`getAllowMultipleWindows()`](#getallowmultiplewindows)
* [`setAllowedNavigation(...)`](#setallowednavigation)
* [`getAllowedNavigation()`](#getallowednavigation)
* [`sendMessage(...)`](#sendmessage)
* [`addListener('new-window', ...)`](#addlistenernew-window)
* [`addListener('close-window', ...)`](#addlistenerclose-window)
* [`addListener('page-favicon-updated', ...)`](#addlistenerpage-favicon-updated)
* [`addListener('page-title-updated', ...)`](#addlistenerpage-title-updated)
* [`addListener('enter-html-full-screen', ...)`](#addlistenerenter-html-full-screen)
* [`addListener('leave-html-full-screen', ...)`](#addlistenerleave-html-full-screen)
* [`addListener('will-navigate', ...)`](#addlistenerwill-navigate)
* [`addListener('did-start-loading', ...)`](#addlistenerdid-start-loading)
* [`addListener('did-frame-finish-load', ...)`](#addlistenerdid-frame-finish-load)
* [`addListener('did-finish-load', ...)`](#addlistenerdid-finish-load)
* [`addListener('did-fail-load', ...)`](#addlistenerdid-fail-load)
* [`addListener('dom-ready', ...)`](#addlistenerdom-ready)
* [`addListener('http-error', ...)`](#addlistenerhttp-error)
* [`addListener('render-process-gone', ...)`](#addlistenerrender-process-gone)
* [`addListener('unresponsive', ...)`](#addlistenerunresponsive)
* [`addListener('responsive', ...)`](#addlistenerresponsive)
* [`addListener(`channel-${string}`, ...)`](#addlistenerchannel-string)
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### create(...)

```typescript
create(options?: CreateOptions | undefined) => Promise<BrowserView>
```

| Param         | Type                                                    |
| ------------- | ------------------------------------------------------- |
| **`options`** | <code><a href="#createoptions">CreateOptions</a></code> |

**Returns:** <code>Promise&lt;BrowserView&gt;</code>

--------------------


### destroy()

```typescript
destroy() => void
```

--------------------


### setBounds(...)

```typescript
setBounds(args: BoundsArgs) => void
```

| Param      | Type                                              |
| ---------- | ------------------------------------------------- |
| **`args`** | <code><a href="#boundsargs">BoundsArgs</a></code> |

--------------------


### getBounds()

```typescript
getBounds() => Promise<BoundsResult>
```

**Returns:** <code>Promise&lt;<a href="#boundsresult">BoundsResult</a>&gt;</code>

--------------------


### setBackgroundColor(...)

```typescript
setBackgroundColor(args: ColorArgs) => void
```

| Param      | Type                                            |
| ---------- | ----------------------------------------------- |
| **`args`** | <code><a href="#colorargs">ColorArgs</a></code> |

--------------------


### loadUrl(...)

```typescript
loadUrl(args: UrlArgs) => void
```

| Param      | Type                                        |
| ---------- | ------------------------------------------- |
| **`args`** | <code><a href="#urlargs">UrlArgs</a></code> |

--------------------


### getUrl()

```typescript
getUrl() => Promise<UrlResult>
```

**Returns:** <code>Promise&lt;<a href="#urlresult">UrlResult</a>&gt;</code>

--------------------


### getTitle()

```typescript
getTitle() => Promise<TitleResult>
```

**Returns:** <code>Promise&lt;<a href="#titleresult">TitleResult</a>&gt;</code>

--------------------


### stop()

```typescript
stop() => void
```

--------------------


### reload()

```typescript
reload() => void
```

--------------------


### canGoBack()

```typescript
canGoBack() => Promise<CanGoBackResult>
```

**Returns:** <code>Promise&lt;<a href="#cangobackresult">CanGoBackResult</a>&gt;</code>

--------------------


### canGoForward()

```typescript
canGoForward() => Promise<CanGoForwardResult>
```

**Returns:** <code>Promise&lt;<a href="#cangoforwardresult">CanGoForwardResult</a>&gt;</code>

--------------------


### clearHistory()

```typescript
clearHistory() => void
```

--------------------


### goBack()

```typescript
goBack() => void
```

--------------------


### goForward()

```typescript
goForward() => void
```

--------------------


### setUserAgent(...)

```typescript
setUserAgent(args: UserAgentArgs) => void
```

| Param      | Type                                                    |
| ---------- | ------------------------------------------------------- |
| **`args`** | <code><a href="#useragentargs">UserAgentArgs</a></code> |

--------------------


### appendUserAgent(...)

```typescript
appendUserAgent(args: UserAgentArgs) => void
```

| Param      | Type                                                    |
| ---------- | ------------------------------------------------------- |
| **`args`** | <code><a href="#useragentargs">UserAgentArgs</a></code> |

--------------------


### getUserAgent()

```typescript
getUserAgent() => Promise<UserAgentResult>
```

**Returns:** <code>Promise&lt;<a href="#useragentresult">UserAgentResult</a>&gt;</code>

--------------------


### executeJavaScript(...)

```typescript
executeJavaScript(args: CodeExecuteArgs) => Promise<CodeExecuteResult>
```

| Param      | Type                                                        |
| ---------- | ----------------------------------------------------------- |
| **`args`** | <code><a href="#codeexecuteargs">CodeExecuteArgs</a></code> |

**Returns:** <code>Promise&lt;<a href="#codeexecuteresult">CodeExecuteResult</a>&gt;</code>

--------------------


### setAllowMultipleWindows(...)

```typescript
setAllowMultipleWindows(args: AllowMultipleWindowsArgs) => void
```

| Param      | Type                                                                          |
| ---------- | ----------------------------------------------------------------------------- |
| **`args`** | <code><a href="#allowmultiplewindowsargs">AllowMultipleWindowsArgs</a></code> |

--------------------


### getAllowMultipleWindows()

```typescript
getAllowMultipleWindows() => Promise<AllowMultipleWindowsResult>
```

**Returns:** <code>Promise&lt;<a href="#allowmultiplewindowsresult">AllowMultipleWindowsResult</a>&gt;</code>

--------------------


### setAllowedNavigation(...)

```typescript
setAllowedNavigation(args: AllowedNavigationArgs) => void
```

| Param      | Type                                                                    |
| ---------- | ----------------------------------------------------------------------- |
| **`args`** | <code><a href="#allowednavigationargs">AllowedNavigationArgs</a></code> |

--------------------


### getAllowedNavigation()

```typescript
getAllowedNavigation() => Promise<AllowedNavigationResult>
```

**Returns:** <code>Promise&lt;<a href="#allowednavigationresult">AllowedNavigationResult</a>&gt;</code>

--------------------


### sendMessage(...)

```typescript
sendMessage(args: MessageArgs) => void
```

| Param      | Type                                                |
| ---------- | --------------------------------------------------- |
| **`args`** | <code><a href="#messageargs">MessageArgs</a></code> |

--------------------


### addListener('new-window', ...)

```typescript
addListener(eventName: 'new-window', listenerFunc: UrlListenerCallback) => Promise<PluginListenerHandle> & PluginListenerHandle
```

| Param              | Type                                                                |
| ------------------ | ------------------------------------------------------------------- |
| **`eventName`**    | <code>'new-window'</code>                                           |
| **`listenerFunc`** | <code><a href="#urllistenercallback">UrlListenerCallback</a></code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

--------------------


### addListener('close-window', ...)

```typescript
addListener(eventName: 'close-window', listenerFunc: EmptyListenerCallback) => Promise<PluginListenerHandle> & PluginListenerHandle
```

| Param              | Type                                                                    |
| ------------------ | ----------------------------------------------------------------------- |
| **`eventName`**    | <code>'close-window'</code>                                             |
| **`listenerFunc`** | <code><a href="#emptylistenercallback">EmptyListenerCallback</a></code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

--------------------


### addListener('page-favicon-updated', ...)

```typescript
addListener(eventName: 'page-favicon-updated', listenerFunc: IconListenerCallback) => Promise<PluginListenerHandle> & PluginListenerHandle
```

| Param              | Type                                                                  |
| ------------------ | --------------------------------------------------------------------- |
| **`eventName`**    | <code>'page-favicon-updated'</code>                                   |
| **`listenerFunc`** | <code><a href="#iconlistenercallback">IconListenerCallback</a></code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

--------------------


### addListener('page-title-updated', ...)

```typescript
addListener(eventName: 'page-title-updated', listenerFunc: TitleListenerCallback) => Promise<PluginListenerHandle> & PluginListenerHandle
```

| Param              | Type                                                                    |
| ------------------ | ----------------------------------------------------------------------- |
| **`eventName`**    | <code>'page-title-updated'</code>                                       |
| **`listenerFunc`** | <code><a href="#titlelistenercallback">TitleListenerCallback</a></code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

--------------------


### addListener('enter-html-full-screen', ...)

```typescript
addListener(eventName: 'enter-html-full-screen', listenerFunc: EmptyListenerCallback) => Promise<PluginListenerHandle> & PluginListenerHandle
```

| Param              | Type                                                                    |
| ------------------ | ----------------------------------------------------------------------- |
| **`eventName`**    | <code>'enter-html-full-screen'</code>                                   |
| **`listenerFunc`** | <code><a href="#emptylistenercallback">EmptyListenerCallback</a></code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

--------------------


### addListener('leave-html-full-screen', ...)

```typescript
addListener(eventName: 'leave-html-full-screen', listenerFunc: EmptyListenerCallback) => Promise<PluginListenerHandle> & PluginListenerHandle
```

| Param              | Type                                                                    |
| ------------------ | ----------------------------------------------------------------------- |
| **`eventName`**    | <code>'leave-html-full-screen'</code>                                   |
| **`listenerFunc`** | <code><a href="#emptylistenercallback">EmptyListenerCallback</a></code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

--------------------


### addListener('will-navigate', ...)

```typescript
addListener(eventName: 'will-navigate', listenerFunc: UrlListenerCallback) => Promise<PluginListenerHandle> & PluginListenerHandle
```

| Param              | Type                                                                |
| ------------------ | ------------------------------------------------------------------- |
| **`eventName`**    | <code>'will-navigate'</code>                                        |
| **`listenerFunc`** | <code><a href="#urllistenercallback">UrlListenerCallback</a></code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

--------------------


### addListener('did-start-loading', ...)

```typescript
addListener(eventName: 'did-start-loading', listenerFunc: EmptyListenerCallback) => Promise<PluginListenerHandle> & PluginListenerHandle
```

| Param              | Type                                                                    |
| ------------------ | ----------------------------------------------------------------------- |
| **`eventName`**    | <code>'did-start-loading'</code>                                        |
| **`listenerFunc`** | <code><a href="#emptylistenercallback">EmptyListenerCallback</a></code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

--------------------


### addListener('did-frame-finish-load', ...)

```typescript
addListener(eventName: 'did-frame-finish-load', listenerFunc: EmptyListenerCallback) => Promise<PluginListenerHandle> & PluginListenerHandle
```

| Param              | Type                                                                    |
| ------------------ | ----------------------------------------------------------------------- |
| **`eventName`**    | <code>'did-frame-finish-load'</code>                                    |
| **`listenerFunc`** | <code><a href="#emptylistenercallback">EmptyListenerCallback</a></code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

--------------------


### addListener('did-finish-load', ...)

```typescript
addListener(eventName: 'did-finish-load', listenerFunc: EmptyListenerCallback) => Promise<PluginListenerHandle> & PluginListenerHandle
```

| Param              | Type                                                                    |
| ------------------ | ----------------------------------------------------------------------- |
| **`eventName`**    | <code>'did-finish-load'</code>                                          |
| **`listenerFunc`** | <code><a href="#emptylistenercallback">EmptyListenerCallback</a></code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

--------------------


### addListener('did-fail-load', ...)

```typescript
addListener(eventName: 'did-fail-load', listenerFunc: ErrorListenerCallback) => Promise<PluginListenerHandle> & PluginListenerHandle
```

| Param              | Type                                                                    |
| ------------------ | ----------------------------------------------------------------------- |
| **`eventName`**    | <code>'did-fail-load'</code>                                            |
| **`listenerFunc`** | <code><a href="#errorlistenercallback">ErrorListenerCallback</a></code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

--------------------


### addListener('dom-ready', ...)

```typescript
addListener(eventName: 'dom-ready', listenerFunc: EmptyListenerCallback) => Promise<PluginListenerHandle> & PluginListenerHandle
```

| Param              | Type                                                                    |
| ------------------ | ----------------------------------------------------------------------- |
| **`eventName`**    | <code>'dom-ready'</code>                                                |
| **`listenerFunc`** | <code><a href="#emptylistenercallback">EmptyListenerCallback</a></code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

--------------------


### addListener('http-error', ...)

```typescript
addListener(eventName: 'http-error', listenerFunc: ResponseListenerCallback) => Promise<PluginListenerHandle> & PluginListenerHandle
```

| Param              | Type                                                                          |
| ------------------ | ----------------------------------------------------------------------------- |
| **`eventName`**    | <code>'http-error'</code>                                                     |
| **`listenerFunc`** | <code><a href="#responselistenercallback">ResponseListenerCallback</a></code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

--------------------


### addListener('render-process-gone', ...)

```typescript
addListener(eventName: 'render-process-gone', listenerFunc: RenderProcessGoneListenerCallback) => Promise<PluginListenerHandle> & PluginListenerHandle
```

| Param              | Type                                                                                            |
| ------------------ | ----------------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'render-process-gone'</code>                                                              |
| **`listenerFunc`** | <code><a href="#renderprocessgonelistenercallback">RenderProcessGoneListenerCallback</a></code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

--------------------


### addListener('unresponsive', ...)

```typescript
addListener(eventName: 'unresponsive', listenerFunc: EmptyListenerCallback) => Promise<PluginListenerHandle> & PluginListenerHandle
```

| Param              | Type                                                                    |
| ------------------ | ----------------------------------------------------------------------- |
| **`eventName`**    | <code>'unresponsive'</code>                                             |
| **`listenerFunc`** | <code><a href="#emptylistenercallback">EmptyListenerCallback</a></code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

--------------------


### addListener('responsive', ...)

```typescript
addListener(eventName: 'responsive', listenerFunc: EmptyListenerCallback) => Promise<PluginListenerHandle> & PluginListenerHandle
```

| Param              | Type                                                                    |
| ------------------ | ----------------------------------------------------------------------- |
| **`eventName`**    | <code>'responsive'</code>                                               |
| **`listenerFunc`** | <code><a href="#emptylistenercallback">EmptyListenerCallback</a></code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

--------------------


### addListener(`channel-${string}`, ...)

```typescript
addListener(eventName: ChannelEventName<string>, listenerFunc: ChannelListenerCallback) => Promise<PluginListenerHandle> & PluginListenerHandle
```

| Param              | Type                                                                        |
| ------------------ | --------------------------------------------------------------------------- |
| **`eventName`**    | <code>`channel-${string}`</code>                                            |
| **`listenerFunc`** | <code><a href="#channellistenercallback">ChannelListenerCallback</a></code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

--------------------


### Interfaces


#### CreateOptions

| Prop                       | Type                 | Default            |
| -------------------------- | -------------------- | ------------------ |
| **`url`**                  | <code>string</code>  |                    |
| **`allowMultipleWindows`** | <code>boolean</code> | <code>true</code>  |
| **`enableBridge`**         | <code>boolean</code> | <code>false</code> |
| **`overrideUserAgent`**    | <code>string</code>  |                    |
| **`appendUserAgent`**      | <code>string</code>  |                    |
| **`backgroundColor`**      | <code>string</code>  |                    |


#### BoundsArgs

| Prop         | Type                                            |
| ------------ | ----------------------------------------------- |
| **`bounds`** | <code><a href="#rectangle">Rectangle</a></code> |


#### Rectangle

| Prop         | Type                |
| ------------ | ------------------- |
| **`x`**      | <code>number</code> |
| **`y`**      | <code>number</code> |
| **`width`**  | <code>number</code> |
| **`height`** | <code>number</code> |


#### BoundsResult

| Prop         | Type                                            |
| ------------ | ----------------------------------------------- |
| **`bounds`** | <code><a href="#rectangle">Rectangle</a></code> |


#### ColorArgs

| Prop        | Type                |
| ----------- | ------------------- |
| **`color`** | <code>string</code> |


#### UrlArgs

| Prop      | Type                |
| --------- | ------------------- |
| **`url`** | <code>string</code> |


#### UrlResult

| Prop      | Type                |
| --------- | ------------------- |
| **`url`** | <code>string</code> |


#### TitleResult

| Prop        | Type                |
| ----------- | ------------------- |
| **`title`** | <code>string</code> |


#### CanGoBackResult

| Prop            | Type                 |
| --------------- | -------------------- |
| **`canGoBack`** | <code>boolean</code> |


#### CanGoForwardResult

| Prop               | Type                 |
| ------------------ | -------------------- |
| **`canGoForward`** | <code>boolean</code> |


#### UserAgentArgs

| Prop            | Type                |
| --------------- | ------------------- |
| **`userAgent`** | <code>string</code> |


#### UserAgentResult

| Prop            | Type                |
| --------------- | ------------------- |
| **`userAgent`** | <code>string</code> |


#### CodeExecuteResult

| Prop         | Type             |
| ------------ | ---------------- |
| **`result`** | <code>any</code> |


#### CodeExecuteArgs

| Prop       | Type                |
| ---------- | ------------------- |
| **`code`** | <code>string</code> |


#### AllowMultipleWindowsArgs

| Prop                       | Type                 |
| -------------------------- | -------------------- |
| **`allowMultipleWindows`** | <code>boolean</code> |


#### AllowMultipleWindowsResult

| Prop                       | Type                 |
| -------------------------- | -------------------- |
| **`allowMultipleWindows`** | <code>boolean</code> |


#### AllowedNavigationArgs

| Prop                    | Type                  |
| ----------------------- | --------------------- |
| **`allowedNavigation`** | <code>string[]</code> |


#### AllowedNavigationResult

| Prop                    | Type                  |
| ----------------------- | --------------------- |
| **`allowedNavigation`** | <code>string[]</code> |


#### MessageArgs

| Prop            | Type                                                                        |
| --------------- | --------------------------------------------------------------------------- |
| **`eventName`** | <code><a href="#channeleventname">ChannelEventName</a>&lt;string&gt;</code> |
| **`args`**      | <code>any[]</code>                                                          |


#### PluginListenerHandle

| Prop         | Type                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |


#### UrlCallbackData

| Prop      | Type                |
| --------- | ------------------- |
| **`url`** | <code>string</code> |


#### IconCallbackData

| Prop       | Type                |
| ---------- | ------------------- |
| **`icon`** | <code>string</code> |


#### TitleCallbackData

| Prop        | Type                |
| ----------- | ------------------- |
| **`title`** | <code>string</code> |


#### ErrorCallbackData

| Prop        | Type                                                          |
| ----------- | ------------------------------------------------------------- |
| **`error`** | <code><a href="#webresourceerror">WebResourceError</a></code> |


#### WebResourceError

| Prop                   | Type                |
| ---------------------- | ------------------- |
| **`errorCode`**        | <code>number</code> |
| **`errorDescription`** | <code>string</code> |
| **`validatedURL`**     | <code>string</code> |


#### ResponseCallbackData

| Prop                | Type                                                                |
| ------------------- | ------------------------------------------------------------------- |
| **`url`**           | <code>string</code>                                                 |
| **`errorResponse`** | <code><a href="#webresourceresponse">WebResourceResponse</a></code> |


#### WebResourceResponse

| Prop                   | Type                |
| ---------------------- | ------------------- |
| **`httpResponseCode`** | <code>number</code> |
| **`httpStatusText`**   | <code>string</code> |


#### RenderProcessGoneCallbackData

| Prop          | Type                                                                        |
| ------------- | --------------------------------------------------------------------------- |
| **`details`** | <code><a href="#renderprocessgonedetail">RenderProcessGoneDetail</a></code> |


#### RenderProcessGoneDetail

| Prop          | Type                 |
| ------------- | -------------------- |
| **`crashed`** | <code>boolean</code> |


#### ChannelCallbackData

| Prop       | Type               |
| ---------- | ------------------ |
| **`args`** | <code>any[]</code> |


### Type Aliases


#### ChannelEventName

<code>`channel-${TChannel}`</code>


#### UrlListenerCallback

<code><a href="#listenercallback">ListenerCallback</a>&lt;<a href="#urlcallbackdata">UrlCallbackData</a>&gt;</code>


#### ListenerCallback

<code>(err: any, ...args: any[]): void</code>


#### EmptyListenerCallback

<code><a href="#listenercallback">ListenerCallback</a>&lt;{}&gt;</code>


#### IconListenerCallback

<code><a href="#listenercallback">ListenerCallback</a>&lt;<a href="#iconcallbackdata">IconCallbackData</a>&gt;</code>


#### TitleListenerCallback

<code><a href="#listenercallback">ListenerCallback</a>&lt;<a href="#titlecallbackdata">TitleCallbackData</a>&gt;</code>


#### ErrorListenerCallback

<code><a href="#listenercallback">ListenerCallback</a>&lt;<a href="#errorcallbackdata">ErrorCallbackData</a>&gt;</code>


#### ResponseListenerCallback

<code><a href="#listenercallback">ListenerCallback</a>&lt;<a href="#responsecallbackdata">ResponseCallbackData</a>&gt;</code>


#### RenderProcessGoneListenerCallback

<code><a href="#listenercallback">ListenerCallback</a>&lt;<a href="#renderprocessgonecallbackdata">RenderProcessGoneCallbackData</a>&gt;</code>


#### ChannelListenerCallback

<code><a href="#listenercallback">ListenerCallback</a>&lt;<a href="#channelcallbackdata">ChannelCallbackData</a>&gt;</code>

</docgen-api>
