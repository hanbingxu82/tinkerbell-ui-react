/*
 * @Author: your name
 * @Date: 2022-04-21 10:32:22
 * @LastEditTime: 2022-04-22 16:05:44
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/DatePicker/utils/index.ts
 */
import DateUtils from '../../../utils/date'

const weeks = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
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
const weeksChinese = {
  sun: '日',
  mon: '一',
  tue: '二',
  wed: '三',
  thu: '四',
  fri: '五',
  sat: '六'
}
const monthChinese = {
  month1: '1 月',
  month2: '2 月',
  month3: '3 月',
  month4: '4 月',
  month5: '5 月',
  month6: '6 月',
  month7: '7 月',
  month8: '8 月',
  month9: '9 月',
  month10: '10 月',
  month11: '11 月',
  month12: '12 月'
}
const monthsChinese = {
  jan: '一月',
  feb: '二月',
  mar: '三月',
  apr: '四月',
  may: '五月',
  jun: '六月',
  jul: '七月',
  aug: '八月',
  sep: '九月',
  oct: '十月',
  nov: '十一月',
  dec: '十二月'
}
DateUtils.i18n = {
  dayNamesShort: weeks.map((week) => weeksChinese[week]),
  dayNames: weeks.map((week) => weeksChinese[week]),
  monthNamesShort: months.map((month) => monthsChinese[month]),
  monthNames: months.map((_month, index) => monthChinese[`month${index + 1}`])
}

const newArray = function (start: any, end: number) {
  let result = []
  for (let i = start; i <= end; i++) {
    result.push(i)
  }
  return result
}

export const equalDate = function (
  dateA: string | number | Date,
  dateB: string | number | Date
) {
  return (
    dateA === dateB || new Date(dateA).getTime() === new Date(dateB).getTime()
  )
}

export const toDate = function (date: string | number | Date | any) {
  return isDate(date) ? new Date(date) : null
}

export const isDate = function (
  date: string | number | Date | null | undefined
) {
  if (date === null || date === undefined) return false
  if (isNaN(new Date(date).getTime())) return false
  return true
}

export const formatDate = function (
  date: Date | null,
  format?: string | undefined
) {
  date = toDate(date)
  if (!date) return ''
  return DateUtils.format(date, format || 'yyyy-MM-dd')
}

export const parseDate = function (string: string, format: string) {
  return DateUtils.parse(string, format || 'yyyy-MM-dd')
}

export const getDayCountOfMonth = function (year: number, month: number) {
  if (month === 3 || month === 5 || month === 8 || month === 10) {
    return 30
  }

  if (month === 1) {
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
      return 29
    } else {
      return 28
    }
  }

  return 31
}

export const getFirstDayOfMonth = function (date: Date) {
  const temp = new Date(date.getTime())
  temp.setDate(1)
  return temp.getDay()
}

export const DAY_DURATION = 86400000

// return date corresponding to the first cell on datetable
export const getStartDateOfMonth = function (
  year: number,
  month: number,
  offsetWeek = 0
) {
  const result = new Date(year, month, 1)
  const day = result.getDay()

  if (day === offsetWeek) {
    result.setTime(result.getTime() - DAY_DURATION * 7)
  } else {
    const offset = getOffsetToWeekOrigin(day, offsetWeek)
    result.setTime(result.getTime() - DAY_DURATION * offset)
  }

  return result
}

/**
 *
 * @export
 * @param {any} day , first day of current month, 0 - 6
 * @param {number} [offsetWeek=0, 0-6, 0 sunday, 6 saturday]
 * @returns
 */
export function getOffsetToWeekOrigin(day: number, offsetWeek = 0) {
  let offset = day >= offsetWeek ? day - offsetWeek : 7 + day - offsetWeek
  offset = offset === 0 ? 7 : offset // if the two days collide, we force 7 days padding
  return offset
}

