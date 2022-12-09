---
group:
  title: 表单
  order: 2
nav:
  title: Components
  path: /components
---

# Radio 单选框

在一组备选项中进行单选。

## 基础用法

基本组件-单选框。主要用于一组可选项单项选择，或者单独用于切换到选中状态。

```tsx
import React, { useState } from 'react'
import { Radio, RadioGroup } from 'tinkerbell-ui-react'
const App: React.FC = () => {
  const [value, setValue] = useState(1)
  const onChange = (e) => {
    console.log('radio checked', e.target.value)
    setValue(e.target.value)
  }
  return (
    <RadioGroup onChange={onChange} value={value}>
      <Radio value={1}>A</Radio>
      <Radio value={2}>B</Radio>
      <Radio value={3}>C</Radio>
      <Radio value={4}>D</Radio>
    </RadioGroup>
  )
}
export default App
```

## 禁用状态

单选框不可用的状态。

```tsx
import React, { useState } from 'react'
import { Button, Radio } from 'tinkerbell-ui-react'

const App: React.FC = () => {
  const [disabled, setDisabled] = useState(true)

  const toggleDisabled = () => {
    setDisabled(!disabled)
  }

  return (
    <>
      <Radio checked={false} disabled={disabled}>
        Disabled
      </Radio>
      <Radio checked={true} disabled={disabled}>
        Disabled
      </Radio>
      <br />
      <Button type='primary' onClick={toggleDisabled} style={{ marginTop: 16 }}>
        Toggle disabled
      </Button>
    </>
  )
}

export default App
```

## 按钮状态

以按钮方式呈现的单选框组

```tsx
import React from 'react'
import { Radio, RadioGroup, RadioButton } from 'tinkerbell-ui-react'

const App: React.FC = () => (
  <>
    <RadioGroup value='a' size='large'>
      <RadioButton value='a'>Hangzhou</RadioButton>
      <RadioButton value='b'>Shanghai</RadioButton>
      <RadioButton value='c'>Beijing</RadioButton>
      <RadioButton value='d'>Chengdu</RadioButton>
    </RadioGroup>
    <br />
    <RadioGroup value='a' style={{ marginTop: 16 }}>
      <RadioButton value='a'>Hangzhou</RadioButton>
      <RadioButton value='b'>Shanghai</RadioButton>
      <RadioButton value='c'>Beijing</RadioButton>
      <RadioButton value='d'>Chengdu</RadioButton>
    </RadioGroup>
    <br />
    <RadioGroup value='a' size='small' style={{ marginTop: 16 }}>
      <RadioButton value='a'>Hangzhou</RadioButton>
      <RadioButton value='b'>Shanghai</RadioButton>
      <RadioButton value='c'>Beijing</RadioButton>
      <RadioButton value='d'>Chengdu</RadioButton>
    </RadioGroup>
  </>
)

export default App
```

### Radio props

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value     | 根据 value 进行比较，判断是否选中   | Boolean  |  —   |   false  |
| label     | 初始 lable 文本   | String  |  —   |    —   |
| disabled     | 是否禁用当前项  | Boolean  |  —   |   false  |
| type     | type类型 判断颜色  | String  | primary / success / warning / danger / info / text   |  —   |
| checked     | 指定当前是否选中  | Boolean  |  —   |   false  |

### Radio events

| 事件名      | 说明    | 返回值  |
|---------- |-------- |---------- |
| onChange     | 在选项状态发生改变时触发，返回当前状态。通过修改外部的数据改变时不会触发  | Event |

### RadioGroup props

| 事件名      | 说明    |类型      | 可选值  | 默认值  |
|---------- |-------- |---------- |--------- |--------- |
| value   | 指定选中项目的集合，可以使用 v-model 双向绑定数据  | String/ Number  | -  | -  |
| size   | 多选框组的尺寸，可选值为 large、small、default 或者不设置  |String  | large / small / mini | -  |
| disabled     | 是否禁用所有选项  | Boolean  |  —   |   false  |
| buttonStyle     | 如果是button类型 统一的buttonStyle  | String  |  —   |   -  |
| optionType     | js编程式类型  | String  |  default/button   |   -  |
| option     | js编程式组件List  | any  |  -   |   []  |

### RadioGroup events

| 事件名      | 说明    | 返回值  |
|---------- |-------- |---------- |
| onChange     | 在选项状态发生改变时触发，返回已选中的数组。通过修改外部的数据改变时不会触发 | Event |