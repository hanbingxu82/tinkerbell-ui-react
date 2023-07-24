/*
 * @Author: your name
 * @Date: 2021-12-23 15:58:16
 * @LastEditTime: 2023-07-24 16:11:12
 * @LastEditors: hanbingxu
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/Container/index.tsx
 */
// eslint-disable-next-line
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
    //  如果插槽中有header  或者  footer说明是横向的
    Array.isArray(props.children) &&
      props.children.forEach((element: { type: any; props: any }) => {
        console.log(/Header|Footer/.test(element.type.name), element, 88888)
        if (
          /Header|Footer/.test(element.type.name) ||
          /Header|Footer/.test(element.props.children)
        ) {
          setIsHF('vertical')
        }
      })
  }, []) // eslint-disable-line
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
