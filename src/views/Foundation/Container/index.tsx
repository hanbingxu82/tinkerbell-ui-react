/*
 * @Author: 韩旭小天才
 * @Date: 2022-06-30 17:33:20
 * @LastEditors: hanbingxu
 * @LastEditTime: 2022-10-26 15:06:45
 * @Description: file content
 */
import React, { useEffect } from 'react'
function Container() {
  // 声明一个名为“count”的新状态变量
  // 类似于 componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    // 使用浏览器API更新文档标题
    document.title = `You clicked count times`
  }, [])
  return <div className='Container'></div>
}
export default Container
