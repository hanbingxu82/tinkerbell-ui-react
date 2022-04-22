/*
 * @Author: your name
 * @Date: 2022-04-21 10:28:18
 * @LastEditTime: 2022-04-22 11:38:59
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/DatePicker/TimeSelect.tsx
 */
//@flow
import React from 'react'
import BasePicker from './BasePicker'
import TimeSelectPanel from './panel/TimeSelectPanel'
import type { TimeSelectProps, ValidDateType } from './Types'
const PropTypes = require('prop-types')
export default class TimeSelect extends BasePicker {
  static get propTypes() {
    let result: any = Object.assign(
      {},
      {
        start: PropTypes.string,
        end: PropTypes.string,
        step: PropTypes.string,
        minTime: PropTypes.instanceOf(Date)
      },
      BasePicker.propTypes
    )

    return result
  }

  static get defaultProps() {
    let result: any = Object.assign({}, BasePicker.defaultProps)
    return result
  }

  constructor(props: TimeSelectProps) {
    // props, type, state
    super(props, 'timeselect', {})
  }

  isDateValid(value: ValidDateType) {
    return (
      super.isDateValid(value) &&
      TimeSelectPanel.isValid(this.dateToStr(value), this.panelProps())
    )
  }

  panelProps(props?: TimeSelectProps) {
    const ps = props || this.props
    const minTime = this.dateToStr(this.props.minTime)
    return { ...ps, minTime }
  }

  pickerPanel(state: any, props: TimeSelectProps) {
    const value = this.dateToStr(state.value)
    return (
      <TimeSelectPanel
        {...this.panelProps(props)}
        value={value}
        onPicked={this.onPicked.bind(this)}
        dateParser={(str:any) => {
          const r = this.parseDate(str)
          return r
        }}
      />
    )
  }
}
