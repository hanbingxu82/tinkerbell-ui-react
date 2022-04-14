/*
 * @Author: your name
 * @Date: 2022-03-28 11:17:51
 * @LastEditTime: 2022-04-14 15:22:33
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/App.tsx
 */

import React, { useEffect, useRef, useState } from 'react'

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
  Step,
  Upload,
  Tabs,
  Icon,
  Popover,
  Tooltip,
  Dialog,
  Input,
  InputNumber,
  MessageBox,
  Select
} from './packages'
// import 'tinkerbell-ui-react/dist/index.css'
import { useNavigate } from 'react-router-dom'
const App = (props: any) => {
  const navigate = useNavigate()
  const c = React.useRef<any>(null)
  const to = (path: string) => {
    navigate(path, { replace: true })
  }
  const [file, setFile] = useState<any>(null)
  const [loadingStatus, setLoadingStatus] = useState(false)
  const [value, setValue] = useState(false)
  const [active, setActive] = useState(0)
  const [tabs, setTabs] = useState([
    {
      title: 'Tab 1',
      name: 'Tab 1',
      content: 'Tab 1 content'
    },
    {
      title: 'Tab 2',
      name: 'Tab 2',
      content: 'Tab 2 content'
    }
  ])
  const [tabIndex, setTabIndex] = useState(2)
  const content = (
    <div>
      <p>Content</p>
      <p>Content</p>
    </div>
  )
  const inputref = useRef(null)
  useEffect(() => {
    console.log(inputref)
  }, [])

  function addTab() {
    const index = tabIndex + 1

    tabs.push({
      title: 'new Tab',
      name: 'Tab ' + index,
      content: 'new Tab content'
    })
    setTabs(tabs)
    setTabIndex(index)
  }

  function removeTab(tab: any) {
    tabs.splice(tab.key.replace(/^\.\$/, ''), 1)
    setTabs(tabs)
  }
  function editTab(
    action: string,
    tab: { key: { replace: (arg0: RegExp, arg1: string) => number } }
  ) {
    if (action === 'add') {
      const index = tabIndex + 1

      tabs.push({
        title: 'new Tab',
        name: 'Tab ' + index,
        content: 'new Tab content'
      })
      setTabs(tabs)
      setTabIndex(index)
    }

    if (action === 'remove') {
      tabs.splice(tab.key.replace(/^\.\$/, ''), 1)
      setTabs(tabs)
    }
  }
  function format(percent: number) {
    if (percent === 100) {
      return '^_^'
    }
    return 'QAQ'
  }
  function handleUpload(file: any) {
    setFile(file)
    return false
  }
  function upload() {
    setLoadingStatus(true)
    setTimeout(() => {
      setFile(null)
      setLoadingStatus(false)
      Message.success('上传成功！')
    }, 1500)
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
  const text = <span>Title</span>
  const buttonWidth = 70
  const [options] = useState([
    {
      value: '选项1',
      label: '黄金糕'
    },
    {
      value: '选项2',
      label: '双皮奶'
    },
    {
      value: '选项3',
      label: '蚵仔煎'
    },
    {
      value: '选项4',
      label: '龙须面'
    },
    {
      value: '选项5',
      label: '北京烤鸭'
    }
  ])
  const [value1] = useState('')
  return (
    <div>
  

      <br />
      <Button
        type='text'
        onClick={() => {
          MessageBox.prompt('请输入邮箱', '提示', {
            inputPattern:
              /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
            inputErrorMessage: '邮箱格式不正确'
          })
            .then(({ value }: any) => {
              Message({
                type: 'success',
                message: '你的邮箱是: ' + value
              })
            })
            .catch(() => {
              Message({
                type: 'info',
                message: '取消输入'
              })
            })
        }}
      >
        点击打开 Message Box
      </Button>

      <InputNumber
        step='2'
        defaultValue={tabIndex}
        onChange={(val: number) => {
          setTabIndex(val)
        }}
        min='1'
        max='10'
      ></InputNumber>

      <InputNumber size='large' defaultValue={10}></InputNumber>
      <InputNumber defaultValue={20}></InputNumber>
      <InputNumber size='small' defaultValue={30}></InputNumber>
      <InputNumber size='mini' defaultValue={30}></InputNumber>
      <div>
        <div>
          <Input style={{ width: 200 }} placeholder='请输入内容' />
          <Input style={{ width: 200 }} disabled placeholder='请输入内容' />
          <Input
            style={{ width: 200 }}
            icon='icon-credit-level-fill'
            placeholder='请选择日期'
          />
          <Input
            style={{ width: 200 }}
            type='textarea'
            autosize={{ minRows: 2, maxRows: 4 }}
            placeholder='请输入内容'
          />
          <Input
            style={{ width: 200 }}
            type='textarea'
            autosize={true}
            placeholder='请输入内容'
          />
          <Input
            style={{ width: 200 }}
            type='textarea'
            autosize={{ minRows: 2, maxRows: 4 }}
            placeholder='请输入内容'
          />
          <Input placeholder='请输入内容' prepend='Http://' />
          <Input placeholder='请输入内容' append='.com' />

          <Input style={{ width: 200 }} placeholder='请输入内容' size='large' />
          <Input style={{ width: 200 }} placeholder='请输入内容' />
          <Input
            ref={inputref}
            style={{ width: 200 }}
            placeholder='请输入内容'
            size='small'
          />
          <Input style={{ width: 200 }} placeholder='请输入内容' size='mini' />
        </div>
        <div>
          <Button size='large'>点击打开 Dialog</Button>
          <Button>点击打开 Dialog</Button>
          <Button size='small'>点击打开 Dialog</Button>
          <Button size='mini'>点击打开 Dialog</Button>
        </div>
        <Button
          style={{ marginLeft: 20 }}
          // type='text'
          onClick={() => setValue(true)}
        >
          点击打开 Dialog
        </Button>
        <Dialog
          destroyOnClose
          title='提示'
          size='tiny'
          visible={value}
          onCancel={() => setValue(false)}
          lockScroll={false}
        >
          <Dialog.Body>
            <span>这是一段信息</span>
            <input type='text' />
          </Dialog.Body>
          <Dialog.Footer className='dialog-footer'>
            <Button onClick={() => setValue(false)}>取消</Button>
            <Button type='primary' onClick={() => setValue(false)}>
              确定
            </Button>
          </Dialog.Footer>
        </Dialog>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <br />
      <Tooltip title='prompt text'>
        <span>Tooltip will show on mouse enter.</span>
      </Tooltip>
      <Popover content={content} title='Title' trigger='hover'>
        <Button>Hover me</Button>
      </Popover>
      <Popover content={content} title='Title' trigger='focus'>
        <Button>Focus me</Button>
      </Popover>
      <Popover content={content} title='Title' trigger='click'>
        <Button>Click me</Button>
      </Popover>
      <Popover placement='topLeft' title={text} content={content}>
        <Button>Align edge / 边缘对齐</Button>
      </Popover>
      <Popover
        placement='topLeft'
        title={text}
        content={content}
        arrowPointAtCenter
      >
        <Button>Arrow points to center / 箭头指向中心</Button>
      </Popover>
      <br />
      <Popover content={content} title='Title'>
        <Button type='primary'>Hover me</Button>
      </Popover>
      <br />
      <div className='demo'>
        <div style={{ marginLeft: buttonWidth, whiteSpace: 'nowrap' }}>
          <Popover
            placement='topLeft'
            title={text}
            content={content}
            trigger='click'
          >
            <Button>TL</Button>
          </Popover>
          <Popover
            placement='top'
            title={text}
            content={content}
            trigger='click'
          >
            <Button>Top</Button>
          </Popover>
          <Popover
            placement='topRight'
            title={text}
            content={content}
            trigger='click'
          >
            <Button>TR</Button>
          </Popover>
        </div>
        <div style={{ width: buttonWidth, float: 'left' }}>
          <Popover
            placement='leftTop'
            title={text}
            content={content}
            trigger='click'
          >
            <Button>LT</Button>
          </Popover>
          <Popover
            placement='left'
            title={text}
            content={content}
            trigger='click'
          >
            <Button>Left</Button>
          </Popover>
          <Popover
            placement='leftBottom'
            title={text}
            content={content}
            trigger='click'
          >
            <Button>LB</Button>
          </Popover>
        </div>
        <div style={{ width: buttonWidth, marginLeft: buttonWidth * 4 + 24 }}>
          <Popover
            placement='rightTop'
            title={text}
            content={content}
            trigger='click'
          >
            <Button>RT</Button>
          </Popover>
          <Popover
            placement='right'
            title={text}
            content={content}
            trigger='click'
          >
            <Button>Right</Button>
          </Popover>
          <Popover
            placement='rightBottom'
            title={text}
            content={content}
            trigger='click'
          >
            <Button>RB</Button>
          </Popover>
        </div>
        <div
          style={{
            marginLeft: buttonWidth,
            clear: 'both',
            whiteSpace: 'nowrap'
          }}
        >
          <Popover
            placement='bottomLeft'
            title={text}
            content={content}
            trigger='click'
          >
            <Button>BL</Button>
          </Popover>
          <Popover
            placement='bottom'
            title={text}
            content={content}
            trigger='click'
          >
            <Button>Bottom</Button>
          </Popover>
          <Popover
            placement='bottomRight'
            title={text}
            content={content}
            trigger='click'
          >
            <Button>BR</Button>
          </Popover>
        </div>
      </div>
      <div>
        <Tabs
          type='card'
          value='Tab 2'
          editable
          onTabEdit={(action: any, tab: any) => editTab(action, tab)}
        >
          {tabs.map((item, index) => {
            return (
              <Tabs.Pane
                key={index}
                closable
                label={item.title}
                name={item.name}
              >
                {item.content}
              </Tabs.Pane>
            )
          })}
        </Tabs>
        <br />

        <div style={{ marginBottom: '20px' }}>
          <Button size='small' onClick={() => addTab()}>
            add tab
          </Button>
        </div>
        <Tabs
          type='card'
          value='Tab 2'
          onTabRemove={(tab: any) => removeTab(tab)}
        >
          {tabs.map((item, index) => {
            return (
              <Tabs.Pane
                key={index}
                closable
                label={item.title}
                name={item.name}
              >
                {item.content}
              </Tabs.Pane>
            )
          })}
        </Tabs>
      </div>
      <br />
      <br />
      <br />
      <Select value={value1} placeholder='请选择'>
        {options.map((el: any) => {
          return (
            <Select.Option key={el.value} label={el.label} value={el.value} />
          )
        })}
      </Select>

      <br />
      <br />
      <br />
      <br />

      <Tabs
        activeName='2'
        onTabClick={(tab: any) => console.log(tab.props.name)}
      >
        <Tabs.Pane label='用户管理' name='1'>
          用户管理
        </Tabs.Pane>
        <Tabs.Pane label='配置管理' name='2'>
          配置管理
        </Tabs.Pane>
        <Tabs.Pane label='角色管理' name='3'>
          角色管理
        </Tabs.Pane>
        <Tabs.Pane label='定时补偿任务' name='4'>
          定时补偿任务
        </Tabs.Pane>
      </Tabs>
      <br />

      <Tabs type='card' value='1'>
        <Tabs.Pane label='用户管理' name='1'>
          用户管理
        </Tabs.Pane>
        <Tabs.Pane label='配置管理' name='2'>
          配置管理
        </Tabs.Pane>
        <Tabs.Pane label='角色管理' name='3'>
          角色管理
        </Tabs.Pane>
        <Tabs.Pane label='定时补偿任务' name='4'>
          定时补偿任务
        </Tabs.Pane>
      </Tabs>
      <br />

      <Tabs
        type='card'
        closable
        activeName='1'
        onTabRemove={(tab: any) => console.log(tab.props.name)}
      >
        <Tabs.Pane label='用户管理' name='1'>
          用户管理
        </Tabs.Pane>
        <Tabs.Pane label='配置管理' name='2'>
          配置管理
        </Tabs.Pane>
        <Tabs.Pane label='角色管理' name='3'>
          角色管理
        </Tabs.Pane>
        <Tabs.Pane label='定时补偿任务' name='4'>
          定时补偿任务
        </Tabs.Pane>
      </Tabs>
      <br />
      <Tabs type='border-card' activeName='1'>
        <Tabs.Pane label='用户管理' name='1'>
          用户管理
        </Tabs.Pane>
        <Tabs.Pane label='配置管理' name='2'>
          配置管理
        </Tabs.Pane>
        <Tabs.Pane label='角色管理' name='3'>
          角色管理
        </Tabs.Pane>
        <Tabs.Pane label='定时补偿任务' name='4'>
          定时补偿任务
        </Tabs.Pane>
      </Tabs>
      <br />
      <Tabs type='border-card' activeName='1'>
        <Tabs.Pane
          label={
            <span>
              <Icon name='icon-credit-level-fill' /> 用户管理
            </span>
          }
          name='1'
        >
          用户管理
        </Tabs.Pane>
        <Tabs.Pane label='配置管理' name='2'>
          配置管理
        </Tabs.Pane>
        <Tabs.Pane label='角色管理' name='3'>
          角色管理
        </Tabs.Pane>
        <Tabs.Pane label='定时补偿任务' name='4'>
          定时补偿任务
        </Tabs.Pane>
      </Tabs>
      <div style={{ width: 400 }}>
        <Upload
          action='//jsonplaceholder.typicode.com/posts/'
          multiple
          type='drag'
        >
          <div
            style={{
              padding: '20px 0',
              border: '1px dashed #eee',
              cursor: 'pointer'
            }}
          >
            <p>
              <i
                className='iconfont icon-upload'
                style={{ color: '#3399ff', fontSize: '52' }}
              ></i>
            </p>
            <p>Click or drag files here to upload</p>
          </div>
        </Upload>
      </div>
      <br />
      <div style={{ width: 400 }}>
        <Upload action='//jsonplaceholder.typicode.com/posts/' multiple>
          <Button icon='icon-upload' plain type='primary'>
            点击上传
          </Button>
        </Upload>
      </div>
      <br />
      <div style={{ width: 400 }}>
        <Upload
          action='//jsonplaceholder.typicode.com/posts/'
          beforeUpload={handleUpload}
        ></Upload>
        {file !== null ? (
          <div>
            Upload file: {file.name}
            <Button type='text' onClick={upload} loading={loadingStatus}>
              {loadingStatus ? 'Uploading' : 'Click to upload'}
            </Button>
          </div>
        ) : null}
      </div>
      <br />

      <br />
      <Steps space={200} active={active} finishStatus='success'>
        <Step title='步骤 1'></Step>
        <Step title='步骤 2'></Step>
        <Step title='步骤 3'></Step>
      </Steps>

      <Button onClick={() => next()}>下一步</Button>
      <br />
      <Steps space={100} active={1} finishStatus='success'>
        <Steps.Step title='已完成'></Steps.Step>
        <Steps.Step title='进行中'></Steps.Step>
        <Steps.Step title='步骤 3'></Steps.Step>
      </Steps>
      <Steps space={200} active={1}>
        <Steps.Step
          title='步骤 1'
          description='这是一段很长很长很长的描述性文字'
        ></Steps.Step>
        <Steps.Step
          title='步骤 2'
          description='这是一段很长很长很长的描述性文字'
        ></Steps.Step>
        <Steps.Step
          title='步骤 3'
          description='这是一段很长很长很长的描述性文字'
        ></Steps.Step>
      </Steps>

      <Steps space={100} active={1}>
        <Steps.Step title='步骤 1' icon='icon-rmb1'></Steps.Step>
        <Steps.Step title='步骤 2' icon='icon-feed-logo-fill'></Steps.Step>
        <Steps.Step title='步骤 3' icon='icon-home-fill'></Steps.Step>
      </Steps>

      <Steps space={100} direction='vertical' active={1}>
        <Steps.Step title='步骤 1'></Steps.Step>
        <Steps.Step title='步骤 2'></Steps.Step>
        <Steps.Step title='步骤 3'></Steps.Step>
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
