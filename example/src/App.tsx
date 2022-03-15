/*
 * @Author: your name
 * @Date: 2021-12-13 14:52:54
 * @LastEditTime: 2022-03-15 14:58:21
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/example/src/App.tsx
 */
import React from 'react'
import './index.css'
import {
  // Calendar,
  Button,
  Badge,
  Backtop,
  // Carousel,
  Tooltip,
  RadioGroup,
  RadioButton
} from 'tinkerbell-ui-react'
import 'tinkerbell-ui-react/dist/index.css'

const App = () => {
  // const [a, setA] = useState(false)
  const c = React.useRef<any>(null)

  const [dotPosition, setDotPosition] = React.useState('top')

  const handlePositionChange = ({ target: { value } }: any) => {
    setDotPosition(value)
  }
  const text = <span>prompt text</span>

  const buttonWidth = 70
  return (
    <div>
      <div style={{ marginLeft: buttonWidth, whiteSpace: 'nowrap' }}>
        <Tooltip placement='topLeft' color={'#f50'} title={text}>
          <Button>TL</Button>
        </Tooltip>
        <Tooltip placement='top' color={'#2db7f5'} title={text}>
          <Button>Top</Button>
        </Tooltip>
        <Tooltip placement='topRight' color={'#87d068'} title={text}>
          <Button>TR</Button>
        </Tooltip>
      </div>
      <div style={{ width: buttonWidth, float: 'left' }}>
        <Tooltip placement='leftTop' title={text}>
          <Button>LT</Button>
        </Tooltip>
        <Tooltip placement='left' title={text}>
          <Button>Left</Button>
        </Tooltip>
        <Tooltip placement='leftBottom' title={text}>
          <Button>LB</Button>
        </Tooltip>
      </div>
      <div style={{ width: buttonWidth, marginLeft: buttonWidth * 4 + 24 }}>
        <Tooltip placement='rightTop' title={text}>
          <Button>RT</Button>
        </Tooltip>
        <Tooltip placement='right' title={text}>
          <Button>Right</Button>
        </Tooltip>
        <Tooltip placement='rightBottom' title={text}>
          <Button>RB</Button>
        </Tooltip>
      </div>
      <div
        style={{ marginLeft: buttonWidth, clear: 'both', whiteSpace: 'nowrap' }}
      >
        <Tooltip placement='bottomLeft' title={text}>
          <Button>BL</Button>
        </Tooltip>
        <Tooltip placement='bottom' title={text}>
          <Button>Bottom</Button>
        </Tooltip>
        <Tooltip placement='bottomRight' title={text}>
          <Button>BR</Button>
        </Tooltip>
      </div>
      <RadioGroup
        onChange={handlePositionChange}
        value={dotPosition}
        style={{ marginBottom: 8 }}
      >
        <RadioButton value='top'>Top</RadioButton>
        <RadioButton value='bottom'>Bottom</RadioButton>
        <RadioButton value='left'>Left</RadioButton>
        <RadioButton value='right'>Right</RadioButton>
      </RadioGroup>
      ,<Backtop bottom='100' right='30'></Backtop>
      <Backtop bottom='60' right='30' text='你好'></Backtop>
      <Badge value={12} style={{ margin: 30 }}>
        <Button>普通按钮</Button>
      </Badge>
      <Badge value={3} style={{ margin: 30 }}>
        <Button>回复</Button>
      </Badge>
      <div onClick={() => c.current.next()}>123123</div>
      <div className='xiaoxiannan' style={{ height: 3000 }}></div>
    </div>
  )
}

export default App
