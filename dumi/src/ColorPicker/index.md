---
group:
  title: 表单
  order: 2
nav:
  title: Components
  path: /components
---

# ColorPicker 颜色选择器

用于颜色选择，支持多种格式。

## 基础用法

基础的颜色选择器

```tsx
import { ColorPicker } from 'tinkerbell-ui-react'
import React, { useState } from 'react'

const handleChange = (val) => {
  console.log(val)
}
const App: React.FC = () => (
  <>
    <ColorPicker onChange={handleChange} />
  </>
)

export default App
```

## 禁用

带有禁用效果的颜色选择器

```tsx
import { ColorPicker } from 'tinkerbell-ui-react'
import React, { useState } from 'react'

const handleChange = (val) => {
  console.log(val)
}
const App: React.FC = () => (
  <>
    <ColorPicker disabled onChange={handleChange} />
  </>
)

export default App
```

### ColorPicker Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ---- | ---- | ---- | ------ | ------ |
| initialValue | 初始化颜色 | string | - | #5e72e4 |
| disabled | 是否禁用状态 | boolean | - | false |
