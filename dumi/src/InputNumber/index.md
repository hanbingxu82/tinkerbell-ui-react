---
group:
  title: 表单
  order: 2
nav:
  title: Components
  path: /components
---

# InputNumber 数字输入框

仅允许输入标准的数字值，可定义范围

## 基础用法

要使用它，只需要在 `InputNumber` 元素中使用 `value` 绑定变量即可， `defaultValue` 为默认值。

```tsx
import React, { useState } from 'react'
import { InputNumber } from 'tinkerbell-ui-react'
const [value, setValue] = useState(0)
const onChange = (val) => {
  // setValue(val)
}
const App: React.FC = () => (
  <InputNumber
    defaultValue={value}
    onChange={onChange}
    min='1'
    max='10'
  ></InputNumber>
)

export default App
```

## 禁用状态

`disabled` 属性接受一个 `Boolean` ，设置为 `true` 即可禁用整个组件，如果你只需要控制数值在某一范围内，可以设置 `min` 属性和 `max` 属性，不设置 `min` 和 `max` 时，最小值为 0。

```tsx
import React, { useState } from 'react'
import { InputNumber } from 'tinkerbell-ui-react'
const [value, setValue] = useState(0)
const onChange = (val) => {
  // setValue(val)
}
const App: React.FC = () => (
  <InputNumber
    defaultValue={value}
    onChange={onChange}
    disabled={true}
    min='1'
    max='10'
  ></InputNumber>
)

export default App
```

## 步数

设置 `step` 属性可以控制步长，接受一个 `Number` 。

```tsx
import React, { useState } from 'react'
import { InputNumber } from 'tinkerbell-ui-react'
const [value, setValue] = useState(0)
const onChange = (val) => {
  // setValue(val)
}
const App: React.FC = () => (
  <InputNumber
    defaultValue={value}
    onChange={onChange}
    step='2'
    min='1'
    max='10'
  ></InputNumber>
)

export default App
```

## 尺寸

额外提供了 `large、small、mini` 三种尺寸的数字输入框

```tsx
import React, { useState } from 'react'
import { InputNumber } from 'tinkerbell-ui-react'
const [value, setValue] = useState(0)
const onChange = (val) => {
  // setValue(val)
}
const App: React.FC = () => (
  <div>
    <InputNumber size='large' defaultValue={value}></InputNumber>
    <InputNumber defaultValue={value}></InputNumber>
    <InputNumber size='small' defaultValue={value}></InputNumber>
    <InputNumber size='mini' defaultValue={value}></InputNumber>
  </div>
)

export default App
```

### InputNumber props

| 参数         | 说明                   | 类型    | 可选值       | 默认值   |
| ------------ | ---------------------- | ------- | ------------ | -------- |
| defaultValue | 默认值                 | Number  | -            | -        |
| value        | 绑定值                 | Number  | —            | —        |
| min          | 设置计数器允许的最小值 | Number  | —            | 0        |
| max          | 设置计数器允许的最大值 | Number  | -            | Infinity |
| step         | 计数器步长             | Number  | —            | 1        |
| size         | 计数器尺寸             | String  | large, small | -        |
| disabled     | 是否禁用计数器         | Boolean | -            | false    |
| controls     | 是否使用控制按钮       | Boolean | —            | true     |

### InputNumber events

| 事件名   | 说明               | 返回值       |
| -------- | ------------------ | ------------ |
| onChange | 绑定值被改变时触发 | 最后变更的值 |
