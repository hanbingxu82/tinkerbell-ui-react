/*
 * @Author: your name
 * @Date: 2022-03-30 15:00:38
 * @LastEditTime: 2022-06-10 17:33:59
 * @LastEditors: 韩旭小天才 905583741@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/Step/index.tsx
 */
// eslint-disable-next-line
import React from 'react'
import './index.scss'
// import { Component, PropTypes } from '../../libs';
const classnames = require('classnames')
const PropTypes = require('prop-types')

const Step = (props: any) => {
  const {
    title,
    icon,
    description,
    status,
    direction,
    style,
    lineStyle,
    stepNumber
  } = props
  const directionClass = `is-${direction}`
  const statusClass = `is-${status}`
  const iconNode = icon ? (
    <i className={`iconfont ${icon}`} />
  ) : (
    <div>{stepNumber}</div>
  )

  return (
    <div style={style} className={classnames('tb-step', directionClass)}>
      <div
        className={classnames('tb-step__head', statusClass, {
          'is-text': !icon
        })}
      >
        <div
          className={classnames('tb-step__line', directionClass, {
            'is-icon': icon
          })}
        >
          <i className='tb-step__line-inner' style={lineStyle} />
        </div>
        <span className='tb-step__icon'>
          {status !== 'success' && status !== 'error' ? (
            iconNode
          ) : (
            <i
              className={
                'iconfont ' +
                (status === 'success' ? 'icon-seleted' : 'icon-close')
              }
            />
          )}
        </span>
      </div>
      <div className='tb-step__main'>
        <div className={classnames('tb-step__title', statusClass)}>{title}</div>
        <div className={classnames('tb-step__description', statusClass)}>
          {description}
        </div>
      </div>
    </div>
  )
}

Step.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  status: PropTypes.string,
  direction: PropTypes.string,
  style: PropTypes.object,
  lineStyle: PropTypes.object,
  stepNumber: PropTypes.number
}
Step.defaultProps = {
  status: 'wait'
}
export default Step
