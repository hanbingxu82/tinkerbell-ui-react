/*
 * @Author: your name
 * @Date: 2022-03-28 09:17:28
 * @LastEditTime: 2022-06-10 21:47:58
 * @LastEditors: 韩旭小天才 905583741@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/Message/Message.tsx
 */
import React from 'react'
// import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client'
import Toast from './Toast'

import './index.scss'

const Message: any = (props: any = {}, type?: string) => {
  const div = document.createElement('div')
  const rootDiv = createRoot(div)
  const messageBox = document.getElementsByClassName('tb-message-content')[0]
  if (messageBox) {
    messageBox.appendChild(div)
    document.body.appendChild(messageBox)
  } else {
    const messageBox = document.createElement('div')
    messageBox.className = 'tb-message-content'
    messageBox.appendChild(div)
    document.body.appendChild(messageBox)
  }

  if (typeof props === 'string' || React.isValidElement(props)) {
    props = {
      message: props
    }
  }

  if (type) {
    props.type = type
  }

  const component = React.createElement(
    Toast,
    Object.assign(props, {
      willUnmount: () => {
        requestAnimationFrame(() => {
          const messageBox =
            document.getElementsByClassName('tb-message-content')[0]
          messageBox.removeChild(div)
          rootDiv.unmount()
          if (props.onClose instanceof Function) {
            props.onClose()
          }
        })
      }
    })
  )
  rootDiv.render(component)
  // ReactDOM.render(component, div)
}

/* eslint-disable */
;['success', 'warning', 'info', 'error', 'primary'].forEach((type) => {
  Message[type] = (options = {}) => {
    return Message(options, type)
  }
})
/* eslint-enable */

export default Message
