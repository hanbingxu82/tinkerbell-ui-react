---
group:
  title: 通知
  order: 4
nav:
  title: Components
  path: /components
---

# Message 通知

轻量级的信息反馈组件，在顶部居中显示，并自动消失。有多种不同的提示状态可选择。

## 基础用法

基本用法，默认在 3 秒后关闭

```tsx
import { Button, Message } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => (
  <>
    <div className='demo-component'>
      <Button onClick={() => Message.primary('this is default message')}>
        默认提示
      </Button>
      <Button
        type='primary'
        onClick={() => Message({ type: 'primary', message: 'primary 的提示' })}
      >
        primary
      </Button>
      <Button
        type='success'
        onClick={() => Message({ type: 'success', message: 'success 的提示' })}
      >
        success
      </Button>
      <Button
        type='warning'
        onClick={() => Message({ type: 'warning', message: 'warning 的提示' })}
      >
        warning
      </Button>
      <Button
        type='danger'
        onClick={() => Message({ type: 'error', message: 'error 的提示' })}
      >
        danger
      </Button>
    </div>
  </>
)

export default App
```

## 配置参数

可以设置配置参数来渲染

```tsx
import { Button, Message } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => (
  <>
    <div className='demo-component'>
      <Button
        type='default'
        onClick={() =>
          Message({ type: 'primary', message: '我10秒消失', duration: 10000 })
        }
      >
        我10秒消失
      </Button>
      <Button
        type='default'
        onClick={() =>
          Message({
            type: 'primary',
            message: '我是可关闭的的提示',
            duration: 10000,
            showClose: true
          })
        }
      >
        可关闭的
      </Button>
      <Button
        type='default'
        onClick={() =>
          Message({
            type: 'primary',
            message: '我永远不会关闭除非手动',
            duration: 0,
            showClose: true,
            zIndex: 3000
          })
        }
      >
        不会关闭
      </Button>
    </div>
  </>
)

export default App
```

## render 函数调用

配置 render 函数 可自行配置内容

```tsx
import { Button, Message } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => (
  <>
    <div className='demo-component'>
      <Button
        type='default'
        onClick={() =>
          Message({
            render() {
              return <div style={{ color: 'red' }}>小仙男在努力</div>
            }
          })
        }
      >
        自定义render
      </Button>
    </div>
  </>
)

export default App
```

### Message props

| 参数        | 说明                                          | 类型                | 可选值                     | 默认值 |
| ----------- | --------------------------------------------- | ------------------- | -------------------------- | ------ |
| message     | 消息文字                                      | string/ReactElement | —                          | —      |
| type        | 主题                                          | string              | success/warning/info/error | -      |
| iconClass   | 自定义图标的类名，会覆盖 type                 | string              | -                          | -      |
| customClass | 自定义类名                                    | string              | -                          | -      |
| duration    | 显示时间, 毫秒。设为 0 则不会自动关闭         | number              | -                          | 3000   |
| showClose   | 是否显示关闭按钮                              | boolean             | -                          | false  |
| onClose     | 关闭时的回调函数, 参数为被关闭的 message 实例 | function            | -                          | -      |

### Message Events

调用 Message 会返回当前 Message 的实例。如果需要手动关闭实例，可以调用它的 close 方法。

| 事件名称 | 说明               | 回调参数 |
| -------- | ------------------ | -------- |
| close    | 关闭当前的 Message | -        |
