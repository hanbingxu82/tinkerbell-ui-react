/*
 * @Author: your name
 * @Date: 2022-04-21 10:28:30
 * @LastEditTime: 2022-04-22 11:39:36
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/DatePicker/Types.ts
 */
// @flow

export type ValidDateType = Date | Date[] | null
export type DisableDateFunc = (date: Date, type?:string)=>boolean
export type Shortcut = {text: string, onClick: ()=>void}


// ---------- basic
type SelectionMode = 'year' | 'month' | 'week' | 'day' | 'range';
export type DateTableProps = {
  disabledDate?:DisableDateFunc,
  showWeekNumber: boolean,
  miniDate?:Date,
  maxDate?:Date,
  selectionMode: SelectionMode,
  date: Date,
  onPick: (any: any, bool: boolean)=>void,
  onChangeRange?:(any: any)=>void,
  rangeState?:{endDate: Date, selecting: boolean },
  firstDayOfWeek: number
}

export type MonthTableProps = {
  date: Date,
  value: Date,
  onPick: (number: number)=>void,
  disabledDate?:DisableDateFunc
}

type Range<T> = [T, Date]
type TimeSpinnerSelectableRange = Range<any>[]
type TimeSpinnerOnSelectRangeChange = (range: Range<number>)=>void
export type TimeTypes = 'hours' | 'minutes' | 'seconds'
export type TimeSpinnerProps = {
  hours?:number,
  minutes?:number,
  seconds?:number,
  isShowSeconds: boolean,
  //[[datefrom, dateend]...]
  selectableRange: TimeSpinnerSelectableRange,
  onChange: (e: {TimeTypes: number})=>void,
  onSelectRangeChange: TimeSpinnerOnSelectRangeChange
}

export type YearTableProps = {
  value: Date,
  date: Date,
  onPick: (number: number)=> void,
  disabledDate?:DisableDateFunc
}

// ---------- panel

type GetPopperRefElement = ()=>HTMLElement;
type PopperMixinOption = any;

export type DatePanelProps = {
  value?:Date,
  onPick: (date: Date)=>void,
  isShowTime: boolean,
  showWeekNumber: boolean,
  format?:string,
  shortcuts?:Shortcut[],
  selectionMode?:SelectionMode,
  disabledDate?:DisableDateFunc,
  getPopperRefElement?:GetPopperRefElement,
  popperMixinOption?:PopperMixinOption,
}

export type DateRangePanelProps = {
  value: any,
  onPick: (range?: any, bool?: any)=>void,
  isShowTime: boolean,
  shortcuts?:Shortcut[],
  disabledDate?:DisableDateFunc,
  getPopperRefElement?:GetPopperRefElement,
  popperMixinOption?:PopperMixinOption,
}

export type TimePanelProps = {
  selectableRange?:TimeSpinnerSelectableRange,
  onSelectRangeChange?:TimeSpinnerOnSelectRangeChange,
  pickerWidth?:number,
  currentDate?:Date,
  onPicked: (date?: Date, isKeepPannelOpen?: any)=>boolean,
  onCancel: ()=>void,
  getPopperRefElement?:GetPopperRefElement,
  popperMixinOption?:PopperMixinOption,
}

export type TimeRangePanelProps = {
  pickerWidth?:number,
  currentDates?:Range<Date>,
  onPicked: ValidDateType,
  onCancel: ()=>void,
  format: string,
  onSelectRangeChange?:TimeSpinnerOnSelectRangeChange,
  getPopperRefElement?:GetPopperRefElement,
  popperMixinOption?:PopperMixinOption,
}

type DateParser = (string: string)=>Date
export type TimeSelectPanelProps = {
  start?:string,
  end?:string,
  step?:string,
  minTime?:string,
  maxTime?:string,
  value?:string,
  onPicked?:()=>void,
  dateParser?:DateParser,
  getPopperRefElement?:GetPopperRefElement,
  popperMixinOption?:PopperMixinOption,
}


// ---------- top level

export interface BasePickerProps {
  align?:'left' | 'center' | 'right',
  format?:string,
  isShowTrigger: boolean,
  isReadOnly: boolean,
  isDisabled: boolean,
  placeholder?:string,
  onFocus?:()=>void,
  onBlur?:()=>void,
  onChange?:(type: ValidDateType)=>void,
  value: Date | Date[]
}

export type DatePickerProps =  BasePickerProps & {
  value?:Date,
  isShowTime: boolean,
  showWeekNumber: boolean,
  shortcuts?:Shortcut[],
  selectionMode?:SelectionMode,
  disabledDate?:DisableDateFunc,
  getPopperRefElement?:GetPopperRefElement,
  popperMixinOption?:PopperMixinOption,
  firstDayofweek?:number
}

export type DateRangePickerProps = BasePickerProps & {
  value: any,
  isShowTime: boolean,
  shortcuts?:Shortcut[],
  rangeSeparator: string,
  firstDayofweek?:number
}


export type TimePickerProps = BasePickerProps & {
  selectableRange: string | string[],
}


export type TimeRangePickerProps = BasePickerProps & {
  rangeSeparator: string,
}

export type TimeSelectProps = BasePickerProps & {
  start?:string,
  end?:string,
  step?:string,
  minTime?:Date
}
