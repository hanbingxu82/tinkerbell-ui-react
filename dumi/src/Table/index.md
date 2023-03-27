---
group:
  title: 数据
  order: 3
nav:
  title: Components
  path: /components
---

# Table 表格

用于展示多条结构类似的数据，可对数据进行排序、筛选、对比或其他自定义操作。

## 基础用法

基础的表格展示用法。

```tsx
import { Table } from 'tinkerbell-ui-react'
import React, { useState } from 'react'

const tableCol = [
  {
    label: '姓名',
    align: 'center',
    field: 'name'
  },
  {
    label: '年龄',
    align: 'center',
    field: 'age'
  },
  {
    label: '生日',
    align: 'center',
    field: 'birthday'
  },
  {
    label: '地址',
    align: 'center',
    field: 'address'
  }
]
const tableData = [
  {
    name: '王小帅',
    age: 24,
    birthday: '1998-05-20',
    address: '天津市南开区红旗南路1号'
  },
  {
    name: '王小帅',
    age: 25,
    birthday: '1997-05-20',
    address: '天津市南开区红旗南路2号'
  },
  {
    name: '王小帅',
    age: 26,
    birthday: '1996-05-20',
    address: '天津市南开区红旗南路3号'
  },
  {
    name: '王小帅',
    age: 27,
    birthday: '1995-05-20',
    address: '天津市南开区红旗南路4号'
  },
  {
    name: '王小帅',
    age: 28,
    birthday: '1994-05-20',
    address: '天津市南开区红旗南路5号'
  }
]

const App: React.FC = () => (
  <>
    <Table rows={tableData} cols={tableCol}></Table>
  </>
)

export default App
```

## 多选表格

选择多行数据时使用 selectable。

```tsx
import { Table } from 'tinkerbell-ui-react'
import React, { useState } from 'react'

const tableCol = [
  {
    label: '姓名',
    align: 'center',
    field: 'name'
  },
  {
    label: '年龄',
    align: 'center',
    field: 'age'
  },
  {
    label: '生日',
    align: 'center',
    field: 'birthday'
  },
  {
    label: '地址',
    align: 'center',
    field: 'address'
  }
]
const tableData = [
  {
    name: '王小帅',
    age: 24,
    birthday: '1998-05-20',
    address: '天津市南开区红旗南路1号'
  },
  {
    name: '王小帅',
    age: 25,
    birthday: '1997-05-20',
    address: '天津市南开区红旗南路2号'
  },
  {
    name: '王小帅',
    age: 26,
    birthday: '1996-05-20',
    address: '天津市南开区红旗南路3号'
  },
  {
    name: '王小帅',
    age: 27,
    birthday: '1995-05-20',
    address: '天津市南开区红旗南路4号'
  },
  {
    name: '王小帅',
    age: 28,
    birthday: '1994-05-20',
    address: '天津市南开区红旗南路5号'
  }
]
function sortMethod(cols) {
  console.log(cols)
}
const App: React.FC = () => (
  <>
    <Table
      select={sortMethod}
      selectable
      rows={tableData}
      cols={tableCol}
    ></Table>
  </>
)

export default App
```

## 排序表格

进行表格列的排序。

```tsx
import { Table } from 'tinkerbell-ui-react'
import React, { useState } from 'react'

const tableCol = [
  {
    label: '姓名',
    align: 'center',
    field: 'name'
  },
  {
    label: '年龄',
    align: 'center',
    field: 'age',
    sort: true
  },
  {
    label: '生日',
    align: 'center',
    field: 'birthday'
  },
  {
    label: '地址',
    align: 'center',
    field: 'address'
  }
]
const tableData = [
  {
    name: '王小帅',
    age: 24,
    birthday: '1998-05-20',
    address: '天津市南开区红旗南路1号'
  },
  {
    name: '王小帅',
    age: 25,
    birthday: '1997-05-20',
    address: '天津市南开区红旗南路2号'
  },
  {
    name: '王小帅',
    age: 26,
    birthday: '1996-05-20',
    address: '天津市南开区红旗南路3号'
  },
  {
    name: '王小帅',
    age: 27,
    birthday: '1995-05-20',
    address: '天津市南开区红旗南路4号'
  },
  {
    name: '王小帅',
    age: 28,
    birthday: '1994-05-20',
    address: '天津市南开区红旗南路5号'
  }
]
function sortMethod(col, sortment) {
  console.log(col, sortment)
}
const App: React.FC = () => (
  <>
    <Table sort={sortMethod} isSort rows={tableData} cols={tableCol}></Table>
  </>
)

export default App
```

### Table props

| 参数         | 说明                                               | 类型    | 可选值              | 默认值 |
| ------------ | -------------------------------------------------- | ------- | ------------------- | ------ |
| cols         | 列头数据列表                                       | Array   | -                   | []     |
| rows         | 展示信息数据列表                                   | Array   | —                   | []     |
| align        | 全局表格内容对齐方式                               | String  | center、right、left | left   |
| empty        | 如果对应单元格是空项 显示内容文本                  | String  | -                   | -      |
| selectable   | 是否新增选项进行多选                               | Boolean | —                   | false  |
| isSort       | 是否展示 sort 图标，子项设置 sort 后 需设置 isSort | Boolean | -                   | false  |
| sortExternal | 只改变排序和箭头。用于排序外部组件                 | Boolean | -                   | false  |

### Table events

| 事件名 | 说明                                             | 返回值          |
| ------ | ------------------------------------------------ | --------------- |
| select | 在选择行（selectable 选项）触发事件              | [...row]        |
| sort   | 排序时触发事件，可配合 sortExternal 进行手动排序 | (col, sortment) |

### Col props

| 参数   | 说明                 | 类型    | 可选值              | 默认值 |
| ------ | -------------------- | ------- | ------------------- | ------ |
| label  | 列头文本内容         | String  | -                   | -      |
| field  | 表格列对应 rows 字段 | String  | —                   | -      |
| align  | 单个表格内容对齐方式 | String  | center、right、left | left   |
| width  | 表格列对应宽度       | Number  | -                   | -      |
| hidden | 是否隐藏当前列       | Boolean | -                   | false  |
