/*
 * @Author: your name
 * @Date: 2021-12-13 14:52:54
 * @LastEditTime: 2022-03-07 16:28:03
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/example/src/App.tsx
 */
import React, { useState } from 'react'
import './index.css'
import {
  // Calendar,
  Button,
  Badge,
  Avatar,
  Backtop
} from 'tinkerbell-ui-react'
import 'tinkerbell-ui-react/dist/index.css'

const App = () => {
  const [a, setA] = useState(false)
  const fits = ['fill', 'contain', 'cover', 'none', 'scale-down']
  const url =
    'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'

  return (
    <div>
      {fits.map((fit: any) => {
        return (
          <div className='block' key={fit}>
            <span className='title'>{fit}</span>
            <Avatar shape='square' size='100' fit={fit} src={url}></Avatar>
          </div>
        )
      })}
      <Backtop bottom='100' right='30'></Backtop>
      <Backtop bottom='60' right='30' text="你好"></Backtop>
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
      <div className='xiaoxiannan' style={{ height: 3000 }}></div>
    </div>
  )
}

export default App
