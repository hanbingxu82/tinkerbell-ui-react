/*
 * @Author: your name
 * @Date: 2021-12-13 14:52:54
 * @LastEditTime: 2022-01-05 10:22:06
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /hxreact/example/src/App.tsx
 */
import React, { useState } from 'react'

import { ExampleComponent, Button, Container } from 'hxreact'
import 'hxreact/dist/index.css'

const App = () => {
  let a: any = `[[0, 0, 0, 0, 3, 0, 0, 0, 0, 0], [0, 0, 8, 1, 0, 0, 0, 0, 0, 0], [0, 0, 1, 2, 0, 0, 0, 0, 0, 0], [0, 0, 1, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]`
  a = a.substr(1).substring(-1, a.length - 3)
  a = a.split('], ')
  a = a.map((item: any) => {
    item += ']'
    item = item.substr(1).substring(-1, item.length - 2)
    return item.split(', ')
  })
  console.log(typeof undefined)
  console.log(a)
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
      <Container>
        <div>123</div>
        <span>456</span>
      </Container>
    </div>
  )
}

export default App
