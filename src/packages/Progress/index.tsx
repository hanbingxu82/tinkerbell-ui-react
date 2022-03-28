/*
 * @Author: your name
 * @Date: 2022-03-25 10:04:19
 * @LastEditTime: 2022-03-28 12:07:44
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/Progress/index.tsx
 */
/* eslint-disable */
import React, { useState, useEffect } from 'react'
import './index.scss'
const PropTypes = require('prop-types')

interface Iprops {
  percent: number
  showText: boolean
  active: boolean
  activeColor: string
  bgColor: string
  cutWidth: number
  type: string
  cutColor: string
  border: boolean
  status: string
  lineHeight: number
  color: String | Array<string> | Function
  colorFlow: boolean
  flowSecond: number
  format: Function
}
function Progress(props: any) {
  const {
    percent = 0,
    showText = true,
    active = false,
    activeColor = '',
    bgColor = '#ebeef5',
    cutWidth = 1,
    type = 'line',
    cutColor = '#ebeef5',
    border = true,
    status,
    lineHeight = 6,
    color = '',
    colorFlow = false,
    flowSecond = 5,
    format
  }: Iprops = props
  const [items, setItems] = useState<any>([])
  const [idNow, setIdNow] = useState('')
  const [content, setContent] = useState('')

  function getOuterStyle() {
    // 设置底部背景颜色和高度
    let result = {
      background: bgColor,
      height: lineHeight
    }
    return result
  }
  function getLineStyle() {
    let result: any = {}
    result.width = `${percent}%`
    result.height = `${lineHeight}px`
    result.marginTop = `-${lineHeight}px`
    if (color) {
      if (typeof color === 'string') {
        result.background = color
      } else if (Array.isArray(color) && color.length < 7) {
        // 只取 6 种颜色
        let colors = ''
        let i = color.length
        color.map((co, index) => {
          index === i - 1 ? (colors += co) : (colors += co + ', ')
        })
        result.background = `linear-gradient(to right, ${colors})`
      } else if (typeof color === 'function') {
        result.background = `${color(percent)}`
      }
    }
    if (!border) {
      result.borderRadius = 0
    }
    if (colorFlow) {
      // 采用色调转换一直动态的变更背景色
      result.animation = `tb-flow ${flowSecond}s linear infinite`
    }
    return result
  }
  function getActiveStyle() {
    // 流体动画颜色样式
    let result: any = {}
    if (activeColor) {
      if (typeof activeColor === 'string') {
        result.background = activeColor
      }
    }
    return result
  }
  function countCut() {
    let tbl = document.getElementById(`tb-progress-line-${idNow}`)
    let tblSet = setInterval(() => {
      //   获取随机码拼接值
      tbl = document.getElementById(`tb-progress-line-${idNow}`)
      //   如果对应的dom节点有数据的话就说明有这个dom节点
      if (tbl) {
        clearInterval(tblSet)
        console.log(tbl.offsetWidth / (lineHeight + cutWidth))
        // 获取一个指定的偏移量
        let lno = parseInt(
          (tbl.offsetWidth / (lineHeight + cutWidth)) as unknown as string
        )
        // 数字转换成对应长度的数组
        setItems(Array.from(Array(lno).keys()))
      }
    }, 1)
  }
  function getCutStyle() {
    // 设置lump的样式
    let result = {
      height: lineHeight,
      marginTop: `-${lineHeight}px`
    }

    return result
  }
  function getCutBarStyle() {
    // 设置对应的lump宽度
    let result = {
      width: lineHeight,
      borderRight: `${cutWidth}px solid ${cutColor}`
    }

    return result
  }
  function getUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      return (
        c === 'x'
          ? (Math.random() * 16) | 0
          : ('r&0x3' as string | '0x8' as string)
      ).toString(16)
    })
  }

  useEffect(() => {
    if (typeof format === 'function') {
      setContent(format(percent) || '')
    } else {
      setContent(`${percent}%`)
    }
  }, [format, percent])
  // type类型 lineHeight/cutWidth监听器
  useEffect(() => {
    // 如果是lump类型 就要对照显示小竖线
    if (type === 'lump') {
      countCut()
    }
  }, [idNow, lineHeight, cutWidth])
  useEffect(() => {
    // 获取随机码  确保id是唯一的不重复的
    setIdNow(getUUID())
  }, [])
  return (
    <div className='tb-progress'>
      <div className='tb-progress-outer'>
        <div
          className={`tb-progress-outer-bg  ${
            border ? 'tb-progress-outer-bg-border' : ''
          }`}
          style={getOuterStyle()}
        ></div>
        <div
          id={`tb-progress-line-${idNow}`}
          className={`tb-progress-outer-line ${
            status ? 'tb-progress-outer-line-' + status : ''
          }`}
          style={getLineStyle()}
        >
          {active && (
            <div
              className='tb-progress-outer-line-active'
              style={getActiveStyle()}
            ></div>
          )}
        </div>
        {type === 'lump' && (
          <div className='tb-progress-outer-cut' style={getCutStyle()}>
            {items.map((item: number | string) => {
              return <div key={item} style={getCutBarStyle()}></div>
            })}
          </div>
        )}
      </div>
      {showText && <div className='tb-progress-text'>{content}</div>}
    </div>
  )
}
/**
 * @description: 判断 props 传值范围
 * @param {*}
 * @return {*}
 */
Progress.propTypes = {
  showText: PropTypes.bool,
  active: PropTypes.bool,
  activeColor: PropTypes.string,
  bgColor: PropTypes.string,
  cutWidth: PropTypes.number,
  cutColor: PropTypes.string,
  border: PropTypes.bool,
  lineHeight: PropTypes.number,
  color: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.func
  ]),
  colorFlow: PropTypes.bool,
  format: PropTypes.func,
  percent(props: any, propName: string | number, _componentName: any) {
    if ((props[propName] && props[propName] < 0) || props[propName] > 100) {
      return new Error('percent 传值范围<0||>100!')
    }
    return
  },
  type(props: any, propName: any, _componentName: any) {
    if (props[propName] && ['line', 'lump'].indexOf(props[propName]) == -1) {
      return new Error('percent 传值范围"line" || "lump"!')
    }
    return
  },
  status(props: any, propName: any, _componentName: any) {
    if (
      props[propName] &&
      ['success', 'warning', 'error'].indexOf(props[propName]) == -1
    ) {
      return new Error('status 传值范围"success" || "warning" || "error"!')
    }
    return
  },
  flowSecond(props: any, propName: any, _componentName: any) {
    if (props[propName] && [1, 2, 3, 4, 5, 6].indexOf(props[propName]) == -1) {
      return new Error('flowSecond 传值范围1 || 2 || 3 || 4 || 5 || 6]!')
    }
    return
  }
}
export default Progress
/* eslint-disable */