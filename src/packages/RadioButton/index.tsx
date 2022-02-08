/*
 * @Author: your name
 * @Date: 2022-02-08 17:02:44
 * @LastEditTime: 2022-02-08 17:22:19
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/RadioButton/index.tsx
 */
import React from 'react'
import './index.scss'

const classnames = require('classnames')
interface Iprops {
  type: string
  checked: boolean
  disabled: boolean
  groupValue: any
  value: any
  name?: string
}
function RadioButton(props: any) {
  const {
    type = 'default',
    disabled = false,
    groupValue,
    checked,
    value,
    name
  }: Iprops = props
  function handleChange(evt: any) {
    props.onChange && props.onChange(evt)
  }
  return (
    <div
      className={[
        'tb-radio-button',
        classnames({
          'is-disabled': disabled
        })
      ].join(' ')}
    >
      <label>
        <input
          type='radio'
          checked={groupValue ? (groupValue == value ? true : false) : checked}
          name={name}
          disabled={disabled}
          onChange={handleChange}
          value={value}
          className={[
            `radio-button-type_${type}`,
            classnames({
              'is-disabled': disabled
            })
          ].join(' ')}
        />
        <span>{props.children ? props.children : null}</span>
      </label>
    </div>
  )
}
export default RadioButton
