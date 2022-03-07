/*
 * @Author: your name
 * @Date: 2021-12-13 16:17:28
 * @LastEditTime: 2022-03-07 15:51:14
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/Button/index.tsx
 */
import React from 'react'
import Icon from '../Icon'
var tinycolor = require('tinycolor2')
const classnames = require('classnames')
import './index.scss'

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
  animationType: string
}

const Button = (props: any) => {
  const {
    type = 'default',
    icon = ' ',
    iconStyle,
    disabled,
    loading,
    nativeType = 'button',
    size = 'default',
    plain,
    round,
    dashed,
    transparent,
    background,
    loadingIcon,
    textColor,
    ...restprop
  }: Iprops = props

  function iconStyles() {
    return {
      ...textStyle(),
      ...iconStyle
    }
  }
  function colorMap() {
    return {
      primary: '#1089ff',
      success: '#52c41a',
      info: '#35495E',
      warning: '#fea638',
      danger: '#ff4d4f'
    }
  }

  function handleClick(evt: any) {
    props.onClick && props.onClick(evt)
  }
  function handMouseEnter(evt: any) {
    props.onMouseEnter && props.onMouseEnter(evt)
  }
  function handMouseLeave(evt: any) {
    props.onMouseLeave && props.onMouseLeave(evt)
  }
  function handFocus(evt: any) {
    props.onFocus && props.onFocus(evt)
  }
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
  if (type !== 'text') {
    console.log(restprop)
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
        {loading && (
          <span className={'btn-icon-loading'}>
            <Icon
              className='button-loading icon-is-rotating'
              name={loadingIcon ? loadingIcon : 'icon-loading'}
              style={iconStyles()}
            />
          </span>
        )}
        {icon && !loading && (
          <i className={['iconfont', icon].join(' ')} style={iconStyles()}></i>
        )}
        {props.children && <span style={textStyle()}>{props.children}</span>}
      </button>
    )
  } else {
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
        {icon && !loading && (
          <i className={['iconfont', icon].join(' ')} style={iconStyles()}></i>
        )}
        {props.children && <span style={textStyle()}>{props.children}</span>}
      </button>
    )
  }
}
export default Button
