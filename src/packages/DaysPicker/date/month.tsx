/*
 * @Author: your name
 * @Date: 2022-04-24 10:11:23
 * @LastEditTime: 2022-04-24 16:23:06
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/DaysPicker/date/month.tsx
 */
// eslint-disable-next-line
import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef
} from 'react'
import { getMonthList, monthItem, monthProps } from './interface'

const MonthPage = (props: monthProps, ref:any) => {
  const { visible, active, change, year, plateChange, limit } = props
  const [list, setList] = useState(getMonthList(year, limit))
  // change
  function activeChange(
    params: monthItem,
    type: number,
    isPlate: boolean = true
  ) {
    if (!params.disabled || type !== 0) {
      change(params, type)
      if (isPlate) plateChange(3)
    }
  }
  // 减少
  function reduceFn() {
    let param: monthItem = list[0]
    for (let i = 0; i < list.length; i++) {
      if (active === 1) {
        let nextList = getMonthList(year - 1, limit)
        // setList(nextList);
        param = nextList[nextList.length - 1]
      } else {
        param = list[active - 2]
      }
    }
    activeChange(param, 0, false)
  }
  // 增加
  function addFn() {
    let index = active < 12 ? active : 0
    activeChange(list[index], active === 12 ? 1 : 0, false)
  }
  // render List
  function renderList() {
    return list.map((item, index) => {
      return (
        <span className='datepicker-month-itembg' key={index}>
          <span
            onClick={() => {
              activeChange(item, 0, true)
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
  // 时间变化监听
  useEffect(() => {
    let newList = getMonthList(year, limit)
    try {
      if (newList[active - 1].disabled) {
        for (let i = 0; i < newList.length; i++) {
          if (!newList[i].disabled) {
            activeChange(newList[i], 0, false)
            break
          }
        }
      }
    } catch (error) {
      console.log(error)
    }
    setList(newList)
  }, [year]) // eslint-disable-line
  return (
    <div
      className='datepicker-month'
      style={{ display: visible ? '' : 'none' }}
    >
      {renderList()}
    </div>
  )
}

export default forwardRef(MonthPage)
