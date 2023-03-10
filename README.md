# capacitor-browserview

Embed additional web content into a Capacitor App

> **⚠ WIP - Work in Progress ⚠**
>
> The project is part of my diploma thesis, an overview can be found at [hampoelz/HTL_Diplomarbeit](https://github.com/hampoelz/HTL_Diplomarbeit).
>
> ⏰ Planed Deadline: March 2023

## Install

```bash
npm install capacitor-browserview
npx cap sync
```

## API

<docgen-index>

* [`createBrowserView(...)`](#createbrowserview)
* [`removeBrowserView(...)`](#removebrowserview)
* [`setBounds(...)`](#setbounds)
* [`getBounds(...)`](#getbounds)
* [`setBackgroundColor(...)`](#setbackgroundcolor)
* [`loadURL(...)`](#loadurl)
* [`getURL(...)`](#geturl)
* [`getTitle(...)`](#gettitle)
* [`stop(...)`](#stop)
* [`reload(...)`](#reload)
* [`canGoBack(...)`](#cangoback)
* [`canGoForward(...)`](#cangoforward)
* [`clearHistory(...)`](#clearhistory)
* [`goBack(...)`](#goback)
* [`goForward(...)`](#goforward)
* [`setUserAgent(...)`](#setuseragent)
* [`appendUserAgent(...)`](#appenduseragent)
* [`getUserAgent(...)`](#getuseragent)
* [`executeJavaScript(...)`](#executejavascript)
* [`setAllowMultipleWindows(...)`](#setallowmultiplewindows)
* [`getAllowMultipleWindows(...)`](#getallowmultiplewindows)
* [`getAllowedNavigation(...)`](#getallowednavigation)
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

### createBrowserView(...)

```typescript
createBrowserView(options?: CreateBrowserViewOptions | undefined) => Promise<{ value: BrowserView; }>
```

| Param         | Type                                                                          |
| ------------- | ----------------------------------------------------------------------------- |
| **`options`** | <code><a href="#createbrowserviewoptions">CreateBrowserViewOptions</a></code> |

**Returns:** <code>Promise&lt;{ value: <a href="#browserview">BrowserView</a>; }&gt;</code>

--------------------


### removeBrowserView(...)

```typescript
removeBrowserView(options: BrowserViewBoundsOptions) => void
```

| Param         | Type                                                                          |
| ------------- | ----------------------------------------------------------------------------- |
| **`options`** | <code><a href="#browserviewboundsoptions">BrowserViewBoundsOptions</a></code> |

--------------------


### setBounds(...)

```typescript
setBounds(options: BrowserViewBoundsOptions) => void
```

| Param         | Type                                                                          |
| ------------- | ----------------------------------------------------------------------------- |
| **`options`** | <code><a href="#browserviewboundsoptions">BrowserViewBoundsOptions</a></code> |

--------------------


### getBounds(...)

```typescript
getBounds(options: BrowserViewOptions) => Promise<{ value: Rectangle; }>
```

| Param         | Type                                                              |
| ------------- | ----------------------------------------------------------------- |
| **`options`** | <code><a href="#browserviewoptions">BrowserViewOptions</a></code> |

**Returns:** <code>Promise&lt;{ value: <a href="#rectangle">Rectangle</a>; }&gt;</code>

--------------------


### setBackgroundColor(...)

```typescript
setBackgroundColor(options: BrowserViewColorOptions) => void
```

| Param         | Type                                                                        |
| ------------- | --------------------------------------------------------------------------- |
| **`options`** | <code><a href="#browserviewcoloroptions">BrowserViewColorOptions</a></code> |

--------------------


### loadURL(...)

```typescript
loadURL(options: BrowserViewUrlOptions) => void
```

| Param         | Type                                                                    |
| ------------- | ----------------------------------------------------------------------- |
| **`options`** | <code><a href="#browserviewurloptions">BrowserViewUrlOptions</a></code> |

--------------------


### getURL(...)

```typescript
getURL(options: BrowserViewOptions) => Promise<{ value: string; }>
```

| Param         | Type                                                              |
| ------------- | ----------------------------------------------------------------- |
| **`options`** | <code><a href="#browserviewoptions">BrowserViewOptions</a></code> |

**Returns:** <code>Promise&lt;{ value: string; }&gt;</code>

--------------------


### getTitle(...)

```typescript
getTitle(options: BrowserViewOptions) => Promise<{ value: string; }>
```

| Param         | Type                                                              |
| ------------- | ----------------------------------------------------------------- |
| **`options`** | <code><a href="#browserviewoptions">BrowserViewOptions</a></code> |

**Returns:** <code>Promise&lt;{ value: string; }&gt;</code>

--------------------


### stop(...)

```typescript
stop(options: BrowserViewOptions) => void
```

| Param         | Type                                                              |
| ------------- | ----------------------------------------------------------------- |
| **`options`** | <code><a href="#browserviewoptions">BrowserViewOptions</a></code> |

--------------------


### reload(...)

```typescript
reload(options: BrowserViewOptions) => void
```

| Param         | Type                                                              |
| ------------- | ----------------------------------------------------------------- |
| **`options`** | <code><a href="#browserviewoptions">BrowserViewOptions</a></code> |

--------------------


### canGoBack(...)

```typescript
canGoBack(options: BrowserViewOptions) => Promise<{ value: boolean; }>
```

| Param         | Type                                                              |
| ------------- | ----------------------------------------------------------------- |
| **`options`** | <code><a href="#browserviewoptions">BrowserViewOptions</a></code> |

**Returns:** <code>Promise&lt;{ value: boolean; }&gt;</code>

--------------------


### canGoForward(...)

```typescript
canGoForward(options: BrowserViewOptions) => Promise<{ value: boolean; }>
```

| Param         | Type                                                              |
| ------------- | ----------------------------------------------------------------- |
| **`options`** | <code><a href="#browserviewoptions">BrowserViewOptions</a></code> |

**Returns:** <code>Promise&lt;{ value: boolean; }&gt;</code>

--------------------


### clearHistory(...)

```typescript
clearHistory(options: BrowserViewOptions) => void
```

| Param         | Type                                                              |
| ------------- | ----------------------------------------------------------------- |
| **`options`** | <code><a href="#browserviewoptions">BrowserViewOptions</a></code> |

--------------------


### goBack(...)

```typescript
goBack(options: BrowserViewOptions) => void
```

| Param         | Type                                                              |
| ------------- | ----------------------------------------------------------------- |
| **`options`** | <code><a href="#browserviewoptions">BrowserViewOptions</a></code> |

--------------------


### goForward(...)

```typescript
goForward(options: BrowserViewOptions) => void
```

| Param         | Type                                                              |
| ------------- | ----------------------------------------------------------------- |
| **`options`** | <code><a href="#browserviewoptions">BrowserViewOptions</a></code> |

--------------------


### setUserAgent(...)

```typescript
setUserAgent(options: BrowserViewUserAgentOptions) => void
```

| Param         | Type                                                                                |
| ------------- | ----------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#browserviewuseragentoptions">BrowserViewUserAgentOptions</a></code> |

--------------------


### appendUserAgent(...)

```typescript
appendUserAgent(options: BrowserViewUserAgentOptions) => void
```

| Param         | Type                                                                                |
| ------------- | ----------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#browserviewuseragentoptions">BrowserViewUserAgentOptions</a></code> |

--------------------


### getUserAgent(...)

```typescript
getUserAgent(options: BrowserViewOptions) => Promise<{ value: string; }>
```

| Param         | Type                                                              |
| ------------- | ----------------------------------------------------------------- |
| **`options`** | <code><a href="#browserviewoptions">BrowserViewOptions</a></code> |

**Returns:** <code>Promise&lt;{ value: string; }&gt;</code>

--------------------


### executeJavaScript(...)

```typescript
executeJavaScript(options: BrowserViewExecuteOptions) => void | Promise<{ value: string; }>
```

| Param         | Type                                                                            |
| ------------- | ------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#browserviewexecuteoptions">BrowserViewExecuteOptions</a></code> |

**Returns:** <code>void | Promise&lt;{ value: string; }&gt;</code>

--------------------


### setAllowMultipleWindows(...)

```typescript
setAllowMultipleWindows(options: BrowserViewWindowOptions) => void
```

| Param         | Type                                                                          |
| ------------- | ----------------------------------------------------------------------------- |
| **`options`** | <code><a href="#browserviewwindowoptions">BrowserViewWindowOptions</a></code> |

--------------------


### getAllowMultipleWindows(...)

```typescript
getAllowMultipleWindows(options: BrowserViewOptions) => Promise<{ value: boolean; }>
```

| Param         | Type                                                              |
| ------------- | ----------------------------------------------------------------- |
| **`options`** | <code><a href="#browserviewoptions">BrowserViewOptions</a></code> |

**Returns:** <code>Promise&lt;{ value: boolean; }&gt;</code>

--------------------


### getAllowedNavigation(...)

```typescript
getAllowedNavigation(options: BrowserViewOptions) => Promise<{ value: string[]; }>
```

| Param         | Type                                                              |
| ------------- | ----------------------------------------------------------------- |
| **`options`** | <code><a href="#browserviewoptions">BrowserViewOptions</a></code> |

**Returns:** <code>Promise&lt;{ value: string[]; }&gt;</code>

--------------------


### sendMessage(...)

```typescript
sendMessage(options: BrowserViewMessageOptions) => Promise<{ value: boolean; }>
```

| Param         | Type                                                                            |
| ------------- | ------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#browserviewmessageoptions">BrowserViewMessageOptions</a></code> |

**Returns:** <code>Promise&lt;{ value: boolean; }&gt;</code>

--------------------


### addListener('new-window', ...)

```typescript
addListener(eventName: 'new-window', listenerFunc: BrowserViewUrlListener) => Promise<PluginListenerHandle> & PluginListenerHandle
```

| Param              | Type                                                                      |
| ------------------ | ------------------------------------------------------------------------- |
| **`eventName`**    | <code>'new-window'</code>                                                 |
| **`listenerFunc`** | <code><a href="#browserviewurllistener">BrowserViewUrlListener</a></code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

--------------------


### addListener('close-window', ...)

```typescript
addListener(eventName: 'close-window', listenerFunc: BrowserViewListener) => Promise<PluginListenerHandle> & PluginListenerHandle
```

| Param              | Type                                                                |
| ------------------ | ------------------------------------------------------------------- |
| **`eventName`**    | <code>'close-window'</code>                                         |
| **`listenerFunc`** | <code><a href="#browserviewlistener">BrowserViewListener</a></code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

--------------------


### addListener('page-favicon-updated', ...)

```typescript
addListener(eventName: 'page-favicon-updated', listenerFunc: BrowserViewIconListener) => Promise<PluginListenerHandle> & PluginListenerHandle
```

| Param              | Type                                                                        |
| ------------------ | --------------------------------------------------------------------------- |
| **`eventName`**    | <code>'page-favicon-updated'</code>                                         |
| **`listenerFunc`** | <code><a href="#browserviewiconlistener">BrowserViewIconListener</a></code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

--------------------


### addListener('page-title-updated', ...)

```typescript
addListener(eventName: 'page-title-updated', listenerFunc: BrowserViewTitleListener) => Promise<PluginListenerHandle> & PluginListenerHandle
```

| Param              | Type                                                                          |
| ------------------ | ----------------------------------------------------------------------------- |
| **`eventName`**    | <code>'page-title-updated'</code>                                             |
| **`listenerFunc`** | <code><a href="#browserviewtitlelistener">BrowserViewTitleListener</a></code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

--------------------


### addListener('enter-html-full-screen', ...)

```typescript
addListener(eventName: 'enter-html-full-screen', listenerFunc: BrowserViewListener) => Promise<PluginListenerHandle> & PluginListenerHandle
```

| Param              | Type                                                                |
| ------------------ | ------------------------------------------------------------------- |
| **`eventName`**    | <code>'enter-html-full-screen'</code>                               |
| **`listenerFunc`** | <code><a href="#browserviewlistener">BrowserViewListener</a></code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

--------------------


### addListener('leave-html-full-screen', ...)

```typescript
addListener(eventName: 'leave-html-full-screen', listenerFunc: BrowserViewListener) => Promise<PluginListenerHandle> & PluginListenerHandle
```

| Param              | Type                                                                |
| ------------------ | ------------------------------------------------------------------- |
| **`eventName`**    | <code>'leave-html-full-screen'</code>                               |
| **`listenerFunc`** | <code><a href="#browserviewlistener">BrowserViewListener</a></code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

--------------------


### addListener('will-navigate', ...)

```typescript
addListener(eventName: 'will-navigate', listenerFunc: BrowserViewUrlListener) => Promise<PluginListenerHandle> & PluginListenerHandle
```

| Param              | Type                                                                      |
| ------------------ | ------------------------------------------------------------------------- |
| **`eventName`**    | <code>'will-navigate'</code>                                              |
| **`listenerFunc`** | <code><a href="#browserviewurllistener">BrowserViewUrlListener</a></code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

--------------------


### addListener('did-start-loading', ...)

```typescript
addListener(eventName: 'did-start-loading', listenerFunc: BrowserViewListener) => Promise<PluginListenerHandle> & PluginListenerHandle
```

| Param              | Type                                                                |
| ------------------ | ------------------------------------------------------------------- |
| **`eventName`**    | <code>'did-start-loading'</code>                                    |
| **`listenerFunc`** | <code><a href="#browserviewlistener">BrowserViewListener</a></code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

--------------------


### addListener('did-frame-finish-load', ...)

```typescript
addListener(eventName: 'did-frame-finish-load', listenerFunc: BrowserViewListener) => Promise<PluginListenerHandle> & PluginListenerHandle
```

| Param              | Type                                                                |
| ------------------ | ------------------------------------------------------------------- |
| **`eventName`**    | <code>'did-frame-finish-load'</code>                                |
| **`listenerFunc`** | <code><a href="#browserviewlistener">BrowserViewListener</a></code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

--------------------


### addListener('did-finish-load', ...)

```typescript
addListener(eventName: 'did-finish-load', listenerFunc: BrowserViewListener) => Promise<PluginListenerHandle> & PluginListenerHandle
```

| Param              | Type                                                                |
| ------------------ | ------------------------------------------------------------------- |
| **`eventName`**    | <code>'did-finish-load'</code>                                      |
| **`listenerFunc`** | <code><a href="#browserviewlistener">BrowserViewListener</a></code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

--------------------


### addListener('did-fail-load', ...)

```typescript
addListener(eventName: 'did-fail-load', listenerFunc: BrowserViewErrorListener) => Promise<PluginListenerHandle> & PluginListenerHandle
```

| Param              | Type                                                                          |
| ------------------ | ----------------------------------------------------------------------------- |
| **`eventName`**    | <code>'did-fail-load'</code>                                                  |
| **`listenerFunc`** | <code><a href="#browserviewerrorlistener">BrowserViewErrorListener</a></code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

--------------------


### addListener('dom-ready', ...)

```typescript
addListener(eventName: 'dom-ready', listenerFunc: BrowserViewListener) => Promise<PluginListenerHandle> & PluginListenerHandle
```

| Param              | Type                                                                |
| ------------------ | ------------------------------------------------------------------- |
| **`eventName`**    | <code>'dom-ready'</code>                                            |
| **`listenerFunc`** | <code><a href="#browserviewlistener">BrowserViewListener</a></code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

--------------------


### addListener('http-error', ...)

```typescript
addListener(eventName: 'http-error', listenerFunc: BrowserViewResponseListener) => Promise<PluginListenerHandle> & PluginListenerHandle
```

| Param              | Type                                                                                |
| ------------------ | ----------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'http-error'</code>                                                           |
| **`listenerFunc`** | <code><a href="#browserviewresponselistener">BrowserViewResponseListener</a></code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

--------------------


### addListener('render-process-gone', ...)

```typescript
addListener(eventName: 'render-process-gone', listenerFunc: BrowserViewRenderProcessGoneListener) => Promise<PluginListenerHandle> & PluginListenerHandle
```

| Param              | Type                                                                                                  |
| ------------------ | ----------------------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'render-process-gone'</code>                                                                    |
| **`listenerFunc`** | <code><a href="#browserviewrenderprocessgonelistener">BrowserViewRenderProcessGoneListener</a></code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

--------------------


### addListener('unresponsive', ...)

```typescript
addListener(eventName: 'unresponsive', listenerFunc: BrowserViewListener) => Promise<PluginListenerHandle> & PluginListenerHandle
```

| Param              | Type                                                                |
| ------------------ | ------------------------------------------------------------------- |
| **`eventName`**    | <code>'unresponsive'</code>                                         |
| **`listenerFunc`** | <code><a href="#browserviewlistener">BrowserViewListener</a></code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

--------------------


### addListener('responsive', ...)

```typescript
addListener(eventName: 'responsive', listenerFunc: BrowserViewListener) => Promise<PluginListenerHandle> & PluginListenerHandle
```

| Param              | Type                                                                |
| ------------------ | ------------------------------------------------------------------- |
| **`eventName`**    | <code>'responsive'</code>                                           |
| **`listenerFunc`** | <code><a href="#browserviewlistener">BrowserViewListener</a></code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

--------------------


### addListener(`channel-${string}`, ...)

```typescript
addListener(eventName: ChannelEventName<string>, listenerFunc: BrowserViewChannelListener) => Promise<PluginListenerHandle> & PluginListenerHandle
```

| Param              | Type                                                                              |
| ------------------ | --------------------------------------------------------------------------------- |
| **`eventName`**    | <code>`channel-${string}`</code>                                                  |
| **`listenerFunc`** | <code><a href="#browserviewchannellistener">BrowserViewChannelListener</a></code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

--------------------


### Interfaces


#### BrowserView

| Prop       | Type                |
| ---------- | ------------------- |
| **`uuid`** | <code>string</code> |


#### CreateBrowserViewOptions

| Prop               | Type                 | Default            |
| ------------------ | -------------------- | ------------------ |
| **`enableBridge`** | <code>boolean</code> | <code>false</code> |


#### BrowserViewBoundsOptions

| Prop              | Type                                                |
| ----------------- | --------------------------------------------------- |
| **`browserView`** | <code><a href="#browserview">BrowserView</a></code> |
| **`bounds`**      | <code><a href="#rectangle">Rectangle</a></code>     |


#### Rectangle

| Prop         | Type                |
| ------------ | ------------------- |
| **`x`**      | <code>number</code> |
| **`y`**      | <code>number</code> |
| **`width`**  | <code>number</code> |
| **`height`** | <code>number</code> |


#### BrowserViewOptions

| Prop              | Type                                                |
| ----------------- | --------------------------------------------------- |
| **`browserView`** | <code><a href="#browserview">BrowserView</a></code> |


#### BrowserViewColorOptions

| Prop              | Type                                                |
| ----------------- | --------------------------------------------------- |
| **`browserView`** | <code><a href="#browserview">BrowserView</a></code> |
| **`color`**       | <code>string</code>                                 |


#### BrowserViewUrlOptions

| Prop              | Type                                                |
| ----------------- | --------------------------------------------------- |
| **`browserView`** | <code><a href="#browserview">BrowserView</a></code> |
| **`url`**         | <code>string</code>                                 |


#### BrowserViewUserAgentOptions

| Prop              | Type                                                |
| ----------------- | --------------------------------------------------- |
| **`browserView`** | <code><a href="#browserview">BrowserView</a></code> |
| **`userAgent`**   | <code>string</code>                                 |


#### BrowserViewExecuteOptions

| Prop              | Type                                                |
| ----------------- | --------------------------------------------------- |
| **`browserView`** | <code><a href="#browserview">BrowserView</a></code> |
| **`code`**        | <code>string</code>                                 |


#### BrowserViewWindowOptions

| Prop                       | Type                                                | Default           |
| -------------------------- | --------------------------------------------------- | ----------------- |
| **`browserView`**          | <code><a href="#browserview">BrowserView</a></code> |                   |
| **`allowMultipleWindows`** | <code>boolean</code>                                | <code>true</code> |


#### BrowserViewMessageOptions

| Prop              | Type                                                                        |
| ----------------- | --------------------------------------------------------------------------- |
| **`browserView`** | <code><a href="#browserview">BrowserView</a></code>                         |
| **`eventName`**   | <code><a href="#channeleventname">ChannelEventName</a>&lt;string&gt;</code> |
| **`args`**        | <code>any[]</code>                                                          |


#### PluginListenerHandle

| Prop         | Type                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |


#### Int8Array

A typed array of 8-bit integer values. The contents are initialized to 0. If the requested
number of bytes could not be allocated an exception is raised.

| Prop                    | Type                                                        | Description                                                                  |
| ----------------------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------- |
| **`BYTES_PER_ELEMENT`** | <code>number</code>                                         | The size in bytes of each element in the array.                              |
| **`buffer`**            | <code><a href="#arraybufferlike">ArrayBufferLike</a></code> | The <a href="#arraybuffer">ArrayBuffer</a> instance referenced by the array. |
| **`byteLength`**        | <code>number</code>                                         | The length in bytes of the array.                                            |
| **`byteOffset`**        | <code>number</code>                                         | The offset in bytes of the array.                                            |
| **`length`**            | <code>number</code>                                         | The length of the array.                                                     |

| Method             | Signature                                                                                                                                                                    | Description                                                                                                                                                                                                                                 |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **copyWithin**     | (target: number, start: number, end?: number \| undefined) =&gt; this                                                                                                        | Returns the this object after copying a section of the array identified by start and end to the same array starting at position target                                                                                                      |
| **every**          | (predicate: (value: number, index: number, array: <a href="#int8array">Int8Array</a>) =&gt; unknown, thisArg?: any) =&gt; boolean                                            | Determines whether all the members of an array satisfy the specified test.                                                                                                                                                                  |
| **fill**           | (value: number, start?: number \| undefined, end?: number \| undefined) =&gt; this                                                                                           | Returns the this object after filling the section identified by start and end with value                                                                                                                                                    |
| **filter**         | (predicate: (value: number, index: number, array: <a href="#int8array">Int8Array</a>) =&gt; any, thisArg?: any) =&gt; <a href="#int8array">Int8Array</a>                     | Returns the elements of an array that meet the condition specified in a callback function.                                                                                                                                                  |
| **find**           | (predicate: (value: number, index: number, obj: <a href="#int8array">Int8Array</a>) =&gt; boolean, thisArg?: any) =&gt; number \| undefined                                  | Returns the value of the first element in the array where predicate is true, and undefined otherwise.                                                                                                                                       |
| **findIndex**      | (predicate: (value: number, index: number, obj: <a href="#int8array">Int8Array</a>) =&gt; boolean, thisArg?: any) =&gt; number                                               | Returns the index of the first element in the array where predicate is true, and -1 otherwise.                                                                                                                                              |
| **forEach**        | (callbackfn: (value: number, index: number, array: <a href="#int8array">Int8Array</a>) =&gt; void, thisArg?: any) =&gt; void                                                 | Performs the specified action for each element in an array.                                                                                                                                                                                 |
| **indexOf**        | (searchElement: number, fromIndex?: number \| undefined) =&gt; number                                                                                                        | Returns the index of the first occurrence of a value in an array.                                                                                                                                                                           |
| **join**           | (separator?: string \| undefined) =&gt; string                                                                                                                               | Adds all the elements of an array separated by the specified separator string.                                                                                                                                                              |
| **lastIndexOf**    | (searchElement: number, fromIndex?: number \| undefined) =&gt; number                                                                                                        | Returns the index of the last occurrence of a value in an array.                                                                                                                                                                            |
| **map**            | (callbackfn: (value: number, index: number, array: <a href="#int8array">Int8Array</a>) =&gt; number, thisArg?: any) =&gt; <a href="#int8array">Int8Array</a>                 | Calls a defined callback function on each element of an array, and returns an array that contains the results.                                                                                                                              |
| **reduce**         | (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: <a href="#int8array">Int8Array</a>) =&gt; number) =&gt; number                       | Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.                      |
| **reduce**         | (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: <a href="#int8array">Int8Array</a>) =&gt; number, initialValue: number) =&gt; number |                                                                                                                                                                                                                                             |
| **reduce**         | &lt;U&gt;(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: <a href="#int8array">Int8Array</a>) =&gt; U, initialValue: U) =&gt; U            | Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.                      |
| **reduceRight**    | (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: <a href="#int8array">Int8Array</a>) =&gt; number) =&gt; number                       | Calls the specified callback function for all the elements in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function. |
| **reduceRight**    | (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: <a href="#int8array">Int8Array</a>) =&gt; number, initialValue: number) =&gt; number |                                                                                                                                                                                                                                             |
| **reduceRight**    | &lt;U&gt;(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: <a href="#int8array">Int8Array</a>) =&gt; U, initialValue: U) =&gt; U            | Calls the specified callback function for all the elements in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function. |
| **reverse**        | () =&gt; <a href="#int8array">Int8Array</a>                                                                                                                                  | Reverses the elements in an Array.                                                                                                                                                                                                          |
| **set**            | (array: <a href="#arraylike">ArrayLike</a>&lt;number&gt;, offset?: number \| undefined) =&gt; void                                                                           | Sets a value or an array of values.                                                                                                                                                                                                         |
| **slice**          | (start?: number \| undefined, end?: number \| undefined) =&gt; <a href="#int8array">Int8Array</a>                                                                            | Returns a section of an array.                                                                                                                                                                                                              |
| **some**           | (predicate: (value: number, index: number, array: <a href="#int8array">Int8Array</a>) =&gt; unknown, thisArg?: any) =&gt; boolean                                            | Determines whether the specified callback function returns true for any element of an array.                                                                                                                                                |
| **sort**           | (compareFn?: ((a: number, b: number) =&gt; number) \| undefined) =&gt; this                                                                                                  | Sorts an array.                                                                                                                                                                                                                             |
| **subarray**       | (begin?: number \| undefined, end?: number \| undefined) =&gt; <a href="#int8array">Int8Array</a>                                                                            | Gets a new <a href="#int8array">Int8Array</a> view of the <a href="#arraybuffer">ArrayBuffer</a> store for this array, referencing the elements at begin, inclusive, up to end, exclusive.                                                  |
| **toLocaleString** | () =&gt; string                                                                                                                                                              | Converts a number to a string by using the current locale.                                                                                                                                                                                  |
| **toString**       | () =&gt; string                                                                                                                                                              | Returns a string representation of an array.                                                                                                                                                                                                |
| **valueOf**        | () =&gt; <a href="#int8array">Int8Array</a>                                                                                                                                  | Returns the primitive value of the specified object.                                                                                                                                                                                        |


#### ArrayLike

| Prop         | Type                |
| ------------ | ------------------- |
| **`length`** | <code>number</code> |


#### ArrayBufferTypes

Allowed <a href="#arraybuffer">ArrayBuffer</a> types for the buffer of an ArrayBufferView and related Typed Arrays.

| Prop              | Type                                                |
| ----------------- | --------------------------------------------------- |
| **`ArrayBuffer`** | <code><a href="#arraybuffer">ArrayBuffer</a></code> |


#### ArrayBuffer

Represents a raw buffer of binary data, which is used to store data for the
different typed arrays. ArrayBuffers cannot be read from or written to directly,
but can be passed to a typed array or DataView Object to interpret the raw
buffer as needed.

| Prop             | Type                | Description                                                                     |
| ---------------- | ------------------- | ------------------------------------------------------------------------------- |
| **`byteLength`** | <code>number</code> | Read-only. The length of the <a href="#arraybuffer">ArrayBuffer</a> (in bytes). |

| Method    | Signature                                                                               | Description                                                     |
| --------- | --------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| **slice** | (begin: number, end?: number \| undefined) =&gt; <a href="#arraybuffer">ArrayBuffer</a> | Returns a section of an <a href="#arraybuffer">ArrayBuffer</a>. |


#### WebResourceError

| Prop                   | Type                |
| ---------------------- | ------------------- |
| **`errorCode`**        | <code>number</code> |
| **`errorDescription`** | <code>string</code> |
| **`validatedURL`**     | <code>string</code> |


#### WebResourceResponse

| Prop                   | Type                |
| ---------------------- | ------------------- |
| **`httpResponseCode`** | <code>number</code> |
| **`httpStatusText`**   | <code>string</code> |


#### RenderProcessGoneDetail

| Prop          | Type                 |
| ------------- | -------------------- |
| **`crashed`** | <code>boolean</code> |


#### ChannelListenerEvent

| Prop       | Type               |
| ---------- | ------------------ |
| **`args`** | <code>any[]</code> |


### Type Aliases


#### ChannelEventName

<code>`channel-${TChannel}`</code>


#### BrowserViewUrlListener

<code>(browserView: <a href="#browserview">BrowserView</a>, url: string): void</code>


#### BrowserViewListener

<code>(browserView: <a href="#browserview">BrowserView</a>): void</code>


#### BrowserViewIconListener

<code>(browserView: <a href="#browserview">BrowserView</a>, icon: <a href="#int8array">Int8Array</a>): void</code>


#### ArrayBufferLike

<code>ArrayBufferTypes[keyof ArrayBufferTypes]</code>


#### BrowserViewTitleListener

<code>(browserView: <a href="#browserview">BrowserView</a>, title: string): void</code>


#### BrowserViewErrorListener

<code>(browserView: <a href="#browserview">BrowserView</a>, error: <a href="#webresourceerror">WebResourceError</a>): void</code>


#### BrowserViewResponseListener

<code>(browserView: <a href="#browserview">BrowserView</a>, url: string, errorResponse: <a href="#webresourceresponse">WebResourceResponse</a>): void</code>


#### BrowserViewRenderProcessGoneListener

<code>(browserView: <a href="#browserview">BrowserView</a>, details: <a href="#renderprocessgonedetail">RenderProcessGoneDetail</a>): void</code>


#### BrowserViewChannelListener

<code>(browserView: <a href="#browserview">BrowserView</a>, event: <a href="#channellistenerevent">ChannelListenerEvent</a>): void</code>

</docgen-api>
