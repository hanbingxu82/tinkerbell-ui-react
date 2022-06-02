/*
 * @Author: your name
 * @Date: 2022-02-09 16:32:40
 * @LastEditTime: 2022-06-02 17:49:10
 * @LastEditors: 韩旭小天才 905583741@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/CheckBox/index.tsx
 */
/* eslint-disable */
import React, { useEffect, useState } from 'react'
import './index.scss'

const classnames = require('classnames')
interface Iprops {
  type: string
  checked: boolean
  disabled: boolean
  checkGroupValue: any
  value: string | number
  name?: string
  label: string
  indeterminate?: any
}
function CheckBox(props: any) {
  const {
    type = 'default',
    disabled = false,
    checked = false,
    value,
    name,
    label,
    checkGroupValue = [],
    indeterminate
  }: Iprops = props
  const [checkBoxChecked, setCheckBoxChecked] = useState(checked || false)
  const [isIndeterminate, setIsIndeterminate] = useState(false)
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
  useEffect(() => {
    setCheckBoxChecked(checked)
  }, [props.checked]) // eslint-disable-line

  useEffect(() => {
    console.log(checkBoxChecked, 3333)
  }, [checkBoxChecked]) // eslint-disable-line
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
          checked={checkBoxChecked}
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
