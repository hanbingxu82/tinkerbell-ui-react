/*
 * @Author: your name
 * @Date: 2022-05-10 14:26:24
 * @LastEditTime: 2023-04-06 10:50:09
 * @LastEditors: hanbingxu
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/Menu/Collapse.tsx
 */
// eslint-disable-next-line
import React, { useEffect, useRef } from 'react'
const ANIMATION_DURATION = 300

type Props = {
  isShow: boolean
  children?: Element
}

const CollapseTransition: any = (props: Props) => {
  const selfRef: any = useRef('')
  let leaveTimer: any
  let enterTimer: any
  useEffect(() => {
    selfRef.current && beforeEnter()
    if (props.isShow) {
      selfRef.current && enter()
    }
    return () => {
      selfRef.current && beforeLeave()
      selfRef.current && leave()
    }
  }, []) // eslint-disable-line
  useEffect(() => {
    triggerChange(props.isShow)
  }, [props.isShow]) // eslint-disable-line

  function triggerChange(isShow: boolean): void {
    clearTimeout(enterTimer)
    clearTimeout(leaveTimer)
    if (isShow) {
      selfRef.current && beforeEnter()
      selfRef.current && enter()
    } else {
      selfRef.current && beforeLeave()
      selfRef.current && leave()
    }
  }

  function beforeEnter(): void {
    const el = selfRef.current
    //prepare
    el.dataset.oldPaddingTop = el.style.paddingTop
    el.dataset.oldPaddingBottom = el.style.paddingBottom
    el.dataset.oldOverflow = el.style.overflow
    el.style.height = '0'
    el.style.paddingTop = 0
    el.style.paddingBottom = 0
  }

  function enter(): void {
    const el = selfRef.current
    //start
    el.style.display = 'block'
    if (el.scrollHeight !== 0) {
      el.style.height = el.scrollHeight + 'px'
      el.style.paddingTop = el.dataset.oldPaddingTop
      el.style.paddingBottom = el.dataset.oldPaddingBottom
    } else {
      el.style.height = ''
      el.style.paddingTop = el.dataset.oldPaddingTop
      el.style.paddingBottom = el.dataset.oldPaddingBottom
    }

    el.style.overflow = 'hidden'

    enterTimer = setTimeout(() => afterEnter(), ANIMATION_DURATION)
  }

  function afterEnter(): void {
    const el = selfRef.current
    el.style.display = 'block'
    el.style.height = ''
    el.style.overflow = el.dataset.oldOverflow
  }

  function beforeLeave(): void {
    const el = selfRef.current
    el.dataset.oldPaddingTop = el.style.paddingTop
    el.dataset.oldPaddingBottom = el.style.paddingBottom
    el.dataset.oldOverflow = el.style.overflow

    el.style.display = 'block'
    if (el.scrollHeight !== 0) {
      el.style.height = el.scrollHeight + 'px'
    }
    el.style.overflow = 'hidden'
  }

  function leave(): void {
    const el = selfRef.current
    if (el.scrollHeight !== 0) {
      el.style.height = 0
      el.style.paddingTop = 0
      el.style.paddingBottom = 0
    }
    leaveTimer = setTimeout(() => afterLeave(), ANIMATION_DURATION)
  }

  function afterLeave(): void {
    const el = selfRef.current
    if (!el) return

    el.style.display = 'none'
    el.style.height = ''
    el.style.overflow = el.dataset.oldOverflow
    el.style.paddingTop = el.dataset.oldPaddingTop
    el.style.paddingBottom = el.dataset.oldPaddingBottom
  }
  return (
    <div
      className='collapse-transition'
      style={{ overflow: 'hidden' }}
      ref={(e) => (selfRef.current = e)}
    >
      {props.children}
    </div>
  )
}

export default CollapseTransition
