---
group:
  title: 其他
  order: 6
nav:
  title: Components
  path: /components
---

# Card 卡片

将信息聚合在卡片容器中展示。

## 基础用法

包含标题，内容和操作。

```tsx
import { Card, Button } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => {
  return (
    <div className='demo-Card'>
      <Card
        className='box-card'
        header={
          <div className='clearfix'>
            <span style={{ lineHeight: '36px' }}>卡片名称</span>
            <span style={{ float: 'right' }}>
              <Button type='primary'>操作按钮</Button>
            </span>
          </div>
        }
      >
        <div>列表内容 1</div>
        <div>列表内容 2</div>
        <div>列表内容 3</div>
        <div>列表内容 4</div>
      </Card>
    </div>
  )
}

export default App
```

## 简单卡片

卡片可以只有内容区域。

```tsx
import { Card, Button } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => {
  return (
    <div className='demo-Card'>
      <Card className='box-card'>
        <div className='text item'>列表内容 0</div>
        <div className='text item'>列表内容 1</div>
        <div className='text item'>列表内容 2</div>
        <div className='text item'>列表内容 3</div>
      </Card>
    </div>
  )
}

export default App
```

## 带图片

可配置定义更丰富的内容展示。

```tsx
import { Card, Row, Col, Button } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => {
  const getNowDate = () => {
    var date = new Date()
    var sign2 = ':'
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    var hour = date.getHours()
    var minutes = date.getMinutes()
    var seconds = date.getSeconds()
    var weekArr = [
      '星期一',
      '星期二',
      '星期三',
      '星期四',
      '星期五',
      '星期六',
      '星期天'
    ]
    var week = weekArr[date.getDay()]
    // 给一位数的数据前面加 “0”
    if (month >= 1 && month <= 9) {
      month = '0' + month
    }
    if (day >= 0 && day <= 9) {
      day = '0' + day
    }
    if (hour >= 0 && hour <= 9) {
      hour = '0' + hour
    }
    if (minutes >= 0 && minutes <= 9) {
      minutes = '0' + minutes
    }
    if (seconds >= 0 && seconds <= 9) {
      seconds = '0' + seconds
    }
    return (
      year +
      '-' +
      month +
      '-' +
      day +
      ' ' +
      hour +
      sign2 +
      minutes +
      sign2 +
      seconds
    )
  }

  return (
    <div className='demo-Card'>
      <Row>
        <Col span={8} offset={0}>
          <Card bodyStyle={{ padding: 0 }}>
            <img
              src='https://elemefe.github.io/element-react/50e4091cc60a.png'
              className='image'
            />
            <div style={{ padding: 14 }}>
              <span>好吃的汉堡</span>
              <div className='bottom clearfix'>
                <time className='time'>{getNowDate(new Date())}</time>
                <Button type='text' className='button'>
                  操作按钮
                </Button>
              </div>
            </div>
          </Card>
        </Col>
        <Col span={8} offset={2}>
          <Card bodyStyle={{ padding: 0 }}>
            <img
              src='https://elemefe.github.io/element-react/50e4091cc60a.png'
              className='image'
            />
            <div style={{ padding: 14 }}>
              <span>好吃的汉堡</span>
              <div className='bottom clearfix'>
                <time className='time'>{getNowDate(new Date())}</time>
                <Button type='text' className='button'>
                  操作按钮
                </Button>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default App
```

### Card props

| 参数      | 说明                                           | 类型   | 可选值 | 默认值              |
| --------- | ---------------------------------------------- | ------ | ------ | ------------------- |
| header    | 设置 header，也可以通过 `slot#header` 传入 DOM | string | —      | —                   |
| bodyStyle | 设置 body 的样式                               | object | —      | { padding: '20px' } |
