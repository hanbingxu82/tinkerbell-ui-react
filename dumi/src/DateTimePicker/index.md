---
group:
  title: 表单
  order: 2
nav:
  title: Components
  path: /components
---

# DateTime Picker 时间选择器

在同一个选择器里选择时间

## 基础用法

基础的时间用法。

```tsx
import { DatePicker } from 'tinkerbell-ui-react'
import React, { useState } from 'react'

const [date, setDate] = useState('')

const App: React.FC = () => (
  <>
    <DatePicker
      size='mini'
      placeholder='请选择时间'
      type='dateTime'
      value={date}
    ></DatePicker>
  </>
)

export default App
```

### DateTime Picker Props

| 参数         | 说明             | 类型    | 可选值                         | 默认值  |
| ------------ | ---------------- | ------- | ------------------------------ | ------- |
| placeholder  | 类型             | string  | 输入框提示文案                 | -       |
| disabled     | 是否禁用状态     | boolean | -                              | false   |
| defaultValue | 默认值           | string  | -                              | -       |
| limit        | 是否限制过期时间 | boolean | -                              | false   |
| size         | 大小             | string  | large / default / small / mini | default |
| type         | 类型             | string  | date / time / dateTime         | date    |

