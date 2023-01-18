---
group:
  title: 表单
  order: 2
nav:
  title: Components
  path: /components
---

# Input 输入框

通过鼠标或键盘输入内容，是最基础的表单域的包装。

## 基础用法

基本使用.

```tsx
import React from 'react'
import { Input } from 'tinkerbell-ui-react'

const App: React.FC = () => <Input placeholder='Basic usage' />

export default App
```

## 四种大小

我们为 `<Input />` 输入框定义了四种尺寸（大、默认、小、迷你）。

```tsx
import React from 'react'
import { Input, Icon } from 'tinkerbell-ui-react'

const App: React.FC = () => (
  <>
    <Input size='large' placeholder='large size' icon='icon-search' />
    <br />
    <br />
    <Input placeholder='default size' icon='icon-search' />
    <br />
    <br />
    <Input size='small' placeholder='small size' icon='icon-search' />
    <br />
    <br />
    <Input size='mini' placeholder='mini size' icon='icon-search' />
  </>
)

export default App
```

## 图标

`icon` 设置 `icon` 图标名称

```tsx
import React from 'react'
import { Input, Icon } from 'tinkerbell-ui-react'

const App: React.FC = () => (
  <>
    <Input placeholder='default size' icon='icon-search' />
  </>
)

export default App
```

## 禁用状态

通过 `disabled` 属性指定是否禁用 `input` 组件

```tsx
import React from 'react'
import { Input } from 'tinkerbell-ui-react'

const App: React.FC = () => (
  <>
    <Input disabled placeholder='请输入内容' />
  </>
)

export default App
```

## 文本域

可调整大小，用于输入多行文本信息，通过将 type 属性的值指定为 textarea。

```tsx
import React from 'react'
import { Input } from 'tinkerbell-ui-react'

const App: React.FC = () => (
  <>
    <Input
      type='textarea'
      autosize={{ minRows: 2, maxRows: 4 }}
      placeholder='请输入内容'
    />
  </>
)

export default App
```

## 可自适应文本高度的文本域

通过设置 autosize 属性可以使得文本域的高度能够根据文本内容自动进行调整，并且 autosize 还可以设定为一个对象，指定最小行数和最大行数。

```tsx
import React from 'react'
import { Input } from 'tinkerbell-ui-react'

const App: React.FC = () => (
  <>
    <div>
      <Input type='textarea' autosize={true} placeholder='请输入内容' />
      <div style={{ margin: '20px 0' }}></div>
      <Input
        type='textarea'
        autosize={{ minRows: 2, maxRows: 4 }}
        placeholder='请输入内容'
      />
    </div>
  </>
)

export default App
```

## 复合型输入框

可前置或后置元素，一般为标签或按钮，可通过 `prepend` 和 `append` 来指定在 `input` 中前置或者后置内容。

```tsx
import React from 'react'
import { Input, Select, Button } from 'tinkerbell-ui-react'

const App: React.FC = () => (
  <>
    <div>
      <Input placeholder='请输入内容' prepend='Http://' />
      <br />
      <br />
      <Input placeholder='请输入内容' append='.com' />
      <br />
      <br />
      <Input
        placeholder='请输入内容'
        prepend={
          <Select value='' style={{ width: 120 }}>
            {['餐厅名', '订单号', '用户电话'].map((item, index) => (
              <Select.Option key={index} label={item} value={index} />
            ))}
          </Select>
        }
        append={
          <Button type='primary' icon='search'>
            搜索
          </Button>
        }
      />
    </div>
  </>
)

export default App
```

### Radio props

| 参数        | 说明                                                                                           | 类型           | 可选值                           | 默认值 |
| ----------- | ---------------------------------------------------------------------------------------------- | -------------- | -------------------------------- | ------ |
| type        | 类型                                                                                           | String         | text/textarea                    | text   |
| value       | 绑定值                                                                                         | String, Number | —                                | —      |
| maxLength   | 最大输入长度                                                                                   | Number         | —                                | -      |
| minLength   | 最小输入长度                                                                                   | Number         | -                                | —      |
| placeholder | 输入框占位文本                                                                                 | String         | —                                | -      |
| disabled    | 禁用                                                                                           | boolean        | —                                | false  |
| size        | 输入框尺寸，只在 type!="textarea" 时有效                                                       | string         | large, small, mini               | -      |
| icon        | 输入框尾部图标                                                                                 | String         | —                                | -      |
| rows        | 输入框行数，只对 type="textarea" 有效                                                          | Number         | —                                | 2      |
| autosize    | autosize 自适应内容高度，只对 type="textarea" 有效，可传入对象，如，{ minRows: 2, maxRows: 6 } | Boolean/Object | —                                | false  |
| name        | 原生属性                                                                                       | String         | —                                | -      |
| readOnly    | 原生属性，是否只读                                                                             | Boolean        | —                                | false  |
| max         | 原生属性，设置最大值                                                                           | -              | —                                | -      |
| min         | 原生属性，设置最小值                                                                           | -              | —                                | -      |
| step        | 原生属性，设置输入字段的合法数字间隔                                                           | -              | —                                | -      |
| resize      | 控制是否能被用户缩放                                                                           | String         | none, both, horizontal, vertical | -      |
| autoFocus   | 原生属性，自动获取焦点                                                                         | Boolean        | —                                | false  |
| onIconClick | 点击 Input 内的图标的钩子函数                                                                  | Function       | —                                | -      |
| trim        | 对 input 内容进行 trim                                                                         | boolean        | —                                | false  |
