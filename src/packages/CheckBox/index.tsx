/*
 * @Author: your name
 * @Date: 2022-02-09 16:32:40
 * @LastEditTime: 2022-12-09 18:00:32
 * @LastEditors: hanbingxu
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/CheckBox/index.tsx
 */
// eslint-disable-next-line
import React, { useEffect, useState } from 'react'
import './index.scss'

const classnames = require('classnames')
interface Iprops {
  type: string // 样式类型
  checked: boolean // 是否选中
  disabled: boolean // 是否禁用
  checkGroupValue: any // 父 group 的 value 值
  value: string | number // 单独 value 值
  name?: string // 原生 name 属性
  label: string // label 名称
  indeterminate?: any // 是否为统一全选控制按钮组件
  componentName: string
}
function CheckBox(props: any) {
  const {
    type = 'default',
    disabled = false,
    value,
    name,
    label,
    checkGroupValue = [],
    indeterminate
  }: Iprops = props
  const [checkBoxChecked, setCheckBoxChecked] = useState(props.checked || false)
  const [isIndeterminate, setIsIndeterminate] = useState(false)
  // 每次变更重置 checkGroupValue 数组地址
  useEffect(() => {
    //  监听 初始化判断是否为 多选组选项行为
    if (!!checkGroupValue.length && checkGroupValue.includes(value)) {
      setCheckBoxChecked(true)
    } else if (
      (indeterminate === 'undefined' && !checkGroupValue.length) ||
      (indeterminate === undefined && !checkGroupValue.length) ||
      (indeterminate === null && !checkGroupValue.length)
    ) {
      setCheckBoxChecked(false)
    }
  }, [props.checkGroupValue]) // eslint-disable-line

  // useEffect(() => {
  //   setCheckBoxChecked(props.checked)
  // }, [props.checked]) // eslint-disable-line

  useEffect(() => {
    setIsIndeterminate(!!indeterminate ? indeterminate : false)
  }, [indeterminate]) // eslint-disable-line

  function handleChange(evt: any) {
    setCheckBoxChecked(evt.target.checked)
    props.onChange && props.onChange(evt)
  }

  return (
    <div
      className={[
        'tb-checkbox',
        classnames({
          'is-disabled': disabled
        })
      ].join(' ')}
    >
      <label>
        <input
          type='checkbox'
          checked={
            props.componentName === 'checkboxGroup' ? checkBoxChecked : props.checked
          }
          name={name}
          disabled={disabled}
          onChange={handleChange}
          value={value || label}
          className={[
            `checkbox-type_${type}`,
            classnames({
              'is-disabled': disabled,
              // 判断是否需要 全选，如果全选加标记
              'is-indeterminate': isIndeterminate
            })
          ].join(' ')}
        />
        <span>{props.children ? props.children : label ? label : value}</span>
      </label>
    </div>
  )
}
export default CheckBox
