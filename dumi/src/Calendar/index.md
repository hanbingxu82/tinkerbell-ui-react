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

当数据是日期或按照日期划分时，例如日程、课表、价格日历等，农历等。

```tsx
import { Calendar, Badge } from 'tinkerbell-ui-react'
import React from 'react'
function getListData(value) {
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

### Calendar props

| 参数           | 说明                                           | 类型                              | 可选值 | 默认值 |
| -------------- | ---------------------------------------------- | --------------------------------- | ------ | ------ |
| dateCellRender | 自定义渲染日期单元格，返回内容会被追加到单元格 | function(date: moment): ReactNode | —      | —      |
| defaultValue   | 当前选中的时间                                 | moment                            | —      | -      |

### Calendar events

| 事件名  | 说明     | 返回值 |
| ------- | -------- | ------ |
| onClick | 点击事件 | 时间   |
