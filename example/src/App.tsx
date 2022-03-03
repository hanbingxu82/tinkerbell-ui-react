/*
 * @Author: your name
 * @Date: 2021-12-13 14:52:54
 * @LastEditTime: 2022-03-03 09:09:38
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/example/src/App.tsx
 */
import React from 'react'

import {
  // Calendar,
  Button,
  Tooltip
} from 'tinkerbell-ui-react'
import 'tinkerbell-ui-react/dist/index.css'
const text = <span>prompt text</span>

const buttonWidth = 70
const App = () => {
  // function getListData(value: any) {
  //   let listData
  //   switch (value.d) {
  //     case 8:
  //       listData = [
  //         { type: 'warning', content: 'This is warning event.' },
  //         { type: 'success', content: 'This is usual event.' }
  //       ]
  //       break
  //     case 10:
  //       listData = [
  //         { type: 'warning', content: 'This is warning event.' },
  //         { type: 'success', content: 'This is usual event.' },
  //         { type: 'error', content: 'This is error event.' }
  //       ]
  //       break
  //     case 15:
  //       listData = [
  //         { type: 'warning', content: 'This is warning event' },
  //         { type: 'success', content: 'This is very long usual event。。....' },
  //         { type: 'error', content: 'This is error event 1.' },
  //         { type: 'error', content: 'This is error event 2.' },
  //         { type: 'error', content: 'This is error event 3.' },
  //         { type: 'error', content: 'This is error event 4.' }
  //       ]
  //       break
  //     default:
  //   }
  //   return listData || []
  // }

  // function dateCellRender(value: any) {
  //   const listData = getListData(value)
  //   return (
  //     <ul className='events'>
  //       {listData.map((item) => (
  //         <li key={item.content}>
  //           <Button type={item.type}>{item.content}</Button>
  //         </li>
  //       ))}
  //     </ul>
  //   )
  // }
  return (
    <div>
      <Tooltip  placement='topLeft' title='Prompt Text'>
        <Button>Align edge / 边缘对齐</Button>
      </Tooltip>
      <Tooltip placement='topLeft' title='Prompt Text' arrowPointAtCenter>
        <Button>Arrow points to center / 箭头指向中心</Button>
      </Tooltip>

      <Tooltip title='prompt text'>
        <span>Tooltip will show on mouse enter.</span>
      </Tooltip>

      <div className='demo'>
        <div style={{ marginLeft: buttonWidth, whiteSpace: 'nowrap' }}>
          <Tooltip type="success"  placement='topLeft' title={text}>
            <Button>TL</Button>
          </Tooltip>
          <Tooltip type="success"  placement='top' title={text}>
            <Button>Top</Button>
          </Tooltip>
          <Tooltip type="success"  placement='topRight' title={text}>
            <Button>TR</Button>
          </Tooltip>
        </div>
        <div style={{ width: buttonWidth, float: 'left' }}>
          <Tooltip type="danger"  placement='leftTop' title={text}>
            <Button>LT</Button>
          </Tooltip>
          <Tooltip type="info"  placement='left' title={text}>
            <Button>Left</Button>
          </Tooltip>
          <Tooltip type="warning"  placement='leftBottom' title={text}>
            <Button>LB</Button>
          </Tooltip>
        </div>
        <div style={{ width: buttonWidth, marginLeft: buttonWidth * 4 + 24 }}>
          <Tooltip type="primary"  placement='rightTop' title={text}>
            <Button>RT</Button>
          </Tooltip>
          <Tooltip type="success"  placement='right' title={text}>
            <Button>Right</Button>
          </Tooltip>
          <Tooltip type="success"  placement='rightBottom' title={text}>
            <Button>RB</Button>
          </Tooltip>
        </div>
        <div
          style={{
            marginLeft: buttonWidth,
            clear: 'both',
            whiteSpace: 'nowrap'
          }}
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
      </div>
      <br></br>

      <div className='xiaoxiannan'></div>
    </div>
  )
}

export default App
