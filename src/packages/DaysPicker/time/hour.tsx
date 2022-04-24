/*
 * @Author: your name
 * @Date: 2022-04-24 10:11:24
 * @LastEditTime: 2022-04-24 16:23:17
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/DaysPicker/time/hour.tsx
 */
// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import { getTimeList, ListItem, hourProps } from './interface'
import './index.scss'

const HourPage = (props: hourProps) => {
  const { active, change, year, month, day, limit } = props
  const [list, setList] = useState(
    getTimeList(23, year, month, day, active, 0, limit)
  )
  function activeChange(params: ListItem) {
    console.log(params)
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
          className={`datepicker-hour-item ${
            item.value === active ? 'datepicker-hour-active' : ''
          }`}
        >
          {item.label}
        </span>
      )
    })
  }

  // 时间变化监听
  useEffect(() => {
    let newList = getTimeList(23, year, month, day, active, 0, limit)
    let checkList = newList.filter((item) => {
      return item.value === active
    })
    if (checkList.length < 1 && newList.length > 0) {
      activeChange(newList[0])
    }
    setList(newList)
  }, [year, month, day, active]) // eslint-disable-line

  return <div className='datepicker-hour'>{renderList()}</div>
}

export default HourPage
