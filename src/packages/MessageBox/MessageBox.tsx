/*
 * @Author: your name
 * @Date: 2022-04-11 16:04:42
 * @LastEditTime: 2022-06-10 22:06:59
 * @LastEditors: 韩旭小天才 905583741@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/MessageBox/MessageBox.tsx
 */
// eslint-disable-next-line
import React, { useEffect, useState } from 'react'
import CSSMotion from 'rc-motion'
// import Animate from 'rc-animate'
// import { cleanScrollBar } from '../table/utils'
import Button from '../Button'
import Input from '../Input'
import './index.scss'

const classnames = require('classnames')
const PropTypes = require('prop-types')

const typeMap = {
  success: 'icon-success-fill',
  info: 'icon-prompt-fill1',
  warning: 'icon-help1',
  error: 'icon-reeor-fill',
  primary: 'icon-prompt-fill'
}

const MessageBox: any = React.forwardRef((props: any, ref: any) => {
  const [visible, setVisible] = useState(false)
  const [inputValue, setInputValue] = useState(props.inputValue)
  const [editorErrorMessage, setEditorErrorMessage] = useState(null)
  useEffect(() => {
    // cleanScrollBar()
    setVisible(true)
    document.activeElement && (document.activeElement as any).blur()
  }, [])
  function confirmButtonText(): string {
    return props.confirmButtonText || '确定'
  }

  function cancelButtonText(): string {
    return props.cancelButtonText || '取消'
  }

  function onChange(value: string): void {
    setInputValue(value)
    validate(value)
  }

  function typeClass(): string {
    return props.type && typeMap[props.type] ? `iconfont is-${props.type} ${typeMap[props.type]}` : ''
  }

  function validate(value: string): boolean {
    const { inputPattern, inputValidator, inputErrorMessage } = props
    let editorErrorMessage

    if (inputPattern && !inputPattern.test(value)) {
      editorErrorMessage = inputErrorMessage || '输入的数据不合法!'
    }

    if (typeof inputValidator === 'function') {
      const validateResult = inputValidator(value)

      if (validateResult === false) {
        editorErrorMessage = inputErrorMessage || '输入的数据不合法!'
      }

      if (typeof validateResult === 'string') {
        editorErrorMessage = validateResult
      }
    }
    setEditorErrorMessage(editorErrorMessage)

    return !editorErrorMessage
  }

  function handleAction(action: string): void {
    const { modal, promise, showInput } = props

    if (modal) {
      switch (action) {
        case 'cancel':
          promise.reject()
          break
        case 'confirm':
          if (modal === 'prompt') {
            if (validate(inputValue || '')) {
              if (showInput) {
                promise.resolve({ value: inputValue, action })
              } else {
                promise.resolve(action)
              }
            } else {
              return
            }
          } else {
            promise.resolve()
          }
          break
        default:
          break
      }
    } else {
      promise.resolve(action)
    }
    close()
  }

  function close(): void {
    setVisible(false)
  }
  const {
    willUnmount,
    title,
    showClose,
    message,
    showInput,
    inputPlaceholder,
    showCancelButton,
    cancelButtonClass,
    showConfirmButton,
    confirmButtonClass,
    customClass,
    inputType
  } = props

  return (
    <div>
      <div style={{ position: 'absolute', zIndex: 2001 }}>
        <CSSMotion
          visible={visible}
          onLeaveEnd={() => {
            willUnmount && willUnmount()
          }}
          motionName='msgbox-fade'
        >
          {({ className, style }) => (
            <div
              style={style}
              className={classnames(
                'tb-message-box__wrapper',
                customClass,
                className
              )}
            >
              <div className='tb-message-box' ref={ref}>
                {title && (
                  <div className='tb-message-box__header'>
                    <div className='tb-message-box__title'>{title}</div>
                    {showClose && (
                      <button
                        type='button'
                        className='tb-message-box__headerbtn'
                        aria-label='Close'
                        onClick={() => {
                          handleAction('cancel')
                        }}
                      >
                        <i className='tb-message-box__close iconfont icon-close' />
                      </button>
                    )}
                  </div>
                )}
                {message && (
                  <div className='tb-message-box__content'>
                    <div
                      className={classnames(
                        'tb-message-box__status',
                        typeClass()
                      )}
                    />
                    <div
                      className='tb-message-box__message'
                      style={{ marginLeft: typeClass() ? '50px' : '0' }}
                    >
                      <div>{message}</div>
                    </div>
                    {showInput ? (
                      <div className='tb-message-box__input'>
                        <Input
                          className={classnames({
                            invalid: editorErrorMessage
                          })}
                          type={inputType}
                          value={inputValue}
                          placeholder={inputPlaceholder}
                          onChange={onChange}
                        />
                        <div
                          className='tb-message-box__errormsg'
                          style={{
                            visibility: editorErrorMessage
                              ? 'visible'
                              : 'hidden'
                          }}
                        >
                          {editorErrorMessage}
                        </div>
                      </div>
                    ) : null}
                  </div>
                )}
                <div className='tb-message-box__btns'>
                  {showCancelButton ? (
                    <Button
                      className={cancelButtonClass}
                      onClick={() => {
                        handleAction('cancel')
                      }}
                    >
                      {cancelButtonText()}
                    </Button>
                  ) : null}
                  {showConfirmButton ? (
                    <Button
                      className={classnames(
                        'tb-button--primary',
                        confirmButtonClass
                      )}
                      onClick={() => {
                        handleAction('confirm')
                      }}
                    >
                      {confirmButtonText()}
                    </Button>
                  ) : null}
                </div>
              </div>
            </div>
          )}
        </CSSMotion>
      </div>
      {/* <Animate component='' transitionName='v-modal'> */}
        {visible ? <div className='v-modal' style={{ zIndex: 1006 }} /> : null}
      {/* </Animate> */}
    </div>
  )
})

MessageBox.propTypes = {
  modal: PropTypes.oneOf(['alert', 'confirm', 'prompt']),
  type: PropTypes.oneOf(['success', 'warning', 'info', 'error']),
  title: PropTypes.string,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  showInput: PropTypes.bool,
  showClose: PropTypes.bool,
  showCancelButton: PropTypes.bool,
  showConfirmButton: PropTypes.bool,
  confirmButtonText: PropTypes.string,
  cancelButtonText: PropTypes.string,
  cancelButtonClass: PropTypes.string,
  confirmButtonClass: PropTypes.string,
  customClass: PropTypes.string,
  inputPlaceholder: PropTypes.string,
  inputPattern: PropTypes.any,
  inputValidator: PropTypes.func,
  inputErrorMessage: PropTypes.string,
  inputValue: PropTypes.any,
  inputType: PropTypes.string,
  promise: PropTypes.object,
  onClose: PropTypes.func
}

MessageBox.defaultProps = {
  title: '提示',
  showInput: false,
  showClose: true,
  showCancelButton: false,
  showConfirmButton: true
}

export default MessageBox
