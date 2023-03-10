/*
 * @Author: your name
 * @Date: 2022-03-26 11:14:09
 * @LastEditTime: 2023-03-10 10:04:15
 * @LastEditors: hanbingxu
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/Switch/index.tsx
 */
/* eslint-disable */
import React, { useState, useEffect } from 'react'
import './index.scss'

interface Iprops {
  value: boolean
  name: string
  disabled: boolean
  reverse: boolean
  width: number | string
  height: number | string
  checkedText: string
  uncheckedText: string
  checkedBg: string
  uncheckedBg: string
  checkedColor: string
  uncheckedColor: string
  dotColor: string
  fontSize: number | string
  fontWeight: number | string
}

function Switch(props: any) {
  const {
    value = false,
    name = 'switch',
    disabled = false,
    reverse = false,
    width = 75,
    height = 25,
    checkedText = '',
    uncheckedText = '',
    checkedBg = '#1089ff',
    uncheckedBg = '#939393',
    checkedColor = '#fff',
    uncheckedColor = '#fff',
    dotColor = '#fff',
    fontSize = '12',
    fontWeight = 'normal'
  }: Iprops = props
  const [bgStyle, setBgStyle] = useState({})
  const [dotStyle, setDotStyle] = useState({})
  const [textStyle, setTextStyle] = useState({})

  function switchClick() {
    return !disabled ? props.onChange && props.onChange(!value) : null
  }
  function switchKeyUp(ev: any) {
    var event = ev || window.event
    if (event.keyCode == 13 || event.keyCode == 32) {
      return !disabled ? props.onChange && props.onChange(!value) : null
    }
  }

  // 元素大小样式
  useEffect(() => {
    const styles = {
      // 配置对应的宽高
      width: `${width}px`,
      height: `${height}px`,
      // 判断是不是禁用如果是禁用的话即使是选中状态也要设置成 不选中的背景
      background:
        value && !disabled ? checkedBg : disabled ? '#93939393' : uncheckedBg,
      cursor: disabled ? 'no-drop' : 'pointer'
    }
    setBgStyle(styles)
  }, [width, height, value, disabled, checkedBg, uncheckedBg])
  // 小圆点样式设置
  useEffect(() => {
    const styles = {
      // 小圆点元素背景颜色
      background: dotColor,
      // 宽高 依据高度来走 来一些边距
      width: `${(height as number) - 8}px`,
      height: `${(height as number) - 8}px`,
      minWidth: `${(height as number) - 8}px`,
      minHeight: `${(height as number) - 8}px`,
      // 根据状态判断
      marginLeft: value
        ? `${(width as number) - ((height as number) - 3)}px`
        : '5px'
    }
    // 如果要是反转  要对应的进行反转样式
    if ((!value && reverse) || (value && !reverse)) {
      styles.marginLeft = `${(width as number) - ((height as number) - 3)}px`
    } else if ((value && reverse) || (!value && !reverse)) {
      styles.marginLeft = '5px'
    }
    setDotStyle(styles)
  }, [dotColor, height, value, width, reverse])
  // 文本样式设置
  useEffect(() => {
    // 文字大小 与 加粗
    const styles = {
      fontWeight: fontWeight,
      fontSize: `${fontSize}px`,
      color: value && !disabled ? checkedColor : uncheckedColor,
      // 文本位置
      right: value ? `${(height as number) - 3}px` : 'auto',
      left: value ? 'auto' : `${(height as number) - 3}px`
    }
    // 反转后对应文本位置
    if (!value && reverse) {
      styles.right = `${(height as number) - 3}px`
      styles.left = 'auto'
    } else if (value && reverse) {
      styles.left = `${(height as number) - 3}px`
      styles.right = 'auto'
    }
    setTextStyle(styles)
  }, [
    fontWeight,
    fontSize,
    value,
    disabled,
    checkedColor,
    uncheckedColor,
    height,
    reverse
  ])

  useEffect(() => {
    // 使用浏览器API更新文档标题
    document.title = `You clicked count times`
  }, [])
  return (
    <span
      className='tb-switch'
      style={bgStyle}
      tabIndex={0}
      onClick={switchClick}
      onKeyUp={switchKeyUp}
    >
      <input
        type='checkbox'
        name={name}
        style={{ display: 'none' }}
        value={value as unknown as string}
      />
      <span style={dotStyle} className='dot'>
        {checkedText && value && (
          <span style={textStyle} className='text'>
            {checkedText}
          </span>
        )}
        {uncheckedText && !value && (
          <span style={textStyle} className='text'>
            {uncheckedText}
          </span>
        )}
      </span>
    </span>
  )
}
export default Switch
