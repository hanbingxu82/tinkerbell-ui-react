---
group:
  title: 其他
  order: 6
nav:
  title: Components
  path: /components
---

# Carousel 走马灯

在有限空间内，循环播放同一类型的图片、文字等内容。

## 基础用法

适用广泛的基础用法

```tsx
import { Carousel } from 'tinkerbell-ui-react'
import React from 'react'

function onChange(index) {
  console.log(index)
}

const App: React.FC = () => (
  <>
    <div className='demo-Carousel'>
      <Carousel afterChange={onChange}>
        <div>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
      </Carousel>
    </div>
  </>
)

export default App
```

## 位置

位置有 4 个方向。

```tsx
import { Carousel, Radio } from 'tinkerbell-ui-react'
import React, { useState } from 'react'

const App: React.FC = () => {
  function handlePositionChange(val) {
    console.log(val)
    setDotPosition(val)
  }
  const [dotPosition, setDotPosition] = useState('top')
  return (
    <>
      <div className='demo-Carousel'>
        <Radio.Group
          onChange={handlePositionChange}
          value={dotPosition}
          style={{ marginBottom: 8 }}
        >
          <Radio.Button value='top'>Top</Radio.Button>
          <Radio.Button value='bottom'>Bottom</Radio.Button>
          <Radio.Button value='left'>Left</Radio.Button>
          <Radio.Button value='right'>Right</Radio.Button>
        </Radio.Group>
        <Carousel dotPosition={dotPosition}>
          <div>
            <h3>1</h3>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
        </Carousel>
      </div>
    </>
  )
}

export default App
```

## 自动切换

定时切换下一张。

```tsx
import { Carousel } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => (
  <>
    <div className='demo-Carousel'>
      <Carousel autoplay>
        <div>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
      </Carousel>
    </div>
  </>
)

export default App
```

## 渐显

切换效果为渐显。

```tsx
import { Carousel } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => (
  <>
    <div className='demo-Carousel'>
      <Carousel effect='fade'>
        <div>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
      </Carousel>
    </div>
  </>
)

export default App
```

### Popover props

| 参数         | 说明               | 类型     | 可选值                | 默认值  |
| ------------ | ------------------ | -------- | --------------------- | ------- |
| afterChange  | 切换面板的回调     | Function | -                     | -       |
| autoplay     | 是否自动切换       | Boolean  | -                     | false   |
| beforeChange | 切换面板的回调     | Function | -                     | -       |
| dotPosition  | 面板指示点位置     | String   | top/bottom/left/right | bottom  |
| dots         | 是否显示面板指示点 | Boolean  | -                     | true    |
| easing       | 动画效果           | String   | -                     | linear  |
| effect       | 动画效果           | String   | scrollx/fade          | scrollx |

### Popover slotEvent

| 事件名称                       | 说明                                              |
| ------------------------------ | ------------------------------------------------- |
| goTo(slideNumber, dontAnimate) | 切换到指定面板, dontAnimate = true 时，不使用动画 |
| next()                         | 切换到下一面板                                    |
| prev()                         | 切换到上一面板                                    |
