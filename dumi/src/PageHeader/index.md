---
group:
  title: 导航
  order: 5
nav:
  title: Components
  path: /components
---

# PageHeader 页头

如果页面的路径比较简单，推荐使用页头组件而非面包屑组件。

## 基础用法

页头组件基础用法。

```tsx
import { PageHeader } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => {
  function goBack() {
    console.log('go back')
  }
  return (
    <div className='demo-PageHeader'>
      <PageHeader onBack={goBack} content='详情页面'></PageHeader>
    </div>
  )
}

export default App
```

### PageHeader Props

| 参数    | 说明 | 类型   | 可选值 | 默认值 |
| ------- | ---- | ------ | ------ | ------ |
| title   | 标题 | string | —      | 返回   |
| content | 内容 | string | —      | -      |

### PageHeader events

| 事件名 | 说明             | 返回值 |
| ------ | ---------------- | ------ |
| onBack | 点击左侧区域触发 | -      |
