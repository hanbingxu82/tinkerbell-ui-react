/*
 * @Author: your name
 * @Date: 2021-12-13 14:52:54
 * @LastEditTime: 2022-03-01 09:41:13
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/example/src/App.tsx
 */
import React, { useState, useEffect, useLayoutEffect } from 'react'
import ReactDOM from 'react-dom'
import {
  Button,
  CheckBox,
  CheckBoxGroup,
  Row,
  Col,
  Tag,
  InputColor
} from 'tinkerbell-ui-react'
import 'tinkerbell-ui-react/dist/index.css'

const plainOptions = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange' }
]

const App = () => {
  // const [radioValue, setRadioValue] = useState('Orange')
  const [initial, setInitial] = useState('#5e72e4')
  const [color, setColor] = useState<any>({})
  let value = 'demo1'
  let buttonName = 'submit'
  const [checkedList, setCheckedList] = useState<any>([])
  const [indeterminate, setIndeterminate] = useState(false)
  const [checkAll, setCheckAll] = useState(false)
  // const [a, setA] = useState<any>([])
  const [count, setCount] = useState(0)
  const [dynamicTags, setDynamicTags] = useState(['标签一', '标签二', '标签三'])

  function handleCloseTag(tag: any) {
    dynamicTags.splice(dynamicTags.indexOf(tag), 1)
    setDynamicTags([...dynamicTags])
  }
  function addOne() {
    setCount(count + 1)
    dynamicTags.push('new tag' + (count + 1))
  }
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
      <div>
        <div
          style={{
            width: 50,
            height: 50,
            marginBottom: 20,
            backgroundColor: color.rgba
          }}
        >
          {color.rgba}
        </div>
        <input
          type='color'
          value={initial}
          onChange={(e) => {
            setColor({ ...color, hex: e.target.value })
            setInitial(e.target.value)
          }}
        />
        <br />
        <InputColor
          initialValue={initial}
          onChange={(e: any) => {
            setColor(e)
          }}
        />
      </div>
      <Button className='button-new-tag' size='small' onClick={addOne}>
        + New Tag
      </Button>
      <p>
        {dynamicTags.map((item: any) => {
          return (
            <Tag
              key={item}
              closable
              onClose={() => {
                handleCloseTag(item)
              }}
            >
              {item}
            </Tag>
          )
        })}
      </p>

      <br></br>
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
