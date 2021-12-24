/*
 * @Author: your name
 * @Date: 2021-12-23 15:58:16
 * @LastEditTime: 2021-12-24 09:17:06
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/Container/index.tsx
 */
import React, { useState, useEffect } from 'react'
import './index.scss'
interface Iprops {
  direction: string
}
function Container(props: any) {
  const { direction = 'horizontal' }: Iprops = props
  const [isHF, setIsHF] = useState(direction)
  // 类似于 componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    // // 如果插槽中有header  或者  footer说明是横向的
    props.children.forEach((element: { type: string }) => {
      if (/Header|Footer/.test(element.type)) {
        setIsHF('vertical')
      }
    })
    console.log(props)
  }, [])
  return (
    <div
      {...props}
      className={`tb-container ${
        isHF === 'vertical' ? 'container-col' : 'container'
      }`}
    >
      {props.children}
    </div>
  )
}
export default Container
