/*
 * @Author: your name
 * @Date: 2022-03-24 14:24:29
 * @LastEditTime: 2023-07-14 15:25:48
 * @LastEditors: hanbingxu
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/Alert/index.tsx
 */
/* eslint-disable */
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { on, off } from '../../utils/utils'
import { debounce } from 'throttle-debounce'
import './index.scss'

interface Iprops {
  nodeEl: string
  offsetTop: number
  offsetBottom: number
  zIndex: number
  scroll: boolean
  children: any
}
function Alert(props: any) {
  const {
    nodeEl = '',
    offsetTop = 0,
    offsetBottom = 0,
    zIndex = 10,
    scroll = false,
    children,
    ...otherprop
  }: Iprops = props

  const [styles, setStyles] = useState({})
  const [slot, setSlot] = useState(false)
  const [slotStyle, setSlotStyle] = useState({})
  const [affixClass, setaffixClass] = useState('')
  const affix = React.useRef<any>(false)
  const el = React.useRef<any>(null)
  const point = React.useRef<any>(null)

  let domEl: (Window & typeof globalThis) | Element | null = null
  let scrollEvent: null = null
  // useEffect(() => {
  //   if (affix) {
  //     if (scroll) {
  //       setaffixClass('tb-affix-abs')
  //     } else {
  //       setaffixClass('tb-affix')
  //     }
  //   } else {
  //     setaffixClass('')
  //   }
  // }, [affix.current, scroll])
  // 初始化
  useEffect(() => {
    // 查找最近的滚动组件
    domEl = nodeEl ? document.querySelector('#' + nodeEl) : window
    scrollEvent = debounce(10, handleScroll)
    on(domEl, 'scroll', scrollEvent)
    on(window, 'resize', scrollEvent)
    setTimeout(() => {
      console.log(domEl)
      handleScroll()
    }, 1000)
    return () => {
      off(domEl, 'scroll', scrollEvent)
      off(window, 'resize', scrollEvent)
    }
  }, [])
  function handleScroll() {
    const scrollTop =
      (domEl as any).pageYOffset || (domEl as Element).scrollTop || 0
    const oTop = el.current.offsetTop
    const oLeft = el.current.offsetLeft
    if (oTop - offsetTop < scrollTop && !affix.current) {
      affix.current = true
      setSlotStyle({
        width: point.current.clientWidth + 'px',
        height: point.current.clientHeight + 'px'
      })
      setSlot(true)
      setStyles({
        top: `${offsetTop}px`,
        left: `${oLeft}px`,
        width: `${el.current.offsetWidth}px`,
        zIndex: zIndex
      })
      if (scroll) {
        setaffixClass('tb-affix-abs')
      } else {
        setaffixClass('tb-affix')
      }
      props.onChange && props.onChange(true)
    } else if (oTop - offsetTop > scrollTop && affix.current) {
      affix.current = false
      setStyles({})
      setSlot(false)
      setStyles({})
      setaffixClass('')
      props.onChange && props.onChange(false)
    }
  }
  return (
    <div ref={el}>
      <div {...otherprop} ref={point} className={affixClass} style={styles}>
        {children}
      </div>
      {slot && <div style={slotStyle}></div>}
    </div>
  )
}
export default Alert
