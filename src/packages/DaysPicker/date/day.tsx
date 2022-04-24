/*
 * @Author: your name
 * @Date: 2022-04-24 10:11:23
 * @LastEditTime: 2022-04-24 16:22:31
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/DaysPicker/date/day.tsx
 */
// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import {
  getDayList,
  weekList,
  dayProps,
  dayItem,
  checkDisabled
} from './interface'
import './index.scss'
import { getNewParams } from '../interface'

let keydownStatic: number = -1
let activeStatic: number = -1
let listStatic: Array<dayItem> = []

const DayPage = (props: dayProps) => {
  const { year, month, active, change, visible, monthRef, show, limit } = props
  const [list, setList] = useState(getDayList(year, month, 0, limit))
  const [keydown, setKeydown] = useState(-1)
  //render head
  function renderHead() {
    return weekList.map((item) => {
      return <span key={item}>{item}</span>
    })
  }
  function activeChange(params: dayItem) {
    if (!params.disabled) {
      change(params)
      setKeydown(-1)
    }
    if (params.next) monthRef.current.addFn()
    if (params.prev) monthRef.current.reduceFn()
  }
  // render List
  function renderList() {
    return list.map((item, index) => {
      return (
        <span
          onClick={() => {
            activeChange(item)
          }}
          className={`datepicker-day-itembg ${
            item.disabled ? 'datepicker-day-disabled' : ''
          }`}
          key={index}
        >
          <span
            className={`datepicker-day-item ${
              active === item.value && !item.prev && !item.next
                ? 'datepicker-day-active'
                : ''
            }${item.prev || item.next ? 'datepicker-day-noNews' : ''}${
              index === keydown ? 'datepicker-day-keydown' : ''
            }
						`}
          >
            {item.label}
          </span>
        </span>
      )
    })
  }
  // 上下键移动选择fn
  function keyChecked(e: { key: string }) {
    if (
      'ArrowUp,ArrowDown,ArrowLeft,ArrowRight,Enter'.includes(e.key) === false
    )
      return
    let index = findActiveToKey()
    switch (e.key) {
      case 'ArrowUp':
        keydownUp(index)
        break
      case 'ArrowDown':
        keydownDown(index)
        break
      case 'ArrowLeft':
        keydownLeft(index)
        break
      case 'ArrowRight':
        keydownRight(index)
        break
      case 'Enter':
        if (index !== -1 && !listStatic[index].disabled) {
          activeChange(listStatic[index])
          setKeydown(-1)
        }
        break
      default:
        break
    }
  }
  // 定位key
  function findActiveToKey() {
    if (keydownStatic !== -1) return keydownStatic
    for (let i = 0; i < listStatic.length; i++) {
      if (
        activeStatic === listStatic[i].value &&
        !listStatic[i].prev &&
        !listStatic[i].next
      ) {
        setKeydown(i)
        return i
      }
    }
    return 0
    // left
  }
  // 定位key-left
  function keydownLeft(index: number) {
    switch (index) {
      case 0:
        monthRef.current.reduceFn()
        break
      default:
        if (!listStatic[index - 1].disabled) {
          setKeydown(index - 1)
        }
    }
  }
  // 定位key-right
  function keydownRight(index: number) {
    switch (index) {
      case 41:
        monthRef.current.addFn()
        break
      default:
        setKeydown(index + 1)
    }
  }
  // 定位key-up
  function keydownUp(index: number) {
    if (index > 6) {
      if (!listStatic[index - 7].disabled) {
        setKeydown(index - 7)
      }
    } else {
      monthRef.current.reduceFn()
    }
  }
  // 定位key-down
  function keydownDown(index: number) {
    if (index < 35) {
      setKeydown(index + 7)
    } else {
      // let checkList = listStatic.filter((item) => {
      // 	return item.prev === true;
      // });
      // setKeydown(checkList.length);
      monthRef.current.addFn()
    }
  }
  // 换页-定位keydown
  function monthToKeyDown(arr: Array<dayItem>) {
    if (listStatic.length < 1 || keydown === -1) return
    let item: dayItem = listStatic[keydown]
    try {
      if (item.next) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].value === item.value) {
            return setKeydown(i)
          }
        }
      } else {
        for (let i = arr.length - 1; i < 0; i--) {
          if (arr[i].value === item.value) {
            return setKeydown(i)
          }
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  // 月份变更定位
  function monthToDay(newList: Array<dayItem>) {
    let checkList = newList.filter((item) => {
      return item.value === active && !item.next && !item.prev
    })
    if (checkList.length < 1) {
      for (let i = 0; i < newList.length; i++) {
        if (!newList[i].disabled && !newList[i].prev) {
          activeChange(newList[i])
          break
        }
      }
      return
    }
    if (checkDisabled(year, month, active) && active < getNewParams('').day) {
      for (let i = 0; i < newList.length; i++) {
        if (!newList[i].disabled && !newList[i].next) {
          activeChange(newList[i])
          break
        }
      }
    }
  }
  // keydown
  useEffect(() => {
    activeStatic = active
  }, [active])
  // keydown
  useEffect(() => {
    monthToKeyDown(list)
    listStatic = list
  }, [list]) // eslint-disable-line
  // keydown
  useEffect(() => {
    keydownStatic = keydown
  }, [keydown]) // eslint-disable-line
  // 按键监听
  useEffect(() => {
    document.onkeydown = show && visible ? keyChecked : null
    if (!visible || !show) setKeydown(-1)
    return () => {
      document.onkeydown = null
    }
  }, [show, visible]) // eslint-disable-line
  // 时间变化监听
  useEffect(() => {
    let newList = getDayList(year, month, 0, limit)
    monthToDay(newList)
    setList(newList)
  }, [year, month]) // eslint-disable-line
  return (
    <div className='datepicker-day' style={{ display: visible ? '' : 'none' }}>
      <div className='datepicker-day-head'>{renderHead()}</div>
      <div className='datepicker-day-body'>{renderList()}</div>
    </div>
  )
}

export default DayPage
