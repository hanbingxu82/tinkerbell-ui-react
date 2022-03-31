/*
 * @Author: your name
 * @Date: 2022-03-28 11:17:51
 * @LastEditTime: 2022-03-30 17:21:42
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/App.tsx
 */

import React, { useEffect, useState } from 'react'

import './index.css'
import {
  Button,
  Breadcrumb,
  BreadcrumbItem,
  LoadingBar,
  Progress,
  Switch,
  Alert,
  Message,
  Notification,
  Steps,
  Step
} from './packages'
// import 'tinkerbell-ui-react/dist/index.css'
import { useNavigate } from 'react-router-dom'
const App = (props: any) => {
  const navigate = useNavigate()
  const c = React.useRef<any>(null)
  const to = (path: string) => {
    navigate(path, { replace: true })
  }
  const [value, setValue] = useState(false)
  const [active, setActive] = useState(0)
  useEffect(() => {}, [])
  function format(percent: number) {
    if (percent === 100) {
      return '^_^'
    }
    return 'QAQ'
  }
  function open() {
    Notification({
      title: '标题名称',
      message:
        '这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案'
    })
    // Notification({
    //   title: '提示',
    //   message: '这是一条不会自动关闭的消息',
    //   duration: 0
    // })
  }
  function next() {
    let activeNum = active + 1
    if (activeNum > 3) {
      activeNum = 0
    }
    setActive(activeNum)
  }
  function open2() {
    Message({
      message: '警告哦，这是一条警告消息',
      type: 'warning',
      showClose: true
    })
  }

  function open3() {
    Message('这是一条消息提示')
  }

  function open4() {
    Message.error('错了哦，这是一条错误消息')
  }
  return (
    <div>
      <Steps space={200} active={active} finishStatus='success'>
        <Step title='步骤 1'></Step>
        <Step title='步骤 2'></Step>
        <Step title='步骤 3'></Step>
      </Steps>

      <Button onClick={() => next()}>下一步</Button>
      <br />
      <Steps space={100} active={1} finishStatus="success">
      <Steps.Step title="已完成"></Steps.Step>
      <Steps.Step title="进行中"></Steps.Step>
      <Steps.Step title="步骤 3"></Steps.Step>
    </Steps>
    <Steps space={200} active={1}>
      <Steps.Step title="步骤 1" description="这是一段很长很长很长的描述性文字"></Steps.Step>
      <Steps.Step title="步骤 2" description="这是一段很长很长很长的描述性文字"></Steps.Step>
      <Steps.Step title="步骤 3" description="这是一段很长很长很长的描述性文字"></Steps.Step>
    </Steps>

    <Steps space={100} active={1}>
      <Steps.Step title="步骤 1" icon="icon-rmb1"></Steps.Step>
      <Steps.Step title="步骤 2" icon="icon-feed-logo-fill"></Steps.Step>
      <Steps.Step title="步骤 3" icon="icon-home-fill"></Steps.Step>
    </Steps>

    <Steps space={100} direction="vertical" active={1}>
      <Steps.Step title="步骤 1"></Steps.Step>
      <Steps.Step title="步骤 2"></Steps.Step>
      <Steps.Step title="步骤 3"></Steps.Step>
    </Steps>
      <Button plain={true} onClick={open}>
        成功
      </Button>
      <Button plain={true} onClick={open2}>
        警告
      </Button>
      <Button plain={true} onClick={open3}>
        消息
      </Button>
      <Button plain={true} onClick={open4}>
        错误
      </Button>

      <Alert type='success' showIcon>
        123
      </Alert>
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
          active={true}
          border={false}
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

        <Progress percent={40} active={true}></Progress>
        <Progress percent={60} active={true} activeColor='#f12711'></Progress>
        <Progress
          percent={80}
          active={true}
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
          Message('这是一条消息提示')
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
