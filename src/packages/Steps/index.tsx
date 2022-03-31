/*
 * @Author: your name
 * @Date: 2022-03-30 14:49:34
 * @LastEditTime: 2022-03-30 16:27:39
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/Steps/index.tsx
 */
/* @flow */

import React from 'react'
import Step from '../Step'
import './index.scss'
// const classnames = require('classnames')
const PropTypes = require('prop-types')
type StatusType = 'wait' | 'process' | 'finish' | 'error' | 'success'

const Steps = (props: {
  finishStatus?: any
  direction?: any
  children?: any
  space?: any
  active?: any
  processStatus?: any
}) => {
  const { children, space, direction, active, finishStatus, processStatus } =
    props
  function calcProgress(status: StatusType, index: number): Object {
    let step = 100
    const style = {
      transitionDelay: '',
      height: '',
      width: ''
    }
    style.transitionDelay = 150 * index + 'ms'

    const nextStatus = calStatus(index + 1)
    // 前后状态不一致时，并且当前status为完成，statusLine的长度才为50%
    if (nextStatus !== status) {
      if (status === props.finishStatus) {
        step = 50
      } else if (status === 'wait') {
        step = 0
        style.transitionDelay = -150 * index + 'ms'
      }
    }

    props.direction === 'vertical'
      ? (style.height = step + '%')
      : (style.width = step + '%')
    return style
  }

  function calStatus(index: number): string {
    let status = 'wait'

    if (active > index) {
      status = finishStatus
    } else if (active === index) {
      status = processStatus
    }

    return status
  }
  return (
    <div className='el-steps'>
      {React.Children.map(children, (child, index) => {
        const computedSpace = space ? `${space}px` : `${100 / children.length}%`
        const style =
          direction === 'horizontal'
            ? { width: computedSpace }
            : {
                height: index === children.length - 1 ? 'auto' : computedSpace
              }
        const status = calStatus(index)
        const lineStyle = calcProgress(status as StatusType, index)
        return React.cloneElement(child, {
          style,
          lineStyle,
          direction,
          status,
          stepNumber: index + 1
        })
      })}
    </div>
  )
}

const statusMap = ['wait', 'process', 'finish', 'error', 'success']

Steps.propTypes = {
  space: PropTypes.number,
  active: PropTypes.number,
  direction: PropTypes.oneOf(['vertical', 'horizontal']),
  finishStatus: PropTypes.oneOf(statusMap),
  processStatus: PropTypes.oneOf(statusMap)
}

Steps.defaultProps = {
  active: 0,
  duration: 4500,
  direction: 'horizontal',
  finishStatus: 'finish',
  processStatus: 'process'
}

Steps.Step = Step

export default Steps
