/*
 * @Author: your name
 * @Date: 2022-04-21 10:33:23
 * @LastEditTime: 2022-04-22 16:03:38
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/DatePicker/panel/TimeRangePanel.tsx
 */
import React from 'react';
import {  parseDate } from '../utils';
import TimeSpinner from '../basic/TimeSpinner';
import {  ValidDateType } from '../Types';
import { PopperBase } from './PopperBase'

const PropTypes = require('prop-types')
const classnames = require('classnames')
const MIN_TIME = parseDate('00:00:00', 'HH:mm:ss');
const MAX_TIME = parseDate('23:59:59', 'HH:mm:ss');

const isDisabled = function (minTime: { getHours: () => number; getMinutes: () => number; getSeconds: () => number; }, maxTime: { getHours: () => number; getMinutes: () => number; getSeconds: () => number; }) {
  const minValue = minTime.getHours() * 3600 +
    minTime.getMinutes() * 60 +
    minTime.getSeconds();
  const maxValue = maxTime.getHours() * 3600 +
    maxTime.getMinutes() * 60 +
    maxTime.getSeconds();

  return minValue > maxValue;
};

const calcTime:any = function (time: any[] | undefined) {
  
  time = Array.isArray(time) ? time : [time];
  const minTime = time[0] || new Date();
  const date = new Date();
  date.setHours(date.getHours() + 1);
  const maxTime = time[1] || date;

  if (minTime > maxTime) return calcTime();
  return { minTime, maxTime };
};

const mapPropsToState = (props: { pickerWidth?: number | null; currentDates: any; onPicked?: ValidDateType; onCancel?: () => void; format: any; onSelectRangeChange?: ((range: [number, Date]) => void) | null; getPopperRefElement?: (() => HTMLElement) | null; popperMixinOption?: any; }) => {
  const { currentDates, format } = props;
  const { minTime, maxTime } = calcTime(currentDates);

  const state: any = {
    format: format || 'HH:mm:ss',
    minTime,
    maxTime,
    minSelectableRange: [[MIN_TIME, maxTime]],
    maxSelectableRange: [[minTime, MAX_TIME]],
    btnDisabled: isDisabled(minTime, maxTime)
  };
  state.isShowSeconds = (state.format || '').indexOf('ss') !== -1;

  return state;
};

export default class TimeRangePanel extends PopperBase {
  state: any;
  props: any
  static get propTypes() {
    return Object.assign(
      {
        pickerWidth: PropTypes.number,
        currentDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
        /*
        onPicked: (value, isKeepPannelOpen)=>()

        @param value: Date| Date[] |null
        @param isKeepPannelOpen:boolean, should parent close the pannel
        */
        onPicked: PropTypes.func.isRequired,
        // cancel btn is clicked
        //()=>()
        onCancel: PropTypes.func.isRequired,
        // (start, end)=>(), index range indicate which field [hours, minutes, seconds] changes
        onSelectRangeChange: TimeSpinner.propTypes.onSelectRangeChange,
      }, PopperBase.propTypes);
  }

  static get defaultProps() {
    return {
      popperMixinOption: {}
    };
  }

  constructor(props: any) {
    super(props);

    this.state = Object.assign(
      {
        visible: false,
        width: 0
      },
      mapPropsToState(props)
    );
  }

  componentWillReceiveProps(nextProps: any) {
    this.setState(mapPropsToState(nextProps));
  }

  // type = hours | minutes | seconds
  // date: {type: number}
  handleChange(date: { hours?: number, minutes?: number, seconds?: number }, field: string) {
    const ndate = this.state[field];

    if (date.hours !== undefined) {
      ndate.setHours(date.hours);
    }

    if (date.minutes !== undefined) {
      ndate.setMinutes(date.minutes);
    }

    if (date.seconds !== undefined) {
      ndate.setSeconds(date.seconds);
    }

    const state: any = {
      [field]: ndate
    };

    this.setState(state);
    this.handleConfirm(true);

  }

  handleConfirm(isKeepPannelOpen: boolean = false) {
    const { minTime, maxTime } = this.state;
    const { onPicked } = this.props;

    onPicked([minTime, maxTime], isKeepPannelOpen);
  }

  render() {
    const {
      isShowSeconds,
      minTime,
      maxTime,
      // btnDisabled,
      minSelectableRange,
      maxSelectableRange
    } = this.state;
    const { onSelectRangeChange } = this.props;

    const maxHours = maxTime.getHours();
    const maxMinutes = maxTime.getMinutes();
    const maxSeconds = maxTime.getSeconds();
    const minHours = minTime.getHours();
    const minMinutes = minTime.getMinutes();
    const minSeconds = minTime.getSeconds();
    return (
      <div
        ref="root"
        className="el-time-range-picker el-picker-panel"
        style={{ minWidth: '330px' }}
      >
        <div className="el-time-range-picker__content">
          <div className="el-time-range-picker__cell">
            <div className="el-time-range-picker__header">
              {'开始时间'}
            </div>
            <div
              className={classnames(
                'el-time-range-picker__body el-time-panel__content',
                { 'has-seconds': isShowSeconds }
              )}
            >
              <TimeSpinner
                ref="minSpinner"
                onChange={(date: { hours?: number | undefined; minutes?: number | undefined; seconds?: number | undefined; }) => this.handleChange(date, 'minTime')}
                isShowSeconds={isShowSeconds}
                hours={minHours}
                minutes={minMinutes}
                seconds={minSeconds}
                selectableRange={minSelectableRange}
                onSelectRangeChange={onSelectRangeChange}
              />
            </div>
          </div>
          <div className="el-time-range-picker__cell">
            <div className="el-time-range-picker__header">
              {'结束时间'}
            </div>
            <div
              className={classnames(
                'el-time-range-picker__body el-time-panel__content',
                { 'has-seconds': isShowSeconds }
              )}
            >
              <TimeSpinner
                ref="maxSpinner"
                onChange={(date: { hours?: number | undefined; minutes?: number | undefined; seconds?: number | undefined; }) => this.handleChange(date, 'maxTime')}
                isShowSeconds={isShowSeconds}
                hours={maxHours}
                minutes={maxMinutes}
                seconds={maxSeconds}
                selectableRange={maxSelectableRange}
                onSelectRangeChange={(start: number, end: number) =>
                  onSelectRangeChange(start + 11, end + 11)}
              />
            </div>
          </div>
        </div>
        <div className="el-time-panel__footer">
          <div
            // type="button"
            className="el-time-panel__btn cancel"
            onClick={() => this.props.onCancel()}
          >
            {'取消'}
          </div>
          <div
            // type="button"
            className="el-time-panel__btn confirm"
            onClick={() => this.handleConfirm()}
            // disabled={btnDisabled}
          >
            {'确认'}
          </div>
        </div>
      </div>
    );
  }
}
