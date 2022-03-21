/*
 * @Author: your name
 * @Date: 2022-02-25 14:35:11
 * @LastEditTime: 2022-03-21 13:59:23
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/example/src/index.tsx
 */
import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
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
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}></Route>
      <Route path='about' element={<About />} />
      <Route path='inbox' element={<Inbox />}></Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
)
