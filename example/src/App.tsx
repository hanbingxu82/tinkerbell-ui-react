/*
 * @Author: your name
 * @Date: 2021-12-13 14:52:54
 * @LastEditTime: 2022-03-04 16:12:42
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/example/src/App.tsx
 */
import React, { useState } from 'react'
import './index.css'
import {
  // Calendar,
  Button,
  Badge
} from 'tinkerbell-ui-react'
import 'tinkerbell-ui-react/dist/index.css'

const App = () => {
  const [a, setA] = useState(false)
  return (
    <div>
      <Badge value={12} style={{ margin: 30 }}>
        <Button>普通按钮</Button>
      </Badge>
      <Badge value={3} style={{ margin: 30 }}>
        <Button>回复</Button>
      </Badge>
      <Badge value={1} style={{ margin: 30 }} type='primary'>
        <Button>primary徽标</Button>
      </Badge>
      <Badge value={2} style={{ margin: 30 }} type='warning'>
        <Button>warning徽标</Button>
      </Badge>
      <Badge value={200} max={99} hidden={a} style={{ margin: 30 }}>
        <Button>最大数值</Button>
      </Badge>
      <div onClick={() => setA(!a)}>123123</div>

      <Badge value='hot' style={{ margin: 30 }}>
        <Button>热点</Button>
      </Badge>
      <Badge value='new' style={{ margin: 30 }}>
        <Button>回复</Button>
      </Badge>
      <Badge isDot style={{ margin: 30 }}>
        红点模式
      </Badge>
      <div className='xiaoxiannan'></div>
    </div>
  )
}

export default App
