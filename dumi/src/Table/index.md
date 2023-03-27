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
function selectMethod(cols) {
  console.log(cols)
}
const App: React.FC = () => (
  <>
    <Table
      select={selectMethod}
      selectable
      rows={tableData}
      cols={tableCol}
    ></Table>
  </>
)

export default App
```
