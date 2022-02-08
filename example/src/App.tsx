/*
 * @Author: your name
 * @Date: 2021-12-13 14:52:54
 * @LastEditTime: 2022-02-08 11:17:05
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /hxreact/example/src/App.tsx
 */
import React, { useState, useLayoutEffect } from 'react'
import ReactDOM from 'react-dom'
import { Button, Container, Radio } from 'hxreact'
import 'hxreact/dist/index.css'

const App = () => {
  const [radioValue, setRadioValue] = useState(false)
  let value = 'demo1'
  let buttonName = 'submit'
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
      <Radio
        type='danger'
        value={radioValue}
        onChange={() => {
          setRadioValue(() => !radioValue)
        }}
      >
        小仙男
      </Radio>
      <Button
        onClick={() => {
          setRadioValue(!radioValue)
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
