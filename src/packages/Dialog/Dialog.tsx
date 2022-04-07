/*
 * @Author: your name
 * @Date: 2022-04-06 16:48:09
 * @LastEditTime: 2022-04-07 14:38:30
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/Dialog/dialog.tsx
 */
/* @flow */

import React, { SyntheticEvent, useEffect, useState } from 'react'
import { cleanScrollBar } from '../../utils/utils'
// import Animate from 'rc-animate'
import CSSMotion from 'rc-motion'
import {
  useWillReceiveProps,
  useUpdateEffect
} from '../../utils/useUpdateEffect'
import DialogBody from './DialogBody'
import DialogFooter from './DialogFooter'
import './index.scss'

const PropTypes = require('prop-types')
const classnames = require('classnames')

type bodyOverflow = string
const Dialog: any = React.forwardRef((props: any, wrap: any) => {
  const [bodyOverflow, setBodyOverflow] = useState<bodyOverflow>('')

  useWillReceiveProps(
    (oldProps) => {
      const { lockScroll, modal } = props
      if (willOpen(oldProps, props)) {
        cleanScrollBar()
        if (lockScroll && document.body && document.body.style) {
          if (!bodyOverflow) {
            setBodyOverflow(document.body.style.overflow)
          }
          document.body.style.overflow = 'hidden'
        }
      }

      if (willClose(oldProps, props) && lockScroll) {
        if (
          modal &&
          bodyOverflow !== 'hidden' &&
          document.body &&
          document.body.style
        ) {
          document.body.style.overflow = bodyOverflow
        }
      }
    },
    [props]
  )
  /**
   * @description: 组件将要更新数据时触发的函数
   * @param {_oldProps，oldState}:旧props， 旧state
   * @return {*}
   */
  useUpdateEffect((oldProps, _oldState) => {
    if (willOpen(props, oldProps)) {
      wrap.current.focus()
    }
  }, props)

  // 组件销毁
  useEffect(() => {
    return () => {
      const { lockScroll } = props
      if (lockScroll && document.body && document.body.style) {
        document.body.style.removeProperty('overflow')
      }
    }
  }, []) // eslint-disable-line

  function onKeyDown(e: any): void {
    const { closeOnPressEscape } = props
    if (closeOnPressEscape && e.keyCode === 27) {
      close(e)
    }
  }
  function handleWrapperClick(e: SyntheticEvent<HTMLDivElement>): void {
    const { closeOnClickModal } = props
    if (e.target instanceof HTMLDivElement) {
      if (closeOnClickModal && e.target === e.currentTarget) {
        close(e)
      }
    }
  }

  function close(e: any): void {
    props.onCancel(e)
  }

  function willOpen(
    prevProps: { visible: boolean },
    nextProps: { visible: boolean }
  ): boolean {
    return !prevProps.visible && nextProps.visible
  }

  function willClose(
    prevProps: { visible: boolean },
    nextProps: { visible: boolean }
  ): boolean {
    return prevProps.visible && !nextProps.visible
  }
  const {
    visible,
    title,
    size,
    top,
    modal,
    customClass,
    showClose,
    children,
    destroyOnClose
  } = props
  return (
    <div>
      {/* <Animate component='' transitionName='dialog-fade'>
        {visible ? (
          <div
            ref={wrap}
            style={{ zIndex: 1013 }}
            className={classnames('el-dialog__wrapper')}
            onClick={(e) => handleWrapperClick(e)}
            onKeyDown={(e) => onKeyDown(e)}
          >
            <div
              // ref='dialog'
              style={size === 'full' ? {} : { top: top }}
              className={classnames(
                'el-dialog',
                `el-dialog--${size}`,
                customClass
              )}
            >
              <div className='el-dialog__header'>
                <span className='el-dialog__title'>{title}</span>
                {showClose && (
                  <button
                    type='button'
                    className='el-dialog__headerbtn'
                    onClick={(e) => close(e)}
                  >
                    <i className='el-dialog__close el-icon el-icon-close' />
                  </button>
                )}
              </div>
              {children}
            </div>
          </div>
        ) : null}
      </Animate> */}
      <CSSMotion
        visible={visible}
        onEnterActive={(HTMLElement) => {
          HTMLElement.style.display = 'block'
        }}
        onLeaveEnd={(HTMLElement) => {
          HTMLElement.style.display = 'none'
        }}
        removeOnLeave={destroyOnClose}
        motionName='dialog-fade'
      >
        {({ className, style }) => (
          <div
            ref={wrap}
            style={{ zIndex: 1013, ...style }}
            className={classnames('el-dialog__wrapper', className)}
            onClick={(e) => handleWrapperClick(e)}
            onKeyDown={(e) => onKeyDown(e)}
          >
            <div
              // ref='dialog'
              style={size === 'full' ? {} : { top: top }}
              className={classnames(
                'el-dialog',
                `el-dialog--${size}`,
                customClass
              )}
            >
              <div className='el-dialog__header'>
                <span className='el-dialog__title'>{title}</span>
                {showClose && (
                  <button
                    type='button'
                    className='el-dialog__headerbtn'
                    onClick={(e) => close(e)}
                  >
                    <i className='el-dialog__close el-icon el-icon-close' />
                  </button>
                )}
              </div>
              {children}
            </div>
          </div>
        )}
      </CSSMotion>
      {modal && visible ? (
        <div className='v-modal' style={{ zIndex: 1012 }} />
      ) : null}
    </div>
  )
})

//   render(): React.DOM {

//   }
// }

Dialog.defaultProps = {
  visible: false,
  title: '',
  size: 'small',
  top: '15%',
  modal: true,
  lockScroll: true,
  closeOnClickModal: true,
  closeOnPressEscape: true,
  showClose: true,
  destroyOnClose: false
}

Dialog.propTypes = {
  // 控制对话框是否可见
  visible: PropTypes.bool.isRequired,
  // 标题
  title: PropTypes.string,
  // 大小 (tiny/small/large/full)
  size: PropTypes.string,
  // top 值（仅在 size 不为 full 时有效）
  top: PropTypes.string,
  // 控制遮罩层展示
  modal: PropTypes.bool,
  // Dialog 的自定义类名
  customClass: PropTypes.string,
  // 是否在 Dialog 出现时将 body 滚动锁定
  lockScroll: PropTypes.bool,
  // 是否可以通过点击 modal 关闭 Dialog
  closeOnClickModal: PropTypes.bool,
  // 是否可以通过按下 ESC 关闭 Dialog
  closeOnPressEscape: PropTypes.bool,
  // 点击遮罩层或右上角叉或取消按钮的回调
  onCancel: PropTypes.func.isRequired,
  showClose: PropTypes.bool,
  destroyOnClose: PropTypes.bool
}
Dialog.Body = DialogBody
Dialog.Footer = DialogFooter
export default Dialog
