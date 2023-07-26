/*
 * @Description: CountTo 数字组件
 * @Version: 1.0
 * @Author: hanbingxu
 * @Date: 2023-07-25 13:36:22
 * @LastEditTime: 2023-07-25 18:01:20
 * @LastEditors: hanbingxu
 */
/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react'
import './index.scss'

interface Iprops {
  startVal: number // 开始值
  endVal: number // 结束值
  duration: number // 动画持续时间
  autoplay: boolean // 是否自动播放
  decimals: number // 小数点精度
  decimal: string // 小数点显示
  separator: string // 数字分割
  prefix: string // 前缀，用于显示之前的字符
  suffix: string // 	后缀，用于显示之后的字符
  rAF: null
  useEasing: boolean
  easingFn: Function
}
const CountTo: any = React.forwardRef((props: any, _ref: any) => {
  const {
    useEasing = true,
    startVal = 0,
    endVal = 2000,
    duration = 2000,
    decimals = 0,
    decimal = '.',
    separator = ',',
    prefix = '',
    suffix = '',
    autoplay = true,
    easingFn = function (t: number, b: number, c: number, d: number) {
      return (c * (-Math.pow(2, (-10 * t) / d) + 1) * 1024) / 1023 + b
    }
  }: Iprops = props
  const [state, setState] = useState<any>({
    localStartVal: startVal,
    displayValue: formatNumber(startVal),
    printVal: null,
    paused: false,
    localDuration: duration,
    startTime: null,
    timestamp: null,
    remaining: null,
    rAF: null
  })
  const getCountDown = useRef<any>(null)
  function formatNumber(num: Number | String) {
    num = Number(num).toFixed(decimals)
    num += ''
    const x = num.split('.')
    let x1 = x[0]
    const x2 = x.length > 1 ? decimal + x[1] : ''
    const rgx = /(\d+)(\d{3})/
    if (separator) {
      while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + separator + '$2')
      }
    }
    return prefix + x1 + x2 + suffix
  }
  function start() {
    setState({
      ...state,
      localStartVal: startVal,
      startTime: null,
      localDuration: duration,
      paused: false,
      rAF: requestAnimationFrame(count)
    })
  }

  function pauseResume() {
    if (state.paused) {
      resume()
      state.paused = false
    } else {
      pause()
      state.paused = true
    }
    setState({ ...state })
  }
  function pause() {
    cancelAnimationFrame(state.rAF)
  }

  function resume() {
    state.startTime = null
    state.localDuration = +state.remaining
    state.localStartVal = +state.printVal
    setState({ ...state })
    requestAnimationFrame(count)
  }

  function reset() {
    state.startTime = null
    cancelAnimationFrame(state.rAF)
    state.displayValue = formatNumber(props.startVal)
    setState({ ...state })
  }

  function count(timestamp: any) {
    if (!state.startTime) state.startTime = timestamp
    state.timestamp = timestamp
    const progress = timestamp - state.startTime
    state.remaining = state.localDuration - progress
    if (useEasing) {
      if (getCountDown.current) {
        state.printVal =
          state.localStartVal -
          easingFn(
            progress,
            0,
            state.localStartVal - endVal,
            state.localDuration
          )
      } else {
        state.printVal = easingFn(
          progress,
          state.localStartVal,
          endVal - state.localStartVal,
          state.localDuration
        )
      }
    } else {
      if (getCountDown.current) {
        state.printVal =
          state.localStartVal -
          (state.localStartVal - endVal) * (progress / state.localDuration)
      } else {
        state.printVal =
          state.localStartVal +
          (endVal - state.localStartVal) * (progress / state.localDuration)
      }
    }
    if (getCountDown.current) {
      state.printVal = state.printVal < endVal ? endVal : state.printVal
    } else {
      state.printVal = state.printVal > endVal ? endVal : state.printVal
    }
    state.displayValue = formatNumber(state.printVal)
    if (progress < state.localDuration) {
      state.rAF = requestAnimationFrame(count)
    } else {
      props.callback && props.callback()
    }
    setState({ ...state })
  }

  function restart() {
    reset()
    start()
  }

  useEffect(() => {
    getCountDown.current = props.startVal > props.endVal
  }, [props.startVal, props.endVal])

  useEffect(() => {
    if (autoplay) {
      start()
    }
    _ref.current.count = count
    _ref.current.start = start
    _ref.current.pauseResume = pauseResume
    _ref.current.reset = reset
    _ref.current.restart = restart
    props.onMounted && props.onMounted()
  }, [])

  return <span ref={_ref}>{state.displayValue}</span>
})
export default CountTo
