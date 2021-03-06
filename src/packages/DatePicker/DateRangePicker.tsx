/*
 * @Author: your name
 * @Date: 2022-04-21 10:27:28
 * @LastEditTime: 2022-04-22 11:33:44
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/DatePicker/DateRangePicker.tsx
 */
//@flow
import React from 'react';
import { pick } from '../../utils'
import BasePicker from './BasePicker'
import DateRangePanel from './panel/DateRangePanel'
import type { DateRangePickerProps } from './Types';
const PropTypes = require('prop-types')
// const classnames = require('classnames')


export default class DateRangePicker extends BasePicker {
  static get propTypes() {
    return Object.assign(
      {},
      {rangeSeparator: PropTypes.string},
      BasePicker.propTypes,
      // default value is been defined in ./constants file
      pick(DateRangePanel.propTypes,
        ['value', 'isShowTime', 'shortcuts', 'firstDayOfWeek']))
  }

  static get defaultProps() {
    let result: any = Object.assign({}, BasePicker.defaultProps)
    return result;
  }

  constructor(props: DateRangePickerProps) {
    super(props, 'daterange', {})
  }

  getFormatSeparator(){
    return this.props.rangeSeparator
  }
  
  pickerPanel(state: any, props: DateRangePickerProps) {
    let value = state.value
    if (value instanceof Date) {
      value = [value, null]
    }
    return (
      <DateRangePanel
        {...props}
        value={value}
        onPick={this.onPicked.bind(this)}
      />
    )
  }
}
