---
group:
  title: 表单
  order: 2
nav:
  title: Components
  path: /components
---

# CheckBox 多选框

在一组可选项中进行多项选择时使用,单独使用可以表示两种状态之间的切换，和 `switch` 类似。区别在于切换 `switch` 会直接触发状态改变，而 `checkbox` 一般用于状态标记，需要和提交操作配合。

## 基础用法

基本组件-多选框。主要用于一组可选项多项选择，或者单独用于标记切换某种状态。

```tsx
import React from 'react'
import { CheckBox } from 'tinkerbell-ui-react'

const onChange = (e) => {
  console.log(`checked = ${e.target.checked}`)
}

const App: React.FC = () => <CheckBox onChange={onChange}>CheckBox</CheckBox>

export default App
```

## 禁用状态

复选框不可用的状态。

```tsx
import React from 'react'
import { CheckBox } from 'tinkerbell-ui-react'

const App: React.FC = () => (
  <>
    <CheckBox checked={false} disabled />
    <br />
    <CheckBox checked={true} disabled />
  </>
)

export default App
```

## 受控的 CheckBox

联动 checkbox。

```tsx
import React, { useState } from 'react'
import { Button, CheckBox } from 'tinkerbell-ui-react'

const App: React.FC = () => {
  const [checked, setChecked] = useState(true)
  const [disabled, setDisabled] = useState(false)

  const toggleChecked = () => {
    setChecked(!checked)
  }

  const toggleDisable = () => {
    setDisabled(!disabled)
  }

  const onChange = (e) => {
    console.log('checked = ', e.target.checked)
    setChecked(e.target.checked)
  }

  const label = `${checked ? 'Checked' : 'Unchecked'}-${
    disabled ? 'Disabled' : 'Enabled'
  }`

  return (
    <>
      <div style={{ marginBottom: '20px' }}>
        <CheckBox checked={checked} disabled={disabled} onChange={onChange}>
          {label}
        </CheckBox>
      </div>
      <div>
        <Button type='primary' size='small' onClick={toggleChecked}>
          {!checked ? 'Check' : 'Uncheck'}
        </Button>
        <Button
          style={{ margin: '0 10px' }}
          type='primary'
          size='small'
          onClick={toggleDisable}
        >
          {!disabled ? 'Disable' : 'Enable'}
        </Button>
      </div>
    </>
  )
}

export default App
```

## CheckBox 组

方便的从数组生成 CheckBox 组。

```tsx
import React, { useState, useEffect } from 'react'
import { Checkbox, CheckBoxGroup } from 'tinkerbell-ui-react'

const onChange = (checkedValues) => {
  console.log('checked = ', checkedValues)
  setValue([...checkedValues])
}
const [value, setValue] = useState()

const options = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange' }
]
const optionsWithDisabled = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange', disabled: false }
]

const App: React.FC = () => (
  <>
    <CheckBoxGroup options={options} value={value} onChange={onChange} />
    <br />
    <br />
    <CheckBoxGroup
      options={optionsWithDisabled}
      value={value}
      onChange={onChange}
    />
  </>
)

export default App
```

### Radio props

| 参数     | 说明                              | 类型    | 可选值                                             | 默认值 |
| -------- | --------------------------------- | ------- | -------------------------------------------------- | ------ |
| value    | 根据 value 进行比较，判断是否选中 | Boolean | —                                                  | false  |
| label    | 初始 lable 文本                   | String  | —                                                  | —      |
| disabled | 是否禁用当前项                    | Boolean | —                                                  | false  |
| type     | type 类型 判断颜色                | String  | primary / success / warning / danger / info / text | —      |
| checked  | 指定当前是否选中                  | Boolean | —                                                  | false  |

### Radio events

| 事件名   | 说明                                                                     | 返回值 |
| -------- | ------------------------------------------------------------------------ | ------ |
| onChange | 在选项状态发生改变时触发，返回当前状态。通过修改外部的数据改变时不会触发 | Event  |

### RadioGroup props

| 事件名      | 说明                                                      | 类型           | 可选值               | 默认值 |
| ----------- | --------------------------------------------------------- | -------------- | -------------------- | ------ |
| value       | 指定选中项目的集合，可以使用 v-model 双向绑定数据         | String/ Number | -                    | -      |
| size        | 多选框组的尺寸，可选值为 large、small、default 或者不设置 | String         | large / small / mini | -      |
| disabled    | 是否禁用所有选项                                          | Boolean        | —                    | false  |
| buttonStyle | 如果是 button 类型 统一的 buttonStyle                     | String         | —                    | -      |
| optionType  | js 编程式类型                                             | String         | default/button       | -      |
| option      | js 编程式组件 List                                        | any            | -                    | []     |

### RadioGroup events

| 事件名   | 说明                                                                         | 返回值 |
| -------- | ---------------------------------------------------------------------------- | ------ |
| onChange | 在选项状态发生改变时触发，返回已选中的数组。通过修改外部的数据改变时不会触发 | Event  |
