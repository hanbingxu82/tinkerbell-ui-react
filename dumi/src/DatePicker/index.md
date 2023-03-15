---
group:
  title: 表单
  order: 2
nav:
  title: Components
  path: /components
---

# Date Picker 日期选择器

在同一个选择器里选择日期

## 基础用法

基础的日期用法。

```tsx
import { DatePicker } from 'tinkerbell-ui-react'
import React, { useState } from 'react'

const [date, setDate] = useState('')

const App: React.FC = () => (
  <>
    <DatePicker size='mini' type='date' value={date}></DatePicker>
  </>
)

export default App
```

### Date Picker Props

| 参数         | 说明             | 类型    | 可选值                         | 默认值  |
| ------------ | ---------------- | ------- | ------------------------------ | ------- |
| placeholder  | 类型             | string  | 输入框提示文案                 | -       |
| disabled     | 是否禁用状态     | boolean | -                              | false   |
| defaultValue | 默认值           | string  | -                              | -       |
| limit        | 是否限制过期时间 | boolean | -                              | false   |
| size         | 大小             | string  | large / default / small / mini | default |
| type         | 类型             | string  | date / time / dateTime         | date    |

More skills for writing demo: https://d.umijs.org/guide/demo-principle
