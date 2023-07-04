---
group:
  title: 数据
  order: 3
nav:
  title: Components
  path: /components
---

# Divider 分割线

区隔内容的分割线。可以对对不同文本段落进行分割。可以对行内文字/链接进行分割，例如表格的操作列。

## 基础用法

默认为水平分割线，可在中间加入文字。 可以是虚线。

```tsx
import { Divider } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => (
  <>
    <div className='demo-Divider'>
      <p>
        这是一段文字...这是一段文字...这是一段文字...这是一段文字...这是一段文字...
      </p>
      <Divider></Divider>
      <p>
        这是一段文字...这是一段文字...这是一段文字...这是一段文字...这是一段文字...
      </p>
      <Divider>With Text</Divider>
      <p>
        这是一段文字...这是一段文字...这是一段文字...这是一段文字...这是一段文字...
      </p>
      <Divider dashed></Divider>
      <p>
        这是一段文字...这是一段文字...这是一段文字...这是一段文字...这是一段文字...
      </p>
    </div>
  </>
)

export default App
```

## 垂直分割线

使用 type="vertical" 设置为行内的垂直分割线。

```tsx
import { Divider } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => (
  <>
    <div className='demo-Divider'>
      Text
      <Divider type='vertical'></Divider>
      <a href='#'>Link</a>
      <Divider type='vertical'></Divider>
      <a href='#'>Link</a>
    </div>
  </>
)

export default App
```

## 修改标题的位置

align 属性可以设置标题位置 使用 align="left" 设置为行内的垂直分割线。

```tsx
import { Divider, RadioGroup, Radio, Input } from 'tinkerbell-ui-react'
import React, { useState } from 'react'

const App: React.FC = () => {
  const [value, setValue] = useState('left')
  const [title, setTitle] = useState('标题内容')
  const onChange = (val) => {
    setValue(val)
  }
  return (
    <>
      <Divider orientation={value}>{title}</Divider>
      <div flex='cross:center'>
        <span style={{ margin: '0 4px' }}>对齐方式</span>
        <RadioGroup
          onChange={onChange}
          value={value}
          size='small'
          optionType='button'
          options={[
            { value: 'left', label: '左对齐' },
            { value: 'right', label: '右对齐' }
          ]}
        ></RadioGroup>
        <span style={{ margin: '0 4px 0 16px' }}>标题</span>
        <Input
          value={title}
          onChange={(val) => {
            setTitle(val)
          }}
          size='small'
          style={{ width: '200px' }}
        ></Input>
      </div>
    </>
  )
}

export default App
```

### Divider props

| 参数        | 说明             | 类型    | 可选值                | 默认值     |
| ----------- | ---------------- | ------- | --------------------- | ---------- |
| type        | 水平还是垂直类型 | string  | horizontal / vertical | horizontal |
| orientation | 分割线标题的位置 | string  | left / right          | center     |
| dashed      | 是否虚线         | Boolean | false / true          | false      |
