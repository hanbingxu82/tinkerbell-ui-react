/*
 * @Author: your name
 * @Date: 2022-03-28 09:17:44
 * @LastEditTime: 2022-03-30 11:45:19
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/Message/Toast.tsx
 */
/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react'
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
  const [typeClass, setTypeClass] = useState('')
  const [visible, setVisible] = useState(false)
  const timeout: any = useRef(null)
  useEffect(() => {
    props.type && setTypeClass(`tb-message__${props.type}`)
  }, [props.type]) // eslint-disable-line

  useEffect(() => {
    setVisible(true)
    startTimer()
    return () => {
      stopTimer()
    }
  }, []) // eslint-disable-line

  function onClose() {
    stopTimer()
    setVisible(false)
  }

  function startTimer() {
    if (props.duration > 0) {
      timeout.current = setTimeout(() => {
        onClose()
      }, props.duration)
    }
  }

  function stopTimer() {
    clearTimeout(timeout.current)
  }
  return (
    <Animate
      component=''
      transitionName='tb-message-fade'
      onLeave={() => {
        props.willUnmount()
      }}
    >
      {visible ? (
        <div
          className={classnames('tb-message', customClass, typeClass)}
          onMouseEnter={stopTimer}
          onMouseLeave={startTimer}
        >
          {!iconClass && (
            <Icon
              name={`${classnames('tb-message__img')} ${icons[props.type]}`}
            ></Icon>
          )}
          <div
            className={classnames('tb-message__group', {
              'is-with-icon': iconClass
            })}
          >
            {iconClass && (
              <i className={classnames('tb-message__icon', iconClass)}></i>
            )}
            <p>{props.message}</p>
            {props.showClose && (
              // <div
              //   className='tb-message__closeBtn tb-icon-close'
              //   onClick={onClose}
              // ></div>
              <i
                className={['tb-message__closeBtn', `iconfont icon-close`].join(
                  ' '
                )}
                onClick={onClose}
              ></i>
            )}
          </div>
        </div>
      ) : null}
    </Animate>
  )
}

Toast.propTypes = {
  type: PropTypes.oneOf(['success', 'warning', 'info', 'error', 'primary']),
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
