/*
 * @Author: your name
 * @Date: 2022-03-16 14:51:33
 * @LastEditTime: 2022-03-16 15:10:45
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/PageHeader/index.tsx
 */
import React from 'react'
import './index.scss'
interface Iprops {
  title: string
  content: string
}
function PageHeader(props: any) {
  const { title = '返回', content }: Iprops = props

  return (
    <div className='tb-page-header'>
      <div
        className='tb-page-header__left'
        onClick={() => {
          props.back && props.back()
        }}
      >
        <i className='iconfont icon-leftarrow'></i>
        <div className='tb-page-header__title'>{title}</div>
      </div>
      <div className='tb-page-header__content'>{content}</div>
    </div>
  )
}
export default PageHeader
