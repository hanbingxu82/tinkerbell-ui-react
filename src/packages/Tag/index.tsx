/*
 * @Author: your name
 * @Date: 2021-12-13 16:17:47
 * @LastEditTime: 2022-02-21 17:15:04
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /hxreact/src/packages/Tag/index.tsx
 */
import React, { useState, useEffect } from 'react'
import { typeColor } from '../../utils/log'

interface Iprops {
  name: ''
  closable: boolean
  type: string
  dot: boolean
  noBorder: boolean
  color: string
  tagStyle: {}
  size: string
  fontSize: string
  dark: boolean
  checkable: boolean
  value: boolean
}
function Tag(props: any) {
  const [checked, setChecked] = useState(true)
  const { value, type, color }: Iprops = props
  const [dotColor, setDotColor] = useState('')

  // 声明一个名为“count”的新状态变量
  //   const [count, setCount] = useState(0)
  // 类似于 componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    setChecked(value)
  }, [value])
  useEffect(() => {
    if (type) {
      setDotColor(typeColor(type))
    }
    return setDotColor(color)
  }, [type, color])
  return <div className=''></div>
}
export default React.memo(Tag)
