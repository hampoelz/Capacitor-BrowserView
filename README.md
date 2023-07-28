# capacitor-browserview

Embed additional web content into a Capacitor App

> **⚠ WIP - Work in Progress ⚠**
>
> The project is part of my diploma thesis, an overview can be found at [hampoelz/HTL_Diplomarbeit](https://github.com/hampoelz/HTL_Diplomarbeit).
>
> ⏰ Planed Deadline: September 2023

## Install

```bash
npm install capacitor-browserview
npx cap sync
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
