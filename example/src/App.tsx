/*
 * @Author: your name
 * @Date: 2021-12-13 14:52:54
 * @LastEditTime: 2022-03-21 14:28:17
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/example/src/App.tsx
 */
import React from 'react'

import './index.css'
import { Breadcrumb, BreadcrumbItem } from 'tinkerbell-ui-react'
import 'tinkerbell-ui-react/dist/index.css'
import { useNavigate } from 'react-router-dom'
const App = (props: any) => {
  const navigate = useNavigate()
  const c = React.useRef<any>(null)
  const to = (path: string) => {
    navigate(path, { replace: true })
  }
  return (
    <div>
      <Breadcrumb separator='/' separatorClass='icon-arrow-right'>
        <BreadcrumbItem
          to={() => {
            to('/about')
          }}
        >
          首页
        </BreadcrumbItem>
        <BreadcrumbItem>
          <a href='/'>活动管理</a>
        </BreadcrumbItem>
        <BreadcrumbItem>活动列表</BreadcrumbItem>
        <BreadcrumbItem>活动详情</BreadcrumbItem>
      </Breadcrumb>
      <div>
        <h1>App</h1>

        {props.children}
      </div>
      <div onClick={() => c.current.next()}>123123</div>
      <div className='xiaoxiannan' style={{ height: 3000 }}></div>
    </div>
  )
}

export default App
