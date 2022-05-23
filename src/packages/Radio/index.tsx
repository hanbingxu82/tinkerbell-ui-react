/*
 * @Author: your name
 * @Date: 2022-02-07 10:47:48
 * @LastEditTime: 2022-05-23 16:10:35
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/Radio/index.tsx
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
  value: any
  label: string
  name?: string
}
function Radio(props: any) {
  const {
    type = 'default',
    disabled = false,
    groupValue,
    checked = false,
    value,
    label,
    name
  }: Iprops = props
  function handleChange(evt: any) {
    props.onChange && props.onChange(evt.target.value)
  }
  return (
    <div
      className={[
        'tb-radio',
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
            `radio-type_${type}`,
            classnames({
              'is-disabled': disabled
            })
          ].join(' ')}
        />
        <span>{props.children ? props.children : label ? label : value}</span>
      </label>
    </div>
  )
}
export default Radio
