/*
 * @Author: your name
 * @Date: 2021-12-16 08:41:37
 * @LastEditTime: 2021-12-16 11:24:10
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /hxreact/src/packages/Icon/index.tsx
 */
import React, { useState, useEffect } from 'react'
import './index.scss'
import './fontcss/iconfont.css';
interface Iprops {
  name: string
  size: number | string
  color: string
}
function Icon(props: any) {
  const { name, size, color }: Iprops = props
  const [styleObj, setStyleObj]: any = useState({
    fontSize: '',
    color: ''
  })
  useEffect(() => {
    if (size) {
      setStyleObj({
        fontSize: `${size}px`
      })
    }
    if (color) {
      setStyleObj({
        color: color
      })
    }
  }, [size, color])
  return (
    <i {...props} className={['iconfont', name].join(' ')} style={styleObj}></i>
  )
}
export default Icon
