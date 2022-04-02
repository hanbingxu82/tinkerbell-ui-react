/*
 * @Author: your name
 * @Date: 2022-03-28 14:04:21
 * @LastEditTime: 2022-04-01 14:43:05
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/index.tsx
 */
import * as React from 'react'
import '../index.css'
import '../styles.css'
import '../style/global.scss'
import Button from './Button'
import Icon from './Icon'
import Row from './Row'
import Col from './Col'
import Link from './Link'
import Container from './Container'
import Radio from './Radio'
import RadioGroup from './RadioGroup'
import RadioButton from './RadioButton'
import CheckBox from './CheckBox'
import CheckBoxGroup from './CheckBoxGroup'
import Tag from './Tag'
import Showmore from './Showmore'
import Divider from './Divider'
import Badge from './Badge'
import Avatar from './Avatar'
import Backtop from './Backtop'
import Card from './Card'
import PageHeader from './PageHeader'
import Rate from './Rate'
import Breadcrumb from './Breadcrumb'
import BreadcrumbItem from './BreadcrumbItem'
import LoadingBar from './LoadingBar'
import Alert from './Alert'
import Progress from './Progress'
import Switch from './Switch'
import TimeLine from './TimeLine'
import TimeLineItem from './TimeLineItem'
import Message from './Message'
import Notification from './Notification'
import Step from './Step'
import Steps from './Steps'
import Upload from './Upload/Upload'
import TabPane from './TabPane'
import Tabs from './Tabs'

// start 2022-03-01 暂时屏蔽 因打包体积过大
import Carousel from './Carousel'
import Calendar from './Calendar'
import InputColor, { ColorPicker } from './ColorPicker'
import Tooltip from './Tooltip'
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
  Tabs
}
