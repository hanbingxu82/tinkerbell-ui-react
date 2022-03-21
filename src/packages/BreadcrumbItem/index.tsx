/*
 * @Author: your name
 * @Date: 2022-03-21 10:35:31
 * @LastEditTime: 2022-03-21 14:21:04
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/BreadcrumbItem/index.tsx
 */
import React, { useRef, useState, useEffect } from 'react'
import './index.scss'
// const classnames = require('classnames')

interface Iprops {
  to: any
}
function BreadcrumbItem(props: any) {
  const link: any = useRef(null)
  const { to }: Iprops = props
  // 声明一个名为“count”的新状态变量
  const [separatorClass, setSeparatorClass] = useState('')
  const [separator, setSeparator] = useState('')
  // 类似于 componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    setSeparatorClass(props.breadcrumbProps.separatorClass)
    setSeparator(props.breadcrumbProps.separator)
    link.current.addEventListener('click', () => {
      if (!to) return
      to()
    })
  }, [])
  return (
    <span className='tb-breadcrumb__item'>
      <span
        className={['tb-breadcrumb__inner', to ? 'is-link' : ''].join(' ')}
        ref={link}
      >
        {props.children}
      </span>
      {separatorClass ? (
        <i
          className={`tb-breadcrumb__separator iconfont ${separatorClass}`}
        ></i>
      ) : (
        <span className='tb-breadcrumb__separator'>{separator}</span>
      )}
    </span>
  )
}
export default BreadcrumbItem
