/*
 * @Author: your name
 * @Date: 2022-04-24 10:11:24
 * @LastEditTime: 2022-05-16 16:09:16
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/DaysPicker/index.tsx
 */
// eslint-disable-next-line
import React, { useState, useEffect, useRef } from 'react'
import './index.scss'
import { getNewParams, DatePickerProps } from './interface'
import { listenForOutsideClicks } from '../Select/somewhere'
import HourPage from './time/hour'
import MinutePage from './time/minute'
// import SecondPage from './time/second';
import DayPage from './date/day'
import MonthPage from './date/month'
import YearPage from './date/year'
import { ListItem as TimeItemT } from './time/interface'
import { dayItem, monthItem } from './date/interface'

let initNewParam = getNewParams('')
const DatePicker = (props: DatePickerProps) => {
  const rootRef: any = useRef(null)
  const { value, onChange, defaultValue, type = '', size = 'default' } = props
  const limit = props.limit === undefined ? false : props.limit
  const placeholder = props.placeholder || '请选择日期'
  const disabled = props.disabled === undefined ? false : props.disabled
  // value
  const [year, setYear] = useState(initNewParam.year)
  const [month, setMonth] = useState(initNewParam.month)
  const [day, setDay] = useState(initNewParam.day)
  const [hour, setHour] = useState(initNewParam.hour)
  const [minute, setMinute] = useState(initNewParam.minute)
  // const [, setSecond] = useState(0)
  // 最终值
  const [inputValue, setInputValue] = useState(initNewParam.value)
  // label
  const [yearLabel, setYearLabel] = useState(initNewParam.yearLabel)
  const [, setMonthLabel] = useState(initNewParam.monthLabel)
  const [, setDayLabel] = useState(initNewParam.dayLabel)
  const [hourLabel, setHourLabel] = useState(initNewParam.hourLabel)
  const [minuteLabel, setMinuteLabel] = useState(initNewParam.minuteLabel)
  // const [, setSecondLabel] = useState('00')
  // visible
  const [plate, setPlate] = useState(3) // 板块状态 1:年，2：月，3：日
  const [visible, setVisible] = useState(false)
  const [listening, setListening] = useState(false)
  // disbled
  const [monthLeft] = useState(false)
  const [monthRight] = useState(false)
  const [yearLeft] = useState(false)
  const [yearRight] = useState(false)
  // ref
  const monthRef = useRef()
  const yearRef = useRef()
  // 强制更新视图方法 start
  // const [, updateState] = useState<any>()
  // const forceUpdate = useCallback(() => updateState({}), [])
  // 强制更新视图方法 end

  // change 板块变化
  function plateChange(value: number) {
    setPlate(value)
  }

  // change 年
  function yearChange(params: monthItem) {
    setYear(params.value)
    setYearLabel(params.label)
  }
  // change 月
  function monthChange(params: monthItem, type: number) {
    setMonth(params.value)
    setMonthLabel(params.label)

    let yearParam = {
      value: year,
      label: '',
      disabled: false
    }
    switch (type) {
      case 1:
        yearParam.value = year + 1
        yearParam.label = `${year + 1}`
        yearChange(yearParam)
        break
      case 2:
        yearParam.value = year - 1
        yearParam.label = `${year - 1}`
        yearChange(yearParam)
        break
      default:
    }
  }

  // change 日
  function dayChange(params: dayItem) {
    setDay(params.value)
    setDayLabel(params.label)
  }
  // change 时
  function hourChange(params: TimeItemT) {
    setHour(params.value)
    setHourLabel(params.label)
  }
  // change 分
  function minuteChange(params: TimeItemT) {
    setMinute(params.value)
    setMinuteLabel(params.label)
  }
  // change 秒
  // function secondChange(params: TimeItemT) {
  //   setSecond(params.value)
  //   setSecondLabel(params.label)
  // }
  // console.log(secondChange)
  // fn 定位当前时间
  function setNewTime(time: string) {
    setYear(getNewParams(time).year)
    setMonth(getNewParams(time).month)
    setDay(getNewParams(time).day)
    setHour(getNewParams(time).hour)
    setMinute(getNewParams(time).minute)
    setYearLabel(getNewParams(time).yearLabel)
    setMonthLabel(getNewParams(time).monthLabel)
    setDayLabel(getNewParams(time).dayLabel)
    setHourLabel(getNewParams(time).hourLabel)
    setMinuteLabel(getNewParams(time).minuteLabel)
  }
  // fn 定位时间是否过期需要刷新
  function checkTimeOut() {
    if (!visible || value === '') return
    let oldDate = new Date(value).getTime()
    let newDate = getNewParams('').timeStamp
    if (oldDate < newDate) setNewTime('')
  }
  // change 时间拼接
  useEffect(() => {
    let newMonth = month < 10 ? '0' + month : month
    let newDay = day < 10 ? `0${day}` : `${day}`
    console.log(`${year}-${newMonth}-${newDay} ${hourLabel}:${minuteLabel}`)
    if (type === 'date') {
      setInputValue(`${year}-${newMonth}-${newDay}`)
      onChange(`${year}-${newMonth}-${newDay}`)
    } else if (type === 'time') {
      setInputValue(`${hourLabel}:${minuteLabel}`)
      onChange(`${hourLabel}:${minuteLabel}`)
    } else if (type === 'dateTime') {
      setInputValue(`${year}-${newMonth}-${newDay} ${hourLabel}:${minuteLabel}`)
      onChange(`${year}-${newMonth}-${newDay} ${hourLabel}:${minuteLabel}`)
    } else {
      setInputValue(`${year}-${newMonth}-${newDay}`)
      onChange(`${year}-${newMonth}-${newDay}`)
    }
  }, [year, month, day, hour, minute])// eslint-disable-line

  // 默认值设置
  useEffect(() => {
    setNewTime(defaultValue ? defaultValue : value)
  }, [value])// eslint-disable-line
  // 每次打开恢复默认状态
  useEffect(() => {
    if (visible) {
      checkTimeOut()
      setPlate(3) // 恢复默认状态
    }
  }, [visible])// eslint-disable-line
  // useEffect(() => {
  //   if (value) {
  //     forceUpdate()
  //   }
  // }, [value])
  useEffect(
    listenForOutsideClicks(listening, setListening, rootRef, setVisible)
  )
  return (
    <div ref={rootRef} className='datepicker'>
      <div
        onClick={() => {
          if (disabled) return
          setVisible(true)
        }}
        className={`datepicker-input ${
          visible ? 'datepicker-input-focus' : ''
        }${disabled ? ' datepicker-disabled ' : ''}
		    is-${size}`}
      >
        <input
          placeholder={placeholder}
          type='text'
          value={inputValue}
          readOnly
        />
        <span className='iconfont icon-calendar'></span>
      </div>
      <div
        onClick={() => {
          setVisible(false)
        }}
        style={{ display: visible ? '' : 'none' }}
        className='datepicker-bg'
      ></div>
      <div
        className='datepicker-plate'
        // width: '394px',
        style={{ display: visible ? 'block' : '' }}
      >
        {/* 主板块 */}
        <div className='datepicker-session'>
          {/* 日期板块 */}
          {type === 'date' || type === 'dateTime' || type === '' ? (
            <div className='datepicker-date'>
              {/* 年/月切换 */}
              <div className='datepicker-date-head'>
                <div className='datepicker-date-head-item'>
                  <span
                    onClick={() => {
                      ;(yearRef as any).current.reduceFn()
                    }}
                    className={`iconfont icon-double-arrow-left ${
                      yearLeft ? 'datepicker-date-head-disabled' : ''
                    }`}
                  ></span>
                  <span
                    className={`iconfont icon-arrow-left ${
                      monthLeft ? 'datepicker-date-head-disabled' : ''
                    }`}
                    onClick={() => {
                      ;(monthRef as any).current.reduceFn()
                    }}
                  ></span>
                </div>
                <div className='datepicker-date-head-title'>
                  <span
                    onClick={() => {
                      setPlate(1)
                    }}
                  >
                    {yearLabel}年
                  </span>
                  <span
                    onClick={() => {
                      setPlate(2)
                    }}
                  >
                    {month}月
                  </span>
                </div>
                <div className='datepicker-date-head-item'>
                  <span
                    onClick={() => {
                      ;(monthRef as any).current.addFn()
                    }}
                    className={`iconfont icon-arrow-right ${
                      monthRight ? 'datepicker-date-head-disabled' : ''
                    }`}
                  ></span>
                  <span
                    onClick={() => {
                      ;(yearRef as any).current.addFn()
                    }}
                    className={`iconfont icon-double-arro-right " ${
                      yearRight ? 'datepicker-date-head-disabled' : ''
                    }`}
                  ></span>
                </div>
              </div>
              {/* 日期列表 */}
              <div className='datepicker-date-list'>
                <YearPage
                  ref={yearRef}
                  change={yearChange}
                  active={year}
                  visible={plate === 1}
                  plateChange={plateChange}
                  limit={limit}
                />
                <MonthPage
                  ref={monthRef}
                  change={monthChange}
                  year={year}
                  active={month}
                  visible={plate === 2}
                  plateChange={plateChange}
                  limit={limit}
                />
                <DayPage
                  monthRef={monthRef}
                  change={dayChange}
                  year={year}
                  month={month}
                  active={day}
                  visible={plate === 3}
                  show={visible}
                  limit={limit}
                />
              </div>
            </div>
          ) : null}

          {/* 时间板块 */}
          {type === 'time' || type === 'dateTime' ? (
            <div className='datepicker-time'>
              <div className='datepicker-time-head'>
                {hourLabel}:{minuteLabel}
                {/* :{secondLabel} */}
              </div>
              {/*  */}
              <div className='datepicker-time-session'>
                <HourPage
                  active={hour}
                  year={year}
                  month={month}
                  day={day}
                  change={hourChange}
                  limit={limit}
                />
                <MinutePage
                  active={minute}
                  year={year}
                  month={month}
                  day={day}
                  hour={hour}
                  change={minuteChange}
                  limit={limit}
                />
                {/* <SecondPage
							  active={second}
							  change={secondChange}
						  /> */}
              </div>
            </div>
          ) : null}
        </div>
        {/* 底部 */}
        <div className='datepicker-footer'>
          <span
            onClick={() => {
              setNewTime('')
              setVisible(false)
            }}
            className='datepicker-footer-new'
          >
            此刻
          </span>
          <span
            onClick={() => {
              setVisible(false)
            }}
            className='datepicker-footer-submit'
          >
            确定
          </span>
        </div>
      </div>
    </div>
  )
}

export default DatePicker
