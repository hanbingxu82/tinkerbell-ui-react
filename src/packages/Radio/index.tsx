/*
 * @Author: your name
 * @Date: 2022-02-07 10:47:48
 * @LastEditTime: 2022-12-09 14:52:36
 * @LastEditors: hanbingxu
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/Radio/index.tsx
 */
/* eslint-disable */
import React from 'react'
import './index.scss'

const classnames = require('classnames')
interface Iprops {
  type: string // type类型 判断颜色
  checked: boolean // 是否选中
  disabled: boolean // 禁用项
  groupValue: any // groupValue 值是否与value值相等 逻辑上来说可传可不传 当时只是为了做判断用的  因为 value 也同样可以给与初始值
  value: any // value初始值
  label: string // 初始 lable 文本
  name?: string // 原生 name 属性
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
    props.onChange && props.onChange(evt)
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
