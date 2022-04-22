/*
 * @Author: your name
 * @Date: 2022-04-21 10:33:35
 * @LastEditTime: 2022-04-22 15:40:31
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/DatePicker/panel/TimeSelectPanel.tsx
 */
//@flow
import React from 'react'
import { scrollIntoView } from '../../../utils/dom'

import Scrollbar from '../../Scrollbar/Sc'
import type { TimeSelectPanelProps } from '../Types'
import { PopperBase } from './PopperBase'
const PropTypes = require('prop-types')
const classnames = require('classnames')

export default class TimeSelectPanel extends PopperBase {
  state: any
  props: any
  static isValid: (
    value: any,
    {
      start,
      end,
      step,
      minTime,
      maxTime
    }: { start: any; end: any; step: any; minTime: any; maxTime: any }
  ) => boolean
  static defaultProps: {
    start: string
    end: string
    step: string
    minTime: string
    onPicked(): void
    popperMixinOption: {}
  }
  static get propTypes() {
    return Object.assign(
      {
        start: PropTypes.string,
        end: PropTypes.string,
        step: PropTypes.string,
        minTime: PropTypes.string,
        maxTime: PropTypes.string,
        value: PropTypes.string,
        onPicked: PropTypes.func,
        //(string)=>date
        dateParser: PropTypes.func.isRequired,
        //()=>HtmlElement
        getPopperRefElement: PropTypes.func,
        popperMixinOption: PropTypes.object
      },
      PopperBase.propTypes
    )
  }

  constructor(props: TimeSelectPanelProps) {
    super(props)
  }

  handleClick(item: any) {
    const { onPicked, dateParser } = this.props
    if (!item.disabled) {
      onPicked(dateParser(item.value))
    }
  }

  items(): any {
    return TimeSelectPanel.items(this.props)
  }
  static items(_props: any) {
    throw new Error('Method not implemented.')
  }

  scrollToOption(className: string = 'selected') {
    const menu = (this.refs.root as any).querySelector(
      '.el-picker-panel__content'
    )
    scrollIntoView(menu, menu.getElementsByClassName(className)[0])
  }

  componentDidMount() {
    this.scrollToOption()
  }

  componentWillReceiveProps(nextProps: any) {
    // @ts-ignore 实例
    clearTimeout(this._timer)
    if (nextProps.value !== this.props.value) {
      // @ts-ignore 实例
      this._timer = setTimeout(() => this.scrollToOption(), 0)
    }
  }
  _timer(_timer: any) {
    throw new Error('Method not implemented.')
  }

  render() {
    const { value } = this.props

    return (
      <div ref='root' className='el-picker-panel time-select'>
        <Scrollbar wrapClass='el-picker-panel__content' noresize={true}>
          {this.items().map((item: any, idx: any) => {
            return (
              <div
                key={idx}
                className={classnames('time-select-item', {
                  selected: value === item.value,
                  disabled: item.disabled
                })}
                // disabled={item.disabled}
                onClick={() => this.handleClick(item)}
              >
                {item.value}
              </div>
            )
          })}
        </Scrollbar>
      </div>
    )
  }
  classNames(
    _arg0: string,
    _arg1: { selected: boolean; disabled: any }
  ): string | undefined {
    throw new Error('Method not implemented.')
  }
}

TimeSelectPanel.isValid = (value, { start, end, step, minTime, maxTime }) => {
  const items: any = TimeSelectPanel.items({
    start,
    end,
    step,
    minTime,
    maxTime
  })
  return !!items
    .filter((e: { disabled: any }) => !e.disabled)
    .find((e: { value: any }) => e.value === value)
}

TimeSelectPanel.items = ({ start, end, step, minTime, maxTime }) => {
  const result = []

  if (start && end && step) {
    let current = start
    while (compareTime(current, end) <= 0) {
      result.push({
        value: current,
        disabled:
          compareTime(current, minTime || '-1:-1') <= 0 ||
          compareTime(current, maxTime || '100:100') >= 0
      })
      current = nextTime(current, step)
    }
  }
  return result
}

TimeSelectPanel.defaultProps = {
  start: '09:00',
  end: '18:00',
  step: '00:30',
  minTime: '',
  onPicked() {},
  popperMixinOption: {}
}

const parseTime = function (time: any) {
  const values = (time || '').split(':')
  if (values.length >= 2) {
    const hours = parseInt(values[0], 10)
    const minutes = parseInt(values[1], 10)

    return {
      hours,
      minutes
    }
  }
  /* istanbul ignore next */
  return null
}

const compareTime = function (time1: any, time2: any) {
  const value1: any = parseTime(time1)
  const value2: any = parseTime(time2)

  const minutes1 = value1.minutes + value1.hours * 60
  const minutes2 = value2.minutes + value2.hours * 60

  if (minutes1 === minutes2) {
    return 0
  }

  return minutes1 > minutes2 ? 1 : -1
}

const formatTime = function (time: { hours: React.Key; minutes: React.Key }) {
  return (
    (time.hours < 10 ? '0' + time.hours : time.hours) +
    ':' +
    (time.minutes < 10 ? '0' + time.minutes : time.minutes)
  )
}

const nextTime = function (time: any, step: any) {
  const timeValue: any = parseTime(time)
  const stepValue: any = parseTime(step)

  const next: any = {
    hours: timeValue.hours,
    minutes: timeValue.minutes
  }

  next.minutes += stepValue.minutes
  next.hours += stepValue.hours

  next.hours += Math.floor(next.minutes / 60)
  next.minutes = next.minutes % 60

  return formatTime(next)
}
