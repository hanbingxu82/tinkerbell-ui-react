/*
 * @Author: your name
 * @Date: 2022-04-24 10:11:23
 * @LastEditTime: 2022-04-24 16:23:00
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/DaysPicker/date/year.tsx
 */
// eslint-disable-next-line
import React, {
  useState,
  // useEffect,
  useImperativeHandle,
  forwardRef
} from 'react'
import { getYearList, monthItem, yearProps } from './interface'

const YearPage = (props: yearProps, ref: any) => {
  const { visible, active, change, plateChange, limit } = props
  const [list, setList] = useState(getYearList(active, limit))
  function activeChange(params: monthItem, isPlate: boolean = true) {
    if (!params.disabled) {
      change(params)
      if (isPlate) plateChange(3)
    }
  }
  // 减少
  function reduceFn() {
    let param: monthItem = list[0]
    for (let i = 0; i < list.length; i++) {
      if (list[i].value === active) {
        if (i === 0) {
          // 上一页
          let nextList = getYearList(active - 9, limit)
          setList(nextList)
          param = nextList[nextList.length - 1]
        } else {
          param = list[i - 1]
        }
        break
      }
    }
    console.log(param)
    activeChange(param, false)
  }
  // 增加
  function addFn() {
    let param: monthItem = list[0]
    for (let i = 0; i < list.length; i++) {
      if (list[i].value === active) {
        if (i === list.length - 1) {
          // 上一页
          let nextList = getYearList(active + 4, limit)
          setList(nextList)
          param = nextList[0]
        } else {
          param = list[i + 1]
        }
        break
      }
    }
    activeChange(param, false)
  }
  // render List
  function renderList() {
    return list.map((item, index) => {
      return (
        <span className='datepicker-month-itembg' key={index}>
          <span
            onClick={() => {
              activeChange(item, true)
            }}
            className={`datepicker-month-item ${
              item.disabled ? 'datepicker-month-disabled' : ''
            }
						${active === item.value ? 'datepicker-month-active' : ''}
					`}
          >
            {item.label}
          </span>
        </span>
      )
    })
  }
  useImperativeHandle(ref, () => ({
    reduceFn: reduceFn,
    addFn: addFn
  }))
  return (
    <div
      className='datepicker-month'
      style={{ display: visible ? '' : 'none' }}
    >
      {renderList()}
    </div>
  )
}
export default forwardRef(YearPage)
