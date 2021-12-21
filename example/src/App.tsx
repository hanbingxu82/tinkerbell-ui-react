/*
 * @Author: your name
 * @Date: 2021-12-13 14:52:54
 * @LastEditTime: 2021-12-21 16:53:40
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /hxreact/example/src/App.tsx
 */
import React, { useState } from 'react'

import { ExampleComponent, Button, Icon, Row, Col } from 'hxreact'
import 'hxreact/dist/index.css'

const App = () => {
  const [loading, setLoading] = useState(false)
  return (
    <div>
      <ExampleComponent text='我是一个小仙男' />
      <Button loading={loading}>default</Button>
      <Button icon={'icon-Color-fill'}>default</Button>
      <Button
        type='primary'
        loading={loading}
        onClick={() => {
          setLoading(true)
        }}
      >
        Click me!
      </Button>
      <Icon name={'icon-Color-fill'} />

      {/* <Row>
        <Col span='24'>
          <div className='grid-content bg-purple-dark'></div>
        </Col>
      </Row>
      <Row>
        <Col span='12'>
          <div className='grid-content bg-purple'></div>
        </Col>
        <Col span='12'>
          <div className='grid-content bg-purple-light'></div>
        </Col>
      </Row>
      <Row>
        <Col span='8'>
          <div className='grid-content bg-purple'></div>
        </Col>
        <Col span='8'>
          <div className='grid-content bg-purple-light'></div>
        </Col>
        <Col span='8'>
          <div className='grid-content bg-purple'></div>
        </Col>
      </Row>
      <Row>
        <Col span='6'>
          <div className='grid-content bg-purple'></div>
        </Col>
        <Col span='6'>
          <div className='grid-content bg-purple-light'></div>
        </Col>
        <Col span='6'>
          <div className='grid-content bg-purple'></div>
        </Col>
        <Col span='6'>
          <div className='grid-content bg-purple-light'></div>
        </Col>
      </Row>
      <Row>
        <Col span='4'>
          <div className='grid-content bg-purple'></div>
        </Col>
        <Col span='4'>
          <div className='grid-content bg-purple-light'></div>
        </Col>
        <Col span='4'>
          <div className='grid-content bg-purple'></div>
        </Col>
        <Col span='4'>
          <div className='grid-content bg-purple-light'></div>
        </Col>
        <Col span='4'>
          <div className='grid-content bg-purple'></div>
        </Col>
        <Col span='4'>
          <div className='grid-content bg-purple-light'></div>
        </Col>
      </Row> */}
      {/* <Row gutter='20'>
        <Col span='6'>
          <div className='grid-content bg-purple'></div>
        </Col>
        <Col span='6'>
          <div className='grid-content bg-purple'></div>
        </Col>
        <Col span='6'>
          <div className='grid-content bg-purple'></div>
        </Col>
        <Col span='6'>
          <div className='grid-content bg-purple'></div>
        </Col>
      </Row> */}


      <Row gutter='10'>
        <Col xs='8' sm='6' md='4' lg='3' xl='1'>
          <div className='grid-content bg-purple'></div>
        </Col>
        <Col xs='4' sm='6' md='8' lg='9' xl='11'>
          <div className='grid-content bg-purple-light'></div>
        </Col>
        <Col xs='4' sm='6' md='8' lg='9' xl='11'>
          <div className='grid-content bg-purple'></div>
        </Col>
        <Col xs='8' sm='6' md='4' lg='3' xl='1'>
          <div className='grid-content bg-purple-light'></div>
        </Col>
      </Row>
    </div>
  )
}

export default App
