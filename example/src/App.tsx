/*
 * @Author: your name
 * @Date: 2021-12-13 14:52:54
 * @LastEditTime: 2022-03-10 11:41:20
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/example/src/App.tsx
 */
import React, { CSSProperties } from 'react'
import './index.css'
import {
  // Calendar,
  Button,
  Badge,
  Backtop,
  Carousel,
  RadioGroup,
  RadioButton
} from 'tinkerbell-ui-react'
import 'tinkerbell-ui-react/dist/index.css'

const App = () => {
  // const [a, setA] = useState(false)
  const c = React.useRef<any>(null)

  const contentStyle: CSSProperties = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79'
  }
  const [dotPosition, setDotPosition] = React.useState('top')

  const handlePositionChange = ({ target: { value } }: any) => {
    setDotPosition(value)
  }

  return (
    <div>
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
      <Carousel dotPosition={dotPosition}>
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>
      <Carousel autoplay>
        <div>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
      </Carousel>
      <Carousel ref={c} effect='fade'>
        <div>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
      </Carousel>
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
