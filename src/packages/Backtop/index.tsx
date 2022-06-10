/*
 * @Author: your name
 * @Date: 2022-03-07 14:45:16
 * @LastEditTime: 2022-06-10 17:35:24
 * @LastEditors: 韩旭小天才 905583741@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/Backtop/index.tsx
 */
// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import Button from '../Button'
import './index.scss'
const classnames = require('classnames')

interface Iprops {
  text: string
  bottom: string | number
  right: string | number
  visibleY: number
  duration: number
  target: any
}
function Backtop(props: any) {
  const document: any = window.document
  const {
    text = '',
    bottom = 30,
    right = 30,
    visibleY = 200,
    duration = 600,
    target = ''
  }: Iprops = props
  const [tbIsVisible, setTbIsVisible] = useState<boolean>(false)
  // 类似于 componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    if (target) {
      document.querySelector(target).addEventListener('scroll', tbScrollEvent)
      console.log(document.querySelector(target))
    } else {
      // 滚动事件监听  addEventListener用此标签防止onScroll清除其他的事件
      window.addEventListener('scroll', tbScrollEvent)
    }
    return () => {
      if (target) {
        document
          .querySelector(target)
          .removeEventListener('scroll', tbScrollEvent)
      } else {
        // 销毁滚动事件
        window.removeEventListener('scroll', tbScrollEvent)
      }
    }
  }, [])// eslint-disable-line

  function tbScrollEvent() {
    // 被卷曲的高度是否大于我们设置的值
    // tbIsVisible =
    //   visibleY <
    //   (target ? document.querySelector(target).scrollTop : window.scrollY)
    setTbIsVisible(
      visibleY <
        (!!target ? document.querySelector(target).scrollTop : window.scrollY)
    )
  }
  // 点击 触发回滚事件
  function tbGoToTop(duration: number) {
    console.log(123)
    // 如果是传递节点式
    if (!!target) {
      if (document.querySelector(target).scrollTop === 0) return
      const totalScrollDistance = document.querySelector(target).scrollTop
      let scrollY = totalScrollDistance
      let oldTimestamp: number | null = null
      const step = (newTimestamp: number): any => {
        // requestAnimationFrame默认参数  类似于一个执行时间的这样一个时间戳 当前执行时间  和上一次执行时间  /  一个固定的值也就是传进来的时间值，从而也就实现了效果
        if (oldTimestamp !== null) {
          // 一个指定的计算计算公式
          scrollY -=
            (totalScrollDistance * (newTimestamp - oldTimestamp)) / duration
          if (scrollY <= 0)
            return (document.querySelector(target).scrollTop = 0)
          document.querySelector(target).scrollTop = scrollY
        }
        oldTimestamp = newTimestamp
        // 每zhen  不会有视觉差
        window.requestAnimationFrame(step)
      }
      window.requestAnimationFrame(step)
      // 当页面滚动到顶部时触发功能
      //   $emit("scrolledOnTop");

      props.scrolledOnTop && props.scrolledOnTop()
    } else {
      if (document.scrollingElement.scrollTop === 0) return
      const totalScrollDistance = document.scrollingElement.scrollTop
      let scrollY = totalScrollDistance
      let oldTimestamp: number | null = null
      const step = (newTimestamp: number): any => {
        // requestAnimationFrame默认参数  类似于一个执行时间的这样一个时间戳 当前执行时间  和上一次执行时间  /  一个固定的值也就是传进来的时间值，从而也就实现了效果
        if (oldTimestamp !== null) {
          // 一个指定的计算计算公式
          scrollY -=
            (totalScrollDistance * (newTimestamp - oldTimestamp)) / duration
          if (scrollY <= 0) return (document.scrollingElement.scrollTop = 0)
          document.scrollingElement.scrollTop = scrollY
        }
        oldTimestamp = newTimestamp
        // 每zhen  不会有视觉差
        window.requestAnimationFrame(step)
      }
      window.requestAnimationFrame(step)
      // 当页面滚动到顶部时触发功能
      //   $emit("scrolledOnTop");
      props.scrolledOnTop && props.scrolledOnTop()
    }
  }

  return (
    <div
      className='tb-backtop tb-div-wrapper tb-scroll-button'
      style={{ bottom: bottom + 'px', right: right + 'px' }}
    >
      <span
        className={classnames({
          'fade-enter-active': tbIsVisible,
          'fade-enter-from': !tbIsVisible
        })}
      >
        { !text && (
          <Button
            icon='icon-arrow-up'
            onClick={() => {
              tbGoToTop(duration)
            }}
          ></Button>
        )}
        { text && (
          <Button
            onClick={() => {
              tbGoToTop(duration)
            }}
          >
            {text}
          </Button>
        )}
      </span>
    </div>
  )
}
export default Backtop
