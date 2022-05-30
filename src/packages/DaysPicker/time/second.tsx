/*
 * @Author: your name
 * @Date: 2022-04-24 10:11:24
 * @LastEditTime: 2022-05-30 18:22:40
 * @LastEditors: 韩旭小天才 905583741@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/DaysPicker/time/second.tsx
 */
// eslint-disable-next-line
import React, { useState } from 'react'
import { getSecondList, ListItem } from './interface'
import './index.scss'

const SecondPage = (props: any) => {
  const { active, change } = props
  const [list] = useState(getSecondList(59))
  function activeChange(params: ListItem) {
    change(params)
  }
  // render List
  function renderList() {
    return list.map((item, index) => {
      return (
        <span
          onClick={() => {
            activeChange(item)
          }}
          key={index}
          className={`datepicker-second-item ${
            item.value === active ? 'datepicker-second-active' : ''
          }`}
        >
          {item.label}
        </span>
      )
    })
  }

  return <div className='datepicker-second'>{renderList()}</div>
}
export default SecondPage
