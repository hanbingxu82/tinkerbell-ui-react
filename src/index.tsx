/*
 * @Author: your name
 * @Date: 2021-12-13 14:52:54
 * @LastEditTime: 2021-12-16 09:23:52
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /hxreact/src/index.tsx
 */
import * as React from 'react'
import './styles.css'

import Button from './packages/Button'
import Icon from './packages/Icon'

interface Props {
  text: string
}

const ExampleComponent = ({ text }: Props) => {
  return <div className='test'>Example Component: {text}</div>
}

export { ExampleComponent, Button, Icon }
