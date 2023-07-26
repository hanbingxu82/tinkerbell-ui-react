---
group:
  title: 其他
  order: 6
nav:
  title: Components
  path: /components
---

# Split 分割面板

分割面板可自行拖放宽度/高度，双击分割线可重置默认设置的大小。

## 基础用法

`defaultPercent` 用于设置左侧默认宽度百分比

```tsx
import { Split } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => {
  return (
    <div style={{ width: '100%', height: 300, border: '1px solid #ddd' }}>
      <Split
        left={<div className='left-container'>左侧容器</div>}
        right={<div className='right-container'>右侧容器</div>}
      ></Split>
    </div>
  )
}
export default App
```

## 上下分割

可以设置上下分割的组件

```tsx
import { Split } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => {
  return (
    <div style={{ width: '100%', height: 300, border: '1px solid #ddd' }}>
      <Split
        split='horizontal'
        defaultNumber={100}
        left={<div className='left-container'>上边容器</div>}
        right={<div className='right-container'>下面容器</div>}
      ></Split>
    </div>
  )
}
export default App
```

## 嵌套使用

可以嵌套的分割线

```tsx
import { Split } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => {
  return (
    <div style={{ width: '100%', height: 300, border: '1px solid #ddd' }}>
      <Split
        left={<div className='left-container'>左侧容器</div>}
        right={
          <Split
            split='horizontal'
            defaultNumber={100}
            left={<div className='left-container'>上边容器</div>}
            right={<div className='right-container'>下面容器</div>}
          ></Split>
        }
      ></Split>
    </div>
  )
}
export default App
```

## 默认样式

设置默认的样式

```tsx
import { Split } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => {
  return (
    <div style={{ width: '100%', height: 300, border: '1px solid #ddd' }}>
      <Split
        defaultWrapStyle={['20%', '80%']}
        left={<div className='left-container'>左侧容器</div>}
        right={
          <Split
            split='horizontal'
            defaultNumber={50}
            defaultWrapStyle={['50%', '50%']}
            left={<div className='left-container'>上边容器</div>}
            right={<div className='right-container'>下面容器</div>}
          ></Split>
        }
      ></Split>
    </div>
  )
}
export default App
```

## 隐藏分割线

可以把分割线隐藏

```tsx
import { Split } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => {
  return (
    <div style={{ width: '100%', height: 300, border: '1px solid #ddd' }}>
      <Split
        hideLine
        left={<div className='left-container'>左侧容器</div>}
        right={<div className='right-container'>右侧容器</div>}
      ></Split>
    </div>
  )
}
export default App
```

### Split props

| 参数             | 说明                                                                         | 类型    | 可选值                   | 默认值   |
| ---------------- | ---------------------------------------------------------------------------- | ------- | ------------------------ | -------- |
| split            | 分割类型                                                                     | String  | 'vertical', 'horizontal' | vertical |
| min              | 最小像素                                                                     | Number  | —                        | 60       |
| defaultNumber    | 默认百分比                                                                   | Number  | —                        | 200      |
| defaultWrapStyle | 默认容器样式 ,一个数组，可分别指定两个容器大小，可为像素或百分比，开始时生效 | Array[] | —                        | -        |
| hideLine         | 是否隐藏分割线                                                               | Boolean | —                        | false    |
| resizerColor     | 自定义分割线颜色（自定义颜色后 hide-line 不生效）                            | String  | —                        | -        |
| className        | 自定义 resizer 样式名称                                                      | String  | —                        | -        |
| left             | split 为 vertical 时左边面板 horizontal 时为上边面板                         | Node    | —                        | -        |
| right            | split 为 vertical 时右边面板 horizontal 时为下边面板                         | Node    | —                        | -        |

### Split Events

| 事件名称 | 说明     | 回调参数 |
| -------- | -------- | -------- |
| onResize | 重置大小 | percent  |
