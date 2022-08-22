# capacitor-browserview

Embed additional web content into a Capacitor App

> ⚠ WIP - Work in Progress ⚠

## Install

```bash
npm install capacitor-browserview
npx cap sync
```

## API

<docgen-index>

* [`createBrowserView()`](#createbrowserview)
* [`setAutoResize(...)`](#setautoresize)
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
* [`getUserAgent(...)`](#getuseragent)
* [`executeJavaScript(...)`](#executejavascript)
* [`setZoomFactor(...)`](#setzoomfactor)
* [`addListener(...)`](#addlistener)
* [`addListener(...)`](#addlistener)
* [`addListener(...)`](#addlistener)
* [`addListener(...)`](#addlistener)
* [`addListener(...)`](#addlistener)
* [`addListener(...)`](#addlistener)
* [`addListener(...)`](#addlistener)
* [`addListener(...)`](#addlistener)
* [`addListener(...)`](#addlistener)
* [Interfaces](#interfaces)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### createBrowserView()

```typescript
createBrowserView() => any
```

Create <a href="#browserview">BrowserView</a>

**Returns:** <code>any</code>

--------------------


### setAutoResize(...)

```typescript
setAutoResize(browserView: BrowserView, options: AutoResizeOptions) => void
```

| Param             | Type                                                            |
| ----------------- | --------------------------------------------------------------- |
| **`browserView`** | <code><a href="#browserview">BrowserView</a></code>             |
| **`options`**     | <code><a href="#autoresizeoptions">AutoResizeOptions</a></code> |

--------------------


### setBounds(...)

```typescript
setBounds(browserView: BrowserView, bounds: Rectangle) => void
```

| Param             | Type                                                |
| ----------------- | --------------------------------------------------- |
| **`browserView`** | <code><a href="#browserview">BrowserView</a></code> |
| **`bounds`**      | <code><a href="#rectangle">Rectangle</a></code>     |

--------------------


### getBounds(...)

```typescript
getBounds(browserView: BrowserView) => any
```

| Param             | Type                                                |
| ----------------- | --------------------------------------------------- |
| **`browserView`** | <code><a href="#browserview">BrowserView</a></code> |

**Returns:** <code>any</code>

--------------------


### setBackgroundColor(...)

```typescript
setBackgroundColor(browserView: BrowserView, color: string) => void
```

| Param             | Type                                                |
| ----------------- | --------------------------------------------------- |
| **`browserView`** | <code><a href="#browserview">BrowserView</a></code> |
| **`color`**       | <code>string</code>                                 |

--------------------


### loadURL(...)

```typescript
loadURL(browserView: BrowserView, url: string) => void
```

| Param             | Type                                                |
| ----------------- | --------------------------------------------------- |
| **`browserView`** | <code><a href="#browserview">BrowserView</a></code> |
| **`url`**         | <code>string</code>                                 |

--------------------


### getURL(...)

```typescript
getURL(browserView: BrowserView) => any
```

| Param             | Type                                                |
| ----------------- | --------------------------------------------------- |
| **`browserView`** | <code><a href="#browserview">BrowserView</a></code> |

**Returns:** <code>any</code>

--------------------


### getTitle(...)

```typescript
getTitle(browserView: BrowserView) => any
```

| Param             | Type                                                |
| ----------------- | --------------------------------------------------- |
| **`browserView`** | <code><a href="#browserview">BrowserView</a></code> |

**Returns:** <code>any</code>

--------------------


### stop(...)

```typescript
stop(browserView: BrowserView) => void
```

| Param             | Type                                                |
| ----------------- | --------------------------------------------------- |
| **`browserView`** | <code><a href="#browserview">BrowserView</a></code> |

--------------------


### reload(...)

```typescript
reload(browserView: BrowserView) => void
```

| Param             | Type                                                |
| ----------------- | --------------------------------------------------- |
| **`browserView`** | <code><a href="#browserview">BrowserView</a></code> |

--------------------


### canGoBack(...)

```typescript
canGoBack(browserView: BrowserView) => any
```

| Param             | Type                                                |
| ----------------- | --------------------------------------------------- |
| **`browserView`** | <code><a href="#browserview">BrowserView</a></code> |

**Returns:** <code>any</code>

--------------------


### canGoForward(...)

```typescript
canGoForward(browserView: BrowserView) => any
```

| Param             | Type                                                |
| ----------------- | --------------------------------------------------- |
| **`browserView`** | <code><a href="#browserview">BrowserView</a></code> |

**Returns:** <code>any</code>

--------------------


### clearHistory(...)

```typescript
clearHistory(browserView: BrowserView) => void
```

| Param             | Type                                                |
| ----------------- | --------------------------------------------------- |
| **`browserView`** | <code><a href="#browserview">BrowserView</a></code> |

--------------------


### goBack(...)

```typescript
goBack(browserView: BrowserView) => void
```

| Param             | Type                                                |
| ----------------- | --------------------------------------------------- |
| **`browserView`** | <code><a href="#browserview">BrowserView</a></code> |

--------------------


### goForward(...)

```typescript
goForward(browserView: BrowserView) => void
```

| Param             | Type                                                |
| ----------------- | --------------------------------------------------- |
| **`browserView`** | <code><a href="#browserview">BrowserView</a></code> |

--------------------


### setUserAgent(...)

```typescript
setUserAgent(browserView: BrowserView, userAgent: string) => void
```

| Param             | Type                                                |
| ----------------- | --------------------------------------------------- |
| **`browserView`** | <code><a href="#browserview">BrowserView</a></code> |
| **`userAgent`**   | <code>string</code>                                 |

--------------------


### getUserAgent(...)

```typescript
getUserAgent(browserView: BrowserView) => any
```

| Param             | Type                                                |
| ----------------- | --------------------------------------------------- |
| **`browserView`** | <code><a href="#browserview">BrowserView</a></code> |

**Returns:** <code>any</code>

--------------------


### executeJavaScript(...)

```typescript
executeJavaScript(browserView: BrowserView, code: string) => any
```

| Param             | Type                                                |
| ----------------- | --------------------------------------------------- |
| **`browserView`** | <code><a href="#browserview">BrowserView</a></code> |
| **`code`**        | <code>string</code>                                 |

**Returns:** <code>any</code>

--------------------


### setZoomFactor(...)

```typescript
setZoomFactor(browserView: BrowserView, factor: number) => void
```

| Param             | Type                                                |
| ----------------- | --------------------------------------------------- |
| **`browserView`** | <code><a href="#browserview">BrowserView</a></code> |
| **`factor`**      | <code>number</code>                                 |

--------------------


### addListener(...)

```typescript
addListener(eventName: 'did-finish-load', listenerFunc: FinishLoadListener) => Promise<PluginListenerHandle> & PluginListenerHandle
```

| Param              | Type                                                                                       |
| ------------------ | ------------------------------------------------------------------------------------------ |
| **`eventName`**    | <code>"did-finish-load"</code>                                                             |
| **`listenerFunc`** | <code>(browserView: <a href="#browserview">BrowserView</a>, url: string) =&gt; void</code> |

**Returns:** <code>any</code>

--------------------


### addListener(...)

```typescript
addListener(eventName: 'did-stop-loading', listenerFunc: StopLoadingListener) => Promise<PluginListenerHandle> & PluginListenerHandle
```

| Param              | Type                                                                          |
| ------------------ | ----------------------------------------------------------------------------- |
| **`eventName`**    | <code>"did-stop-loading"</code>                                               |
| **`listenerFunc`** | <code>(browserView: <a href="#browserview">BrowserView</a>) =&gt; void</code> |

**Returns:** <code>any</code>

--------------------


### addListener(...)

```typescript
addListener(eventName: 'did-fail-load', listenerFunc: FailLoadListener) => Promise<PluginListenerHandle> & PluginListenerHandle
```

| Param              | Type                                                                                                   |
| ------------------ | ------------------------------------------------------------------------------------------------------ |
| **`eventName`**    | <code>"did-fail-load"</code>                                                                           |
| **`listenerFunc`** | <code>(browserView: <a href="#browserview">BrowserView</a>, error: WebResourceError) =&gt; void</code> |

**Returns:** <code>any</code>

--------------------


### addListener(...)

```typescript
addListener(eventName: 'did-start-loading', listenerFunc: StartLoadingListener) => Promise<PluginListenerHandle> & PluginListenerHandle
```

| Param              | Type                                                                          |
| ------------------ | ----------------------------------------------------------------------------- |
| **`eventName`**    | <code>"did-start-loading"</code>                                              |
| **`listenerFunc`** | <code>(browserView: <a href="#browserview">BrowserView</a>) =&gt; void</code> |

**Returns:** <code>any</code>

--------------------


### addListener(...)

```typescript
addListener(eventName: 'did-start-navigation', listenerFunc: StartNavigationListener) => Promise<PluginListenerHandle> & PluginListenerHandle
```

| Param              | Type                                                                                       |
| ------------------ | ------------------------------------------------------------------------------------------ |
| **`eventName`**    | <code>"did-start-navigation"</code>                                                        |
| **`listenerFunc`** | <code>(browserView: <a href="#browserview">BrowserView</a>, url: string) =&gt; void</code> |

**Returns:** <code>any</code>

--------------------


### addListener(...)

```typescript
addListener(eventName: 'dom-ready', listenerFunc: DomReadyListener) => Promise<PluginListenerHandle> & PluginListenerHandle
```

| Param              | Type                                                                          |
| ------------------ | ----------------------------------------------------------------------------- |
| **`eventName`**    | <code>"dom-ready"</code>                                                      |
| **`listenerFunc`** | <code>(browserView: <a href="#browserview">BrowserView</a>) =&gt; void</code> |

**Returns:** <code>any</code>

--------------------


### addListener(...)

```typescript
addListener(eventName: 'will-navigate', listenerFunc: WillNavigateListener) => Promise<PluginListenerHandle> & PluginListenerHandle
```

| Param              | Type                                                                                       |
| ------------------ | ------------------------------------------------------------------------------------------ |
| **`eventName`**    | <code>"will-navigate"</code>                                                               |
| **`listenerFunc`** | <code>(browserView: <a href="#browserview">BrowserView</a>, url: string) =&gt; void</code> |

**Returns:** <code>any</code>

--------------------


### addListener(...)

```typescript
addListener(eventName: 'render-process-gone', listenerFunc: RenderProcessGoneListener) => Promise<PluginListenerHandle> & PluginListenerHandle
```

| Param              | Type                                                                                                            |
| ------------------ | --------------------------------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>"render-process-gone"</code>                                                                              |
| **`listenerFunc`** | <code>(browserView: <a href="#browserview">BrowserView</a>, details: RenderProcessGoneDetail) =&gt; void</code> |

**Returns:** <code>any</code>

--------------------


### addListener(...)

```typescript
addListener(eventName: 'http-error', listenerFunc: HttpErrorListener) => Promise<PluginListenerHandle> & PluginListenerHandle
```

| Param              | Type                                                            |
| ------------------ | --------------------------------------------------------------- |
| **`eventName`**    | <code>"http-error"</code>                                       |
| **`listenerFunc`** | <code><a href="#httperrorlistener">HttpErrorListener</a></code> |

**Returns:** <code>any</code>

--------------------


### Interfaces


#### BrowserView


#### AutoResizeOptions

| Prop             | Type                 |
| ---------------- | -------------------- |
| **`width`**      | <code>boolean</code> |
| **`height`**     | <code>any</code>     |
| **`horizontal`** | <code>boolean</code> |
| **`vertical`**   | <code>boolean</code> |


#### Rectangle

| Prop         | Type                |
| ------------ | ------------------- |
| **`x`**      | <code>number</code> |
| **`y`**      | <code>number</code> |
| **`width`**  | <code>number</code> |
| **`height`** | <code>number</code> |


#### PluginListenerHandle

| Prop         | Type                      |
| ------------ | ------------------------- |
| **`remove`** | <code>() =&gt; any</code> |


#### HttpErrorListener

| Prop        | Type                                                      |
| ----------- | --------------------------------------------------------- |
| **`event`** | <code><a href="#httperrorevent">HttpErrorEvent</a></code> |


#### HttpErrorEvent

| Prop                | Type                                                                |
| ------------------- | ------------------------------------------------------------------- |
| **`url`**           | <code>string</code>                                                 |
| **`errorResponse`** | <code><a href="#webresourceresponse">WebResourceResponse</a></code> |


#### WebResourceResponse

| Prop                   | Type                |
| ---------------------- | ------------------- |
| **`httpResponseCode`** | <code>number</code> |
| **`httpStatusText`**   | <code>string</code> |

</docgen-api>
