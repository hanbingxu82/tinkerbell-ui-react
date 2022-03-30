/*
 * @Author: your name
 * @Date: 2022-03-29 09:52:58
 * @LastEditTime: 2022-03-29 18:25:30
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/Notification/NotificationCenter.tsx
 */
import React from 'react'
import ReactDOM from 'react-dom'

import Notification from './Notification'

const className = '.el-notification'

export default function NotificationCenter(props: any, type?: string) {
  const div = document.createElement('div')
  const notification = document.getElementsByClassName(
    'el-notification-content'
  )[0]
  if (notification) {
    notification.appendChild(div)
    document.body.appendChild(notification)
  } else {
    const notification = document.createElement('div')
    notification.className = 'el-notification-content'
    notification.appendChild(div)
    document.body.appendChild(notification)
  }

  if (typeof props === 'string' || React.isValidElement(props)) {
    props = {
      message: props
    }
  }

  if (type) {
    props.type = type
  }

  if (!props.offset) {
    props.offset = 0
  }

  const instances = document.querySelectorAll(className)

  const lastInstance: any = instances[instances.length - 1]

  props.top =
    (lastInstance
      ? parseInt(lastInstance.style.top) + lastInstance.offsetHeight
      : props.offset) + 16

  const element = React.createElement(
    Notification,
    Object.assign({}, props, {
      willUnmount() {
        // setTimeout(() => document.body.removeChild(div))
        requestAnimationFrame(() => {
          const notification =
            document.getElementsByClassName('el-notification-content')[0]
          ReactDOM.unmountComponentAtNode(div)
          notification.removeChild(div)
          if (props.onClose instanceof Function) {
            props.onClose()
          }
        })
      }
    })
  )

  ReactDOM.render(element, div)
}

/* eslint-disable */
;['success', 'warning', 'info', 'error'].forEach((type) => {
  NotificationCenter[type] = (options = {}) => NotificationCenter(options, type)
})
/* eslint-enable */
