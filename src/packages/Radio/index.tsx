/*
 * @Author: your name
 * @Date: 2022-02-07 10:47:48
 * @LastEditTime: 2022-02-08 11:17:14
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/Radio/index.tsx
 */
import React from 'react'
import './index.scss'

const classnames = require('classnames')
interface Iprops {
  type: string
  disabled: boolean
  value: any
}
function Radio(props: any) {
  const { type = 'default', disabled = false, value }: Iprops = props
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
      <input
        type='radio'
        checked={value}
        disabled={disabled}
        onChange={handleChange}
        className={[
          `radio-type_${type}`,
          classnames({
            'is-disabled': disabled
          })
        ].join(' ')}
      />
      <label>{props.children ? props.children : null}</label>
    </div>
  )
}
export default Radio
