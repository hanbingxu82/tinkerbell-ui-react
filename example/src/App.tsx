/*
 * @Author: your name
 * @Date: 2021-12-13 14:52:54
 * @LastEditTime: 2022-02-24 15:25:38
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /hxreact/example/src/App.tsx
 */
import React, { useState, useEffect, useLayoutEffect } from 'react'
import ReactDOM from 'react-dom'
import { Button, CheckBox, CheckBoxGroup, Row, Col ,Tag} from 'hxreact'
import 'hxreact/dist/index.css'

const plainOptions = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange' }
]

const App = () => {
  // const [radioValue, setRadioValue] = useState('Orange')
  let value = 'demo1'
  let buttonName = 'submit'
  const [checkedList, setCheckedList] = useState<any>([])
  const [indeterminate, setIndeterminate] = useState(false)
  const [checkAll, setCheckAll] = useState(false)
  // const [a, setA] = useState<any>([])

  const onChange = (list: any) => {
    setCheckedList([...list])
    setIndeterminate(!!list.length && list.length < plainOptions.length)
    setCheckAll(list.length === plainOptions.length)
  }
  const onCheckAllChange = (e: any) => {
    setCheckedList(e.target.checked ? ['Apple', 'Pear', 'Orange'] : [])
    setIndeterminate(false)
    setCheckAll(e.target.checked)
  }
  useEffect(() => {}, [])

  useLayoutEffect(() => {
    ReactDOM.render(
      <div>
        <span>{value}</span>
        <button>{buttonName}</button>
      </div>,
      document.querySelector('.xiaoxiannan')
    )
  })

  return (
    <div>
      <Tag>123</Tag>



      <CheckBox
        indeterminate={indeterminate}
        onChange={onCheckAllChange}
        checked={checkAll}
      >
        Check all
      </CheckBox>
      <CheckBoxGroup value={checkedList} onChange={onChange}>
        <Row>
          <Col>
            <CheckBox value='Apple'>Apple</CheckBox>
          </Col>
        </Row>
        <Row>
          <Col>
            <CheckBox value='Pear'>Pear</CheckBox>
          </Col>
        </Row>
        <Row>
          <Col>
            <CheckBox value='Orange'>Orange</CheckBox>
          </Col>
        </Row>
      </CheckBoxGroup>
      <Button icon={'icon-Color-fill'}>default</Button>

      <div className='xiaoxiannan'></div>
    </div>
  )
}

export default App
