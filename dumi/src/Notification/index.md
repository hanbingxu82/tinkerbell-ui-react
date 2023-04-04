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

带有 icon，常用来显示「成功、警告、消息、错误」类的系统消息

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
