---
group:
  title: 数据
  order: 3
nav:
  title: Components
  path: /components
---

# Tag 标签

用于标记和选择。

## 基础用法

由 `type` 属性来选择 `tag` 的类型，也可以通过 `color` 属性来自定义背景色。

```tsx
import { Tag } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => (
  <>
    <div className='demo-tag'>
      <Tag type='default'>标签一</Tag>
      <Tag type='primary'>标签一</Tag>
      <Tag type='success'>标签二</Tag>
      <Tag type='info'>标签三</Tag>
      <Tag type='warning'>标签四</Tag>
      <Tag type='danger'>标签五</Tag>
    </div>
  </>
)

export default App
```

## 多种颜色

由 `dark` 属性来设置深色模式,并可以设置更多颜色类型的标签

```tsx
import { Tag } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => (
  <>
    <div className='demo-tag'>
      <Tag size='small'>default</Tag>
      <Tag type='primary' dark size='small'>
        primary
      </Tag>
      <Tag type='success' dark size='small'>
        success
      </Tag>
      <Tag type='info' dark size='small'>
        info
      </Tag>
      <Tag type='warning' dark size='small'>
        warning
      </Tag>
      <Tag type='danger' dark size='small'>
        danger
      </Tag>
      <Tag type='magenta' size='small'>
        magenta
      </Tag>
      <Tag type='red' size='small'>
        red
      </Tag>
      <Tag type='volcano' size='small'>
        volcano
      </Tag>
      <Tag type='orange' size='small'>
        orange
      </Tag>
      <Tag type='gold' size='small'>
        gold
      </Tag>
      <Tag type='cyan' size='small'>
        cyan
      </Tag>
      <Tag type='blue' size='small'>
        blue
      </Tag>
      <Tag type='geekblue' size='small'>
        geekblue
      </Tag>
      <Tag type='purple' size='small'>
        purple
      </Tag>
    </div>
  </>
)

export default App
```

## 可选择标签

设置 `checkable` 属性可以定义一个标签是否可可选择。

```tsx
import { Tag } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => (
  <>
    <div className='demo-tag'>
      <Tag type='primary' dark size='mini' checkable>
        primary
      </Tag>
      <Tag type='success' dark size='mini' checkable>
        success
      </Tag>
      <Tag type='info' dark size='mini' checkable>
        info
      </Tag>
      <Tag type='warning' dark size='mini' checkable>
        warning
      </Tag>
      <Tag type='danger' dark size='mini' checkable>
        danger
      </Tag>
      <Tag type='magenta' size='mini' dark checkable>
        magenta
      </Tag>
      <Tag type='red' size='mini' dark checkable>
        red
      </Tag>
      <Tag type='volcano' size='mini' dark checkable>
        volcano
      </Tag>
      <Tag type='orange' size='mini' dark checkable>
        orange
      </Tag>
      <Tag type='gold' size='mini' dark checkable>
        gold
      </Tag>
      <Tag type='cyan' size='mini' dark checkable>
        cyan
      </Tag>
      <Tag type='blue' size='mini' dark checkable>
        blue
      </Tag>
      <Tag type='geekblue' size='mini' dark checkable>
        geekblue
      </Tag>
      <Tag type='purple' size='mini' dark checkable>
        purple
      </Tag>
    </div>
    <div className='demo-tag' style={{ marginTop: 16 }}>
      <Tag type='primary' size='mini' checkable>
        primary
      </Tag>
      <Tag type='success' size='mini' checkable>
        success
      </Tag>
      <Tag type='info' size='mini' checkable>
        info
      </Tag>
      <Tag type='warning' size='mini' checkable>
        warning
      </Tag>
      <Tag type='danger' size='mini' checkable>
        danger
      </Tag>
      <Tag type='magenta' size='mini' checkable>
        magenta
      </Tag>
      <Tag type='red' size='mini' checkable>
        red
      </Tag>
      <Tag type='volcano' size='mini' checkable>
        volcano
      </Tag>
      <Tag type='orange' size='mini' checkable>
        orange
      </Tag>
      <Tag type='gold' size='mini' checkable>
        gold
      </Tag>
      <Tag type='cyan' size='mini' checkable>
        cyan
      </Tag>
      <Tag type='blue' size='mini' checkable>
        blue
      </Tag>
      <Tag type='geekblue' size='mini' checkable>
        geekblue
      </Tag>
      <Tag type='purple' size='mini' checkable>
        purple
      </Tag>
    </div>
  </>
)

export default App
```

