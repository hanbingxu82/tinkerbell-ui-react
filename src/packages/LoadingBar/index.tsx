/*
 * @Author: your name
 * @Date: 2022-03-22 11:07:33
 * @LastEditTime: 2022-03-22 17:23:23
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/LoadingBar/index.tsx
 */
import React, { useState, useEffect } from 'react'

import './index.scss'
var ReactDOM = require('react-dom')
interface Iprops {
  type: number
}
const LoadingBar: any = React.forwardRef((props: any, ref: any) => {
  const { type = 1 }: Iprops = props
  // 声明一个名为“count”的新状态变量
  const [speed, setSpeed] = useState(1)
  const [easing, setEasing] = useState('linear')
  const [percentNum, setPercentNum] = useState(0)
  const [totalProgress, setTotalProgress] = useState(0)
  const [showSpinner, setShowSpinner] = useState(true)
  const [isError, setIsError] = useState(false)
  // 类似于 componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    ref.current = {
      ...ref.current,
      methods: {
        type,
        speed,
        setSpeed,
        easing,
        setEasing,
        percentNum,
        setPercentNum,
        totalProgress,
        setTotalProgress,
        showSpinner,
        setShowSpinner,
        isError,
        setIsError
      }
    }
    console.log(showSpinner)
  }, [speed, easing, percentNum, totalProgress, showSpinner, isError])
  return (
    <div ref={ref} className='tb__loading-bar'>
      <div
        className={[
          'tb__loading-bar--bar',
          isError ? 'tb__loading-bar--error' : ''
        ].join(' ')}
        role='bar'
        style={{
          transform: 'translate3d(-' + (100 - totalProgress) + '%, 0, 0)'
        }}
      >
        <div className='tb__loading-bar--peg'></div>
      </div>
      {showSpinner && (
        <div className='tb__loading-bar--spinner' role='spinner'>
          <div
            className={[
              'spinner-icon',
              isError ? 'spinner-icon--error' : ''
            ].join(' ')}
            style={{ animation: 'tb-spinner 400ms ' + easing + ' infinite' }}
          ></div>
        </div>
      )}
    </div>
  )
})

/**
 * @description: 此步用于获取实例   Vue.extend(LoadingBar) 用于构建模板：但注意此时对应的数据还并没有实例化就相当于  是Vue 还没有new
 * @param {*}
 * @return {*}
 */
const div = document.createElement('div')
// document.body.appendChild(div)
// 创建一个Ref对象
const componentInstance: any = React.createRef()
function LoadingBarConstructor() {
  ReactDOM.render(<LoadingBar ref={componentInstance} />, div)
  return { ...LoadingBar, componentInstance }
}

let timer: any = null
let removeTimer: any = null

/**
 * @description:
 * @param {*} options 参数为一个对象，注意 prototype中的this指向的便是实例化后 的this 所以我们就可以在这里使用this 进行变更组件中data的值
 * @return {*}
 */
LoadingBar.config = function (options: { [x: string]: any }) {
  console.log(componentInstance.current.methods)
  // 便利对应的
  Object.keys(options).forEach((key) => {
    // 在这里我们不能让其传入对应的isError  和  totalProgress  因为这两个参数分别代表了错误状态以及对应的加载进度条行走进度
    if (key === 'isError' || key === 'totalProgress') {
      // 抛出错误
      throw new Error('配置传递错误!')
    }

    key == 'speed' && componentInstance.current.methods.setSpeed(options[key])
    key == 'easing' && componentInstance.current.methods.setEasing(options[key])
    key == 'percentNum' &&
      componentInstance.current.methods.setPercentNum(options[key])

    key == 'showSpinner' &&
      componentInstance.current.methods.setShowSpinner(options[key])
    // 对应data中的配置值  也就等于我们自己定义的key值
    this[key] = options[key]
  })
  // 完成之后调用一次this.start()
  LoadingBar.start()
}

/**
 * @description: 此处用于初始化对应的vue模板 将对应的挂载的模板真正的追加到document.body文档当中，因为样式我们已经写好所以 不用考虑冲突的问题
 * @param {*}
 * @return {*}
 */
LoadingBar.init = function () {
  // 首先初始化我们要做的就是清空对应的计时器 相当于一个节流，主要为了用于防止重复点击
  clearTimeout(timer)
  // 进度初始值变为0
  componentInstance.current.methods.setTotalProgress(0)

  // 是否错误状态设置为false初始值
  componentInstance.current.methods.setIsError(false)
  // 追加
  document.body.appendChild(div)
  // debugger
  return LoadingBar
}

/**
 * @description: 特定开始api
 * @param {*}
 * @return {*}
 */
LoadingBar.start = function () {
  // 每次开始的时候我们调用对应的初始化api 进行初始化
  LoadingBar.init()
  /**
   * @description: 定时器  可以理解为每次点击按钮的时候每次重置
   * @param {*} setInterval
   * @return {*}
   */
  timer = setInterval(() => {
    // 每次都要判断  最多到90  因为我们要的其实只是一个状态，真正关闭的时候  通常一个ajax关闭是需要在调用完毕之后再去调用对应的end关闭方法
    if (componentInstance.current.methods.totalProgress < 90) {
      // 如果有传递进来的值 就用传递进来的值，反之就用随机值 * 每毫秒加载几个格
      componentInstance.current.methods.setTotalProgress(
        componentInstance.current.methods.totalProgress +
          (componentInstance.current.methods.percentNum || Math.random()) *
            componentInstance.current.methods.speed
      )
    }
  }, 100)
}
/**
 * @description: 特定结束api
 * @param {*}
 * @return {*}
 */
LoadingBar.end = function () {
  // 主要用于判断是不是已经开始了  因为只有开始了timer才会有值  可以根据它进行判断 走init
  timer || LoadingBar.init()
  // 外层使用定时器包裹主要是想要
  setTimeout(() => {
    // 如果是结束的话那么对应的总进度就要立刻变更为100
    componentInstance.current.methods.setTotalProgress(100)

    // 每次结束的时候同样也要清除定时器  防止重复点击
    clearTimeout(removeTimer)
    // 200毫秒之后立即清除掉对应的进度条
    removeTimer = setTimeout(() => {
      // 同样的结束之后我们没有必要在使用timer计时器了，可以清除了
      clearTimeout(timer)
      // timer此时可以置空
      timer = null
      // 同样的将数据在文档中删除
      document.body.removeChild(div)
    }, 200)
  }, 0)
  // clearTimeout(newTimer);
}

LoadingBar.error = function () {
  /**
   * @description: 注意此时调用的end其实是内部有异步操作的
   * @param {*}
   * @return {*}
   */

  LoadingBar.end()
  // 此步其实可有也可无  初始化后立即变为100 之后便在200ms后isError 颜色为红色 对应的操作走完移除
  componentInstance.current.methods.setTotalProgress(100)
  componentInstance.current.methods.setIsError(true)
  //   this.totalProgress = 100
  //   this.isError = true
}
export default LoadingBarConstructor()
