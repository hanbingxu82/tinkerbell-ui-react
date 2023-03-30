---
group:
  title: 通知
  order: 4
nav:
  title: Components
  path: /components
---

# LoadingBar 顶部加载

全局创建一个显示页面加载、异步请求、文件上传等的加载进度条。

## 在路由中使用

LoadingBar 只会在全局创建一个，因此在任何位置调用的方法都会控制这同一个组件。 主要使用场景是路由切换和 Ajax，因为这两者都不能拿到精确的进度，LoadingBar 会模拟进度，具体见 API。

`app.ts`

```javascript
import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

import NProgress from './components/NProgress'

const Home = React.lazy(() => import('./pages/Home'))

const App: React.FC = () => {
  return (
    <Suspense fallback={<NProgress />}>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </Suspense>
  )
}

export default App
```

`components/NProgress.tsx`

```javascript
import React, { useEffect, Fragment } from 'react'
import { LoadingBar } from 'tinkerbell-ui-react'

const NProgress: React.FC = () => {
  useEffect(() => {
    LoadingBar.start()
    return () => {
      LoadingBar.end()
    }
  }, [])
  return <Fragment />
}

export default NProgress
```

## 代码实例

点击 Start 开始进度，点击 Done 结束。在调用 start()方法后，组件会自动模拟进度，当调用 done()或 error()时，补全进度并自动消失。

```tsx
import { Button, LoadingBar } from 'tinkerbell-ui-react'
import React from 'react'

function start() {
  LoadingBar.start()
}
function end() {
  LoadingBar.end()
}
function error() {
  LoadingBar.error()
}

const App: React.FC = () => (
  <>
    <Button onClick={start}>Start</Button>
    <Button onClick={end}>Done</Button>
    <Button onClick={error}>Error</Button>
  </>
)

export default App
```

## 常规配置

提供 LoadingBar 的全局配置，使用方法如下

```tsx
import { Button, LoadingBar } from 'tinkerbell-ui-react'
import React from 'react'

function setSpeed() {
  LoadingBar.config({
    speed: 10
  })
}
function setSpinner() {
  LoadingBar.config({
    easing: 'ease'
  })
}
function setPercentNum() {
  LoadingBar.config({
    percentNum: 0.1
  })
}
function setShowSpinner() {
  LoadingBar.config({
    showSpinner: false
  })
}

const App: React.FC = () => (
  <>
    <Button onClick={setSpeed}>设置speed速度</Button>
    <Button onClick={setSpinner}>设置spinner动画效果</Button>
    <Button onClick={setPercentNum}>设置percentNum每次加载的比例</Button>
    <Button onClick={setShowSpinner}>设置是否显示spinner</Button>
  </>
)

export default App
```

### LoadingBar Events

| 事件名称 | 说明                                     | 回调参数 |
| -------- | ---------------------------------------- | -------- |
| start    | 开始从 0 显示进度条，并自动加载进度      | -        |
| end      | 结束进度条，自动补全剩余进度             | -        |
| error    | 以错误的类型结束进度条，自动补全剩余进度 | -        |
| config   | 自定义配置项                             | -        |

### LoadingBarConfig props

| 事件名      | 说明             | 类型    | 可选值                        | 默认值       |
| ----------- | ---------------- | ------- | ----------------------------- | ------------ |
| speed       | 加载速度         | Number  | 0-100                         | 5            |
| easing      | spinner 加载动画 | String  | linear, ease, cubic-bezier... | 贝萨尔曲线值 |
| percentNum  | 每次前进的百分比 | Float   | 0-1                           | -            |
| showSpinner | 是否显示 spinner | Boolean | -                             | -            |
