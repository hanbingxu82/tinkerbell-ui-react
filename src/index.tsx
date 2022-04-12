/*
 * @Author: your name
 * @Date: 2021-12-13 14:52:54
 * @LastEditTime: 2022-04-12 15:03:28
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/index.tsx
//  */

import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'

import * as React from 'react'
import './index.css'
import './styles.css'
import './style/global.scss'
import Button from './packages/Button'
import Icon from './packages/Icon'
import Row from './packages/Row'
import Col from './packages/Col'
import Link from './packages/Link'
import Container from './packages/Container'
import Radio from './packages/Radio'
import RadioGroup from './packages/RadioGroup'
import RadioButton from './packages/RadioButton'
import CheckBox from './packages/CheckBox'
import CheckBoxGroup from './packages/CheckBoxGroup'
import Tag from './packages/Tag'
import Showmore from './packages/Showmore'
import Divider from './packages/Divider'
import Badge from './packages/Badge'
import Avatar from './packages/Avatar'
import Backtop from './packages/Backtop'
import Card from './packages/Card'
import PageHeader from './packages/PageHeader'
import Rate from './packages/Rate'
import Breadcrumb from './packages/Breadcrumb'
import BreadcrumbItem from './packages/BreadcrumbItem'
import LoadingBar from './packages/LoadingBar'
import Alert from './packages/Alert'
import Progress from './packages/Progress'
import Switch from './packages/Switch'
import TimeLine from './packages/TimeLine'
import TimeLineItem from './packages/TimeLineItem'
import Message from './packages/Message'
import Notification from './packages/Notification'
import Step from './packages/Step'
import Steps from './packages/Steps'
import Upload from './packages/Upload/Upload'
import TabPane from './packages/TabPane'
import Tabs from './packages/Tabs'
import Popover from './packages/Popover'
import Dialog from './packages/Dialog'
import Input from './packages/Input'
import InputNumber from './packages/InputNumber'
import MessageBox from './packages/MessageBox'

// start 2022-03-01 暂时屏蔽 因打包体积过大
import Carousel from './packages/Carousel'
import Calendar from './packages/Calendar'
import InputColor, { ColorPicker } from './packages/ColorPicker'
import Tooltip from './packages/Tooltip'
// end 2022-03-01 暂时屏蔽 因打包体积过大

interface Props {
  text: string
}

const ExampleComponent = ({ text }: Props) => {
  return <div className='test'>Example Component: {text}</div>
}

export {
  ExampleComponent,
  Button,
  Icon,
  Row,
  Col,
  Link,
  Container,
  Radio,
  RadioGroup,
  RadioButton,
  CheckBox,
  CheckBoxGroup,
  Tag,
  Showmore,
  Divider,
  Badge,
  // start 2022-03-01 暂时屏蔽 因打包体积过大
  Calendar,
  InputColor,
  ColorPicker,
  Tooltip,
  Carousel,
  // end 2022-03-01 暂时屏蔽 因打包体积过大,
  Avatar,
  Backtop,
  Card,
  PageHeader,
  Rate,
  Breadcrumb,
  BreadcrumbItem,
  LoadingBar,
  Alert,
  Progress,
  Switch,
  TimeLine,
  TimeLineItem,
  Message,
  Notification,
  Steps,
  Step,
  Upload,
  TabPane,
  Tabs,
  Popover,
  Dialog,
  Input,
  InputNumber,
  MessageBox
}




const About: React.FC<any> = () => {
  let navigate = useNavigate()
  return (
    <h3
      onClick={() => {
        navigate('/Inbox')
      }}
    >
      About
    </h3>
  )
}

const Inbox: React.FC<any> = () => {
  return (
    <div>
      <h2>Inbox</h2>
      {'Welcome to your Inbox'}
    </div>
  )
}
ReactDOM.render(
  // <React.StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}></Route>
      <Route path='about' element={<About />} />
      <Route path='inbox' element={<Inbox />}></Route>
    </Routes>
  </BrowserRouter>,
  // </React.StrictMode>
  document.getElementById('root')
)
