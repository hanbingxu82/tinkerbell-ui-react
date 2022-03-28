/*
 * @Author: your name
 * @Date: 2022-03-26 15:00:33
 * @LastEditTime: 2022-03-28 12:46:06
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/TimeLineItem/index.tsx
 */
/* eslint-disable */
import React, { useState, useEffect } from 'react'
import './index.scss'
const classnames = require('classnames')

interface Iprops {
  color: string
  dotTop: string
  prefixCls: string
  dot: any
}

const TimeLineItem = React.forwardRef((props: any, ref: any) => {
  const {
    prefixCls = 'tb-timeline',
    color = 'primary',
    dotTop,
    dot
  }: Iprops = props
  //   const [dot, setDot] = useState(false)
  const [itemClasses, setItemClasses] = useState('')
  const [tailClasses, setTailClasses] = useState('')
  const [headClasses, setHeadClasses] = useState('')
  const [contentClasses, setContentClasses] = useState('')
  const [customStyle, setCustomStyle] = useState({})

  function headColorShow() {
    return ['primary', 'success', 'info', 'warning', 'danger'].find(
      (element) => {
        return element == color
      }
    )
  }

  useEffect(() => {
    // 判断有没有子组件
    setItemClasses(`${prefixCls}-item`)
    setTailClasses(`${prefixCls}-item-tail`)
    setContentClasses(`${prefixCls}-item-content`)
  }, [prefixCls])
  useEffect(() => {
    setHeadClasses(
      [
        `${prefixCls}-item-head`,
        classnames({
          [`${prefixCls}-item-head-custom`]: !!dot,
          [`${prefixCls}-item-head-${color}`]: headColorShow()
        })
      ].join(' ')
    )
  }, [prefixCls, dot, color])
  useEffect(() => {
    let style = {}
    if (color) {
      if (!headColorShow()) {
        style = {
          color: color,
          borderColor: color,
          top: dotTop
        }
      } else {
        style = {
          top: dotTop
        }
      }
    }
    setCustomStyle(style)
  }, [color, dotTop])

  return (
    <li className={itemClasses}>
      <div className={tailClasses}></div>
      <div className={headClasses} style={customStyle} ref={ref}>
        {dot}
      </div>
      <div className={contentClasses}>{props.children}</div>
    </li>
  )
})
export default TimeLineItem
