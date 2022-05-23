/*
 * @Author: your name
 * @Date: 2022-02-08 17:02:44
 * @LastEditTime: 2022-05-23 16:10:05
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/RadioButton/index.tsx
 */
/* eslint-disable */
import React from 'react'
import './index.scss'

const classnames = require('classnames')
interface Iprops {
  type: string
  checked: boolean
  disabled: boolean
  groupValue: any
  label:string,
  value: any
  name?: string
  size: string
  buttonStyle: string
}
function RadioButton(props: any) {
  const {
    type = 'default',
    disabled = false,
    groupValue,
    checked,
    value,
    name,
    label,
    size = 'default',
    buttonStyle = 'outline'
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
        <span
          className={[
            `tb-radio-button--${size}`,
            `tb-radio-button--${type}_${buttonStyle}`
          ].join(' ')}
        >
          {props.children ? props.children : label ? label : value}
        </span>
      </label>
    </div>
  )
}
export default RadioButton
