---
group:
  title: 其他
  order: 6
nav:
  title: Components
  path: /components
---

# Calendar 日历

按照日历形式展示数据的容器。

## 基础用法

包含标题，内容和操作。

```tsx
import { Calendar, Badge } from 'tinkerbell-ui-react'
import React from 'react'
function getListData(value) {
  console.log(value.d)
  let listData
  switch (value.d) {
    case 8:
      listData = [
        { type: 'warning', content: 'warning' },
        { type: 'success', content: 'success' }
      ]
      break
    case 10:
      listData = [
        { type: 'warning', content: 'warning' },
        { type: 'success', content: 'success' },
        { type: 'danger', content: 'danger' }
      ]
      break
    case 15:
      listData = [
        { type: 'warning', content: 'warning' },
        { type: 'success', content: 'success' },
        { type: 'danger', content: 'danger1' },
        { type: 'danger', content: 'danger2' },
        { type: 'danger', content: 'danger3' },
        { type: 'danger', content: 'danger4' }
      ]
      break
    default:
  }
  return listData || []
}
function dateCellRender(value) {
  const listData = getListData(value)
  return (
    <ul className='events'>
      {listData.map((item) => (
        <li key={item.content} style={{ marginTop: 16 }}>
          <Badge isDot type={item.type}>
            {item.content}
          </Badge>
        </li>
      ))}
    </ul>
  )
}
const App: React.FC = () => {
  return (
    <div className='demo-Calendar'>
      <Calendar dateCellRender={dateCellRender}></Calendar>
    </div>
  )
}

export default App
```

### Card props

| 参数      | 说明                                           | 类型   | 可选值 | 默认值              |
| --------- | ---------------------------------------------- | ------ | ------ | ------------------- |
| header    | 设置 header，也可以通过 `slot#header` 传入 DOM | string | —      | —                   |
| bodyStyle | 设置 body 的样式                               | object | —      | { padding: '20px' } |
