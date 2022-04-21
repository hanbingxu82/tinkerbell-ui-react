/*
 * @Author: your name
 * @Date: 2022-04-21 10:35:26
 * @LastEditTime: 2022-04-21 10:41:36
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/DatePicker/basic/YearTable.tsx
 */
//@flow
import React from 'react'

import { PropTypes, Component } from '../../../libs';
import { hasClass, deconstructDate, SELECTION_MODES } from '../utils'

import type {YearTableProps} from '../Types';

export default class YearTable extends Component {
  constructor(props: YearTableProps){
    super(props)
  }

  getCellStyle(year: number) {
    const {disabledDate, value, date} = this.props
    const style = {};
    const ndate = new Date(date);

    ndate.setFullYear(year);
    style.disabled = typeof disabledDate === 'function' && disabledDate(ndate, SELECTION_MODES.YEAR);
    style.current = value && deconstructDate(value).year === year;

    return style;
  }

  handleYearTableClick(event: SyntheticMouseEvent<any>) {
    const target: any = event.target;
    if (target.tagName === 'A') {
      if (hasClass(target.parentNode, 'disabled')) return;
      const year = target.textContent || target.innerText;
      this.props.onPick(+year)
    }
  }

  render() {
    const {date} = this.props
    const startYear = Math.floor(deconstructDate(date).year / 10) * 10;

    return (
      <table onClick={this.handleYearTableClick.bind(this)} className="el-year-table">
        <tbody>
          <tr>
            <td className={this.classNames('available', this.getCellStyle(startYear + 0))}>
              <a className="cell">{startYear}</a>
            </td>
            <td className={this.classNames('available', this.getCellStyle(startYear + 1))}>
              <a className="cell">{startYear + 1}</a>
            </td>
            <td className={this.classNames('available', this.getCellStyle(startYear + 2))}>
              <a className="cell">{startYear + 2}</a>
            </td>
            <td className={this.classNames('available', this.getCellStyle(startYear + 3))}>
              <a className="cell">{startYear + 3}</a>
            </td>
          </tr>
          <tr>
            <td className={this.classNames('available', this.getCellStyle(startYear + 4))}>
              <a className="cell">{startYear + 4}</a>
            </td>
            <td className={this.classNames('available', this.getCellStyle(startYear + 5))}>
              <a className="cell">{startYear + 5}</a>
            </td>
            <td className={this.classNames('available', this.getCellStyle(startYear + 6))}>
              <a className="cell">{startYear + 6}</a>
            </td>
            <td className={this.classNames('available', this.getCellStyle(startYear + 7))}>
              <a className="cell">{startYear + 7}</a>
            </td>
          </tr>
          <tr>
            <td className={this.classNames('available', this.getCellStyle(startYear + 8))}>
              <a className="cell">{startYear + 8}</a>
            </td>
            <td className={this.classNames('available', this.getCellStyle(startYear + 9))}>
              <a className="cell">{startYear + 9}</a>
            </td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    )
  }
}

YearTable.propTypes = {
  value: PropTypes.instanceOf(Date),
  date: PropTypes.instanceOf(Date).isRequired,
  // (year: number)=>
  onPick: PropTypes.func.isRequired,
  // (Date)=>boolean
  disabledDate: PropTypes.func,
}
