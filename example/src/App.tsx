/*
 * @Author: your name
 * @Date: 2021-12-13 14:52:54
 * @LastEditTime: 2022-02-08 16:42:06
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /hxreact/example/src/App.tsx
 */
import React, { useState, useEffect, useLayoutEffect } from 'react'
import ReactDOM from 'react-dom'
import { Button, Container, RadioGroup } from 'hxreact'
import 'hxreact/dist/index.css'

const App = () => {
  const [radioValue, setRadioValue] = useState('Orange')
  let value = 'demo1'
  let buttonName = 'submit'
  const [radioOptions, setRadioOptions] = useState<any>([])

  useEffect(() => {
    setTimeout(() => {
      setRadioOptions([
        { label: 'Apple', value: 'Apple' },
        { label: 'Pear', value: 'Pear' },
        { label: 'Orange', value: 'Orange', disabled: true }
      ])
    }, 2000)
  }, [])
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
      <RadioGroup
        name='tinkerbell'
        options={radioOptions}
        value={radioValue}
        onChange={(e: any) => {
          setRadioValue(e.target.value)
        }}
      >
        {/* <Radio type='danger' value={1}>
          小仙男
        </Radio>
        <Radio type='danger' value={2}>
          小仙女
        </Radio> */}
      </RadioGroup>

      <Button
        onClick={() => {
          setRadioValue('Orange')
        }}
        icon={'icon-Color-fill'}
      >
        default
      </Button>
      <Container>
        <div className='xiaoxiannan'>123</div>
        <span>456</span>
      </Container>
    </div>
  )
}

export default App
