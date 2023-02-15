---
group:
  title: 表单
  order: 2
nav:
  title: Components
  path: /components
---

# Select 选择器

当选项过多时，使用下拉菜单展示并选择内容。

## 基础用法

适用广泛的基础单选

```tsx
import React, { useState } from 'react'
import { Select } from 'tinkerbell-ui-react'

const options = [
  {
    value: '选项1',
    label: '黄金糕'
  },
  {
    value: '选项2',
    label: '双皮奶'
  },
  {
    value: '选项3',
    label: '蚵仔煎'
  },
  {
    value: '选项4',
    label: '龙须面'
  },
  {
    value: '选项5',
    label: '北京烤鸭'
  }
]

const [value, setValue] = useState('选项3')

const App: React.FC = () => (
  <Select
    value={value}
    onChange={(val) => {
      console.log(val)
    }}
    placeholder='请选择'
  >
    {options.map((el) => {
      return <Select.Option key={el.value} label={el.label} value={el.value} />
    })}
  </Select>
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
