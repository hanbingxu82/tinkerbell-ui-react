/*
 * @Author: your name
 * @Date: 2022-04-21 10:35:04
 * @LastEditTime: 2022-04-21 15:09:56
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/DatePicker/basic/MonthTable.tsx
 */
import React from 'react'
// import { PropTypes, Component } from '../../../libs';
import { hasClass, deconstructDate, SELECTION_MODES } from '../utils'
// import Locale from '../../locale'
const classnames = require('classnames')
const PropTypes = require('prop-types')

const MonthTable = (props: any) => {
  const months = [
    'jan',
    'feb',
    'mar',
    'apr',
    'may',
    'jun',
    'jul',
    'aug',
    'sep',
    'oct',
    'nov',
    'dec'
  ]
  function getCellStyle(month: any) {
    const { date, disabledDate, value } = props
    const style: any = {}
    const ndate = new Date(date)
    ndate.setMonth(month)
    // in the element repo, you could see the original code that only disable current month only when all days contains in this month are disabled
    // which i don't think is a good design, so i changed disabledDate callback with an additional type param to solve this kind issue.
    // so the caller can handle different picker views on each switch arm condition.
    style.disabled =
      typeof disabledDate === 'function' &&
      disabledDate(ndate, SELECTION_MODES.MONTH)
    style.current = value && deconstructDate(value).month === month
    return style
  }
  function handleMonthTableClick(event: any) {
    const target = event.target
    if (target.tagName !== 'A') return
    if (hasClass(target.parentNode, 'disabled')) return
    const column = target.parentNode.cellIndex
    const row = target.parentNode.parentNode.rowIndex
    const month = row * 4 + column

    props.onPick(month)
  }

  return (
    <table onClick={handleMonthTableClick} className='el-month-table'>
      <tbody>
        {months
          .map((key, idx) => {
            return (
              <td className={classnames(getCellStyle(idx))} key={idx}>
                <a className='cell'>{months[key]}</a>
              </td>
            )
          })
          .reduce((col:any, item) => {
            let tararr
            if (!(Array.isArray(col[0]) && col[0].length !== 4)) {
              col.unshift([])
            }
            tararr = col[0]
            tararr.push(item)
            return col
          }, [])
          .reverse()
          .map((e: React.ReactNode, idx: string | number | null | undefined) => (
            <tr key={idx}>{e}</tr>
          ))}
      </tbody>
    </table>
  )
}

MonthTable.propTypes = {
  // current date, specific to view
  date: PropTypes.instanceOf(Date).isRequired,
  // user picked value, value: Date|null
  value: PropTypes.instanceOf(Date),
  onPick: PropTypes.func.isRequired,
  // (Date)=>boolean
  disabledDate: PropTypes.func
}
