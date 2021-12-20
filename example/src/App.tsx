/*
 * @Author: your name
 * @Date: 2021-12-13 14:52:54
 * @LastEditTime: 2021-12-20 10:39:12
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /hxreact/example/src/App.tsx
 */
import React, { useState } from 'react'

import { ExampleComponent, Button, Icon } from 'hxreact'
import 'hxreact/dist/index.css'

const App = () => {
  const [loading, setLoading] = useState(false)
  return (
    <div>
      <ExampleComponent text='我是一个小仙男' />
      <Button loading={loading}>default</Button>
      <Button icon={'icon-color-fill'}>default</Button>
      <Button
        type='primary'
        loading={loading}
        onClick={() => {
          setLoading(true)
        }}
      >
        Click me!
      </Button>
      <Icon name={'icon-color-fill'} />
    </div>
  )
}

export default App
