---
group:
  title: 数据
  order: 3
nav:
  title: Components
  path: /components
---

# Pagination 分页

当数据量过多时，使用分页分解数据。

## 基础用法

设置 `layout`，表示需要显示的内容，用逗号分隔，布局元素会依次显示。`prev` 表示上一页，`next` 为上一页，`pager` 表示页码列表，除此以外还提供了 `jumper` 和 `total`，`size` 和特殊的布局符号->，->后的元素会靠右显示，`jumper` 表示跳页元素，`total` 表示显示页码总数，`size` 用于设置每页显示的页码数量。

```tsx
import { Pagination } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => (
  <>
    <div className='demo-pagination'>
      <div className='block'>
        <span className='demonstration'>页数较少时的效果</span>
        <Pagination layout='prev, pager, next' total={50} />
      </div>
      <div className='block'>
        <span className='demonstration'>大于 7 页时的效果</span>
        <Pagination layout='prev, pager, next' total={1000} />
      </div>
    </div>
  </>
)

export default App
```

## 小型分页

在空间有限的情况下，可以使用简单的小型分页。

```tsx
import { Pagination } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => (
  <>
    <Pagination layout='prev, pager, next' total={50} small={true} />
  </>
)

export default App
```

## 附加功能

根据场景需要，可以添加其他功能模块。

```tsx
import { Pagination } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => (
  <>
    <div className='demo-pagination'>
      <div className='block-100'>
        <span className='demonstration'>显示总数</span>
        <Pagination layout='total, prev, pager, next' total={1000} />
      </div>
      <div className='block-100'>
        <span className='demonstration'>调整每页显示条数</span>
        <Pagination
          layout='sizes, prev, pager, next'
          total={1000}
          pageSizes={[100, 200, 300, 400]}
          pageSize={1000}
        />
      </div>
      <div className='block-100'>
        <span className='demonstration'>直接前往</span>
        <Pagination
          layout='prev, pager, next, jumper'
          total={1000}
          pageSize={100}
          currentPage={5}
        />
      </div>
      <div className='block-100'>
        <span className='demonstration'>完整功能</span>
        <Pagination
          layout='total, sizes, prev, pager, next, jumper'
          total={400}
          pageSizes={[100, 200, 300, 400]}
          pageSize={100}
          currentPage={5}
        />
      </div>
    </div>
  </>
)

export default App
```

### Pagination props

| 参数        | 说明                                                                                                                | 类型     | 可选值                                                    | 默认值                                 |
| ----------- | ------------------------------------------------------------------------------------------------------------------- | -------- | --------------------------------------------------------- | -------------------------------------- |
| small       | 是否使用小型分页样式                                                                                                | Boolean  | —                                                         | false                                  |
| pageSize    | 每页显示条目个数                                                                                                    | Number   | —                                                         | 10                                     |
| total       | 总条目数                                                                                                            | Number   | —                                                         | -                                      |
| pageCount   | 总页数，total 和 pageCount 设置任意一个就可以达到显示页码的功能；如果要支持 pageSizes 的更改，则需要使用 total 属性 | Number   | —                                                         | -                                      |
| currentPage | 当前页数                                                                                                            | Number   | —                                                         | 1                                      |
| layout      | 组件布局，子组件名用逗号分隔                                                                                        | String   | `sizes`, `prev`, `pager`, `next`, `jumper`, `->`, `total` | 'prev, pager, next, jumper, ->, total' |
| pageSizes   | 每页显示个数选择器的选项设置                                                                                        | Number[] | —                                                         | [10, 20, 30, 40, 50, 100]              |

### Pagination Events

| 事件名称        | 说明                     | 回调参数            |
| --------------- | ------------------------ | ------------------- |
| onSizeChange    | pageSize 改变时会触发    | 每页条数`size`      |
| onCurrentChange | currentPage 改变时会触发 | 当前页`currentPage` |
