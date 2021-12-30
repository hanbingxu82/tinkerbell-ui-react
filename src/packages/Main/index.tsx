/*
 * @Author: your name
 * @Date: 2021-12-30 14:50:32
 * @LastEditTime: 2021-12-30 15:06:17
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/Main/index.tsx
 */
import React, { useEffect } from 'react'
import './index.scss'

function Main(props: any) {
  // 类似于 componentDidMount 和 componentDidUpdate:
  useEffect(() => {}, [])
  return (
    <div {...props} className='tb-main main'>
      {props.children}
    </div>
  )
}
export default Main
