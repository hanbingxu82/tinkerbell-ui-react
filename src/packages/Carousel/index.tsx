/*
 * @Author: your name
 * @Date: 2022-03-07 17:36:58
 * @LastEditTime: 2022-03-28 17:04:48
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/Carousel/index.tsx
 */
/* eslint-disable */
import React, { useEffect } from 'react'
import debounce from 'lodash/debounce'
import './index.scss'
const classnames = require('classnames')
// matchMedia polyfill for
// https://github.com/WickyNilliams/enquire.js/issues/82
if (typeof window !== 'undefined') {
  const matchMediaPolyfill = (mediaQuery: string) => {
    return {
      media: mediaQuery,
      matches: false,
      addListener() {},
      removeListener() {}
    }
  }
  window.matchMedia = window.matchMedia || matchMediaPolyfill
}
// Use require over import (will be lifted up)
// make sure matchMedia polyfill run before require('react-slick')
// Fix https://github.com/ant-design/ant-design/issues/6560
// Fix https://github.com/ant-design/ant-design/issues/3308
const SlickCarousel = require('react-slick').default

export type CarouselEffect = 'scrollx' | 'fade'
// Carousel
export interface CarouselProps {
  effect?: CarouselEffect
  dots?: boolean
  vertical?: boolean
  autoplay?: boolean
  easing?: string
  beforeChange?: (from: number, to: number) => void
  afterChange?: (current: number) => void
  style?: React.CSSProperties
  prefixCls?: string
  accessibility?: boolean
  nextArrow?: HTMLElement | any
  prevArrow?: HTMLElement | any
  pauseOnHover?: boolean
  className?: string
  adaptiveHeight?: boolean
  arrows?: boolean
  autoplaySpeed?: number
  centerMode?: boolean
  centerPadding?: string | any
  cssEase?: string | any
  dotsClass?: string
  draggable?: boolean
  fade?: boolean
  focusOnSelect?: boolean
  infinite?: boolean
  initialSlide?: number
  lazyLoad?: boolean
  rtl?: boolean
  slide?: string
  slidesToShow?: number
  slidesToScroll?: number
  speed?: number
  swipe?: boolean
  swipeToSlide?: boolean
  touchMove?: boolean
  touchThreshold?: number
  variableWidth?: boolean
  useCSS?: boolean
  slickGoTo?: number
}

const Carousel = React.forwardRef((props: any, ref) => {
  // 声明一个名为“count”的新状态变量
  //   const [defaultProps, setDefaultProps] = useState({
  //     dots: true,
  //     arrows: false,
  //     prefixCls: 'ant-carousel',
  //     draggable: false
  //   })
  const slickRef = React.useRef<any>()
  //   let innerSlider: any
  let slick: any
  let onWindowResized = () => {
    // Fix https://github.com/ant-design/ant-design/issues/2550
    const { autoplay } = props
    if (autoplay && slick && slick.innerSlider && slick.innerSlider.autoPlay) {
      slick.innerSlider.autoPlay()
    }
  }
  // 类似于 componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    onWindowResized = debounce(onWindowResized, 500, {
      leading: false
    })
    const { autoplay } = props
    if (autoplay) {
      window.addEventListener('resize', onWindowResized)
    }
    // https://github.com/ant-design/ant-design/issues/7191
    // innerSlider = slick && slick.innerSlider
    return () => {
      const { autoplay } = props
      if (autoplay) {
        window.removeEventListener('resize', onWindowResized)
        ;(onWindowResized as any).cancel()
      }
    }
  }, [])

  React.useImperativeHandle(
    ref,
    () => ({
      goTo,
      autoPlay: slickRef.current.innerSlider.autoPlay,
      innerSlider: slickRef.current.innerSlider,
      prev: slickRef.current.slickPrev,
      next: slickRef.current.slickNext
    }),
    [slickRef.current]
  )

  function goTo(slide: number, dontAnimate = false) {
    slick.slickGoTo(slide, dontAnimate)
  }
  let allProps = {
    ...props,
    dots: true,
    arrows: false,
    prefixCls: 'tb-carousel',
    draggable: false
  }

  if (allProps.effect === 'fade') {
    allProps.fade = true
  }
  allProps.vertical = props.dotPosition === 'left' || props.dotPosition === 'right';
  let className = allProps.prefixCls

  if (allProps.vertical) {
    className = `${className} ${className}-vertical`
  }
  const dotsClass = 'slick-dots'
  const dsClass = classnames(dotsClass, `${dotsClass}-${props.dotPosition}`)

  return (
    <div className={className}>
      <SlickCarousel dotsClass={dsClass} ref={slickRef} {...allProps} />
    </div>
  )
})
export default Carousel
