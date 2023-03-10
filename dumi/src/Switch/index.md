---
group:
  title: 表单
  order: 2
nav:
  title: Components
  path: /components
---

# Switch 开关

表示两种相互对立的状态间的切换，多用于触发「开/关」。

## 基础用法

基础的开关用法。

```tsx
import { Switch } from 'tinkerbell-ui-react'
import React, { useState } from 'react'

const [value, setValue] = useState(false)

const change = (val) => {
  setValue(val)
}

const App: React.FC = () => (
  <>
    <Switch onChange={change} value={value} />
  </>
)

export default App
```

## 禁用状态

开关不可用状态。

```tsx
import { Switch } from 'tinkerbell-ui-react'
import React, { useState } from 'react'

const [value, setValue] = useState(false)

const change = (val) => {
  setValue(val)
}

const App: React.FC = () => (
  <>
    <Switch onChange={change} disabled value={value} />
  </>
)

export default App
```

## 图标表情

带图标表情的的开关。

```tsx
import { Switch } from 'tinkerbell-ui-react'
import React, { useState } from 'react'

const [value, setValue] = useState(false)

const change = (val) => {
  setValue(val)
}

const App: React.FC = () => (
  <>
    <Switch
      onChange={change}
      checkedText='😁'
      uncheckedText='😞'
      value={value}
    />
  </>
)

export default App
```

### Switch props

| 参数           | 说明                   | 类型           | 可选值 | 默认值  |
| -------------- | ---------------------- | -------------- | ------ | ------- |
| value          | 切换按钮的初始状态     | boolean        | -      | false   |
| disabled       | 是否禁用状态           | boolean        | —      | false   |
| reverse        | 反向切换到从右到左     | boolean        | —      | false   |
| height         | 高度 px                | string/number  | -      | 25      |
| checkedText    | 选中切换后的可选文本   | string         | —      | -       |
| uncheckedText  | 取消选中时的可选文本 x | string         | -      | -       |
| checkedBg      | 选中切换后的背景色     | string         | -      | #1089ff |
| uncheckedBg    | 未选中的背景色         | string         | —      | #939393 |
| checkedColor   | 选中后的文字颜色       | string         | —      | #fff    |
| uncheckedColor | 未选中的文字颜色       | string         | —      | #fff    |
| dotColor       | 小圆点的颜色           | string         | —      | #fff    |
| fontSize       | 文字大小               | number、string | —      | 12      |
| fontWeight     | 字型粗细               | number、string | —      | normal  |

### Switch events

| 事件名   | 说明               | 返回值       |
| -------- | ------------------ | ------------ |
| onChange | 绑定值被改变时触发 | 最后变更的值 |
