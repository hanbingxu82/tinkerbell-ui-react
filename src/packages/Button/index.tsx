/*
 * @Author: your name
 * @Date: 2021-12-13 16:17:28
 * @LastEditTime: 2021-12-15 15:19:46
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /hxreact/src/packages/Button/index.tsx
 */
import React from 'react'
const classnames = require('classnames')
import './index.scss'

interface Iprops {
  type: string
  textStyle: any
  disabled: boolean
  loading: boolean
  nativeType: any
  size: string
  plain: boolean
  round: boolean
  dashed: boolean
  transparent: boolean
  background: boolean
}

const Button = (props: any) => {
  const {
    type = 'default',
    textStyle,
    disabled,
    loading,
    nativeType = 'button',
    size = 'default',
    plain,
    round,
    dashed,
    transparent,
    background
  }: Iprops = props
  function handleClick() {}
  // if (type !== 'text' && animationType === 'click') {
  return (
    <button
      onClick={handleClick}
      disabled={disabled || loading}
      type={nativeType}
      className={[
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
      ]
        .join(' ')
        .toString()}
      // v-click-animation
    >
      {/* <tb-icon class="button-loading icon-is-rotating"
      :name="loadingIcon?loadingIcon:'loading'" v-if="loading" :style="iconStyles"/> */}
      {/* {icon && !loading && (
          <i className={['iconfont', 'icon-' + icon]} style={iconStyles}></i>
        )} */}
      {props.children && <span style={textStyle}>{props.children}</span>}
    </button>
  )
  // }

  /* <button v-else-if="type!=='text'&&animationType==='waves'"
  class="tb-button"
  @click="handleClick"
  :disabled="disabled || loading"
  :type="nativeType"
  :class="['tb-button--' + type , 'tb-button--' + size,
    {
      'is-disabled': disabled,
      'is-loading': loading,
      'is-plain': plain,
      'is-round': round,
      'is-dashed': dashed,
      'is-transparent': transparent,
      'is-background': background,
    }
  ]"
  v-waves="waveColor"
>
<tb-icon class="button-loading icon-is-rotating"
    :name="loadingIcon?loadingIcon:'loading'" v-if="loading" :style="iconStyles"/>
<i :class="['iconfont','icon-'+icon]" v-if="icon && !loading" :style="iconStyles"></i>
<span v-if="$slots.default" :style="textStyle"><slot></slot></span>
</button>
<button v-else
  @click="handleClick"
  :disabled="disabled || loading"
  :type="nativeType"
  class="tb-button"
  :class="['tb-button--' + type, { 'is-disabled': disabled, 'is-loading': loading }
]"
>
<i :class="['iconfont','icon-'+icon]" v-if="icon && !loading" :style="iconStyles"></i>
<span v-if="$slots.default" :style="textStyle"><slot></slot></span>
</button> */
}
export default Button
