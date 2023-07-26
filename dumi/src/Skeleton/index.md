---
group:
  title: 其他
  order: 6
nav:
  title: Components
  path: /components
---

# Skeleton 骨架屏

在需要等待加载内容的位置设置一个骨架屏，某些场景下比 Loading 的视觉效果更好。

## 基础用法

基础的骨架效果

```tsx
import { Skeleton } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => {
  return (
    <div>
      <Skeleton></Skeleton>
    </div>
  )
}
export default App
```

## 更多参数

可以配置骨架屏段落数量，以便更接近真实渲染效果。显示的数量会比传入的数量多 1，首行会被渲染一个长度 33% 的段首。

```tsx
import { Skeleton } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => {
  return (
    <div>
      <Skeleton rows={5}></Skeleton>
    </div>
  )
}
export default App
```

## 动画效果

可以显示动画效果

```tsx
import { Skeleton } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => {
  return (
    <div>
      <Skeleton animation></Skeleton>
    </div>
  )
}
export default App
```

## 自定义

可以使用插槽来自己设定模板，可以根据真实 dom 来构建差不多的骨架

```tsx
import {
  Skeleton,
  Card,
  Switch,
  SkeletonItem,
  Button
} from 'tinkerbell-ui-react'
import React, { useState } from 'react'

const [loading, setLoading] = useState<any>(false)
const App: React.FC = () => {
  return (
    <div>
      <div>
        <Switch
          onChange={(val: any) => {
            setLoading(val)
          }}
          value={loading}
        />
      </div>
      <br />
      <Skeleton
        animation
        loading={loading}
        style={{ width: 240 }}
        template={
          <>
            <SkeletonItem variant='image' style={{ width: 240, height: 240 }} />
            <div style={{ padding: 14 }}>
              <SkeletonItem variant='p' style={{ width: '50%' }} />
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <SkeletonItem variant='text' style={{ marginRight: 16 }} />
                <SkeletonItem variant='text' style={{ width: '30%' }} />
              </div>
            </div>
          </>
        }
      >
        <div style={{ width: 300 }}>
          <Card bodyStyle={{ padding: 0 }}>
            <img
              src='https://elemefe.github.io/element-react/50e4091cc60a.png'
              className='image'
            />
            <div style={{ padding: 14 }}>
              <span>好吃的汉堡</span>
              <div className='bottom clearfix'>
                <div className='time'>{new Date().getTime()}</div>
                <Button type='text' className='button'>
                  操作按钮
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </Skeleton>
    </div>
  )
}
export default App
```

### Skeleton props

| 参数     | 说明                                        | 类型    | 可选值       | 默认值 |
| -------- | ------------------------------------------- | ------- | ------------ | ------ |
| animated | 是否使用动画                                | boolean | true / false | false  |
| count    | 渲染多少个 template, 建议使用尽可能小的数字 | number  | integer      | 1      |
| loading  | 是否显示真实的 DOM 结构                     | boolean | true / false | false  |
| rows     | 骨架屏段落数量                              | number  | 正整数       | 3      |
| throttle | 延迟占位 DOM 渲染的时间, 单位是毫秒         | number  | 正整数       | 0      |
| template | 用来展示自定义占位符                        | Node    | -            | -      |

### Skeleton Item props

| 参数    | 说明                     | 类型         | 可选值                                                                    | 默认值 |
| ------- | ------------------------ | ------------ | ------------------------------------------------------------------------- | ------ |
| variant | 当前显示的占位元素的样式 | Enum(string) | p / text / h1 / h2 / h5 / text / caption / button / image / circle / rect | text   |
