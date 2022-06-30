/*
 * @Author: your name
 * @Date: 2021-12-13 16:17:28
 * @LastEditTime: 2022-06-29 11:03:17
 * @LastEditors: 韩旭小天才
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/Button/index.tsx
 */

// eslint-disable-next-line
import React from 'react'
import Icon from '../Icon'
import './index.scss'
var tinycolor = require('tinycolor2') // 颜色转换插件
const classnames = require('classnames') // classname 转换插件

// interface接口
interface Iprops {
  type: string
  disabled: boolean
  loading: boolean
  nativeType: any
  size: string
  plain: boolean
  round: boolean
  dashed: boolean
  transparent: boolean
  background: boolean
  loadingIcon: string
  iconStyle: any
  icon: string
  textColor: string
}

const Button = (props: any) => {
  const {
    type = 'default', // 样式类型
    icon = '', // 图标样式
    iconStyle, // icon 图标style
    disabled, // 禁用效果
    loading, // loading 加载效果
    nativeType = 'button', // button 原生属性的type类型
    size = 'default', // size 大小效果
    plain, // 镂空 style 效果
    round, // 圆角 style 效果
    dashed, // 虚线 style 效果
    transparent, // 是否为透明按钮
    background, // 默认按钮是否带有拟物背景
    loadingIcon, // 加载效果图标样式
    textColor, // 文本颜色
    ...restprop //其余所有传递给 原生 button 的方法 属性
  }: Iprops = props

  // icon图标style
  function iconStyles() {
    return {
      ...textStyle(),
      ...iconStyle
    }
  }
  // 默认 文本样式给与的颜色
  function colorMap() {
    return {
      primary: '#1089ff',
      success: '#52c41a',
      info: '#35495E',
      warning: '#fea638',
      danger: '#ff4d4f'
    }
  }
  // 点击事件触发父行为
  function handleClick(evt: any) {
    props.onClick && props.onClick(evt)
  }
  // 鼠标进入触发父行为
  function handMouseEnter(evt: any) {
    props.onMouseEnter && props.onMouseEnter(evt)
  }
  // 鼠标离开触发父行为
  function handMouseLeave(evt: any) {
    props.onMouseLeave && props.onMouseLeave(evt)
  }
  // 触发获取焦点事件
  function handFocus(evt: any) {
    props.onFocus && props.onFocus(evt)
  }
  // text 文本颜色
  function textStyle() {
    let color = textColor
      ? colorMap()[textColor]
        ? colorMap()[textColor]
        : textColor
      : null
    if (color) {
      return {
        color: disabled ? tinycolor(color).lighten(15).toString() : color
      }
    }
    return {}
  }
  // 判断传递的组件是否为 文本 按钮 如果不是
  if (type !== 'text') {
    return (
      <button
        {...restprop}
        onClick={handleClick}
        onMouseEnter={handMouseEnter}
        onMouseLeave={handMouseLeave}
        onFocus={handFocus}
        disabled={disabled || loading}
        type={nativeType}
        className={
          [
            'tb-button',
            'tb-button--' + type,
            'tb-button--' + size,
            classnames({
              'is-disabled': disabled,
              'is-loading': loading,
              'is-plain': plain,
              'is-round': round,
              'is-dashed': dashed,
              'is-transparent': transparent,
              'is-background': background
            })
          ].join(' ') +
          ' ' +
          props.className
        }
      >
        {/* 判断有没有loading加载 */}
        {loading && (
          <span className={'btn-icon-loading'}>
            <Icon
              className='button-loading icon-is-rotating'
              name={loadingIcon ? loadingIcon : 'icon-loading'}
              style={iconStyles()}
            />
          </span>
        )}
        {/* 判断有没有静态图标 */}
        {icon && !loading && (
          <i className={['iconfont', icon].join(' ')} style={iconStyles()}></i>
        )}
        {props.children && <span style={textStyle()}>{props.children}</span>}
      </button>
    )
  } else {
    // 如果是文本按钮
    return (
      <button
        {...restprop}
        onClick={handleClick}
        onMouseEnter={handMouseEnter}
        onMouseLeave={handMouseLeave}
        onFocus={handFocus}
        disabled={disabled || loading}
        type={nativeType}
        className={
          [
            'tb-button',
            'tb-button--' + type,
            classnames({ 'is-disabled': disabled, 'is-loading': loading })
          ].join(' ') +
          ' ' +
          props.className
        }
      >
        {/* 判断图标 在这里就没必要给加载判断了 */}
        {icon && !loading && (
          <i className={['iconfont', icon].join(' ')} style={iconStyles()}></i>
        )}
        {props.children && <span style={textStyle()}>{props.children}</span>}
      </button>
    )
  }
}
export default Button
