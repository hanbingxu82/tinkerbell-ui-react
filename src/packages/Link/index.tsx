/*
 * @Author: your name
 * @Date: 2021-12-23 10:02:12
 * @LastEditTime: 2022-07-12 14:56:51
 * @LastEditors: 韩旭小天才
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/Link/index.tsx
 */
/* eslint-disable */
import React, { useState, useEffect } from 'react'
import './index.scss'
interface Iprops {
  type: string // 类型 primary / success / warning / danger / info
  href: string // 原生 href 属性
  target: string // a标签 原生target属性
  disabled: boolean // 是否禁用状态
  underline: true // 是否下划线
  icon: string // 图标类名
}
function Link(props: any) {
  const [tbType, setTbType] = useState('')
  const [tbDisabled, setTbDisabled] = useState('')
  const [tbUnderline, setTbUnderline] = useState('')
  const [tbIcon, setTbIcon] = useState('')
  const {
    type = '',
    href = '',
    target = '_blank',
    disabled = false,
    underline = true,
    icon = ''
  }: Iprops = props
  // 类似于 componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    Ptype()
    PDisabled()
    Punderline()
    Picon()
  }, [])
  // 页面加载判断当前按钮类型
  function Ptype() {
    if (type == 'primary') {
      setTbType('a_primary')
    } else if (type == 'success') {
      setTbType('a_success')
    } else if (type == 'info') {
      setTbType('a_info')
    } else if (type == 'warning') {
      setTbType('a_warning')
    } else if (type == 'danger') {
      setTbType('a_danger')
    }
  }
  // 判断是否是禁用
  function PDisabled() {
    if (disabled) {
      setTbDisabled(' is_disabled')
    } else {
      setTbDisabled(' ')
    }
  }
  // 判断是否有下划线
  function Punderline() {
    console.log(underline)
    if (!underline) {
      setTbUnderline(' is_underline')
    } else {
      setTbUnderline(' ')
    }
  }
  // 页面加载判断是否为图标按钮
  function Picon() {
    if (icon) {
      setTbIcon(' iconfont ' + icon)
    } else {
      setTbIcon('')
    }
  }
  if (!tbIcon && href) {
    return (
      <a
        {...props}
        target={target}
        href={href}
        className={`tb-link ${tbType} ${tbDisabled} ${tbUnderline}`}
      >
        {props.children}
      </a>
    )
  } else if (tbIcon && href) {
    return (
      <a
        {...props}
        target={target}
        href={href}
        className={`tb-link ${tbIcon} ${tbType} ${tbDisabled} ${tbUnderline}`}
      >
        {props.children}
      </a>
    )
  } else if (tbIcon && !href) {
    return (
      <span
        {...props}
        target={target}
        className={`tb-link ${tbIcon} ${tbType} ${tbDisabled} ${tbUnderline}`}
      >
        {props.children}
      </span>
    )
  } else {
    return (
      <span
        {...props}
        className={`tb-link ${tbType} ${tbDisabled} ${tbUnderline}`}
      >
        {props.children}
      </span>
    )
  }
}
export default Link
