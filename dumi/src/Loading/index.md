---
group:
  title: 其他
  order: 6
nav:
  title: Components
  path: /components
---

# Loading 加载进度

获取数据或加载中时显示，提示用户正在等待中。

## 基础用法

最简单的 Loading

```tsx
import { Loading } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => (
  <div className='demo-loading'>
    <Loading></Loading>
  </div>
)

export default App
```

## 居中固定

可以在父级元素中居中固定 默认是剧中固定的，fix 设置为 false 后用于加载类似下拉加载的功能

```tsx
import { Loading } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => (
  <div className='demo-loading'>
    <div>我是后面的段落我是后面的段落我是后面的段落我是后面的段落</div>
    <Loading fix></Loading>
  </div>
)

export default App
```

## 自定义内容

可以自定义文字和内容

```tsx
import { Loading } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => (
  <>
    <div className='demo-loading'>
      <Loading fix>加载中</Loading>
    </div>
    <div className='demo-loading'>
      <Loading fix showText='loading'></Loading>
    </div>
    <div className='demo-loading'>
      <Loading fix showText='loading' showIcon></Loading>
    </div>
  </>
)

export default App
```

## 切换显示状态

切换显示状态

```tsx
import { Loading, Button } from 'tinkerbell-ui-react'
import React, { useState } from 'react'

const [loading1, setLoading1] = useState(true)
const App: React.FC = () => (
  <>
    <div className='demo-loading'>
      <div>我是后面的段落我是后面的段落我是后面的段落我是后面的段落</div>
      {loading1 && <Loading fix></Loading>}
    </div>
    <div>
      <Button onClick={() => setLoading1(true)}>加载</Button>
      <Button type='danger' onClick={() => setLoading1(false)}>
        停止
      </Button>
    </div>
  </>
)

export default App
```

### Loading Props

| 参数     | 说明               | 类型    | 可选值  | 默认值 |
| -------- | ------------------ | ------- | ------- | ------ |
| showIcon | 显示加载图标       | Boolean | -       | true   |
| showText | 显示加载的文字     | String  | loading | -      |
| fix      | 是否固定于父级中心 | Boolean | -       | false  |
| size     | 文字显示的大小     | Number  | -       | -      |

<!-- More skills for writing demo: https://d.umijs.org/guide/demo-principle -->
