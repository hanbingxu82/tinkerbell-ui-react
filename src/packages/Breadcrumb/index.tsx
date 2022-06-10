/*
 * @Author: your name
 * @Date: 2022-03-21 09:38:50
 * @LastEditTime: 2022-06-10 17:35:42
 * @LastEditors: 韩旭小天才 905583741@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/Breadcrumb/index.tsx
 */
// eslint-disable-next-line
import React, { useEffect } from 'react'
import './index.scss'

// interface Iprops {
//   separator: string
//   separatorClass: string
// }
function Breadcrumb(props: any) {
  // const {}: Iprops = props
  useEffect(() => {
    // 使用浏览器API更新文档标题
    document.title = `You clicked count times`
  }, [])
  //  遍历dom子节点方式
  const breadcrumbItems = React.Children.map(props.children, (item) => {
    return React.cloneElement(item, {
      item,
      componentName: 'Breadcrumb',
      breadcrumbProps: props
    })
  })
  return <div className='tb-breadcrumb'>{breadcrumbItems}</div>
}
Breadcrumb.defaultProps = {
  separator: '/',
  separatorClass: ''
}
export default Breadcrumb
