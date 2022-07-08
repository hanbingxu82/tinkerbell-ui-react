/*
 * @Author: 韩旭小天才
 * @Date: 2022-06-30 17:33:20
 * @LastEditors: 韩旭小天才
 * @LastEditTime: 2022-07-08 18:22:35
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
  return <div className=''></div>
}
export default Container
