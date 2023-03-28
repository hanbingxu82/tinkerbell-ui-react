---
group:
  title: 数据
  order: 3
nav:
  title: Components
  path: /components
---

# Progress 进度条

用于展示操作进度，告知用户当前状态和预期

## 基础用法

可设置不同的 `status` 、 `border` 、 `color` 、 `bgColor` 展示不同的颜色效果

```tsx
import { Progress } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => (
  <>
    <div className='demo-progress'>
      <Progress percent={10}></Progress>
      <Progress percent={20} status='success'></Progress>
      <Progress percent={30} status='warning' border={false}></Progress>
      <Progress percent={40} status='error'></Progress>
      <Progress percent={50} color='#9254de'></Progress>
      <Progress
        percent={60}
        color={['#f5af19', '#f12711', '#9254de', '#40a9ff', '#5cdbd3']}
        border={false}
      ></Progress>
      <Progress
        percent={70}
        color={['#40a9ff', '#5cdbd3']}
        bgColor='#d9f7be'
      ></Progress>
    </div>
  </>
)

export default App
```

## 不同类型

可设置 `lump` 类型，同时支持宽度和颜色设置

```tsx
import { Progress } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => (
  <>
    <div className='demo-progress'>
      <Progress percent={20}></Progress>
      <Progress percent={40} status='success' type='lump'></Progress>
      <Progress
        percent={60}
        status='warning'
        type='lump'
        active
        border={false}
      ></Progress>
      <Progress
        percent={80}
        color={['#40a9ff', '#5cdbd3']}
        type='lump'
        cutWidth={2}
        cutColor='#389e0d'
      ></Progress>
    </div>
  </>
)

export default App
```

## 高度设置

可设置不同的 `lineHeight` 展示不同的尺寸，默认为 6

```tsx
import { Progress } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => (
  <>
    <div className='demo-progress'>
      <Progress percent={10}></Progress>
      <Progress percent={20} status='success' lineHeight={8}></Progress>
      <Progress percent={30} status='warning' lineHeight={10}></Progress>
      <Progress percent={40} status='error' lineHeight={12}></Progress>
    </div>
  </>
)

export default App
```

## 高度设置

可设置不同的 `lineHeight` 展示不同的尺寸，默认为 6

```tsx
import { Progress } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => (
  <>
    <div className='demo-progress'>
      <Progress percent={10}></Progress>
      <Progress percent={20} status='success' lineHeight={8}></Progress>
      <Progress percent={30} status='warning' lineHeight={10}></Progress>
      <Progress percent={40} status='error' lineHeight={12}></Progress>
    </div>
  </>
)

export default App
```

## 文字设置

可通过 `showText` 设置是否显示文字，可 `format` 自定义文字显示

```tsx
import { Progress } from 'tinkerbell-ui-react'
import React from 'react'
function format(percent) {
  if (percent == 100) {
    return '^_^'
  }
  return 'QAQ'
}
const App: React.FC = () => (
  <>
    <div className='demo-progress'>
      <Progress percent={50}></Progress>
      <Progress percent={60} status='success' showText={false}></Progress>
      <Progress percent={80} status='warning' format={format}></Progress>
      <Progress percent={100} status='error' format={format}></Progress>
    </div>
  </>
)

export default App
```

## 动效设置

可通过 `active` 、 `activeColor` 、 `colorFlow` 来设置进度条动态效果

```tsx
import { Progress } from 'tinkerbell-ui-react'
import React from 'react'
function format(percent) {
  if (percent == 100) {
    return '^_^'
  }
  return 'QAQ'
}
const App: React.FC = () => (
  <>
    <div className='demo-progress'>
      <Progress percent={40} active></Progress>
      <Progress percent={60} active activeColor='#f12711'></Progress>
      <Progress
        percent={80}
        active
        color={['#f5af19', '#f12711', '#9254de', '#40a9ff', '#5cdbd3']}
      ></Progress>
      <Progress
        percent={100}
        color={['#f5af19', '#f12711', '#9254de', '#40a9ff', '#5cdbd3']}
        colorFlow={true}
      ></Progress>
    </div>
  </>
)

export default App
```

### Progress props

| 参数        | 说明                                                                          | 类型                      | 可选值                    | 默认值  |
| ----------- | ----------------------------------------------------------------------------- | ------------------------- | ------------------------- | ------- |
| percent     | 百分比（必填）                                                                | Number                    | 0-100                     | 0       |
| ineHeight   | 进度条高度                                                                    | Number                    | -                         | 6       |
| type        | 进度条类型                                                                    | String                    | line / lump               | line    |
| status      | 进度条状态                                                                    | String                    | success / warning / error | -       |
| color       | 进度条颜色；当使用 Array 时，限制个数为 6；当使用 Function 时，参数为 percent | String / Array / Function | —                         | —       |
| colorFlow   | 是否开启颜色流动                                                              | Boolean                   | -                         | false   |
| flowSecond  | 流动所需时间，即时间越小，速度越快                                            | Number                    | 1-6                       | 5       |
| bgColor     | 进度条背景颜色                                                                | String                    | 16 进制颜色代码           | #ebeef5 |
| border      | 是否是圆弧状态                                                                | Boolean                   | —                         | true    |
| showText    | 是否显示进度条文字                                                            | Boolean                   | —                         | true    |
| format      | 自定义文字显示，参数为 percent                                                | Function                  | —                         | -       |
| cutWidth    | lump 宽度                                                                     | Number                    | —                         | 1       |
| cutColor    | lump 颜色                                                                     | String                    | 16 进制颜色代码           | #ebeef5 |
| active      | 是否开启动效                                                                  | Boolean                   | —                         | false   |
| activeColor | 动效颜色                                                                      | String                    | —                         | -       |
