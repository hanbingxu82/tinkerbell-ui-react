/*
 * @Author: your name
 * @Date: 2022-02-08 17:02:44
 * @LastEditTime: 2023-03-21 11:24:41
 * @LastEditors: hanbingxu
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/RadioButton/index.tsx
 */
/* eslint-disable */
import React from 'react'
import './index.scss'

const classnames = require('classnames')
interface Iprops {
  type: string // type类型 判断颜色
  checked: boolean // 选中状态
  disabled: boolean // 禁用状态
  groupValue: any // groupValue 值是否与value值相等 逻辑上来说可传可不传 当时只是为了做判断用的  因为 value 也同样可以给与初始值
  label: string // 初始 lable 文本
  value: any // value初始值
  name?: string // 原生 name 属性
  size: string // 按钮大小
  buttonStyle: string // style样式
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
    props.onChange && props.onChange(evt.target.value)
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
