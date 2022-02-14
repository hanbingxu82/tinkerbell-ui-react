/*
 * @Author: your name
 * @Date: 2021-12-13 14:52:54
 * @LastEditTime: 2022-02-11 17:27:10
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /hxreact/example/src/App.tsx
 */
import React, { useState, useEffect, useLayoutEffect } from 'react'
import ReactDOM from 'react-dom'
import { Button, CheckBox, CheckBoxGroup } from 'hxreact'
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
      <CheckBox
        indeterminate={indeterminate}
        onChange={onCheckAllChange}
        checked={checkAll}
      >
        Check all
      </CheckBox>
      <CheckBoxGroup
        options={plainOptions}
        value={checkedList}
        onChange={onChange}
      />

      {/* <CheckBoxGroup
        value={a}
        onChange={(data: any) => {
          setA(data)
        }}
      >
        <CheckBox value='1'>1</CheckBox>
        <CheckBox value='2'>2</CheckBox>
        <CheckBox value='3' disabled>
          3
        </CheckBox>
      </CheckBoxGroup> */}

      <Button icon={'icon-Color-fill'}>default</Button>

      <div className='xiaoxiannan'></div>
    </div>
  )
}

export default App
