/*
 * @Author: your name
 * @Date: 2022-03-01 13:59:38
 * @LastEditTime: 2023-07-13 15:28:45
 * @LastEditors: hanbingxu
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/Calendar/index.tsx
 */
/* eslint-disable */
import React, { useState } from 'react'
import Icon from '../Icon'
import './index.scss'

const Calendar = (props: any) => {
  //每月多少天
  let MONTH_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  const WEEK_NAMES = ['日', '一', '二', '三', '四', '五', '六']
  const LINES = [1, 2, 3, 4, 5, 6]
  const [year, setLoinsYear] = useState(0)
  // 确保初始为 当前月
  const [month, seLoinstMonth] = useState(new Date().getMonth())
  const [currentDate] = useState(new Date())
  const [tag, setTag] = useState(false)
  const [activeBox, setActiveBox] = useState(getNowFormatDate())
  //获取当前月份
  const getMonth = (date: Date): number => {
    return date.getMonth()
  }
  //获取当前年份
  const getFullYear = (date: Date): number => {
    // console.log(date.getFullYear())
    return date.getFullYear()
  }

  const getCurrentMonthDays = (month: number, year: number): number => {
    let _year = year + currentDate.getFullYear()
    if ((_year % 100 != 0 && _year % 4 == 0) || _year % 400 == 0) {
      MONTH_DAYS = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    }
    return MONTH_DAYS[month]
  }
  //当前月第一天是周几
  const getDateByYearMonth = (
    year: number,
    month: number,
    day: number = 1
  ): Date => {
    var date = new Date()
    date.setFullYear(year)
    date.setMonth(month, day)
    return date
  }
  const getWeeksByFirstDay = (year: number, month: number): number => {
    var date = getDateByYearMonth(year, month)
    return date.getDay()
  }
  // 点击格子事件
  function handleClick(time: any) {
    setActiveBox(time.sj)
    props.onClick && props.onClick(time)
  }
  const getDayText = (
    line: number,
    weekIndex: number,
    weekDay: number,
    monthDays: number
  ): any => {
    // 天数
    var number = line * 7 + weekIndex - weekDay + 1
    // 总共要用到的格子数量 然后 /7向上取整 抓到总共要用多少行
    if (
      Math.ceil((number + weekDay) / 7) > Math.ceil((monthDays + weekDay) / 7)
    ) {
      return
    }
    if (number <= 0 || number > monthDays) {
      return (
        <div className='day-c' key={weekIndex}>
          <div className='day'></div>
        </div>
      )
    }
    // 判断当前的年月日时分秒然后给其设置 对应状态
    let _year = year + currentDate.getFullYear()
    let _month = currentDate.getMonth() + 1
    let _day = currentDate.getDate()

    return (
      <div
        className={`day-c ${
          activeBox ==
          year +
            currentDate.getFullYear() +
            '-' +
            formatNumber(month) +
            '-' +
            formatDayNumber(number)
            ? 'is-active'
            : ''
        }`}
        key={weekIndex}
        onClick={() => {
          handleClick({
            sj: `${year + currentDate.getFullYear()}-${formatNumber(
              month
            )}-${formatDayNumber(number)}`,
            y: year + currentDate.getFullYear(),
            m: month,
            d: number
          })
        }}
      >
        <div
          className={`day ${
            _year == year + currentDate.getFullYear() &&
            _month == month + 1 &&
            _day == number
              ? 'is-current'
              : ''
          }`}
        >
          {number}
        </div>
        <div className='desc'>
          {props.dateCellRender &&
            props.dateCellRender({
              sj: `${year + currentDate.getFullYear()}-${formatNumber(
                month
              )}-${formatDayNumber(number)}`,
              y: year + currentDate.getFullYear(),
              m: month,
              d: number
            })}
        </div>
      </div>
    )
  }
  // 日期格式化函数 yyyy-mm-dd
  function getNowFormatDate() {
    var date = props.defaultValue ? new Date(props.defaultValue) : new Date()
    var seperator1 = '-'
    var year = date.getFullYear()
    var month: any = date.getMonth() + 1
    var strDate: any = date.getDate()
    if (month >= 1 && month <= 9) {
      month = '0' + month
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = '0' + strDate
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate
    return currentdate
  }
  const setCurrentYearMonth = (date: Date) => {
    var month = getMonth(date)
    var year = getFullYear(date)
    setLoinsYear(year)
    seLoinstMonth(month)
    setTag(false)
  }

  const monthChange = (monthChanged: number) => {
    if (tag) {
      return
    } else {
      setTag(true)
    }

    var monthAfter = month + monthChanged
    var date = getDateByYearMonth(year, monthAfter)
    setCurrentYearMonth(date)
  }
  function formatNumber(num: number): string {
    var _num = num + 1
    return _num < 10 ? `0${_num}` : `${_num}`
  }
  function formatDayNumber(num: number): string {
    return num < 10 ? `0${num}` : `${num}`
  }

  // let monthDays = getCurrentMonthDays(month);
  let weekDay = getWeeksByFirstDay(year, month)

  let _startX = 0
  return (
    <React.Fragment>
      <div
        className='tb-calendar'
        onTouchEnd={(val) => {
          if (_startX > val.changedTouches[0]['clientX'] + 30) {
            monthChange(1)
          }
          if (_startX < val.changedTouches[0]['clientX'] - 30) {
            monthChange(-1)
          }
        }}
        onTouchStart={(val) => {
          _startX = val.changedTouches[0]['clientX']
        }}
      >
        <div className='tb-calendar-tabbar'>
          <div>
            <Icon
              name='icon-arrow-left'
              size='30'
              color='#1089ff'
              onClick={() => {
                monthChange(-1)
              }}
            ></Icon>
          </div>
          <div className='tb-calendar-title'>
            {year + currentDate.getFullYear()} 年 {formatNumber(month)}月
          </div>
          <div>
            <Icon
              name='icon-arrow-right'
              size='30'
              color='#1089ff'
              onClick={() => {
                monthChange(1)
              }}
            ></Icon>
          </div>
        </div>
        {WEEK_NAMES.map((week, key) => {
          return (
            <div className='title-c' key={key}>
              {week}
            </div>
          )
        })}
        {LINES.map((_l, key) => {
          return (
            <div key={key} className='day-content'>
              {WEEK_NAMES.map((_week, index) => {
                return getDayText(
                  key,
                  index,
                  weekDay,
                  getCurrentMonthDays(month, year)
                )
              })}
            </div>
          )
        })}
      </div>
    </React.Fragment>
  )
}
export default Calendar
