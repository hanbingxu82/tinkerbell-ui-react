/*
 * @Author: 韩旭小天才 905583741@qq.com
 * @Date: 2022-06-10 15:33:35
 * @LastEditors: 韩旭小天才 905583741@qq.com
 * @LastEditTime: 2022-06-10 15:33:36
 * @FilePath: /tinkerbell-ui-react/src/components/LeftNavs/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect } from 'react'
function LeftNavs() {
  // 声明一个名为“count”的新状态变量
  // const [count, setCount] = useState(0);
  // 类似于 componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    // 使用浏览器API更新文档标题
    document.title = `You clicked count times`
  }, [])
  return <div className=''></div>
}
export default LeftNavs
