/*
 * @Author: your name
 * @Date: 2022-04-21 10:34:56
 * @LastEditTime: 2022-04-22 11:56:40
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/DatePicker/basic/DateTable.tsx
 */
//@flow
import React, { useState } from 'react'

const classnames = require('classnames')
const PropTypes = require('prop-types')
import {
  toDate,
  getFirstDayOfMonth,
  getDayCountOfMonth,
  getWeekNumber,
  getStartDateOfMonth,
  DAY_DURATION,
  SELECTION_MODES,
  deconstructDate,
  hasClass,
  getOffsetToWeekOrigin
} from '../utils'
// import Locale from '../../locale'

// import type { DateTableProps } from '../Types'

function isFunction(func: any) {
  return typeof func === 'function'
}

const clearHours = function (time: any) {
  const cloneDate = new Date(time)
  cloneDate.setHours(0, 0, 0, 0)
  return cloneDate.getTime()
}

const _WEEKS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
const _weeks = {
  sun: '日',
  mon: '一',
  tue: '二',
  wed: '三',
  thu: '四',
  fri: '五',
  sat: '六'
}

export const DateTable: any = (props: any) => {
  let [state] = useState({
    tableRows: [[], [], [], [], [], []]
  })

  function WEEKS() {
    // 0-6
    const week = getOffsetWeek()
    return [..._WEEKS.slice(week), ..._WEEKS.slice(0, week)]
  }
  function getOffsetWeek() {
    return props.firstDayOfWeek % 7
  }

  function getStartDate() {
    const ds = deconstructDate(props.date)
    return getStartDateOfMonth(ds.year, ds.month, getOffsetWeek())
  }

  function getRows() {
    const {
      date,
      disabledDate,
      showWeekNumber,
      minDate,
      maxDate,
      selectionMode,
      firstDayOfWeek
    } = props

    const { tableRows } = state

    const ndate = new Date(date.getTime())
    let day = getFirstDayOfMonth(ndate) // day of first day
    const dateCountOfMonth = getDayCountOfMonth(
      ndate.getFullYear(),
      ndate.getMonth()
    )
    // dates count in december is always 31, so offset year is not neccessary
    const dateCountOfLastMonth = getDayCountOfMonth(
      ndate.getFullYear(),
      ndate.getMonth() === 0 ? 11 : ndate.getMonth() - 1
    )
    const offsetDaysToWeekOrigin = getOffsetToWeekOrigin(day, firstDayOfWeek)

    //tableRows: [ [], [], [], [], [], [] ]
    const rows: any = tableRows
    let count = 1
    let firstDayPosition

    const startDate = getStartDate()
    const now = clearHours(new Date())

    for (let i = 0; i < 6; i++) {
      // rows
      const row: any = rows[i]
      /*
      cell: {
        type: string, one of 'week' | 'normal'
        text: String,
        row: number,  row index,
        column: number, column index;
        inRange: boolean,
        start: boolean,
        end: boolean,
        disabled: boolean
      }
      */
      if (showWeekNumber) {
        //prepend week info to the head of each row array
        if (!row[0]) {
          row[0] = {
            type: 'week',
            text: getWeekNumber(
              new Date(startDate.getTime() + DAY_DURATION * (i * 7 + 1))
            )
          }
        }
      }

      for (let j = 0; j < 7; j++) {
        // columns
        let cell: any = row[showWeekNumber ? j + 1 : j]
        if (!cell) {
          row[showWeekNumber ? j + 1 : j] = {
            row: i,
            column: j,
            type: 'normal',
            inRange: false,
            start: false,
            end: false
          }
          cell = row[showWeekNumber ? j + 1 : j]
        }

        cell.type = 'normal'

        const index = i * 7 + j //current date offset
        const time = startDate.getTime() + DAY_DURATION * index
        cell.inRange =
          time >= clearHours(minDate) && time <= clearHours(maxDate)
        cell.start = minDate && time === clearHours(minDate)
        cell.end = maxDate && time === clearHours(maxDate)
        const isToday = time === now

        if (isToday) {
          cell.type = 'today'
        }

        if (i === 0) {
          //handle first row of date, this row only contains all or some pre-month dates
          if (j >= offsetDaysToWeekOrigin) {
            cell.text = count++
            if (count === 2) {
              firstDayPosition = i * 7 + j
            }
          } else {
            cell.text = dateCountOfLastMonth - offsetDaysToWeekOrigin + j + 1
            cell.type = 'prev-month'
          }
        } else {
          if (count <= dateCountOfMonth) {
            //in current dates
            cell.text = count++
            if (count === 2) {
              firstDayPosition = i * 7 + j
            }
          } else {
            // next month
            cell.text = count++ - dateCountOfMonth
            cell.type = 'next-month'
          }
        }

        cell.disabled =
          isFunction(disabledDate) &&
          disabledDate(new Date(time), SELECTION_MODES.DAY)
      }

      if (selectionMode === SELECTION_MODES.WEEK) {
        const start = showWeekNumber ? 1 : 0
        const end = showWeekNumber ? 7 : 6
        const isWeekActive: any = isWeekActiveFun(row[start + 1])

        row[start].inRange = isWeekActive
        row[start].start = isWeekActive
        row[end].inRange = isWeekActive
        row[end].end = isWeekActive
        row.isWeekActive = isWeekActive
      }
    }

    rows.firstDayPosition = firstDayPosition

    return rows
  }

  // calc classnames for cell
  function getCellClasses(cell: any) {
    const { selectionMode, date } = props

    let classes = []
    if ((cell.type === 'normal' || cell.type === 'today') && !cell.disabled) {
      classes.push('available')
      if (cell.type === 'today') {
        classes.push('today')
      }
    } else {
      classes.push(cell.type)
    }

    if (
      selectionMode === 'day' &&
      (cell.type === 'normal' || cell.type === 'today') &&
      // following code only highlight date that is the actuall value of the datepicker, but actually it should
      // be the temp that value use selected
      date.getDate() === +cell.text
    ) {
      // && value
      // && value.getFullYear() === date.getFullYear()
      // && value.getMonth() === date.getMonth()
      // && value.getDate() === Number(cell.text)) {
      classes.push('current')
    }

    if (
      cell.inRange &&
      (cell.type === 'normal' ||
        cell.type === 'today' ||
        selectionMode === 'week')
    ) {
      classes.push('in-range')

      if (cell.start) {
        classes.push('start-date')
      }

      if (cell.end) {
        classes.push('end-date')
      }
    }

    if (cell.disabled) {
      classes.push('disabled')
    }

    return classes.join(' ')
  }

  function getMarkedRangeRows(): any[] {
    const { showWeekNumber, minDate, selectionMode, rangeState } = props
    const rows = getRows()
    if (
      !(
        selectionMode === SELECTION_MODES.RANGE &&
        rangeState.selecting &&
        rangeState.endDate instanceof Date
      )
    )
      return rows

    const maxDate = rangeState.endDate
    for (var i = 0, k = rows.length; i < k; i++) {
      const row = rows[i]
      for (var j = 0, l = row.length; j < l; j++) {
        if (showWeekNumber && j === 0) continue

        const cell: any = row[j]
        const index = i * 7 + j + (showWeekNumber ? -1 : 0)
        const time = getStartDate().getTime() + DAY_DURATION * index

        cell.inRange =
          minDate && time >= clearHours(minDate) && time <= clearHours(maxDate)
        cell.start = minDate && time === clearHours(minDate.getTime())
        cell.end = maxDate && time === clearHours(maxDate.getTime())
      }
    }

    return rows
  }

  function isWeekActiveFun(cell: any): boolean {
    if (props.selectionMode !== SELECTION_MODES.WEEK) return false
    if (!props.value) return false

    const newDate = new Date(props.date.getTime()) // date view
    const year = newDate.getFullYear()
    const month = newDate.getMonth()

    if (cell.type === 'prev-month') {
      newDate.setMonth(month === 0 ? 11 : month - 1)
      newDate.setFullYear(month === 0 ? year - 1 : year)
    }

    if (cell.type === 'next-month') {
      newDate.setMonth(month === 11 ? 0 : month + 1)
      newDate.setFullYear(month === 11 ? year + 1 : year)
    }
    newDate.setDate(parseInt(cell.text, 10))

    return getWeekNumber(newDate) === deconstructDate(props.value).week // current date value
  }

  function handleMouseMove(event: any) {
    const { showWeekNumber, onChangeRange, rangeState, selectionMode } = props

    const getDateOfCell = (
      row: number,
      column: number,
      showWeekNumber: any
    ) => {
      const startDate = getStartDate()
      return new Date(
        startDate.getTime() +
          (row * 7 + (column - (showWeekNumber ? 1 : 0))) * DAY_DURATION
      )
    }

    if (!(selectionMode === SELECTION_MODES.RANGE && rangeState.selecting))
      return

    const target: any = event.target
    if (target.tagName !== 'TD') return

    const column = target.cellIndex
    const row = target.parentNode.rowIndex - 1

    rangeState.endDate = getDateOfCell(row, column, showWeekNumber)
    onChangeRange(rangeState)
  }

  function handleClick(event: any) {
    let target: any = event.target

    if (target.tagName !== 'TD') return
    if (hasClass(target, 'disabled') || hasClass(target, 'week')) return

    const { selectionMode, date, onPick, minDate, maxDate, rangeState } = props
    const { year, month } = deconstructDate(date)

    if (selectionMode === 'week') {
      target = target.parentNode.cells[1]
    }

    const cellIndex = target.cellIndex
    const rowIndex = target.parentNode.rowIndex - 1

    const cell: any = getRows()[rowIndex][cellIndex]
    const text = cell.text
    const className = target.className

    const newDate = new Date(year, month, 1)

    if (className.indexOf('prev') !== -1) {
      if (month === 0) {
        newDate.setFullYear(year - 1)
        newDate.setMonth(11)
      } else {
        newDate.setMonth(month - 1)
      }
    } else if (className.indexOf('next') !== -1) {
      if (month === 11) {
        newDate.setFullYear(year + 1)
        newDate.setMonth(0)
      } else {
        newDate.setMonth(month + 1)
      }
    }

    newDate.setDate(parseInt(text, 10))
    if (selectionMode === SELECTION_MODES.RANGE) {
      if (rangeState.selecting) {
        if (newDate < minDate) {
          rangeState.selecting = true
          onPick({ minDate: toDate(newDate), maxDate: null }, false)
        } else if (newDate >= minDate) {
          rangeState.selecting = false
          onPick({ minDate, maxDate: toDate(newDate) }, true)
        }
      } else {
        if ((minDate && maxDate) || !minDate) {
          // be careful about the rangeState & onPick order
          // since rangeState is a object, mutate it will make child DateTable see the
          // changes, but wont trigger a DateTable re-render. but onPick would trigger it.
          // so a reversed order may cause a bug.
          rangeState.selecting = true
          onPick({ minDate: toDate(newDate), maxDate: null }, false)
        }
      }
    } else if (
      selectionMode === SELECTION_MODES.DAY ||
      selectionMode === SELECTION_MODES.WEEK
    ) {
      onPick({ date: newDate })
    }
  }
  const { selectionMode, showWeekNumber } = props

  return (
    <table
      cellSpacing='0'
      cellPadding='0'
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      className={classnames('el-date-table', {
        'is-week-mode': selectionMode === 'week'
      })}
    >
      <tbody>
        <tr>
          {showWeekNumber && <th>{'周次'}</th>}
          {WEEKS().map((e, idx) => (
            <th key={idx}>{_weeks[e]}</th>
          ))}
        </tr>

        {getMarkedRangeRows().map((row, idx) => {
          return (
            <tr
              key={idx}
              className={classnames('el-date-table__row', {
                current: row.isWeekActive
              })}
            >
              {row.map(
                (
                  cell: { type: string; text: React.ReactNode },
                  idx: string | number | null | undefined
                ) => (
                  <td className={getCellClasses(cell)} key={idx}>
                    {cell.type === 'today' ? '今天' : cell.text}
                  </td>
                )
              )}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

DateTable.propTypes = {
  disabledDate: PropTypes.func,
  showWeekNumber: PropTypes.bool,
  //minDate, maxDate: only valid in range mode. control date's start, end info
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  selectionMode: PropTypes.oneOf(
    Object.keys(SELECTION_MODES).map((e) => SELECTION_MODES[e])
  ),
  // date view model, all visual view derive from this info
  date: PropTypes.instanceOf(Date).isRequired,
  // current date value, use picked.
  value: PropTypes.instanceOf(Date),
  /*
  (data, closePannel: boolean)=>()

    data:
      if selectionMode = range: // notify when ranges is change
        minDate: Date|null,
        maxDate: Date|null

      if selectionMode = date
        date: Date

      if selectionMode = week:
        year: number
        week: number,
        value: string,
        date: Date
  */
  onPick: PropTypes.func.isRequired,

  /*
  ({
    endDate: Date,
    selecting: boolean,
  })=>()
  */
  onChangeRange: PropTypes.func,
  rangeState: PropTypes.shape({
    endDate: PropTypes.date,
    selecting: PropTypes.bool
  }),
  firstDayOfWeek: PropTypes.range(0, 6)
}

DateTable.defaultProps = {
  selectionMode: 'day',
  firstDayOfWeek: 0
}
