/*
 * @Author: your name
 * @Date: 2022-03-28 09:17:44
 * @LastEditTime: 2022-03-28 12:44:52
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/Message/Toast.tsx
 */
/* @flow */

import React, { useState, useEffect } from 'react'
import Animate from 'rc-animate'
import Icon from '../Icon'
import icons from './Assets'

// const Animate =require('rc-animate')
const classnames = require('classnames')
const PropTypes = require('prop-types')
interface Iprops {
  iconClass: string
  customClass: string
}

function Toast(props: any) {
  const { iconClass, customClass }: Iprops = props
  const [visible, setVisible] = useState(false)
  let timeout: NodeJS.Timeout
  useEffect(() => {
    setVisible(true)
    startTimer()
    return () => {
      stopTimer()
    }
  },[]) // eslint-disable-line
  function onClose() {
    stopTimer()

    setVisible(false)
  }
  function startTimer() {
    if (props.duration > 0) {
      timeout = setTimeout(() => {
        onClose()
      }, props.duration)
    }
  }

  function stopTimer() {
    clearTimeout(timeout)
  }
  return (
    <Animate
      component=''
      transitionName='el-message-fade'
      onAfterLeave={() => {
        props.willUnmount()
      }}
    >
      {visible ? (
        <div
          className={classnames('el-message', customClass)}
          onMouseEnter={stopTimer}
          onMouseLeave={startTimer}
        >
          {!iconClass && (
            <Icon
              name={`${classnames('el-message__img')} ${icons[props.type]}`}
            ></Icon>
          )}
          <div
            className={classnames('el-message__group', {
              'is-with-icon': iconClass
            })}
          >
            {iconClass && (
              <i className={classnames('el-message__icon', iconClass)}></i>
            )}
            <p>{props.message}</p>
            {props.showClose && (
              <div
                className='el-message__closeBtn el-icon-close'
                onClick={onClose}
              ></div>
            )}
          </div>
        </div>
      ) : null}
    </Animate>
  )
}

Toast.propTypes = {
  type: PropTypes.oneOf(['success', 'warning', 'info', 'error']),
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,
  duration: PropTypes.number,
  showClose: PropTypes.bool,
  customClass: PropTypes.string,
  iconClass: PropTypes.string
}

Toast.defaultProps = {
  type: 'info',
  duration: 3000,
  showClose: false
}

export default Toast
