/*
 * @Author: 韩旭小天才 905583741@qq.com
 * @Date: 2022-06-09 19:39:45
 * @LastEditors: 韩旭小天才 905583741@qq.com
 * @LastEditTime: 2022-06-09 19:41:44
 * @FilePath: /tinkerbell-ui-react/src/views/Guide/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect } from 'react'
function Guide() {
  // 声明一个名为“count”的新状态变量
  //   const [count, setCount] = useState(0)
  // 类似于 componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    // 使用浏览器API更新文档标题
    document.title = `You clicked count times`
  }, [])
  return <div className='Guide'></div>
}
export default Guide
