/*
 * @Author: your name
 * @Date: 2022-03-29 09:53:41
 * @LastEditTime: 2022-03-30 10:20:17
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/Notification/Notification.tsx
 */
/* @flow */

import React, { useEffect, useState, useRef } from 'react'
import Animate from 'rc-animate'
import './index.scss'

const PropTypes = require('prop-types')
const classnames = require('classnames')
const typeMap = {
  success: 'circle-check',
  info: 'information',
  warning: 'warning',
  error: 'circle-cross'
}

const Notification: any = (props: any) => {
  const isOne = useRef(true)
  const {
    // onClose = () => false,
    willUnmount,
    // duration,
    // top,
    type,
    iconClass,
    title,
    message
  } = props
  const timeout: any = useRef(null)
  const [visible, setVisible] = useState(false)
  // 判断触发父元素删除行为
  //   useEffect(() => {
  //     if (!isOne.current) {
  //       !visible && willUnmount()
  //     }
  //   }, [visible]) // eslint-disable-line

  useEffect(() => {
    isOne.current = false
    setVisible(true)
    startTimer()
    return () => {
      stopTimer()
    }
  }, []) // eslint-disable-line

  function onClick() {
    props.onClick && props.onClick()
  }

  function onClose() {
    setVisible(false)
  }

  function startTimer() {
    const { duration } = props
    if (duration) {
      timeout.current = setTimeout(() => onClose(), duration)
    }
  }

  function stopTimer() {
    clearTimeout(timeout.current)
  }

  function typeClass(): string {
    const { type } = props
    return type && typeMap[type] ? `el-icon-${typeMap[type]}` : ''
  }

  return (
    <Animate
      unmountOnExit
      component=''
      transitionName='el-notification-fade'
      onLeave={() => {
        willUnmount()
      }}
    >
      {visible ? (
        <div
          className='el-notification'
          style={{
            // top,
            zIndex: 9999
          }}
          onMouseEnter={stopTimer}
          onMouseLeave={startTimer}
          onClick={onClick}
        >
          {type && (
            <i
              className={classnames(
                'el-notification__icon',
                typeClass(),
                iconClass
              )}
            />
          )}
          <div
            className={classnames('el-notification__group', {
              'is-with-icon': typeClass() || iconClass
            })}
          >
            <h2 className='el-notification__title'>{title}</h2>
            <div className='el-notification__content'>{message}</div>
            <div
              className='el-notification__closeBtn iconfont icon-close'
              onClick={onClose}
            />
          </div>
        </div>
      ) : null}
    </Animate>
  )
}

Notification.propTypes = {
  type: PropTypes.oneOf(['success', 'warning', 'info', 'error']),
  title: PropTypes.string,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  duration: PropTypes.number,
  iconClass: PropTypes.string,
  onClick: PropTypes.func,
  top: PropTypes.number
}

Notification.defaultProps = {
  duration: 4500,
  top: 16
}

export default Notification