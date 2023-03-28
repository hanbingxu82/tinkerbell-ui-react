---
group:
  title: 表单
  order: 2
nav:
  title: Components
  path: /components
---

# Rate 评分

评分组件

## 基础用法

基础的评分用法。

```tsx
import { Rate } from 'tinkerbell-ui-react'
import React, { useState } from 'react'

const handleChange = (val) => {
  console.log(val)
}
const App: React.FC = () => (
  <>
    <Rate
      value={3}
      length={5}
      onChange={handleChange}
      ratedesc={['非常糟糕', '糟糕', '正常', '良好', '非常良好']}
    />
  </>
)

export default App
```

## 禁用只读状态

评分不可用状态。

```tsx
import { Rate } from 'tinkerbell-ui-react'
import React, { useState } from 'react'

const handleChange = (val) => {
  console.log(val)
}
const App: React.FC = () => (
  <>
    <Rate value={3} length={5} disabled onChange={handleChange} />
    <Rate value={3} length={5} readonly onChange={handleChange} />
  </>
)

export default App
```

## 评分图标

更改评分的图标。

```tsx
import { Rate } from 'tinkerbell-ui-react'
import React, { useState } from 'react'

const activecolor = 'red'

const App: React.FC = () => (
  <>
    <Rate length={5} iconref='icon-smile-fill' activecolor={activecolor} />
  </>
)

export default App
```

### Rate Props

| 参数        | 说明                                                                                      | 类型           | 可选值 | 默认值  |
| ----------- | ----------------------------------------------------------------------------------------- | -------------- | ------ | ------- |
| value       | 默认选中值                                                                                | Number、String | -      | -       |
| name        | name 字段                                                                                 | String         | -      | rate    |
| length      | 评分个数                                                                                  | Number         | -      | -       |
| showcount   | 鼠标移入对应的星号上时，显示对应的 index                                                  | Boolean        | -      | false   |
| required    | 必选 对标 form 对应的 required                                                            | Boolean        | -      | -       |
| ratedesc    | 描述 将对应的 index 变为对应的下标字段 如['非常糟糕'，'糟糕'，'正常'，'良好'，'非常良好'] | Array          | -      | []      |
| activecolor | 选中颜色                                                                                  | string         | -      | #efc20f |
| disabled    | 是否禁用                                                                                  | Boolean        | -      | false   |
| readonly    | 是否只读                                                                                  | Boolean        | -      | false   |
| iconref     | 符号图标                                                                                  | String         | -      | -       |

### Select events

| 事件名     | 说明                 | 返回值              |
| ---------- | -------------------- | ------------------- |
| onChange   | 选中值发生变化时触发 | 目前的选中值        |
| beforeRate | 评分变更之前         | index、图表对应索引 |
| aftereRate | 评分变更之后         | index、图表对应索引 |


