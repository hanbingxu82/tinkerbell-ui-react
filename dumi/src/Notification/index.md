---
group:
  title: 通知
  order: 4
nav:
  title: Components
  path: /components
---

# Notification 通知

悬浮出现在页面右上角，显示全局的通知提醒消息。

## 基本用法

适用性广泛的通知栏

```tsx
import { Button, Notification } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => (
  <>
    <div className='demo-component'>
      <Button
        type='primary'
        onClick={() => {
          Notification({
            title: '标题名称',
            message: '我是一条会自动关闭的消息！'
          })
        }}
      >
        可自动关闭
      </Button>
      <Button
        type='primary'
        onClick={() => {
          Notification({
            title: '提示',
            message: '我是一条不会自动关闭的消息！',
            duration: 0
          })
        }}
      >
        不会自动关闭
      </Button>
    </div>
  </>
)

export default App
```

## 带有倾向性

带有 `icon`，常用来显示「成功、警告、消息、错误」类的系统消息

```tsx
import { Button, Notification } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => (
  <>
    <div className='demo-component'>
      <Button
        type='primary'
        onClick={() => {
          Notification({
            title: '主题',
            message: '这是一条主题的提示消息',
            type: 'primary'
          })
        }}
      >
        主题
      </Button>
      <Button
        type='success'
        onClick={() => {
          Notification({
            title: '成功',
            message: '这是一条成功的提示消息',
            type: 'success'
          })
        }}
      >
        成功
      </Button>
      <Button
        type='warning'
        onClick={() => {
          Notification({
            title: '警告',
            message: '这是一条警告的提示消息',
            type: 'warning'
          })
        }}
      >
        警告
      </Button>
      <Button
        type='info'
        onClick={() => {
          Notification.info({
            title: '消息',
            message: '这是一条消息的提示消息'
          })
        }}
      >
        消息
      </Button>
      <Button
        type='danger'
        onClick={() => {
          Notification.error({
            title: '错误',
            message: '这是一条错误的提示消息'
          })
        }}
      >
        错误
      </Button>
    </div>
  </>
)

export default App
```

## 带有偏移

让 `Notification` 偏移一些位置

```tsx
import { Button, Notification } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => (
  <>
    <div className='demo-component'>
      <Button
        type='primary'
        onClick={() => {
          Notification({
            title: '成功',
            message: '这是一条成功的提示消息',
            offset: 100
          })
        }}
      >
        带有偏移
      </Button>
    </div>
  </>
)

export default App
```

## 单独引用

单独引入 `Notification`:

```javascript
import { Notification } from 'tinkerbell-ui-react'
```

此时调用方法为 Notification(options)。我们也为每个 type 定义了各自的方法，如 Notification.success(options)。

### Notification Props

| 参数      | 说明                                                                     | 类型                | 可选值                     | 默认值 |
| --------- | ------------------------------------------------------------------------ | ------------------- | -------------------------- | ------ |
| title     | 标题                                                                     | string              | —                          | —      |
| message   | 说明文字                                                                 | string/ReactElement | —                          | —      |
| type      | 主题样式，如果不在可选值内将被忽略                                       | string              | success/warning/info/error | —      |
| iconClass | 自定义图标的类名。若设置了 `type`，则 `iconClass` 会被覆盖               | string              | —                          | —      |
| duration  | 显示时间, 毫秒。设为 0 则不会自动关闭                                    | number              | —                          | 4500   |
| onClose   | 关闭时的回调函数                                                         | function            | —                          | —      |
| onClick   | 点击 Notification 时的回调函数                                           | function            | —                          | —      |
| offset    | 偏移的距离，在同一时刻，所有的 Notification 实例应当具有一个相同的偏移量 | number              | —                          | 0      |

### Notification Event

调用 `Notification` 会返回当前 `Notification` 的实例。如果需要手动关闭实例，可以调用它的 `close` 方法。

| 事件名称 | 说明                    | 回调参数 |
| -------- | ----------------------- | -------- |
| close    | 关闭当前的 Notification | -        |
