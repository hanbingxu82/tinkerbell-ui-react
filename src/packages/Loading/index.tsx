/* eslint-disable */
import React, { useState, useEffect } from 'react'
import './index.scss'
const classnames = require('classnames')
const prefixCls = 'tb-loading'
interface Iprops {
  showIcon: boolean
  showText: string
  fix: boolean
  size: string
}
function Loading(props: any) {
  const [classes, setClasses] = useState('')
  const [textStyle, setTextStyle] = useState({})
  const [text] = useState(props.showText)
  const { showIcon = false, fix = true, size = '' }: Iprops = props

  useEffect(() => {
    setClasses(
      [
        `${prefixCls}`,
        classnames({
          [`${prefixCls}-fix`]: fix,
          [`${prefixCls}-show-text`]: props.showText
        })
      ].join(' ')
    )
  }, [props.fix, props.showText])

  useEffect(() => {
    setTextStyle({
      fontSize: `${size}px`
    })
  }, [props.size])

  return (
    <div className={classes}>
      <div className='tb-loading-inner'>
        {props.children ? (
          props.children
        ) : (
          <>
            {!showIcon && (
              <div>
                <svg className='circular' viewBox='25 25 50 50'>
                  <circle
                    className='path'
                    cx='50'
                    cy='50'
                    r='20'
                    fill='none'
                    strokeWidth='5'
                    strokeMiterlimit='10'
                  ></circle>
                </svg>
              </div>
            )}
            {showIcon && (
              <i
                className={[
                  'iconfont',
                  'icon-loading',
                  'icon-is-rotating'
                ].join(' ')}
              ></i>
            )}
          </>
        )}
        {props.textNode
          ? props.textNode
          : text && (
              <div className='loading-text' style={textStyle}>
                {text}
              </div>
            )}
      </div>
    </div>
  )
}
export default Loading
