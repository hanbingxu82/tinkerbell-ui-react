/*
 * @Author: your name
 * @Date: 2022-04-21 10:28:05
 * @LastEditTime: 2022-04-22 11:38:27
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/DatePicker/TimeRangePicker.tsx
 */
//@flow
import React from 'react';
import { debounce } from 'throttle-debounce';
import BasePicker from './BasePicker'
import TimeRangePanel from './panel/TimeRangePanel'
import type { TimeRangePickerProps } from './Types';
const PropTypes = require('prop-types')


export default class TimeRangePicker extends BasePicker {
  _onSelectionChange: any;
  static get propTypes() {
    let result: any = Object.assign({}, { rangeSeparator: PropTypes.string },
      BasePicker.propTypes)
    return result;
  }

  static get defaultProps() {
    let result: any = Object.assign({}, BasePicker.defaultProps)
    return result;
  }

  constructor(props: TimeRangePickerProps) {
    super(props, 'timerange', {})
    this._onSelectionChange = debounce(200, this.onSelectionChange.bind(this))
  }

  onSelectionChange(start: number, end: number) {
    (this.refs.inputRoot as any).refs.input.setSelectionRange(start, end);
    (this.refs.inputRoot as any).refs.input.focus();
  }

  getFormatSeparator() {
    return this.props.rangeSeparator
  }

  pickerPanel(state: any, props: TimeRangePickerProps) {
    return (
      <TimeRangePanel
        {...props}
        currentDates={state.value}
        onCancel={() => this.setState({ pickerVisible: false })}
        onPicked={this.onPicked.bind(this)}
        onSelectRangeChange={this._onSelectionChange}
      />
    )
  }
}
