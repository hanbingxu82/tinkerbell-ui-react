/*
 * @Author: your name
 * @Date: 2021-12-13 14:52:54
 * @LastEditTime: 2022-03-04 11:51:58
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/example/src/App.tsx
 */
import React from 'react'

import {
  // Calendar,
  Button,
  Showmore,
  Divider
} from 'tinkerbell-ui-react'
import 'tinkerbell-ui-react/dist/index.css'

const App = () => {
  return (
    <div>
      Text
      <Divider type='vertical' />
      <a href='#java'>Link</a>
      <Divider type='vertical' />
      <a href='#java'>Link</a>
      <br></br>
      <Button>123123</Button>
      <div>展开</div>
      <div>
        <Showmore
          len={10}
          text='文本超出显示长度，折叠起来，通过len属性显示从何处开始折叠'
        ></Showmore>
      </div>

      <div>
        <Showmore
          allowFold
          len={10}
          showText='show'
          hiddenText='hidden'
          text='文本超出显示长度，折叠起来，通过len属性显示从何处开始折叠'
        ></Showmore>
      </div>
      <div className='xiaoxiannan'></div>
    </div>
  )
}

export default App
