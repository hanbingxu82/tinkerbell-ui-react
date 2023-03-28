---
group:
  title: 数据
  order: 3
nav:
  title: Components
  path: /components
---

# Badge 标记

出现在按钮、图标旁的数字或状态标记。

## 基础用法

展示新消息数量。

```tsx
import { Badge, Button } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => (
  <>
    <div className='demo-badge'>
      <Badge value={12} className='item'>
        <Button size='small'>评论</Button>
      </Badge>
      <Badge value={3} className='item'>
        <Button size='small'>回复</Button>
      </Badge>
      <Badge value={1} className='item' type='primary'>
        <Button size='small'>评论</Button>
      </Badge>
      <Badge value={2} className='item' type='warning'>
        <Button size='small'>回复</Button>
      </Badge>
    </div>
  </>
)

export default App
```

## 最大值

可自定义最大值。

```tsx
import { Badge, Button } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => (
  <>
    <div className='demo-badge'>
      <Badge value={200} max={99} class='item'>
        <Button size='small'>评论</Button>
      </Badge>
      <Badge value={100} max={10} class='item'>
        <Button size='small'>回复</Button>
      </Badge>
    </div>
  </>
)

export default App
```

## 自定义内容

可以显示数字以外的文本内容。

```tsx
import { Badge, Button } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => (
  <>
    <div className='demo-badge'>
      <Badge value='new' class='item'>
        <Button size='small'>评论</Button>
      </Badge>
      <Badge value='hot' class='item'>
        <Button size='small'>回复</Button>
      </Badge>
    </div>
  </>
)

export default App
```

## 小红点

以红点的形式标注需要关注的内容。

```tsx
import { Badge, Button } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => (
  <>
    <div className='demo-badge'>
      <Badge isDot class='item'>
        数据查询
      </Badge>
      <Badge isDot class='item'>
        <Button
          className='share-button'
          icon='icon-home'
          type='primary'
        ></Button>
      </Badge>
    </div>
  </>
)

export default App
```

### Badge Props

| 参数   | 说明                                                         | 类型           | 可选值                                      | 默认值 |
| ------ | ------------------------------------------------------------ | -------------- | ------------------------------------------- | ------ |
| value  | 显示值                                                       | string, number | -                                           | —      |
| max    | 最大值，超过最大值会显示 '{max}+'，要求 value 是 Number 类型 | number         | -                                           | —      |
| isDot  | 小圆点                                                       | boolean        | —                                           | false  |
| hidden | 隐藏 badge                                                   | boolean        | —                                           | false  |
| type   | 类型                                                         | string         | primary / success / warning / danger / info | -      |
