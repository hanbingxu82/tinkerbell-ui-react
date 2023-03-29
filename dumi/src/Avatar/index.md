---
group:
  title: 数据
  order: 3
nav:
  title: Components
  path: /components
---

# Avatar 头像

用图标、图片或者字符的形式展示用户或事物信息。

## 基础用法

通过 `shape` 和 `size` 设置头像的形状和大小。

```tsx
import { Row, Col, Avatar } from 'tinkerbell-ui-react'
import React from 'react'
const circleUrl =
  'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
const squareUrl =
  'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'
const sizeList = ['large', 'medium', 'small']
const App: React.FC = () => (
  <>
    <div className='demo-avatar'>
      <Row>
        <Col span={12}>
          <div className='title'>circle</div>
          <div flex='box:mean'>
            <div>
              <Avatar size={50} src={circleUrl}></Avatar>
            </div>
            {sizeList.map((size) => {
              return (
                <div key={size}>
                  <Avatar size={size} src={circleUrl}></Avatar>
                </div>
              )
            })}
          </div>
        </Col>
        <Col span={12}>
          <div className='title'>square</div>
          <div flex='box:mean'>
            <div>
              <Avatar shape='square' size={50} src={squareUrl}></Avatar>
            </div>
            {sizeList.map((size) => {
              return (
                <div key={size}>
                  <Avatar shape='square' size={size} src={squareUrl}></Avatar>
                </div>
              )
            })}
          </div>
        </Col>
      </Row>
    </div>
  </>
)

export default App
```

## 展示类型

支持三种类型：图标、图片和字符

```tsx
import { Avatar } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => (
  <>
    <div className='demo-avatar'>
      <div flex='box:mean'>
        <div>
          <Avatar icon='icon-office-supplies-fill'></Avatar>
        </div>
        <div>
          <Avatar src='https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'></Avatar>
        </div>
        <div>
          <Avatar> user </Avatar>
        </div>
      </div>
    </div>
  </>
)

export default App
```

## 图片加载失败的 fallback 行为

当展示类型为图片的时候，图片加载失败的 fallback 行为

```tsx
import { Avatar } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => (
  <>
    <div className='demo-avatar'>
      <div flex='box:mean'>
        <Avatar size={60} src='https://empty' error={() => true}>
          <img src='https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png' />
        </Avatar>
      </div>
    </div>
  </>
)

export default App
```

## 展示类型

支持三种类型：图标、图片和字符

```tsx
import { Avatar } from 'tinkerbell-ui-react'
import React from 'react'

const fits = ['fill', 'contain', 'cover', 'none', 'scale-down']
const url =
  'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'

const App: React.FC = () => (
  <>
    <div className='demo-avatar'>
      <div flex='box:mean'>
        {fits.map((fit) => {
          return (
            <div class='block' key={fit}>
              <div class='title'>{fit}</div>
              <Avatar shape='square' size={100} fit={fit} src={url}></Avatar>
            </div>
          )
        })}
      </div>
    </div>
  </>
)

export default App
```

### Avatar Props

| 参数   | 说明                                                               | 类型          | 可选值                                     | 默认值 |
| ------ | ------------------------------------------------------------------ | ------------- | ------------------------------------------ | ------ |
| icon   | 设置头像的图标类型，参考 Icon 组件                                 | string        | -                                          | —      |
| size   | 设置头像的大小                                                     | number/string | number / large / medium / small            | large  |
| shape  | 设置头像的形状                                                     | string        | circle / square                            | circle |
| src    | 图片头像的资源地址                                                 | string        | —                                          | false  |
| srcSet | 以逗号分隔的一个或多个字符串列表表明一系列用户代理使用的可能的图像 | string        | -                                          | -      |
| alt    | 描述图像的替换文本                                                 | string        | -                                          | -      |
| fit    | 当展示类型为图片的时候，设置图片如何适应容器框                     | string        | fill / contain / cover / none / scale-down | cover  |

### Avatar Events

| 事件名称 | 说明                                                                 | 回调参数   |
| -------- | -------------------------------------------------------------------- | ---------- |
| error    | 图片类头像加载失败的回调， 返回 false 会关闭组件默认的 fallback 行为 | (e: Event) |
