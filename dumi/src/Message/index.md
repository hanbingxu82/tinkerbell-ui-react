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
      <Button onClick={() => Message('this is default message')}>
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
