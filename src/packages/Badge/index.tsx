/*
 * @Author: your name
 * @Date: 2022-03-04 14:00:19
 * @LastEditTime: 2022-06-10 17:35:13
 * @LastEditors: 韩旭小天才 905583741@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/Badge/index.ts
 */
// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
// import Animate from 'rc-animate'
import './index.scss'
const classnames = require('classnames')

interface Iprops {
  prefixCls?: string
  value: string | number
  max: number
  isDot: boolean
  hidden: boolean
  type: string
}
function Badge(props: any) {
  const { value, max, isDot, hidden, type, ...restProps }: Iprops = props
  const [content, setContent] = useState<any>(0)
  // 类似于 componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    if (isDot) return setContent('')
    if (typeof value === 'number' && typeof max === 'number') {
      return max < value ? setContent(`${max}+`) : setContent(value)
    }
    return setContent(value)
  }, [isDot, value, max])
  return (
    <div className='tb-badge' {...restProps}>
      {props.children}
      <span
        className={classnames({
          'zoom-in-center-active':
            !hidden && (content || content === 0 || isDot),
          'zoom-in-center-enter-from':
            !!hidden && (content || content === 0 || isDot)
        })}
      >
        <sup
          className={[
            'tb-badge__content',
            classnames({
              ['tb-badge-is-' + type]: type,
              'is-fixed': props.children,
              'is-dot': isDot
            })
          ].join(' ')}
          // style={{
          //   visibility:
          //     !hidden && (content || content === 0 || isDot) ? 'visible' : 'hidden'
          // }}
        >
          {content}
        </sup>
      </span>
    </div>
  )
}

export default Badge
