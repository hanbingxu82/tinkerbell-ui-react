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
