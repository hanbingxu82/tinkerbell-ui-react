/*
 * @Author: your name
 * @Date: 2021-12-31 10:43:26
 * @LastEditTime: 2021-12-31 10:47:53
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/Footer/index.tsx
 */
import React, { useEffect } from 'react'
import './index.scss'

interface Iprops {
  height: string
}

function Footer(props: any) {
  const { height = '60px' }: Iprops = props
  // 类似于 componentDidMount 和 componentDidUpdate:
  useEffect(() => {}, [])
  return (
    <div {...props} className='tb-header header' style={{ height }}>
      {props.children}
    </div>
  )
}
export default Footer
