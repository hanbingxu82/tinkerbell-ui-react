/*
 * @Author: your name
 * @Date: 2021-12-13 14:52:54
 * @LastEditTime: 2021-12-16 09:15:04
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /hxreact/example/src/App.tsx
 */
import React from 'react'

import { ExampleComponent, Button, Icon } from 'hxreact'
import 'hxreact/dist/index.css'

const App = () => {
  return (
    <div>
      <ExampleComponent text='我是一个小仙男' />
      <Button>123</Button>
      <Button type='primary'>Primary</Button>
      <Button type='success'>Success</Button>
      <Button type='info'>Info</Button>
      <Button type='warning'>Warning</Button>
      <Button type='danger'>Danger</Button>
      <Icon name='icon-color-fill' size='10'></Icon>
    </div>
  )
}

export default App
