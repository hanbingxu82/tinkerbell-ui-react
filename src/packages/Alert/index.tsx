/*
 * @Author: your name
 * @Date: 2022-03-24 14:24:29
 * @LastEditTime: 2022-11-04 17:49:24
 * @LastEditors: hanbingxu
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/Alert/index.tsx
 */
/* eslint-disable */
import React, { useState, useEffect } from 'react'
import Animate from 'rc-animate'
import './index.scss'
// const Animate = require('rc-animate')
const classnames = require('classnames')

interface Iprops {
  title: string
  type: string
  showIcon: boolean
  center: boolean
  closeText: string
  closable: boolean
  description: string
  icon: string
}
function Alert(props: any) {
  const {
    title = props.children || '',
    type = 'success',
    showIcon = false,
    center = false,
    closeText,
    closable = true,
    description,
    icon = '',
    ...restprop
  }: Iprops = props

  const [visible, setVisible] = useState(true)
  const [iconType, setIconType] = useState('')
  const [typeClass, setTypeClass] = useState('')
  const [isBoldTitle, setIsBoldTitle] = useState('')
  const [isBigIcon, setIsBigIcon] = useState('')
  function onClose(event: any) {
    setVisible(false)
    props.onClose && props.onClose(event)
  }
  // 类似于 componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    // 如果传递进来的图标有值的话那就使用传递进来的icon
    if (icon) {
      setIconType(icon)
    } else if (type == 'primary') {
      setIconType(`icon-prompt-fill1`)
    } else if (type == 'success') {
      setIconType(`icon-success-fill`)
    } else if (type == 'info') {
      setIconType(`icon-prompt-fill`)
    } else if (type == 'warning') {
      setIconType(`icon-help1`)
    } else if (type == 'danger') {
      setIconType(`icon-reeor-fill`)
    }
  }, [icon, type])
  useEffect(() => {
    type && setTypeClass(`tb-alert--${type}`)
  }, [type])
  useEffect(() => {
    description ? setIsBoldTitle(`is-bold`) : setIsBoldTitle('')
    description ? setIsBigIcon(`is-big`) : setIsBigIcon('')
  }, [description])
  return (
    <Animate component='' transitionName='tb-alert-fade'>
      {visible ? (
        <div
          {...restprop}
          className={[
            'tb-alert',
            typeClass,
            classnames({
              'is-center': center
            })
          ].join(' ')}
        >
          {showIcon && (
            <i
              className={`tb-alert__icon iconfont ${iconType} ${isBigIcon}`}
            ></i>
          )}
          <div className='tb-alert__content'>
            <span className={`tb-alert__title ${isBoldTitle}`}>{title}</span>

            {description && (
              <p className='tb-alert__description'>{description}</p>
            )}
            {closable && (
              <i
                className={[
                  'tb-alert__closebtn',
                  closeText ? 'is-customed' : `iconfont icon-close`
                ].join(' ')}
                onClick={onClose}
              >
                {closeText}
              </i>
            )}
          </div>
        </div>
      ) : null}
    </Animate>
  )
}
export default Alert

