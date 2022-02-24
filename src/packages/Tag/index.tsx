/*
 * @Author: your name
 * @Date: 2021-12-13 16:17:47
 * @LastEditTime: 2022-02-24 15:32:51
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /hxreact/src/packages/Tag/index.tsx
 */
import React, { useState, useEffect } from 'react'
import { typeColor } from '../../utils/log'
import './index.scss'
const classnames = require('classnames')

interface Iprops {
  name: ''
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
    value,
    type,
    color,
    tagStyle,
    dot,
    fontSize,
    size,
    noBorder,
    closable
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
      setDotColor(typeColor(type))
    }
    return setDotColor(color)
  }, [type, color])

  // 自定义class样式监听器
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
  function closeHandleClick(e: any) {
    props.close && props.close(e)
  }
  return (
    <span
      className={[
        'tb-tag',
        'is-' + size,
        'is-' + type,
        classnames({
          'is-checked': checked,
          'no-border': noBorder
        })
      ].join(' ')}
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
          onClick={closeHandleClick}
        ></i>
      )}
      {/* const closeEl = h('i', {
      class: ['iconfont', 'icon-ios-close'],
      style: this.dot ? { backgroundColor: '#fff', color: this.color } : {},
      on: {
        click: this.handleClose
      }
    }) */}
    </span>
  )
}
export default Tag
