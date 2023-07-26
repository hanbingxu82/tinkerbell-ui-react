/*
 * @Description: Split 分割面板
 * @Version: 1.0
 * @Author: hanbingxu
 * @Date: 2023-07-25 13:36:22
 * @LastEditTime: 2023-07-26 11:03:16
 * @LastEditors: hanbingxu
 */
/* eslint-disable */
import React, { useState, useEffect } from 'react'
import Pane from './pane'
import Resizer from './resizer'
import './index.scss'
const classnames = require('classnames')

interface Iprops {
  defaultNumber: number
  min: number
  defaultWrapStyle: Array<any>
  resizerColor: string
  hideLine: boolean
  split: string
  className: string
}
const CountTo: any = React.forwardRef((props: any, _ref: any) => {
  const {
    defaultNumber = 200,
    min = 60,
    defaultWrapStyle,
    resizerColor,
    hideLine,
    split = 'vertical',
    className
  }: Iprops = props

  const [state, setState] = useState<any>({
    active: false,
    hasMoved: false,
    hasResize: false, // 是否拖拽过
    pixel: defaultNumber,
    type: split === 'vertical' ? 'width' : 'height',
    resizeType: split === 'vertical' ? 'left' : 'top'
  })

  const [leftStyle, setLeftStyle] = useState({})
  const [resizerStyle, setResizerStyle] = useState({})
  const [rightStyle, setRightStyle] = useState({})

  const onDoubleClick = () => {
    const style = defaultWrapStyle
    if (style && style.length > 1) {
      state.hasResize = false // 是否拖拽过
      setState({ ...state })
      props.onResize && props.onResize(state.pixel)
      return
    }

    if (!state.hasMoved) {
      state.pixel = defaultNumber
      setState({ ...state })
      props.onResize && props.onResize(style[0])
    }
  }
  const onMouseDown = () => {
    state.active = true
    state.hasMoved = false
    console.log(state)
    setState({ ...state })
  }
  const onMouseUp = () => {
    state.active = false
    setState({ ...state })
  }
  const onMouseMove = (e: any) => {
    if (e.buttons === 0) {
      state.active = false
    }
    if (state.active) {
      state.hasResize = true
      let offset = 0
      let target = e.currentTarget
      if (split === 'vertical') {
        while (target) {
          offset += target.offsetLeft
          target = target.offsetParent
        }
      } else {
        while (target) {
          offset += target.offsetTop
          target = target.offsetParent
        }
      }
      const currentPage = split === 'vertical' ? e.pageX : e.pageY
      const targetOffset =
        split === 'vertical'
          ? e.currentTarget.offsetWidth
          : e.currentTarget.offsetHeight
      const px = currentPage - offset
      if (px >= min && px < targetOffset - min) {
        state.pixel = px
      }
      state.hasMoved = true
      setState({ ...state })
      props.onResize && props.onResize(state.pixel)
    }
  }

  useEffect(() => {
    const style = defaultWrapStyle
    const px = `${state.pixel}px`
    if (style && style.length > 0) {
      setLeftStyle({ [state.type]: state.hasResize ? px : `${style[0]}` })
      return
    }
    setLeftStyle({ [state.type]: px })
  }, [defaultWrapStyle, state])

  useEffect(() => {
    const style = defaultWrapStyle
    const px = `${state.pixel}px`
    if (style && style.length > 0) {
      setResizerStyle({
        [state.resizeType]: state.hasResize ? px : `${style[0]}`,
        backgroundColor: resizerColor
      })
      return
    }
    setResizerStyle({
      [state.resizeType]: px,
      backgroundColor: resizerColor
    })
  }, [defaultWrapStyle, state, resizerColor])

  useEffect(() => {
    const style = defaultWrapStyle
    const px = `calc(100% - ${state.pixel}px)`
    if (style && style.length > 1) {
      setRightStyle({ [state.type]: state.hasResize ? px : `${style[1]}` })
      return
    }
    setRightStyle({ [state.type]: px })
  }, [defaultWrapStyle, state])

  return (
    <div
      className={classnames({
        'tb-splitter-container': true,
        'clear-fix': true,
        'hide-line': hideLine,
        'is-active': state.active
      })}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
    >
      <Pane
        className='tb-splitter-pane splitter-left'
        split={split}
        style={leftStyle}
      >
        {props.left}
      </Pane>

      <Resizer
        className={className}
        style={resizerStyle}
        split={split}
        onMouseDown={onMouseDown}
        onDoubleClick={onDoubleClick}
      ></Resizer>

      <Pane
        className='tb-splitter-pane splitter-right'
        split={split}
        style={rightStyle}
      >
        {props.right}
      </Pane>
    </div>
  )
})
export default CountTo
