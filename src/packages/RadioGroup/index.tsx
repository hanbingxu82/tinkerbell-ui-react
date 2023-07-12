/*
 * @Author: your name
 * @Date: 2022-02-08 11:34:31
 * @LastEditTime: 2023-07-12 17:19:40
 * @LastEditors: hanbingxu
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/RadioGroup/index.tsx
 */
/* eslint-disable */

import React from 'react'
import Radio from '../Radio/index'
import RadioButton from '../RadioButton/index'
interface Iprops {
  name?: string // 统一原生name值
  buttonStyle: string // 如果是button类型 统一的buttonStyle
  disabled: boolean // 统一禁用
  options: any // js编程式组件
  optionType: string // js编程式类型
  size: string // 大小
  value: any // value值
}
function RadioGroup(props: any) {
  const {
    name,
    value,
    options = [],
    buttonStyle,
    size,
    optionType = 'default'
  }: Iprops = props

  function handleChange(val: any) {
    props.onChange && props.onChange(val)
  }
  //  options 循环遍历
  const radioDom = options.map((item: any) => {
    if (optionType === 'button') {
      return (
        <RadioButton
          key={item.value}
          value={item.value || ''}
          groupValue={value}
          name={name}
          size={size}
          buttonStyle={buttonStyle}
          disabled={item.disabled ? item.disabled : null}
          onChange={handleChange}
        >
          {item.label}
        </RadioButton>
      )
    } else {
      return (
        <Radio
          key={item.value}
          value={item.value}
          groupValue={value}
          name={name}
          disabled={item.disabled ? item.disabled : null}
          onChange={handleChange}
        >
          {item.label}
        </Radio>
      )
    }
  })
  //  遍历dom子节点方式
  const radioItems = React.Children.map(props.children, (item) => {
    return React.cloneElement(item, {
      item,
      componentName: 'radioGroup',
      groupValue: value,
      name,
      onChange: props.onChange,
      buttonStyle,
      size
    })
  })

  return (
    <div style={props.style} className='tb-radio-group'>
      {radioItems ? radioItems : radioDom}
    </div>
  )
}
export default RadioGroup
