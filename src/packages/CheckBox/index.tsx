/*
 * @Author: your name
 * @Date: 2022-02-09 16:32:40
 * @LastEditTime: 2022-03-28 12:12:18
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/CheckBox/index.tsx
 */
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
  indeterminate?: any
}
function CheckBox(props: any) {
  const {
    type = 'default',
    disabled = false,
    checked = false,
    value,
    name,
    checkGroupValue = [],
    indeterminate
  }: Iprops = props
  const [checkBoxChecked, setCheckBoxChecked] = useState(false)
  const [isIndeterminate, setIsIndeterminate] = useState(false)
  useEffect(() => {
    console.log(props)
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
  }, [checkGroupValue])// eslint-disable-line
  useEffect(() => {
    setCheckBoxChecked(checked)
  }, [checked])// eslint-disable-line
  useEffect(() => {
    setIsIndeterminate(!!indeterminate ? indeterminate : false)
  }, [indeterminate])// eslint-disable-line
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
          value={value}
          className={[
            `checkbox-type_${type}`,
            classnames({
              'is-disabled': disabled,
              // 判断是否需要 全选，如果全选加标记
              'is-indeterminate': isIndeterminate
            })
          ].join(' ')}
        />
        <span>{props.children ? props.children : null}</span>
      </label>
    </div>
  )
}
export default CheckBox
