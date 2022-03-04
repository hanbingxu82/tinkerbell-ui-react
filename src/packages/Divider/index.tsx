/*
 * @Author: your name
 * @Date: 2022-03-04 09:18:59
 * @LastEditTime: 2022-03-04 15:12:27
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/Divider/index.tsx
 */
import * as React from 'react'
import classNames from 'classnames'
import './index.scss'

export interface DividerProps {
  prefixCls?: string
  type?: 'horizontal' | 'vertical'
  orientation?: 'left' | 'right' | ''
  className?: string
  children?: React.ReactNode
  dashed?: boolean
  style?: React.CSSProperties
}

export default function Divider({
  prefixCls = 'tb',
  type = 'horizontal',
  orientation = '',
  className,
  children,
  dashed,
  ...restProps
}: DividerProps) {
  const orientationPrefix =
    orientation.length > 0 ? '-' + orientation : orientation
  const classString = classNames(
    className,
    `${prefixCls}-divider`,
    `${prefixCls}-divider-${type}`,
    {
      [`${prefixCls}-divider-with-text${orientationPrefix}`]: children,
      [`${prefixCls}-divider-dashed`]: !!dashed
    }
  )
  return (
    <div className={classString} {...restProps}>
      {children && (
        <span className={`${prefixCls}-divider-inner-text`}>{children}</span>
      )}
    </div>
  )
}
