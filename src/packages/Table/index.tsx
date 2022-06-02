/*
 * @Author: 韩旭小天才 905583741@qq.com
 * @Date: 2022-06-02 13:09:04
 * @LastEditors: 韩旭小天才 905583741@qq.com
 * @LastEditTime: 2022-06-02 19:28:50
 * @FilePath: /tinkerbell-ui-react/src/packages/Table/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState, useEffect, useCallback, useRef } from 'react'
import CheckBox from '../CheckBox'
import './index.scss'

const classnames = require('classnames')

interface Iprops {
  cols: Array<any> //列头数据列表
  rows: Array<any> //展示信息数据列表
  align: string //全局表格内容对齐方式
  empty: string //如果对应单元格是空项 显示内容文本
  selectTable: boolean //是否新增选项进行多选
  isSort: boolean //是否展示sort图标，子项设置sort后 需设置is-sort
  sortExternal: boolean //只改变排序和箭头。用于排序外部组件。
  selectable: boolean //是否触发 selectable 复选框
}

const Table: any = React.forwardRef((props: any, _ref: any) => {
  // 强制更新视图方法 start
  const [, updateState] = useState<any>()
  const forceUpdate = useCallback(() => updateState({}), [])
  // 强制更新视图方法 end
  const {
    cols = [],
    rows = [],
    align = 'center',
    empty = '',
    // selectTable = false,
    isSort = false,
    // sortExternal = false,
    selectable = false
  }: Iprops = props
  let [tableData] = useState([...rows])
  let [isSelectAllChecked, setIsSelectAllChecked] = useState(false)
  let [isIndeterminate, setIsIndeterminate] = useState(false)
  let [selectedRows, setSelectedRows] = useState<any>([])
  let [isSortType, setIsSortType] = useState('')
  let sescData: any = useRef([])
  // 类似于 componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    // 使用浏览器API更新文档标题
    document.title = `You clicked count times`
  }, [])
  // 全部选中
  function handleCheckAllChange(e: any) {
    const checkedCities = e.target.checked ? tableData : []
    setIsIndeterminate(false)
    setIsSelectAllChecked(e.target.checked)
    setSelectedRows([...checkedCities])
    forceUpdate()
  }
  // 单行选中
  function handleCheckRowChange(row: any) {
    selectedRows = isSelected(row)
      ? selectedRows.filter((selected: any) => selected !== row)
      : [...selectedRows, row]
    const checkedCount = selectedRows.length
    const citiesLength = tableData.length
    setSelectedRows(selectedRows)
    setIsSelectAllChecked(checkedCount === citiesLength)
    setIsIndeterminate(checkedCount > 0 && checkedCount < citiesLength)
    forceUpdate()
  }
  // 排序事件
  function sortClick(item: any) {
    console.log(item)
    debugger
    if (isSortType === 'aesc-' + item.field) {
      setIsSortType('desc-' + item.field)
      tableData.sort((a: any, b: any) => {
        return a[item.field] - b[item.field]
      })
    } else if (isSortType === 'desc-' + item.field) {
      setIsSortType('')
      tableData.sort((a: any, b: any) => {
        return b[item.field] - a[item.field]
      })
    } else {
      setIsSortType('aesc-' + item.field)
      tableData = sescData.current
    }
    forceUpdate()
  }
  // 设置style样式
  function getStyle(col: any) {
    const style = {
      width: col.width,
      textAlign: col.align || align,
      display: col.hidden ? 'none' : undefined
    }
    return style
  }
  // 判断selectedRows是否存在当前项 存在就选中，不存在就不选中
  function isSelected(row: any) {
    const isSelected = !!selectedRows.find((selected: any) => selected === row)
    // forceUpdate()
    return isSelected
  }
  function sortFunction(item: any) {
    if (isSort && item.sort) {
      if (isSortType === 'asce-' + item.field) {
        return <i className='iconfont icon-arrow-down'></i>
      } else if (isSortType === 'desc-' + item.field) {
        return <i className='iconfont icon-arrow-up'></i>
      } else {
        return <i className='iconfont icon-arrow-down'></i>
      }
    }
    return null
  }
  useEffect(() => {
    // 初始值保存
    sescData.current = [...tableData]
  }, [])
  return (
    <div className='tb-table'>
      <table>
        {/* table 表头区域*/}
        <thead>
          <tr>
            {selectable && (
              <th
                className={classnames(
                  'tb-table-cell',
                  'is-header',
                  'is-selection'
                )}
              >
                <CheckBox
                  checked={isSelectAllChecked}
                  indeterminate={isIndeterminate}
                  onChange={handleCheckAllChange}
                ></CheckBox>
              </th>
            )}
            {cols.map((item: any, index: number) => {
              return (
                <th
                  key={index}
                  style={getStyle(item)}
                  className={classnames('tb-table-cell', 'is-header')}
                  onClick={() => {
                    sortClick(item)
                  }}
                >
                  <span>{item.label || empty}</span>
                  {sortFunction(item)}
                </th>
              )
            })}
          </tr>
        </thead>

        {/* table body区域 */}
        <tbody>
          {/* 遍历行 */}
          {tableData.map((row: any, index: number) => {
            return (
              <tr key={index}>
                {/* 首行checkbox */}
                {selectable && (
                  <th className={classnames('tb-table-cell', 'is-selection')}>
                    <CheckBox
                      checked={isSelected(row)}
                      onChange={() => {
                        handleCheckRowChange(row)
                      }}
                    ></CheckBox>
                  </th>
                )}
                {/* 遍历列 */}
                {cols.map((col: any, colIndex: number) => {
                  return (
                    <td
                      className={classnames('tb-table-cell')}
                      key={colIndex}
                      style={getStyle(col)}
                    >
                      <span>
                        {/* 判断render是否有值没有直接取值、或者给空 */}
                        {col.render
                          ? col.render(row, col, index)
                          : row[col.field] || empty}
                      </span>
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
})
export default Table