## 可移除标签

呈现删除标记的标签

```tsx
import { Tag } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => (
  <>
    <div className='demo-tag'>
      <Tag type='default' closable>
        标签一
      </Tag>
      <Tag type='primary' closable>
        标签一
      </Tag>
      <Tag type='success' closable>
        标签二
      </Tag>
      <Tag type='info' closable>
        标签三
      </Tag>
      <Tag type='warning' closable>
        标签四
      </Tag>
      <Tag type='danger' closable>
        标签五
      </Tag>
    </div>
  </>
)

export default App
```

## dot 模式

`dot` 模式简单显示

```tsx
import { Tag } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => (
  <>
    <div className='demo-tag'>
      <Tag dot>dot</Tag>
      <Tag type='primary' noBorder dot>
        no-border-dot
      </Tag>
      <Tag type='success' dot noBorder>
        type dot
      </Tag>
      <Tag color='#13c2c2' closable dot>
        color dot
      </Tag>
    </div>
  </>
)

export default App
```

## 动态编辑标签

设置 `closable` 属性可以定义一个标签是否可移除。

```tsx
import { Tag, Button } from 'tinkerbell-ui-react'
import React, { useState } from 'react'

const [dynamicTags, setDynamicTags] = useState(['标签一', '标签二', '标签三'])
const [count, setCount] = useState(0)

const handleCloseTag = (tag) => {
  dynamicTags.splice(dynamicTags.indexOf(tag), 1)
  console.log(dynamicTags)
  setDynamicTags([...dynamicTags])
}
const addOne = () => {
  setCount(count + 1)
  dynamicTags.push('new tag' + count)
  setDynamicTags([...dynamicTags])
}
const App: React.FC = () => (
  <>
    <div className='demo-tag'>
      <div>
        <Button size='small' onClick={addOne}>
          + New Tag
        </Button>
        <p style={{ marginTop: 16 }}>
          {dynamicTags.map((tag) => {
            return (
              <Tag key={tag} closable onClose={() => handleCloseTag(tag)}>
                {tag}
              </Tag>
            )
          })}
        </p>
      </div>
    </div>
  </>
)

export default App
```

## 自定义样式

具有多种自定义样式的方式可供选择

```tsx
import { Tag } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => (
  <>
    <div className='demo-tag'>
      <Tag color='#ffa2d3'>Custom Color</Tag>
      <Tag type='primary' no-border font-size='14px'>
        No Border
      </Tag>
      <Tag tagStyle={{ backgroundColor: '#5AFAFC', color: '#606266' }}>
        Style
      </Tag>
      <Tag closable>Default</Tag>
      <Tag size='small' closable>
        Small
      </Tag>
      <Tag size='mini' closable>
        Mini
      </Tag>
    </div>
  </>
)

export default App
```

### Tag props

| 参数      | 说明                             | 类型    | 可选值                      | 默认值 |
| --------- | -------------------------------- | ------- | --------------------------- | ------ |
| closable  | 是否可关闭                       | boolean | —                           | false  |
| type      | 主题                             | string  | success/info/warning/danger | —      |
| dot       | 是否显示是小圆点                 | boolean | —                           | false  |
| noBorder  | 是否关闭边框                     | boolean | —                           | false  |
| color     | 背景颜色(可自定义)               | String  | —                           | —      |
| size      | 尺寸                             | String  | medium / small / mini       | —      |
| fontSize  | 字体大小                         | String  | —                           | —      |
| tagStyle  | 标签样式(完全控制，尽量不要设置) | String  | —                           | —      |
| checkable | 是否可选中                       | Boolean | —                           | false  |
| value     | 选中状态                         | Boolean | —                           | true   |

### Tag events

| 事件名   | 说明                                | 返回值       |
| -------- | ----------------------------------- | ------------ |
| onClose  | 关闭事件回调                        | event        |
| onClick  | 点击事件回调                        | event        |
| onChange | 选中事件回调,第二项需要设置 name 值 | checked,name |
