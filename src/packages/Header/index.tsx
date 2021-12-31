/*
 * @Author: your name
 * @Date: 2021-12-30 15:34:48
 * @LastEditTime: 2021-12-30 15:42:51
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/Header/index.tsx
 */
import React, { useEffect } from 'react'
import './index.scss'

function Header(props: any) {
  // 类似于 componentDidMount 和 componentDidUpdate:
  useEffect(() => {}, [])
  return (
    <div {...props} className='tb-header header'>
      {props.children}
    </div>
  )
}
export default Header
