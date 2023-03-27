---
group:
  title: 通知
  order: 4
nav:
  title: Components
  path: /components
---

# Alert 警告提示

静态的展示一些区块，提示或者警告，可以动态的去删除

## 基础用法

基础的按钮用法

```tsx
import { Alert } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => (
  <>  
    <div className='demo-component'>
      <Alert type="primary">通用提示的文案</Alert>
      <Alert type="success">成功提示的文案</Alert>
      <Alert type="info">消息提示的文案</Alert>
      <Alert type="warning" title="警告提示的文案"></Alert>
      <Alert type="danger" title="错误提示的文案"></Alert>
    </div>
  </>
)

export default App
```

## 带有 icon

表示某种状态时提升可读性。

```tsx
import { Alert } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => (
  <>  
    <div className='demo-component'>
        <Alert type="primary" showIcon>通用提示的文案</Alert>
        <Alert type="success" showIcon>成功提示的文案</Alert>
        <Alert type="info" showIcon>消息提示的文案</Alert>
        <Alert type="warning" showIcon>警告提示的文案</Alert>
        <Alert type="danger" showIcon>错误提示的文案</Alert>
    </div>
  </>
)

export default App
```

## 文字居中

使用 center 属性让文字水平居中。

```tsx
import { Alert } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => (
  <>  
    <div className='demo-component'>
        <Alert type="success" center showIcon>成功提示的文案</Alert>
        <Alert type="info" center showIcon>消息提示的文案</Alert>
        <Alert type="warning" center showIcon>警告提示的文案</Alert>
        <Alert type="danger" center showIcon>错误提示的文案</Alert>
    </div>
  </>
)

export default App
```

## 自定义关闭按钮

自定义关闭按钮为文字或其他符号。

```tsx
import { Alert } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => {
  const hello:void = ()=>{
    console.log('设置了回调！')
  }
  return (
  <>  
    <div className='demo-component'>
        <Alert type="success" closable={false}>不可关闭的 alert</Alert>
        <Alert type="info" closeText="知道了">自定义关闭的 alert</Alert>
        <Alert type="warning" onClose={hello}>设置了回调的 alert</Alert>
    </div>
  </>
  )
}

export default App
```

## 文字居中

使用 center 属性让文字水平居中。

```tsx
import { Alert } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => (
  <>  
    <div className='demo-component'>
        <Alert type="success" center showIcon>成功提示的文案</Alert>
        <Alert type="info" center showIcon>消息提示的文案</Alert>
        <Alert type="warning" center showIcon>警告提示的文案</Alert>
        <Alert type="danger" center showIcon>错误提示的文案</Alert>
    </div>
  </>
)

export default App
```

## 带有辅助性文字介绍

包含标题和内容，解释更详细的警告。

```tsx
import { Alert } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => (
  <>  
    <div className='demo-component'>
          <Alert type="success" description="这是一句绕口令：黑灰化肥会挥发发灰黑化肥挥发；灰黑化肥会挥发发黑灰化肥发挥。 黑灰化肥会挥发发灰黑化肥黑灰……">带辅助性文字介绍</Alert>
          <Alert type="info" showIcon description="这是一句绕口令：黑灰化肥会挥发发灰黑化肥挥发；灰黑化肥会挥发发黑灰化肥发挥。 黑灰化肥会挥发发灰黑化肥黑灰……">带有 icon 和辅助性文字介绍</Alert>
    </div>
  </>
)

export default App
```

### Alert Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| title | 标题，必选参数。也可通过默认 slot 传入 | — | — | — |
| type | 主题 | string | primary / success / warning / danger / info  | success |
| description | 辅助性文字 | string | — | — |
| closable | 是否可关闭 | boolean | — | true |
| center | 文字是否居中 | boolean | — | true |
| closeText | 关闭按钮自定义文本 | 	string | — | — |
| showIcon | 是否显示图标 | boolean | — | false |

### Alert Events

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| onClose | 关闭alert时触发的事件 | — | — | — |
