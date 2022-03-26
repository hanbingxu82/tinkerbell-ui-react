/*
 * @Author: your name
 * @Date: 2021-12-13 14:52:54
 * @LastEditTime: 2022-03-26 13:37:22
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/example/src/App.tsx
 */
import React, { useEffect, useState } from 'react'

import './index.css'
import {
  Button,
  Breadcrumb,
  BreadcrumbItem,
  LoadingBar,
  Progress,
  Switch
} from 'tinkerbell-ui-react'
import 'tinkerbell-ui-react/dist/index.css'
import { useNavigate } from 'react-router-dom'
const App = (props: any) => {
  const navigate = useNavigate()
  const c = React.useRef<any>(null)
  const to = (path: string) => {
    navigate(path, { replace: true })
  }
  const [value, setValue] = useState(false)
  useEffect(() => {}, [])
  function format(percent: number) {
    if (percent === 100) {
      return '^_^'
    }
    return 'QAQ'
  }
  return (
    <div>
      <div>
        <Switch
          value={value}
          onChange={(val: boolean) => {
            console.log(val)
            setValue(val)
          }}
          checkedText='开'
          uncheckedText='关'
        ></Switch>
        <Switch value={value} disabled />

        <Switch
          value={value}
          onChange={(val: boolean) => {
            console.log(val)
            setValue(val)
          }}
          checkedText='😁'
          uncheckedText='😞'
        ></Switch>
        <Progress percent='20'></Progress>
        <Progress percent='40' status='success' type='lump'></Progress>
        <Progress
          percent='60'
          status='warning'
          type='lump'
          active
          border='false'
        ></Progress>
        <Progress
          percent='80'
          color={['#40a9ff', '#5cdbd3']}
          type='lump'
          cutWidth={2}
          cutColor='#389e0d'
        ></Progress>
        <Progress percent={10}></Progress>
        <Progress percent={20} status='success' lineHeight={8}></Progress>
        <Progress percent={30} status='warning' lineHeight={10}></Progress>
        <Progress percent={40} status='error' lineHeight={12}></Progress>

        <Progress percent={50}></Progress>
        <Progress percent={60} status='success' showText={false}></Progress>
        <Progress percent={70} status='warning' format={format}></Progress>
        <Progress percent={100} status='error' format={format}></Progress>

        <Progress percent={40} active></Progress>
        <Progress percent={60} active activeColor='#f12711'></Progress>
        <Progress
          percent={80}
          active
          color={['#f5af19', '#f12711', '#9254de', '#40a9ff', '#5cdbd3']}
        ></Progress>
        <Progress
          percent={100}
          color={['#f5af19', '#f12711', '#9254de', '#40a9ff', '#5cdbd3']}
          colorFlow={true}
        ></Progress>
      </div>
      <Button
        onClick={() => {
          LoadingBar.start()
        }}
      >
        开始
      </Button>
      <Button
        onClick={() => {
          LoadingBar.end()
        }}
      >
        结束
      </Button>
      <Button
        type='danger'
        onClick={() => {
          LoadingBar.error()
        }}
      >
        错误
      </Button>
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
