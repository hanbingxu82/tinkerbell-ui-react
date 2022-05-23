/*
 * @Author: your name
 * @Date: 2022-02-08 11:34:31
 * @LastEditTime: 2022-02-09 15:44:07
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/RadioGroup/index.tsx
 */
import React from 'react'
import Radio from '../Radio/index'
import RadioButton from '../RadioButton/index'
interface Iprops {
  name?: string
  buttonStyle: string
  disabled: boolean
  options: any
  optionType: string
  size: string
  value: any
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
          value={item.value||''}
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
    <div className='tb-radio-group'>{radioItems ? radioItems : radioDom}</div>
  )
}
export default RadioGroup
