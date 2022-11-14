---
group:
  title: 基础
nav:
  title: Components
  path: /components
---

# Layout 布局

我们采用了24布局系统，将区域进行24等分，和大部分组件库类似，我们也引入两个组件，row和col，row表示行，col在row之内使用

## 基础用法

`row` 和 `col` 的基本使用方式

```tsx
import { Col, Row } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => (
  <div className='demo-component'>
    <Row>
      <Col span={24}>col</Col>
    </Row>
    <Row>
      <Col span={12}>col-12</Col>
      <Col span={12}>col-12</Col>
    </Row>
    <Row>
      <Col span={8}>col-8</Col>
      <Col span={8}>col-8</Col>
      <Col span={8}>col-8</Col>
    </Row>
    <Row>
      <Col span={6}>col-6</Col>
      <Col span={6}>col-6</Col>
      <Col span={6}>col-6</Col>
      <Col span={6}>col-6</Col>
    </Row>
  </div>

)

export default App
```

# 间隔

可以设置 `gutter` 间隔

```tsx
import { Col, Divider, Row } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => (
  <div className='demo'>
    <Row gutter={16}>
      <Col  span={6}>
        <div >col-6</div>
      </Col>
      <Col  span={6}>
        <div >col-6</div>
      </Col>
      <Col  span={6}>
        <div >col-6</div>
      </Col>
      <Col  span={6}>
        <div >col-6</div>
      </Col>
    </Row>
  </div>
)

export default App
```

# 混合布局

通过基础的 1/24 分栏任意扩展组合形成较为复杂的混合布局。

```tsx
import { Col, Divider, Row } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => (
  <div className='demo'>
   <Row gutter={20}>
        <Col span={16}><div>col16</div></Col>
        <Col span={8}><div>col8</div></Col>
    </Row>
    <Row gutter={20}>
        <Col span={8}><div>col8</div></Col>
        <Col span={8}><div>col8</div></Col>
        <Col span={4}><div>col4</div></Col>
        <Col span={4}><div>col4</div></Col>
    </Row>
    <Row gutter={20}>
        <Col span={4}><div>col4</div></Col>
        <Col span={16}><div>col16</div></Col>
        <Col span={4}><div>col4</div></Col>
    </Row>
  </div>
)

export default App
```

# 分栏偏移

支持偏移指定的栏数。

```tsx
import { Col, Divider, Row } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => (
  <div className='demo'>
    <Row gutter={20}>
        <Col span={6}><div>col6</div></Col>
        <Col span={6} offset={6}><div>col6</div></Col>
    </Row>
    <Row gutter={20}>
        <Col span={6} offset={6}><div>col6</div></Col>
        <Col span={6} offset={6}><div>col6</div></Col>
    </Row>
    <Row gutter={20}>
       <Col span={12} offset={6}><div>col12</div></Col>
    </Row>
  </div>
)

export default App
```

# 响应式布局

参照了 `Bootstrap` 的 响应式设计，预设了五个响应尺寸： `xs` 、 `sm` 、 `md` 、 `lg` 和 `xl` 。

```tsx
import { Col, Divider, Row } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => (
  <div className='demo'>
    <Row gutter={10}>
        <Col xs={8} sm={6} md={4} lg={3} xl={1}><div></div></Col>
        <Col xs={4} sm={6} md={8} lg={9} xl={11}><div></div></Col>
        <Col xs={4} sm={6} md={8} lg={9} xl={11}><div></div></Col>
        <Col xs={8} sm={6} md={4} lg={3} xl={1}><div></div></Col>
    </Row>
  </div>
)

export default App
```

### Row Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| gutter | 栅格间隔 | number | - | 0 |
| justify | flex 布局下的水平排列方式 | string | start / end / center / space-around / space-between | start |
| align | flex 布局下的垂直排列方式 | string | top / middle / bottom | top |

### Col Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| span | 栅格占据的列数 | number | - | 24 |
| offset | 栅格左侧的间隔格数 | number | - | 0 |
| push | 栅格向右移动格数 | number | - | 0 |
| xs | <768px 响应式栅格数或者栅格属性对象 | number/object (例如： {span: 4, offset: 4}) | - | - |
| sm | ≥768px 响应式栅格数或者栅格属性对象 | number/object (例如： {span: 4, offset: 4}) | - | - |
| md | ≥992px 响应式栅格数或者栅格属性对象 | number/object (例如： {span: 4, offset: 4}) | - | - |
| lg | ≥1200px 响应式栅格数或者栅格属性对象 | number/object (例如： {span: 4, offset: 4}) | - | - |
| xl | ≥1920px 响应式栅格数或者栅格属性对象 | number/object (例如： {span: 4, offset: 4}) | - | - |

More skills for writing demo: https://d.umijs.org/guide/demo-principle