export const getWeekNumber = function (src: any) {
  const date = new Date(src.getTime())
  date.setHours(0, 0, 0, 0)
  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7))
  // January 4 is always in week 1.
  const week1 = new Date(date.getFullYear(), 0, 4)
  // Adjust to Thursday in week 1 and count number of weeks from date to week 1.
  return (
    1 +
    Math.round(
      ((date.getTime() - week1.getTime()) / 86400000 -
        3 +
        ((week1.getDay() + 6) % 7)) /
        7
    )
  )
}

// http://stackoverflow.com/questions/16590500/javascript-calculate-date-from-week-number
export function getDateOfISOWeek(w: number, y: number) {
  var simple = new Date(y, 0, 1 + (w - 1) * 7)
  var dow = simple.getDay()
  var ISOweekStart = simple
  if (dow <= 4) ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1)
  else ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay())
  return ISOweekStart
}

export const prevMonth = function (src: {
  getFullYear: () => any
  getMonth: () => any
  getDate: () => any
  setDate: (arg0: number) => void
  setMonth: (arg0: number) => void
  setFullYear: (arg0: any) => void
  getTime: () => string | number | Date
}) {
  const year = src.getFullYear()
  const month = src.getMonth()
  const date = src.getDate()

  const newYear = month === 0 ? year - 1 : year
  const newMonth = month === 0 ? 11 : month - 1

  const newMonthDayCount = getDayCountOfMonth(newYear, newMonth)
  if (newMonthDayCount < date) {
    src.setDate(newMonthDayCount)
  }

  src.setMonth(newMonth)
  src.setFullYear(newYear)

  return new Date(src.getTime())
}

export const nextMonth = function (src: {
  getTime: () => string | number | Date
}) {
  let clone = new Date(src.getTime())
  const year = clone.getFullYear()
  const month = clone.getMonth()
  const date = clone.getDate()

  const newYear = month === 11 ? year + 1 : year
  const newMonth = month === 11 ? 0 : month + 1

  const newMonthDayCount = getDayCountOfMonth(newYear, newMonth)
  if (newMonthDayCount < date) {
    clone.setDate(newMonthDayCount)
  }

  clone.setMonth(newMonth)
  clone.setFullYear(newYear)
  return clone
}

export const getRangeHours = function (ranges: any) {
  const hours = []
  let disabledHours: any[] = []
  ;(ranges || []).forEach((range: any[]) => {
    const value = range.map((date: { getHours: () => any }) => date.getHours())

    disabledHours = disabledHours.concat(newArray(value[0], value[1]))
  })

  if (disabledHours.length) {
    for (let i = 0; i < 24; i++) {
      hours[i] = disabledHours.indexOf(i) === -1
    }
  } else {
    for (let i = 0; i < 24; i++) {
      hours[i] = false
    }
  }

  return hours
}

export const limitRange = function (
  date: number,
  ranges: any[],
  format = 'yyyy-MM-dd HH:mm:ss'
) {
  if (!ranges || !ranges.length) return date

  const len = ranges.length

  date = DateUtils.parse(DateUtils.format(date, format), format)
  for (let i = 0; i < len; i++) {
    const range = ranges[i]
    if (date >= range[0] && date <= range[1]) {
      return date
    }
  }

  let maxDate = ranges[0][0]
  let minDate = ranges[0][0]

  ranges.forEach((range: number[]) => {
    minDate = new Date(Math.min(range[0], minDate))
    maxDate = new Date(Math.max(range[1], maxDate))
  })

  return date < minDate ? minDate : maxDate
}

export function hasClass(
  target: { classList: { contains: (arg0: any) => any } },
  classname: string
) {
  return target.classList.contains(classname)
}

export const SELECTION_MODES = {
  YEAR: 'year',
  MONTH: 'month',
  WEEK: 'week',
  DAY: 'day',
  RANGE: 'range'
}

export function deconstructDate(date: {
  getFullYear: () => any
  getMonth: () => any
}) {
  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    week: getWeekNumber(date)
  }
}
