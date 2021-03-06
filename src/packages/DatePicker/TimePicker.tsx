/*
 * @Author: your name
 * @Date: 2022-04-21 10:27:55
 * @LastEditTime: 2022-04-22 11:37:55
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/DatePicker/TimePicker.tsx
 */
//@flow
import React from 'react'
import { debounce } from 'throttle-debounce'
// import { PropTypes } from '../../libs';
import BasePicker from './BasePicker'
import TimePanel from './panel/TimePanel'
import { TYPE_VALUE_RESOLVER_MAP, DEFAULT_FORMATS } from './constants'
import type { TimePickerProps } from './Types'
const PropTypes = require('prop-types')
// const classnames = require('classnames')

function converSelectRange(props: any) {
  let selectableRange = []
  if (props.selectableRange) {
    let ranges = props.selectableRange
    const parser = TYPE_VALUE_RESOLVER_MAP.datetimerange.parser
    const format = DEFAULT_FORMATS.timerange

    ranges = Array.isArray(ranges) ? ranges : [ranges]
    selectableRange = ranges.map((range:any) => parser(range, format))
  }
  return selectableRange
}

export default class TimePicker extends BasePicker {
  _onSelectionChange: any
  // why this is used, goto: http://exploringjs.com/es6/ch_classes.html
  static get propTypes() {
    let result: any = Object.assign(
      {},
      {
        // '18:30:00 - 20:30:00'
        // or ['09:30:00 - 12:00:00', '14:30:00 - 18:30:00']
        selectableRange: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.arrayOf(PropTypes.string)
        ])
      },
      BasePicker.propTypes
    )

    return result
  }

  static get defaultProps() {
    let result: any = Object.assign({}, BasePicker.defaultProps)
    return result
  }

  constructor(props: TimePickerProps) {
    super(props, 'time', {})
    this._onSelectionChange = debounce(200, this.onSelectionChange.bind(this))
  }

  onSelectionChange(start: number, end: number) {
    (this.refs.inputRoot as any).refs.input.setSelectionRange(start, end)
    (this.refs.inputRoot as any).refs.input.focus()
  }

  pickerPanel(state: any, props: TimePickerProps) {
    return (
      <TimePanel
        {...props}
        currentDate={state.value}
        onCancel={() => this.setState({ pickerVisible: false })}
        onPicked={this.onPicked.bind(this)}
        onSelectRangeChange={this._onSelectionChange}
        selectableRange={converSelectRange(props)}
      />
    )
  }
}
