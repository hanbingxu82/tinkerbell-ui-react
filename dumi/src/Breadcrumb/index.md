---
group:
  title: 导航
  order: 5
nav:
  title: Components
  path: /components
---

# Breadcrumb 面包屑

显示当前页面的路径，快速返回之前的任意页面。

## 基础用法

在 `Breadcrumb` 中使用 `Breadcrumb.Item` 标签表示从首页开始的每一级。 我们提供了一个 `separator` 属性，在 `Breadcrumb` 标签中设置它来决定分隔符，它只能是字符串，默认为斜杠/。

```tsx
import { Breadcrumb } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => (
  <div className='demo-Breadcrumb'>
    <Breadcrumb separator='/'>
      <Breadcrumb.Item>首页</Breadcrumb.Item>
      <Breadcrumb.Item>活动管理</Breadcrumb.Item>
      <Breadcrumb.Item>活动列表</Breadcrumb.Item>
      <Breadcrumb.Item>活动详情</Breadcrumb.Item>
    </Breadcrumb>
  </div>
)

export default App
```

## 图标分隔符

使用图标进行分割

```tsx
import { Breadcrumb } from 'tinkerbell-ui-react'
import React from 'react'
// import { useNavigate } from 'react-router-dom'

const App: React.FC = () => {
  // const navigate = useNavigate()
  // const to = (path: string) => {
  //   navigate(path, { replace: true })
  // }
  return (
    <div className='demo-Breadcrumb'>
      <Breadcrumb separatorClass='icon-double-arro-right'>
        <Breadcrumb.Item
          to={() => {
            {
              /* to('/') */
            }
          }}
        >
          首页
        </Breadcrumb.Item>
        <Breadcrumb.Item>活动管理</Breadcrumb.Item>
        <Breadcrumb.Item>活动列表</Breadcrumb.Item>
        <Breadcrumb.Item>活动详情</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  )
}

export default App
```

### Breadcrumb Props

| 参数           | 说明             | 类型   | 可选值 | 默认值  |
| -------------- | ---------------- | ------ | ------ | ------- |
| separator      | 分隔符           | string | —      | 斜杠'/' |
| separatorClass | 图标分隔符 class | string | —      | -       |

### BreadcrumbItem Props

| 参数 | 说明             | 类型     | 可选值 | 默认值 |
| ---- | ---------------- | -------- | ------ | ------ |
| to   | 路由跳转回调函数 | Function | —      | -      |
