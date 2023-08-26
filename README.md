# 📱 Capacitor BrowserView

:arrow_right: Embed additional web content into [Capacitor](https://capacitorjs.com) apps.

> [!WARNING]  
> **WIP - Work in Progress**

**Table of contents**

* [Install](#install)
  + [Supported Platforms](#supported-platforms)
* [Getting Started](#getting-started)
  + [Minimal example](#minimal-example)
  + [Inter-Process Communication](#inter-process-communication)
* [Configuration](#configuration)
* [API - Bridge module](#api---bridge-module)
* [API - Capacitor layer](#api---capacitor-layer)

## Install

**Capacitor v5 or newer is required. This project isn't compatible with lower versions of Capacitor.**

```bash
npm install https://github.com/hampoelz/capacitor-browserview/releases/download/v1.0.0-beta.2/capacitor-browserview.tgz
npx cap sync
```

### Supported Platforms

- [x] Android
- [ ] IOS _(coming soon)_
- [x] Using the [`capacitor-community/electron` plugin](https://github.com/capacitor-community/electron):
  - [x] Windows
  - [x] Linux
  - [x] macOS

## Getting Started

### Minimal example

To embed an additional web page to the Capacitor app, first a new BrowserView needs to be created.
This is done by importing the BrowserView class from the Capacitor-BrowserView plugin and calling the create method.
After that, just set its bounds and load a website.

```typescript
import { BrowserView } from 'capacitor-browserview';

// Creates a new BrowserView, sets its bounds and loads a website.
const myView = await BrowserView.create();
myView.setBounds({ bounds: { x: 0, y: 0, width: 300, height: 600 } });
myView.loadUrl({ url: "https://capacitorjs.com/" });
```

At this point, the BrowserView should be created within the application and the website should start loading.
Using the returned reference to the BrowserView, it is easy to interact with it, as shown here in a few examples:


```typescript
// Reloads the current web page.
myView.reload();

// Gets the user-agent for this web page.
const { userAgent } = await myView.getUserAgent();
console.log("The following UserAgent is used for this web page: " + userAgent);

// Handles finished page load.
myView.addListener('did-finish-load', () => {
    console.log("Congratulations! The web page loaded successfully.");
});

// Handles title changes of the web page.
myView.addListener('page-title-updated', event => {
    console.log(`The web page has changed its title to '${event.title}'.`);
});

// Removes the BrowserView from the app, and cleans up references.
myView.destroy();
```

### Inter-Process Communication

This plugin includes a bridge between the Capacitor layer and the loaded web page in the BrowserView(s).
However, this feature is disabled by default. It can be enabled either globally via the plugin configuration or for each BrowserView individually during its creation.

If the bridge feature is enabled, the global object `window.CapacitorBrowserView` is available on web pages within the corresponding BrowserView.

To use the bridge, the website first needs to be modified so that it is capable of receiving and returning messages.
For example, add the following sample code to the web page:

```javascript
// Listens to "msg-from-capacitor" from the Capacitor layer.
CapacitorBrowserView.addListener("msg-from-capacitor", message => {
    console.log('Message from Capacitor-App: ' + message);

    // Sends a message back to the Capacitor layer.
    CapacitorBrowserView.send("msg-from-web", `Replying to the message '${message}'.`, "And optionally add further args");
});
```

After that, a new BrowserView with an enabled bridge needs be set up.
In addition, the Capacitor app should also be able to receive messages and send a message to the website.
Note that the web page must be loaded entirely before it can receive messages.
This could look something like this:

```typescript
import { BrowserView } from 'capacitor-browserview';

const myView = await BrowserView.create({ enableBridge: true });
myView.setBounds({ bounds: { x: 0, y: 0, width: 300, height: 600 } });

// Listens to "msg-from-web" from the web page.
myView.addMessageListener('msg-from-web', data => {
    console.log("Message from web page: ", data.args);
});

// Waits for the web page to finish loading.
myView.addListener('did-finish-load', () => {

    // Sends a message to the web page.
    myView.sendMessage({
        eventName: "msg-from-capacitor",
        args: [ "Hello from Capacitor!" ]
    });

});

myView.loadUrl({ url: "https://webpage.dev/" });
```

A full API documentation can be found in the [API - Bridge module](#api---bridge-module) section.

## Configuration

<docgen-config>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

The following configurations are applied globally to all BrowserViews.
However, most of them can be overridden individually when a
BrowserView is created or changed later via methods.

These config values are available:

| Prop                            | Type                                    | Description                                                                                                                                                                                                                                                                                                                                             | Default            | Since |
| ------------------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ----- |
| **`url`**                       | <code>string</code>                     | Default external URL loaded in BrowserViews.                                                                                                                                                                                                                                                                                                            |                    | 1.0.0 |
| **`allowMultipleWindows`**      | <code>boolean</code>                    | Open links that request a new tab or window _(e.g. by `window.open()`, a link with `target="_blank"`, shift+clicking on a link, or submitting a form with `<form target="_blank">`.)_ in the external browser instead of the BrowserViews.                                                                                                        | <code>true</code>  | 1.0.0 |
| **`allowNavigation`**           | <code>string[]</code>                   | Set regular expressions to which the BrowserViews can navigate additional. By default, all external URLs are opened in the external browser (not the BrowserView).                                                                                                                                                                                      | <code>[]</code>    | 1.0.0 |
| **`enableBridge`**              | <code>boolean</code>                    | Enable a bridge between the Capacitor layer and the loaded web page.                                                                                                                                                                                                                                                                                    | <code>false</code> | 1.0.0 |
| **`overrideUserAgent`**         | <code>string</code>                     | Default user-agent for BrowserViews.                                                                                                                                                                                                                                                                                                                    |                    | 1.0.0 |
| **`appendUserAgent`**           | <code>string</code>                     | String to append to the original user-agent for BrowserViews. This is disregarded if `overrideUserAgent` is used.                                                                                                                                                                                                                                       |                    | 1.0.0 |
| **`backgroundColor`**           | <code><a href="#color">Color</a></code> | Default background color for BrowserViews.                                                                                                                                                                                                                                                                                                              |                    | 1.0.0 |
| **`androidOverrideUserAgent`**  | <code>string</code>                     | Default user-agent for BrowserViews on Android. Overrides global `overrideUserAgent` option.                                                                                                                                                                                                                                                            |                    | 1.0.0 |
| **`androidAppendUserAgent`**    | <code>string</code>                     | String to append to the original user-agent for BrowserViews for Android. Overrides global `appendUserAgent` option. This is disregarded if `overrideUserAgent` is used.                                                                                                                                                                                |                    | 1.0.0 |
| **`androidBackgroundColor`**    | <code><a href="#color">Color</a></code> | Default background color for BrowserViews for Android. Overrides global `backgroundColor` option.                                                                                                                                                                                                                                                       |                    | 1.0.0 |
| **`androidAllowMixedContent`**  | <code>boolean</code>                    | Enable mixed content in the BrowserViews for Android. [Mixed content](https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content) is disabled by default for security. During development, this option may need to be enabled to allow the BrowserViews to load files from different schemes. **This is not intended for use in production.**  | <code>false</code> | 1.0.0 |
| **`electronOverrideUserAgent`** | <code>string</code>                     | Default user-agent for BrowserViews on Electron. Overrides global `overrideUserAgent` option.                                                                                                                                                                                                                                                           |                    | 1.0.0 |
| **`electronAppendUserAgent`**   | <code>string</code>                     | String to append to the original user-agent for BrowserViews for Electron. Overrides global `appendUserAgent` option. This is disregarded if `overrideUserAgent` is used.                                                                                                                                                                               |                    | 1.0.0 |
| **`electronBackgroundColor`**   | <code><a href="#color">Color</a></code> | Default background color for BrowserViews for Electron. Overrides global `backgroundColor` option.                                                                                                                                                                                                                                                      |                    | 1.0.0 |
| **`electronAllowMixedContent`** | <code>boolean</code>                    | Enable mixed content in the BrowserViews for Electron. [Mixed content](https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content) is disabled by default for security. During development, this option may need to be enabled to allow the BrowserViews to load files from different schemes. **This is not intended for use in production.** | <code>false</code> | 1.0.0 |

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

## API - Bridge module

This plugin includes a bridge between the Capacitor layer and the loaded web page in the BrowserView(s).
However, this feature is disabled by default. It can be enabled either globally via the plugin configuration or for each BrowserView individually during its creation.

If the bridge feature is enabled, the global object `window.CapacitorBrowserView` is available on web pages within the corresponding BrowserView.

The `window.CapacitorBrowserView` object provides an API to communicate between the Capacitor layer and the web pages.

It has the following methods to listen for events and send messages:

* [`send(...)`](#capacitorbrowserviewsend)
* [`addListener(string, ...)`](#capacitorbrowserviewaddlistenerstring)

### CapacitorBrowserView.send(...)

```typescript
send: (eventName: string, ...args: any[]) => void
```

Sends a message to the Capacitor layer via `eventName`, along with arguments.
Arguments will be serialized with JSON.

| Param           | Type                | Description                          | Since |
| --------------- | ------------------- | ------------------------------------ | ----- |
| **`eventName`** | <code>string</code> | The name of the event being send to. | 1.0.0 |
| **`args`**      | <code>any[]</code>  | The Array of arguments to send.      | 1.0.0 |

**Since:** 1.0.0

--------------------


### CapacitorBrowserView.addListener(string, ...)

```typescript
addListener: (eventName: string, callback: (...args: any[]) => void) => void
```

Listens to `eventName` and calls `callback(args...)` when a new message arrives from the Capacitor layer.

| Param           | Type                               |
| --------------- | ---------------------------------- |
| **`eventName`** | <code>string</code>                |
| **`callback`**  | <code>(args: any[]) => void</code> |

```typescript
callback: (args: any[]) => void
```

| Param      | Type                | Description                      | Since |
| ---------- | ------------------- | -------------------------------- | ----- |
| **`args`** | <code>any[]</code>  | The received array of arguments. | 1.0.0 |

**Since:** 1.0.0

--------------------


## API - Capacitor layer

A `BrowserView` can be used to embed additional web content into the Capacitor-App. It is like a child window, except that it is positioned relative to its owning window. 

It has the following methods:

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
* [`addListener('did-finish-load', ...)`](#addlistenerdid-finish-load)
* [`addListener('did-fail-load', ...)`](#addlistenerdid-fail-load)
* [`addListener('dom-ready', ...)`](#addlistenerdom-ready)
* [`addListener('http-error', ...)`](#addlistenerhttp-error)
* [`addListener('render-process-gone', ...)`](#addlistenerrender-process-gone)
* [`addListener('unresponsive', ...)`](#addlistenerunresponsive)
* [`addListener('responsive', ...)`](#addlistenerresponsive)
* [`addMessageListener(...)`](#addmessagelistener)
* [`removeListener(...)`](#removelistener)
* [`removeAllListeners(...)`](#removealllisteners)
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### create(...)

```typescript
create(options?: CreateOptions) => Promise<BrowserView>
```

Creates a new BrowserView with properties as set by the `options`.

| Param         | Type                                                    |
| ------------- | ------------------------------------------------------- |
| **`options`** | <code><a href="#createoptions">CreateOptions</a></code> |

**Returns:** <code>Promise<BrowserView></code>

**Since:** 1.0.0

--------------------


### destroy()

```typescript
destroy() => Promise<void>
```

Removes the BrowserView from the app and destroys its internal state.
No other methods may be called on this BrowserView after destroy.

**Since:** 1.0.0

--------------------


### setBounds(...)

```typescript
setBounds(args: BoundsPayloadData) => Promise<void>
```

Resizes and moves the view to the supplied bounds relative to the window.

| Param      | Type                                                            |
| ---------- | --------------------------------------------------------------- |
| **`args`** | <code><a href="#boundspayloaddata">BoundsPayloadData</a></code> |

**Since:** 1.0.0

--------------------


### getBounds()

```typescript
getBounds() => Promise<BoundsPayloadData>
```

Gets the bounds of the view relative to the window.

**Returns:** <code>Promise<<a href="#boundspayloaddata">BoundsPayloadData</a>></code>

**Since:** 1.0.0

--------------------


### setBackgroundColor(...)

```typescript
setBackgroundColor(args: ColorPayloadData) => Promise<void>
```

Sets the background color for this view.

| Param      | Type                                                          |
| ---------- | ------------------------------------------------------------- |
| **`args`** | <code><a href="#colorpayloaddata">ColorPayloadData</a></code> |

**Since:** 1.0.0

--------------------


### loadUrl(...)

```typescript
loadUrl(args: UrlPayloadData) => Promise<void>
```

Loads the given url in the view.
The url must contain the protocol prefix, e.g. the `https://`.

| Param      | Type                                                      |
| ---------- | --------------------------------------------------------- |
| **`args`** | <code><a href="#urlpayloaddata">UrlPayloadData</a></code> |

**Since:** 1.0.0

--------------------


### getUrl()

```typescript
getUrl() => Promise<UrlPayloadData>
```

Gets the url of the current page.
This is not always the same as the url passed to `BrowserView.addListener('will-navigate', callback)`
because although the load for that url has begun, the current page may not have changed.

**Returns:** <code>Promise<<a href="#urlpayloaddata">UrlPayloadData</a>></code>

**Since:** 1.0.0

--------------------


### getTitle()

```typescript
getTitle() => Promise<TitlePayloadData>
```

Gets the title of the current page.
This is the title of the current page until `BrowserView.addListener('page-title-updated', callback)` is called.

**Returns:** <code>Promise<<a href="#titlepayloaddata">TitlePayloadData</a>></code>

**Since:** 1.0.0

--------------------


### stop()

```typescript
stop() => Promise<void>
```

Stops any pending navigation.

**Since:** 1.0.0

--------------------


### reload()

```typescript
reload() => Promise<void>
```

Reloads the current web page.

**Since:** 1.0.0

--------------------


### canGoBack()

```typescript
canGoBack() => Promise<CanGoBackPayloadData>
```

Gets whether the browser can go back to previous web page.

**Returns:** <code>Promise<<a href="#cangobackpayloaddata">CanGoBackPayloadData</a>></code>

**Since:** 1.0.0

--------------------


### canGoForward()

```typescript
canGoForward() => Promise<CanGoForwardPayloadData>
```

Gets whether the browser can go forward to next web page.

**Returns:** <code>Promise<<a href="#cangoforwardpayloaddata">CanGoForwardPayloadData</a>></code>

**Since:** 1.0.0

--------------------


### clearHistory()

```typescript
clearHistory() => Promise<void>
```

Clears the internal back/forward navigation history list.

**Since:** 1.0.0

--------------------


### goBack()

```typescript
goBack() => Promise<void>
```

Makes the browser go back a web page.

**Since:** 1.0.0

--------------------


### goForward()

```typescript
goForward() => Promise<void>
```

Makes the browser go forward a web page.

**Since:** 1.0.0

--------------------


### setUserAgent(...)

```typescript
setUserAgent(args: UserAgentPayloadData) => Promise<void>
```

Overrides the user-agent string for this web page.
If the string empty, the system default value will be used.

**Note:** Starting from Android KitKat (4.4), changing the user-agent while
loading a web page causes the BrowserView to initiate loading once again.

| Param      | Type                                                                  |
| ---------- | --------------------------------------------------------------------- |
| **`args`** | <code><a href="#useragentpayloaddata">UserAgentPayloadData</a></code> |

**Since:** 1.0.0

--------------------


### appendUserAgent(...)

```typescript
appendUserAgent(args: UserAgentPayloadData) => Promise<void>
```

Appends the specified user-agent to the current user-agent string for this web page.

**Note:** Starting from Android KitKat (4.4), changing the user-agent while
loading a web page causes the BrowserView to initiate loading once again.

| Param      | Type                                                                  |
| ---------- | --------------------------------------------------------------------- |
| **`args`** | <code><a href="#useragentpayloaddata">UserAgentPayloadData</a></code> |

**Since:** 1.0.0

--------------------


### getUserAgent()

```typescript
getUserAgent() => Promise<UserAgentPayloadData>
```

Gets the user-agent string for this web page.

**Returns:** <code>Promise<<a href="#useragentpayloaddata">UserAgentPayloadData</a>></code>

**Since:** 1.0.0

--------------------


### executeJavaScript(...)

```typescript
executeJavaScript(args: CodeExecutePayloadData) => Promise<CodeExecuteResultData>
```

Asynchronously evaluates JavaScript in the context of the currently displayed page.
Returns a promise that resolves with the result of the executed code.

| Param      | Type                                                                      |
| ---------- | ------------------------------------------------------------------------- |
| **`args`** | <code><a href="#codeexecutepayloaddata">CodeExecutePayloadData</a></code> |

**Returns:** <code>Promise<<a href="#codeexecuteresultdata">CodeExecuteResultData</a>></code>

**Since:** 1.0.0

--------------------


### setAllowMultipleWindows(...)

```typescript
setAllowMultipleWindows(args: AllowMultipleWindowsPayloadData) => Promise<void>
```

Sets whether the BrowserView supports multiple windows.
If set to true, links that request a new tab or window _(e.g. by `window.open()`, a link with `target="_blank"`,
shift+clicking on a link, or submitting a form with `<form target="_blank">`.)_ open in the external browser
instead of the BrowserView.

| Param      | Type                                                                                        |
| ---------- | ------------------------------------------------------------------------------------------- |
| **`args`** | <code><a href="#allowmultiplewindowspayloaddata">AllowMultipleWindowsPayloadData</a></code> |

**Since:** 1.0.0

--------------------


### getAllowMultipleWindows()

```typescript
getAllowMultipleWindows() => Promise<AllowMultipleWindowsPayloadData>
```

Gets whether the BrowserView supports multiple windows.

**Returns:** <code>Promise<<a href="#allowmultiplewindowspayloaddata">AllowMultipleWindowsPayloadData</a>></code>

**Since:** 1.0.0

--------------------


### setAllowedNavigation(...)

```typescript
setAllowedNavigation(args: AllowedNavigationPayloadData) => Promise<void>
```

Sets regular expressions to which the BrowserView can navigate additional.

By default, all external URLs are opened in the external browser (not
the BrowserView).

| Param      | Type                                                                                  |
| ---------- | ------------------------------------------------------------------------------------- |
| **`args`** | <code><a href="#allowednavigationpayloaddata">AllowedNavigationPayloadData</a></code> |

**Since:** 1.0.0

--------------------


### getAllowedNavigation()

```typescript
getAllowedNavigation() => Promise<AllowedNavigationPayloadData>
```

Gets the list of regular expressions that the BrowserView can additional navigate to.

**Returns:** <code>Promise<<a href="#allowednavigationpayloaddata">AllowedNavigationPayloadData</a>></code>

**Since:** 1.0.0

--------------------


### sendMessage(...)

```typescript
sendMessage(args: MessageChannelPayloadData) => Promise<void>
```

Sends a message to the current page in the BrowserView.

**Note:** This method is only available if the bridge was enabled during the BrowserView creation or globally via the plugin configuration.

| Param      | Type                                                                            |
| ---------- | ------------------------------------------------------------------------------- |
| **`args`** | <code><a href="#messagechannelpayloaddata">MessageChannelPayloadData</a></code> |

**Since:** 1.0.0

--------------------


### addListener('new-window', ...)

```typescript
addListener(eventName: 'new-window', listenerFunc: BrowserViewListenerCallback<UrlPayloadData>) => Promise<PluginListenerHandle> & PluginListenerHandle
```

Calls `listenerFunc(data)` when the current page request a new tab or window, e.g. by `window.open()`,
a link with `target="_blank"`, shift+clicking on a link, or submitting a form with `<form target="_blank">`.

Whether links should be opened in the external browser or in the BrowserView itself can be set with
the method `BrowserView.setAllowMultipleWindows()` or with the global option `allowMultipleWindows`.

**Note:** When using the Electron platform, [`PluginListenerHandle.remove()`](#pluginlistenerhandle) does not work due to limitations.
Use [`removeListener(listenerFunc)`](#removelistener) instead.

| Param              | Type                                                                                                                                    |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'new-window'</code>                                                                                                               |
| **`listenerFunc`** | <code><a href="#browserviewlistenercallback">BrowserViewListenerCallback</a><<a href="#urlpayloaddata">UrlPayloadData</a>></code> |

**Returns:** <code>Promise<<a href="#pluginlistenerhandle">PluginListenerHandle</a>> & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**Since:** 1.0.0

--------------------


### addListener('close-window', ...)

```typescript
addListener(eventName: 'close-window', listenerFunc: BrowserViewListenerCallback<EmptyPayloadData>) => Promise<PluginListenerHandle> & PluginListenerHandle
```

Calls `listenerFunc()` when the browser has stopped any loading in this window
and has removed any cross-scripting ability in JavaScript.

The application's implementation of this callback should remove the specific BrowserView if this is not already done
and ensure that any URL or security indicator displayed is updated so that the user can tell that the page they were
interacting with has been closed.

**Note:** When using the Electron platform, [`PluginListenerHandle.remove()`](#pluginlistenerhandle) does not work due to limitations.
Use [`removeListener(listenerFunc)`](#removelistener) instead.

| Param              | Type                                                                                                                                        |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'close-window'</code>                                                                                                                 |
| **`listenerFunc`** | <code><a href="#browserviewlistenercallback">BrowserViewListenerCallback</a><<a href="#emptypayloaddata">EmptyPayloadData</a>></code> |

**Returns:** <code>Promise<<a href="#pluginlistenerhandle">PluginListenerHandle</a>> & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**Since:** 1.0.0

--------------------


### addListener('page-favicon-updated', ...)

```typescript
addListener(eventName: 'page-favicon-updated', listenerFunc: BrowserViewListenerCallback<IconPayloadData>) => Promise<PluginListenerHandle> & PluginListenerHandle
```

Calls `listenerFunc(data)` when the current page receives a new favicon.

**Note:** When using the Electron platform, [`PluginListenerHandle.remove()`](#pluginlistenerhandle) does not work due to limitations.
Use [`removeListener(listenerFunc)`](#removelistener) instead.

| Param              | Type                                                                                                                                      |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'page-favicon-updated'</code>                                                                                                       |
| **`listenerFunc`** | <code><a href="#browserviewlistenercallback">BrowserViewListenerCallback</a><<a href="#iconpayloaddata">IconPayloadData</a>></code> |

**Returns:** <code>Promise<<a href="#pluginlistenerhandle">PluginListenerHandle</a>> & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**Since:** 1.0.0

--------------------


### addListener('page-title-updated', ...)

```typescript
addListener(eventName: 'page-title-updated', listenerFunc: BrowserViewListenerCallback<TitlePayloadData>) => Promise<PluginListenerHandle> & PluginListenerHandle
```

Calls `listenerFunc(data)` when the document title changes.

**Note:** When using the Electron platform, [`PluginListenerHandle.remove()`](#pluginlistenerhandle) does not work due to limitations.
Use [`removeListener(listenerFunc)`](#removelistener) instead.

| Param              | Type                                                                                                                                        |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'page-title-updated'</code>                                                                                                           |
| **`listenerFunc`** | <code><a href="#browserviewlistenercallback">BrowserViewListenerCallback</a><<a href="#titlepayloaddata">TitlePayloadData</a>></code> |

**Returns:** <code>Promise<<a href="#pluginlistenerhandle">PluginListenerHandle</a>> & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**Since:** 1.0.0

--------------------


### addListener('enter-html-full-screen', ...)

```typescript
addListener(eventName: 'enter-html-full-screen', listenerFunc: BrowserViewListenerCallback<EmptyPayloadData>) => Promise<PluginListenerHandle> & PluginListenerHandle
```

Calls `listenerFunc()` when the window enters a full-screen state triggered by HTML API.

**Note:** On Android this event requires API level 7 or higher to be fired.

**Note:** When using the Electron platform, [`PluginListenerHandle.remove()`](#pluginlistenerhandle) does not work due to limitations.
Use [`removeListener(listenerFunc)`](#removelistener) instead.

| Param              | Type                                                                                                                                        |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'enter-html-full-screen'</code>                                                                                                       |
| **`listenerFunc`** | <code><a href="#browserviewlistenercallback">BrowserViewListenerCallback</a><<a href="#emptypayloaddata">EmptyPayloadData</a>></code> |

**Returns:** <code>Promise<<a href="#pluginlistenerhandle">PluginListenerHandle</a>> & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**Since:** 1.0.0

--------------------


### addListener('leave-html-full-screen', ...)

```typescript
addListener(eventName: 'leave-html-full-screen', listenerFunc: BrowserViewListenerCallback<EmptyPayloadData>) => Promise<PluginListenerHandle> & PluginListenerHandle
```

Calls `listenerFunc()` when the window leaves a full-screen state triggered by HTML API.

**Note:** On Android this event requires API level 7 or higher to be fired.

**Note:** When using the Electron platform, [`PluginListenerHandle.remove()`](#pluginlistenerhandle) does not work due to limitations.
Use [`removeListener(listenerFunc)`](#removelistener) instead.

| Param              | Type                                                                                                                                        |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'leave-html-full-screen'</code>                                                                                                       |
| **`listenerFunc`** | <code><a href="#browserviewlistenercallback">BrowserViewListenerCallback</a><<a href="#emptypayloaddata">EmptyPayloadData</a>></code> |

**Returns:** <code>Promise<<a href="#pluginlistenerhandle">PluginListenerHandle</a>> & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**Since:** 1.0.0

--------------------


### addListener('will-navigate', ...)

```typescript
addListener(eventName: 'will-navigate', listenerFunc: BrowserViewListenerCallback<UrlPayloadData>) => Promise<PluginListenerHandle> & PluginListenerHandle
```

Calls `listenerFunc(data)` when a user or the page wants to start navigation on the main frame.
It can happen when the `window.location` object is changed or a user clicks a link in the page.

This event will not emit when the navigation is started programmatically with APIs
like `BrowserView.loadUrl()` and `BrowserView.goBack()` or for POST requests.

It is also not emitted for in-page navigations, such as clicking anchor links or
updating the `window.location.hash`.

_On Android it may be called for subframes too._

**Note:** When using the Electron platform, [`PluginListenerHandle.remove()`](#pluginlistenerhandle) does not work due to limitations.
Use [`removeListener(listenerFunc)`](#removelistener) instead.

| Param              | Type                                                                                                                                    |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'will-navigate'</code>                                                                                                            |
| **`listenerFunc`** | <code><a href="#browserviewlistenercallback">BrowserViewListenerCallback</a><<a href="#urlpayloaddata">UrlPayloadData</a>></code> |

**Returns:** <code>Promise<<a href="#pluginlistenerhandle">PluginListenerHandle</a>> & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**Since:** 1.0.0

--------------------


### addListener('did-start-loading', ...)

```typescript
addListener(eventName: 'did-start-loading', listenerFunc: BrowserViewListenerCallback<EmptyPayloadData>) => Promise<PluginListenerHandle> & PluginListenerHandle
```

Calls `listenerFunc()` when the page has started loading.
Corresponds to the points in time when the spinner of the tab started spinning.

On Android, this callback is called only once for each main frame load so a page with iframes or framesets will
call this only one time for the main frame. This also means that this callback will not be called when the contents of an
embedded frame changes.

**Note:** When using the Electron platform, [`PluginListenerHandle.remove()`](#pluginlistenerhandle) does not work due to limitations.
Use [`removeListener(listenerFunc)`](#removelistener) instead.

| Param              | Type                                                                                                                                        |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'did-start-loading'</code>                                                                                                            |
| **`listenerFunc`** | <code><a href="#browserviewlistenercallback">BrowserViewListenerCallback</a><<a href="#emptypayloaddata">EmptyPayloadData</a>></code> |

**Returns:** <code>Promise<<a href="#pluginlistenerhandle">PluginListenerHandle</a>> & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**Since:** 1.0.0

--------------------


### addListener('did-finish-load', ...)

```typescript
addListener(eventName: 'did-finish-load', listenerFunc: BrowserViewListenerCallback<EmptyPayloadData>) => Promise<PluginListenerHandle> & PluginListenerHandle
```

Calls `listenerFunc()` when the page has finished loading, i.e. the spinner of the tab has stopped spinning.
This does not guarantee that the next frame drawn by BrowserView will reflect the state of the DOM at this point.

**Note:** When using the Electron platform, [`PluginListenerHandle.remove()`](#pluginlistenerhandle) does not work due to limitations.
Use [`removeListener(listenerFunc)`](#removelistener) instead.

| Param              | Type                                                                                                                                        |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'did-finish-load'</code>                                                                                                              |
| **`listenerFunc`** | <code><a href="#browserviewlistenercallback">BrowserViewListenerCallback</a><<a href="#emptypayloaddata">EmptyPayloadData</a>></code> |

**Returns:** <code>Promise<<a href="#pluginlistenerhandle">PluginListenerHandle</a>> & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**Since:** 1.0.0

--------------------


### addListener('did-fail-load', ...)

```typescript
addListener(eventName: 'did-fail-load', listenerFunc: BrowserViewListenerCallback<ErrorPayloadData>) => Promise<PluginListenerHandle> & PluginListenerHandle
```

Calls `listenerFunc(data)` when the page failed to load. These errors usually indicate inability to connect to the server.

On Android at API level 23 or higher, this event is fired for any resource (iframe, image, etc.), not just for the main page.

The full list of error codes and their meaning is available [here](https://source.chromium.org/chromium/chromium/src/+/main:net/base/net_error_list.h).

**Note:** When using the Electron platform, [`PluginListenerHandle.remove()`](#pluginlistenerhandle) does not work due to limitations.
Use [`removeListener(listenerFunc)`](#removelistener) instead.

| Param              | Type                                                                                                                                        |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'did-fail-load'</code>                                                                                                                |
| **`listenerFunc`** | <code><a href="#browserviewlistenercallback">BrowserViewListenerCallback</a><<a href="#errorpayloaddata">ErrorPayloadData</a>></code> |

**Returns:** <code>Promise<<a href="#pluginlistenerhandle">PluginListenerHandle</a>> & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**Since:** 1.0.0

--------------------


### addListener('dom-ready', ...)

```typescript
addListener(eventName: 'dom-ready', listenerFunc: BrowserViewListenerCallback<EmptyPayloadData>) => Promise<PluginListenerHandle> & PluginListenerHandle
```

Calls `listenerFunc()` when the document in the top-level frame is loaded.

This callback is called when the body of the HTTP response has started loading, is reflected in the DOM,
and will be visible in subsequent draws. This callback occurs early in the document loading process,
and as such it should be expected that linked resources (for example, CSS and images) may not be available.

**Note:** On Android this event requires API level 23 or higher to be fired.

**Note:** When using the Electron platform, [`PluginListenerHandle.remove()`](#pluginlistenerhandle) does not work due to limitations.
Use [`removeListener(listenerFunc)`](#removelistener) instead.

| Param              | Type                                                                                                                                        |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'dom-ready'</code>                                                                                                                    |
| **`listenerFunc`** | <code><a href="#browserviewlistenercallback">BrowserViewListenerCallback</a><<a href="#emptypayloaddata">EmptyPayloadData</a>></code> |

**Returns:** <code>Promise<<a href="#pluginlistenerhandle">PluginListenerHandle</a>> & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**Since:** 1.0.0

--------------------


### addListener('http-error', ...)

```typescript
addListener(eventName: 'http-error', listenerFunc: BrowserViewListenerCallback<ResponsePayloadData>) => Promise<PluginListenerHandle> & PluginListenerHandle
```

Calls `listenerFunc(data)` when an HTTP error has been received from the server while loading a resource.
HTTP errors have status codes >= 400.

This callback will be called for any resource (iframe, image, etc.), not just for the main page.

**Note:** On Android this event requires API level 23 or higher to be fired.

**Note:** When using the Electron platform, [`PluginListenerHandle.remove()`](#pluginlistenerhandle) does not work due to limitations.
Use [`removeListener(listenerFunc)`](#removelistener) instead.

| Param              | Type                                                                                                                                              |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'http-error'</code>                                                                                                                         |
| **`listenerFunc`** | <code><a href="#browserviewlistenercallback">BrowserViewListenerCallback</a><<a href="#responsepayloaddata">ResponsePayloadData</a>></code> |

**Returns:** <code>Promise<<a href="#pluginlistenerhandle">PluginListenerHandle</a>> & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**Since:** 1.0.0

--------------------


### addListener('render-process-gone', ...)

```typescript
addListener(eventName: 'render-process-gone', listenerFunc: BrowserViewListenerCallback<RenderProcessGonePayloadData>) => Promise<PluginListenerHandle> & PluginListenerHandle
```

Calls `listenerFunc(data)` when the renderer process unexpectedly disappears.
This is normally because it was crashed or killed.

Multiple BrowserView instances may be associated with a single render process.
This callback will be called for each BrowserView that was affected.

The application's implementation of this callback should only attempt to clean up the specific BrowserView,
and should not assume that other BrowserView instances are affected.

The BrowserView can't be used, and should be removed from the application.

To cause an render process crash for test purpose, the application can
call `BrowserView.loadUrl("chrome://crash")` on the BrowserView.
Note that multiple BrowserView instances may be affected if they share a render process,
not just the specific BrowserView which loaded `chrome://crash`.

**Note:** On Android this event requires API level 26 or higher to be fired.

**Note:** When using the Electron platform, [`PluginListenerHandle.remove()`](#pluginlistenerhandle) does not work due to limitations.
Use [`removeListener(listenerFunc)`](#removelistener) instead.

| Param              | Type                                                                                                                                                                |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'render-process-gone'</code>                                                                                                                                  |
| **`listenerFunc`** | <code><a href="#browserviewlistenercallback">BrowserViewListenerCallback</a><<a href="#renderprocessgonepayloaddata">RenderProcessGonePayloadData</a>></code> |

**Returns:** <code>Promise<<a href="#pluginlistenerhandle">PluginListenerHandle</a>> & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**Since:** 1.0.0

--------------------


### addListener('unresponsive', ...)

```typescript
addListener(eventName: 'unresponsive', listenerFunc: BrowserViewListenerCallback<EmptyPayloadData>) => Promise<PluginListenerHandle> & PluginListenerHandle
```

Calls `listenerFunc()` when the renderer of the web page becomes unresponsive as a result
of a long running blocking task such as the execution of JavaScript.

If a BrowserView fails to process an input event, or successfully navigate to a new URL within a reasonable time frame,
the renderer is considered to be unresponsive, and this callback will be called.

**Note:** On Android this event requires API level 29 or higher to be fired.

**Note:** When using the Electron platform, [`PluginListenerHandle.remove()`](#pluginlistenerhandle) does not work due to limitations.
Use [`removeListener(listenerFunc)`](#removelistener) instead.

| Param              | Type                                                                                                                                        |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'unresponsive'</code>                                                                                                                 |
| **`listenerFunc`** | <code><a href="#browserviewlistenercallback">BrowserViewListenerCallback</a><<a href="#emptypayloaddata">EmptyPayloadData</a>></code> |

**Returns:** <code>Promise<<a href="#pluginlistenerhandle">PluginListenerHandle</a>> & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**Since:** 1.0.0

--------------------


### addListener('responsive', ...)

```typescript
addListener(eventName: 'responsive', listenerFunc: BrowserViewListenerCallback<EmptyPayloadData>) => Promise<PluginListenerHandle> & PluginListenerHandle
```

Calls `listenerFunc()` when the unresponsive renderer of the web page becomes responsive.

**Note:** On Android this event requires API level 29 or higher to be fired.

**Note:** When using the Electron platform, [`PluginListenerHandle.remove()`](#pluginlistenerhandle) does not work due to limitations.
Use [`removeListener(listenerFunc)`](#removelistener) instead.

| Param              | Type                                                                                                                                        |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'responsive'</code>                                                                                                                   |
| **`listenerFunc`** | <code><a href="#browserviewlistenercallback">BrowserViewListenerCallback</a><<a href="#emptypayloaddata">EmptyPayloadData</a>></code> |

**Returns:** <code>Promise<<a href="#pluginlistenerhandle">PluginListenerHandle</a>> & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**Since:** 1.0.0

--------------------


### addMessageListener(...)

```typescript
addMessageListener(eventName: string, listenerFunc: BrowserViewListenerCallback<MessageChannelCallbackData>) => Promise<PluginListenerHandle> & PluginListenerHandle
```

Listens to `eventName` and calls `listenerFunc(data)` when a new message arrives from the web page.

**Note:** This listener is only available if the bridge was enabled during the BrowserView creation or globally via the plugin configuration.

**Note:** When using the Electron platform, [`PluginListenerHandle.remove()`](#pluginlistenerhandle) does not work due to limitations.
Use [`removeListener(listenerFunc)`](#removelistener) instead.

| Param              | Type                                                                                                                                                            |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>string</code>                                                                                                                                             |
| **`listenerFunc`** | <code><a href="#browserviewlistenercallback">BrowserViewListenerCallback</a><<a href="#messagechannelcallbackdata">MessageChannelCallbackData</a>></code> |

**Returns:** <code>Promise<<a href="#pluginlistenerhandle">PluginListenerHandle</a>> & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**Since:** 1.0.0

--------------------


### removeListener(...)

```typescript
removeListener(listenerHandle: PluginListenerHandle) => Promise<void>
```

Removes the specified `listenerHandle` from the listener array for the event it refers to.

| Param                | Type                                                                  |
| -------------------- | --------------------------------------------------------------------- |
| **`listenerHandle`** | <code><a href="#pluginlistenerhandle">PluginListenerHandle</a></code> |

**Since:** 1.0.0

--------------------


### removeAllListeners(...)

```typescript
removeAllListeners(eventName?: string) => Promise<void>
```

Removes all listeners, or those of the specified `eventName`, of the BrowserView.

| Param           | Type                |
| --------------- | ------------------- |
| **`eventName`** | <code>string</code> |

**Since:** 1.0.0

--------------------


### Interfaces


#### CreateOptions

An interface containing the options used when creating a BrowserView.
They override the global plugin configurations for this specific BrowserView.

| Prop                       | Type                                    | Description                                                                                                                                                                                                                                      | Default            | Since |
| -------------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------ | ----- |
| **`url`**                  | <code>string</code>                     | Initial URL that is loaded immediately after the BrowserView has been created.                                                                                                                                                                   |                    | 1.0.0 |
| **`allowMultipleWindows`** | <code>boolean</code>                    | Open links that request a new tab or window _(e.g. by `window.open()`, a link with `target="_blank"`, shift+clicking on a link, or submitting a form with `<form target="_blank">`.)_ in the external browser instead of the BrowserViews. | <code>true</code>  | 1.0.0 |
| **`enableBridge`**         | <code>boolean</code>                    | Enable a bridge between the Capacitor layer and the loaded web page.                                                                                                                                                                             | <code>false</code> | 1.0.0 |
| **`overrideUserAgent`**    | <code>string</code>                     | Default user-agent.                                                                                                                                                                                                                              |                    | 1.0.0 |
| **`appendUserAgent`**      | <code>string</code>                     | String to append to the original user-agent. This is disregarded if `overrideUserAgent` is used.                                                                                                                                                 |                    | 1.0.0 |
| **`backgroundColor`**      | <code><a href="#color">Color</a></code> | Default background color.                                                                                                                                                                                                                        |                    | 1.0.0 |


#### BoundsPayloadData

| Prop         | Type                                            | Since |
| ------------ | ----------------------------------------------- | ----- |
| **`bounds`** | <code><a href="#rectangle">Rectangle</a></code> | 1.0.0 |


#### Rectangle

An interface that holds two integer coordinates and two integer dimensions for a rectangle.
The coordinates are specified in terms of the upper-left corner of the rectangle.
The width and height are the dimensions of the rectangle.
These fields can be accessed directly.

| Prop         | Type                | Description                                                           | Since |
| ------------ | ------------------- | --------------------------------------------------------------------- | ----- |
| **`x`**      | <code>number</code> | The x coordinate of the origin of the rectangle (must be an integer). | 1.0.0 |
| **`y`**      | <code>number</code> | The y coordinate of the origin of the rectangle (must be an integer). | 1.0.0 |
| **`width`**  | <code>number</code> | The width of the rectangle (must be an integer).                      | 1.0.0 |
| **`height`** | <code>number</code> | The height of the rectangle (must be an integer).                     | 1.0.0 |


#### ColorPayloadData

| Prop        | Type                                    | Since |
| ----------- | --------------------------------------- | ----- |
| **`color`** | <code><a href="#color">Color</a></code> | 1.0.0 |


#### UrlPayloadData

| Prop      | Type                | Description            | Since |
| --------- | ------------------- | ---------------------- | ----- |
| **`url`** | <code>string</code> | The URL of a web page. | 1.0.0 |


#### TitlePayloadData

| Prop        | Type                | Description              | Since |
| ----------- | ------------------- | ------------------------ | ----- |
| **`title`** | <code>string</code> | The title of a web page. | 1.0.0 |


#### CanGoBackPayloadData

| Prop            | Type                 | Description                                           | Since |
| --------------- | -------------------- | ----------------------------------------------------- | ----- |
| **`canGoBack`** | <code>boolean</code> | Whether the browser can go back to previous web page. | 1.0.0 |


#### CanGoForwardPayloadData

| Prop               | Type                 | Description                                          | Since |
| ------------------ | -------------------- | ---------------------------------------------------- | ----- |
| **`canGoForward`** | <code>boolean</code> | Whether the browser can go forward to next web page. | 1.0.0 |


#### UserAgentPayloadData

| Prop            | Type                | Description                          | Since |
| --------------- | ------------------- | ------------------------------------ | ----- |
| **`userAgent`** | <code>string</code> | The BrowserView's user-agent string. | 1.0.0 |


#### CodeExecuteResultData

| Prop         | Type             | Description                           | Since |
| ------------ | ---------------- | ------------------------------------- | ----- |
| **`result`** | <code>any</code> | The result of the execution (if any). | 1.0.0 |


#### CodeExecutePayloadData

| Prop       | Type                | Description                | Since |
| ---------- | ------------------- | -------------------------- | ----- |
| **`code`** | <code>string</code> | The JavaScript to execute. | 1.0.0 |


#### AllowMultipleWindowsPayloadData

| Prop                       | Type                 | Description                                                                                                                                                                                                                                                                                                        | Since |
| -------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----- |
| **`allowMultipleWindows`** | <code>boolean</code> | Whether the BrowserView supports multiple windows. If set to true, links that request a new tab or window _(e.g. by `window.open()`, a link with `target="_blank"`, shift+clicking on a link, or submitting a form with `<form target="_blank">`.)_ open in the external browser instead of the BrowserView. | 1.0.0 |


#### AllowedNavigationPayloadData

| Prop                    | Type                  | Description                                                                      | Since |
| ----------------------- | --------------------- | -------------------------------------------------------------------------------- | ----- |
| **`allowedNavigation`** | <code>string[]</code> | The list of regular expressions that the BrowserView can additional navigate to. | 1.0.0 |


#### MessageChannelPayloadData

The payload data to send a message to the web page via `eventName`,
along with arguments. Arguments will be serialized with JSON.

| Prop            | Type                | Description                          | Since |
| --------------- | ------------------- | ------------------------------------ | ----- |
| **`eventName`** | <code>string</code> | The name of the event being send to. | 1.0.0 |
| **`args`**      | <code>any[]</code>  | The array of arguments to send.      | 1.0.0 |


#### PluginListenerHandle

| Prop         | Type                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() => Promise<void&gt;</code> |


#### EmptyPayloadData

An empty interface that represents no data.


#### IconPayloadData

| Prop       | Type                | Description                                         | Since |
| ---------- | ------------------- | --------------------------------------------------- | ----- |
| **`icon`** | <code>string</code> | The favicon of a web page as base64 encoded string. | 1.0.0 |


#### ErrorPayloadData

| Prop        | Type                                                          | Description                           | Since |
| ----------- | ------------------------------------------------------------- | ------------------------------------- | ----- |
| **`error`** | <code><a href="#webresourceerror">WebResourceError</a></code> | Information about the error occurred. | 1.0.0 |


#### WebResourceError

An interface that encapsulates information about the error that occurred during loading of web resources.

| Prop                   | Type                | Description                                                                                                                                                                          | Since |
| ---------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----- |
| **`errorCode`**        | <code>number</code> | The error code of the error. The full list of error codes and their meaning is available [here](https://source.chromium.org/chromium/chromium/src/+/main:net/base/net_error_list.h). | 1.0.0 |
| **`errorDescription`** | <code>string</code> | A string describing the error. Descriptions are localized, and thus can be used for communicating the problem to the user.                                                           | 1.0.0 |
| **`validatedURL`**     | <code>string</code> | The URL that failed to load.                                                                                                                                                         | 1.0.0 |


#### ResponsePayloadData

| Prop                | Type                                                                | Description                           | Since |
| ------------------- | ------------------------------------------------------------------- | ------------------------------------- | ----- |
| **`url`**           | <code>string</code>                                                 | The URL that failed to load.          | 1.0.0 |
| **`errorResponse`** | <code><a href="#webresourceresponse">WebResourceResponse</a></code> | Information about the error occurred. | 1.0.0 |


#### WebResourceResponse

An interface that encapsulates a resource response about the error that occurred.

| Prop                   | Type                | Description                                               | Since |
| ---------------------- | ------------------- | --------------------------------------------------------- | ----- |
| **`httpResponseCode`** | <code>number</code> | The status code of the error response.                    | 1.0.0 |
| **`httpStatusText`**   | <code>string</code> | The description of the status code of the error response. | 1.0.0 |


#### RenderProcessGonePayloadData

| Prop          | Type                                                                        | Description                                 | Since |
| ------------- | --------------------------------------------------------------------------- | ------------------------------------------- | ----- |
| **`details`** | <code><a href="#renderprocessgonedetail">RenderProcessGoneDetail</a></code> | The reason why the renderer process exited. | 1.0.0 |


#### RenderProcessGoneDetail

An interface that encapsulates information about why the render process exited.
The application may use this to decide how to handle the situation.

| Prop          | Type                 | Description                                                                                                                                                                                         | Since |
| ------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`crashed`** | <code>boolean</code> | Indicates whether the render process was observed to crash, or whether it was killed by the system. If the render process was killed, this is most likely caused by the system being low on memory. | 1.0.0 |


#### MessageChannelCallbackData

The callback data object when a message from the web page arrives.

| Prop       | Type               | Description                      | Since |
| ---------- | ------------------ | -------------------------------- | ----- |
| **`args`** | <code>any[]</code> | The received array of arguments. | 1.0.0 |


### Type Aliases


#### Color

A string that represents a color.

Supported formats are `#RRGGBB` and `#AARRGGBB`. The following names are also accepted: `red`, `blue`, `green`, `black`, `white`, `gray`,
`cyan`, `magenta`, `yellow`, `darkgray`, `lightgrey`, `aqua`, `fuchsia`, `lime`, `maroon`, `navy`, `olive`, `purple`, `silver`, and `teal`.

<code>\`#${string}\` | 'red' | 'blue' | 'green' | 'black' | 'white' | 'gray' | 'cyan' | 'magenta' | 'yellow' | 'darkgray' | 'lightgrey' | 'aqua' | 'fuchsia' | 'lime' | 'maroon' | 'navy' | 'olive' | 'purple' | 'silver' | 'teal'</code>


#### BrowserViewListenerCallback

The callback function to be called when events are emitted.

<code>(data: T): void</code>

</docgen-api>

---

<p align="center">
  Made with ❤️ by Rene Hampölz
  <br><br>
  <a href="https://github.com/hampoelz"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"></a>
  <a href="https://www.instagram.com/rene_hampi/"><img src="https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white" alt="Instagram"></a>
  <a href="https://twitter.com/rene_hampi/"><img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white" alt="Twitter"></a>
</p>
