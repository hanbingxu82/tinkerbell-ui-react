/*
 * @Author: your name
 * @Date: 2022-03-15 16:54:55
 * @LastEditTime: 2022-06-10 17:35:28
 * @LastEditors: 韩旭小天才 905583741@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/Card/index.tsx
 */
// eslint-disable-next-line
import React, { useEffect } from 'react'
import './index.scss'
const classnames = require('classnames')

interface Iprops {
  header: any
  bodyStyle: any
  shadow: string
}
function Card(props: any) {
  const { header, bodyStyle = {}, shadow }: Iprops = props
  // 类似于 componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    // 使用浏览器API更新文档标题
    document.title = `You clicked count times`
    console.log(shadow)
  }, [])// eslint-disable-line
  return (
    <div
      className={[
        'tb-card',
        classnames({
          'is-always-shadow': !shadow,
          ['is-' + shadow + '-shadow']: shadow
        })
      ].join(' ')}
    >
      {header && <div className='tb-card__header'>{header}</div>}
      <div className='tb-card__body' style={bodyStyle}>
        {props.children}
      </div>
    </div>
  )
}
export default Card
