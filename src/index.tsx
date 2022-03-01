/*
 * @Author: your name
 * @Date: 2021-12-13 14:52:54
 * @LastEditTime: 2022-03-01 14:05:54
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/index.tsx
 */
import * as React from 'react'
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
import Calendar from './packages/Calendar'
// start 2022-03-01 暂时屏蔽 因打包体积过大
// import InputColor, { ColorPicker } from './packages/ColorPicker'
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
  Calendar
  // start 2022-03-01 暂时屏蔽 因打包体积过大
  // InputColor,
  // ColorPicker
  // end 2022-03-01 暂时屏蔽 因打包体积过大
}
