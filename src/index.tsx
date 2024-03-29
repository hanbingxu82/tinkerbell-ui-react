/*
 * @Author: your name
 * @Date: 2021-12-13 14:52:54
 * @LastEditTime: 2022-11-14 14:50:01
 * @LastEditors: hanbingxu
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/index.tsx
 */

import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { routers } from './router/index'
import { createRoot } from 'react-dom/client'
// import Home from './views/Home'

// eslint-disable-next-line
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
import Aside from './packages/Aside'
import Header from './packages/Header'
import Main from './packages/Main'
import Footer from './packages/Footer'
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
import Select from './packages/Select'
import DaysPicker from './packages/DaysPicker'
import Cascader from './packages/Cascader'
import Menu from './packages/Menu'
import SubMenu from './packages/Menu/SubMenu'
import MenuItem from './packages/Menu/MenuItem'
import MenuItemGroup from './packages/Menu/MenuItemGroup'
import Form from './packages/Form/Form'
import Table from './packages/Table/index'
import Pagination from './packages/Pagination/index'

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
  Aside,
  Header,
  Footer,
  Main,
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
  MessageBox,
  Select,
  DaysPicker,
  Cascader,
  Menu,
  SubMenu,
  MenuItem,
  MenuItemGroup,
  Form,
  Table,
  Pagination
}

const container = document.getElementById('root')
const root = createRoot(container)
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Navigate to='/Guide' />} />
      {routers.map((item: any) => {
        return (
          <Route key={item.path} path={item.path} element={<item.component />}>
            {item.children.map((childItem: any) => {
              return (
                <Route
                  key={childItem.path}
                  path={childItem.path}
                  element={<childItem.component />}
                ></Route>
              )
            })}
          </Route>
        )
      })}
    </Routes>
  </BrowserRouter>
)
