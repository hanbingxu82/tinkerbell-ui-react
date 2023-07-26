---
group:
  title: 其他
  order: 6
nav:
  title: Components
  path: /components
---

# Affix 图钉

到达指定的位置之后固定其位置。

## 基础用法

原生滚动相对于 window 窗口固定，也可以自定义 node-el 进行配置

```tsx
import { Affix, Tag } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => {
  return (
    <div className='demo-Affix'>
      <Affix offsetTop='80'>
        <Tag type='primary'>固定在顶部80的位置</Tag>
      </Affix>
    </div>
  )
}

export default App
```

## 固定位置

可以设置固定距离底部的位置

```tsx
import { Affix, Tag, Message } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => {
  function onChange(status) {
    Message.primary('Status: ' + status)
  }
  return (
    <div className='demo-Affix'>
      <Affix offsetTop='200' onChange={onChange}>
        <Tag type='primary'>固定状态触发事件</Tag>
      </Affix>
    </div>
  )
}

export default App
```

### Affix props

| 参数      | 说明                             | 类型   | 可选值 | 默认值 |
| --------- | -------------------------------- | ------ | ------ | ------ |
| offsetTop | 距离窗口顶部达到指定偏移量后触发 | Number | —      | 0      |
| zIndex    | 层级                             | Number | —      | 0      |
| nodeEl    | 指定所在的 id 节点               | String | —      | Window |

### Affix Events

| 事件名称 | 说明                     | 回调参数   |
| -------- | ------------------------ | ---------- |
| onChange | 在固定状态发生改变时触发 | true/false |
