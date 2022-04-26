/*
 * @Author: your name
 * @Date: 2022-04-21 10:33:12
 * @LastEditTime: 2022-04-22 15:30:09
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/DatePicker/panel/TimePanel.tsx
 */
//@flow
import React from 'react'
import { limitRange } from '../utils'
import TimeSpinner from '../basic/TimeSpinner'
import type { TimePanelProps } from '../Types'
import { PopperBase } from './PopperBase'

const PropTypes = require('prop-types')
const classnames = require('classnames')

const mapPropsToState = (props: any) => {
  const state: any = {
    format: props.format || 'HH:mm:ss',
    currentDate: props.currentDate || new Date()
  }
  state.isShowSeconds = (state.format || '').indexOf('ss') !== -1
  return state
}

export default class TimePanel extends PopperBase {
  // state: any
  props: any
  static get propTypes() {
    return Object.assign(
      {},
      {
        selectableRange: TimeSpinner.propTypes.selectableRange,
        onSelectRangeChange: TimeSpinner.propTypes.onSelectRangeChange
      },
      {
        pickerWidth: PropTypes.number,
        currentDate: PropTypes.instanceOf(Date),
        /*
        onPicked: (value, isKeepPannelOpen)=>()

        @param value: Date|null
        @param isKeepPannelOpen:boolean, should parent close the pannel
        */
        onPicked: PropTypes.func.isRequired,
        // cancel btn is clicked
        //()=>()
        onCancel: PropTypes.func.isRequired
      },
      PopperBase.propTypes
    )
  }

  static get defaultProps() {
    return {
      popperMixinOption: {}
    }
  }

  constructor(props: TimePanelProps) {
    super(props)
    this.state = mapPropsToState(props)
  }

  componentWillReceiveProps(nextProps: any) {
    this.setState(mapPropsToState(nextProps))
  }

  // type: string,  one of [hours, minutes, seconds]
  // date: {type: number}
  handleChange(date: { hours?: number; minutes?: number; seconds?: number }) {
    const { currentDate }:any = this.state

    if (date.hours !== undefined) {
      currentDate.setHours(date.hours)
    }

    if (date.minutes !== undefined) {
      currentDate.setMinutes(date.minutes)
    }

    if (date.seconds !== undefined) {
      currentDate.setSeconds(date.seconds)
    }
    this.setState({})
    this.handleConfirm(true)
  }

  handleConfirm(isKeepPannelOpen: boolean = false) {
    const { currentDate }:any = this.state
    const { onPicked, selectableRange } :any= this.props

    const date = new Date(limitRange(currentDate, selectableRange, 'HH:mm:ss'))
    onPicked(date, isKeepPannelOpen)
  }

  render() {
    const { isShowSeconds, currentDate } :any= this.state
    const { onSelectRangeChange, selectableRange }:any = this.props

    const hours = currentDate.getHours()
    const minutes = currentDate.getMinutes()
    const seconds = currentDate.getSeconds()

    return (
      <div ref='root' className='el-time-panel'>
        <div
          className={classnames('el-time-panel__content', {
            'has-seconds': isShowSeconds
          })}
        >
          <TimeSpinner
            ref='spinner'
            onChange={this.handleChange.bind(this)}
            isShowSeconds={isShowSeconds}
            hours={hours}
            minutes={minutes}
            seconds={seconds}
            selectableRange={selectableRange}
            onSelectRangeChange={onSelectRangeChange}
          />
        </div>
        <div className='el-time-panel__footer'>
          <div
            className='el-time-panel__btn cancel'
            onClick={() => {
              this.props.onCancel&& this.props.onCancel()}}
          >
            {'取消'}
          </div>
          <div
            className='el-time-panel__btn confirm'
            onClick={() => this.handleConfirm()}
          >
            {'确定'}
          </div>
        </div>
      </div>
    )
  }
}
