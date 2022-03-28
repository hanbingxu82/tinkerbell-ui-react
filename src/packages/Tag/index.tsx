/*
 * @Author: your name
 * @Date: 2021-12-13 16:17:47
 * @LastEditTime: 2022-03-28 11:44:38
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/Tag/index.tsx
 */
import React, { useState, useEffect } from 'react'
import { typeColor } from '../../utils/log'
import './index.scss'
const classnames = require('classnames')

interface Iprops {
  name: string
  closable: boolean
  type: string
  dot: boolean
  noBorder: boolean
  color: string
  tagStyle: any
  size: string
  fontSize: string
  dark: boolean
  checkable: boolean
  value: boolean
}
function Tag(props: any) {
  const {
    name = '',
    value = true,
    type,
    color,
    tagStyle,
    dot,
    fontSize,
    size,
    noBorder,
    closable,
    dark,
    checkable
  }: Iprops = props
  const [checked, setChecked] = useState(true)
  const [dotColor, setDotColor] = useState('')
  const [tagStyleBind, setTagStyleBind] = useState({})
  // 声明一个名为“count”的新状态变量
  //   const [count, setCount] = useState(0)
  // 类似于 componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    setChecked(value)
  }, [value])

  // 背景颜色监听器
  useEffect(() => {
    if (type) {
      return setDotColor(typeColor(type))
    }
    return setDotColor(color)
  }, [type, color])

  // 自定义class样式监听器
  /* eslint-disable */
  useEffect(() => {
    tagStyle
      ? tagStyle
      : dot
      ? setTagStyleBind({
          backgroundColor: 'transparent',
          color: color,
          fontSize: fontSize
        })
      : setTagStyleBind({
          backgroundColor: color,
          color: color ? '#fff' : '',
          fontSize: fontSize
        })
  }, [tagStyle, dot, fontSize, color]) 
  /* eslint-disable */
  // 图标关闭事件
  function closeHandleClick(e: any) {
    props.onClose && props.onClose(e)
  }
  // 点击图标事件
  function handleClick(e: any) {
    e.stopPropagation()
    if (checkable) {
      setChecked(!checked)
      props.onInput && props.onInput(!checked)
      props.onChange && props.onChange(!checked, name)
    }
  }
  return (
    <span
      className={[
        'tb-tag',
        'is-' + size,
        'is-' + type,
        classnames({
          'no-border': noBorder,
          'is-dark': dark,
          'is-checkable': checkable,
          'is-checked': checkable && checked
        })
      ].join(' ')}
      onClick={handleClick}
      style={tagStyle ? tagStyle : tagStyleBind}
      data-value={checked}
    >
      {/* 判断是否有dot */}
      {dot ? (
        <span
          className={['tb-dot'].join(' ')}
          style={{ backgroundColor: dotColor }}
        ></span>
      ) : null}
      <span>{props.children}</span>
      {closable && (
        <i
          className={['iconfont', 'icon-close'].join(' ')}
          style={dot ? { backgroundColor: '#fff', color: color } : {}}
          onClick={closeHandleClick}
        ></i>
      )}
    </span>
  )
}
export default Tag
