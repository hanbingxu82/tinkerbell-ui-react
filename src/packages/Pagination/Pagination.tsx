/*
 * @Author: 韩旭小天才 905583741@qq.com
 * @Date: 2022-06-06 17:31:04
 * @LastEditors: 韩旭小天才 905583741@qq.com
 * @LastEditTime: 2022-06-07 15:56:26
 * @FilePath: /tinkerbell-ui-react/src/packages/Pagination/Pagination.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/* @flow */

import React, { useState, useRef, useEffect } from 'react'
import Pager from './Pager'
import Select from '../Select'

const classnames = require('classnames')
const PropTypes = require('prop-types')

const Pre = (props: any) => {
  const disabled = props.internalCurrentPage <= 1 ? 'disabled' : ''
  return (
    <button
      type='button'
      className={`btn-prev ${disabled}`}
      onClick={props.prev}
    >
      <i className='iconfont icon-arrow-left' />
    </button>
  )
}

const Next = (props: any) => {
  const disabled =
    props.internalCurrentPage === props.internalPageCount ||
    props.internalPageCount === 0
      ? 'disabled'
      : ''

  return (
    <button
      type='button'
      className={`btn-next ${disabled}`}
      onClick={props.next}
    >
      <i className='iconfont icon-arrow-right' />
    </button>
  )
}

const Sizes: any = (props: any) => {
  const { onSizeChange, internalPageSize } = props
  console.log(internalPageSize,22222)
  return (
    <span className='el-pagination__sizes'>
      <Select
        size='small'
        value={internalPageSize}
        onChange={onSizeChange}
        width={110}
      >
        {props.pageSizes.map((item: any, idx: number) => {
          return (
            <Select.Option
              key={idx}
              value={item}
              label={item + ' ' + '条/页'}
            />
          )
        })}
      </Select>
    </span>
  )
}

const Total = (props: any) => {
  return typeof props.total === 'number' ? (
    <span className='el-pagination__total'>共 {props.total} 条</span>
  ) : (
    <span />
  )
}
const Jumper = (props: any) => {
  function handleChange({ target }: any) {
    const { jumper } = props
    jumper(target.value)
  }

  function handleFocus() {}
  return (
    <span className='el-pagination__jump'>
      前往
      <input
        className='el-pagination__editor'
        type='number'
        min={1}
        max={props.internalPageCount}
        defaultValue={props.internalCurrentPage}
        onBlur={handleChange}
        onKeyUp={(e: any) => {
          if (e.keyCode == 13) {
            handleChange(e)
          }
        }}
        onFocus={handleFocus}
        style={{ width: '30px' }}
      />
      页
    </span>
  )
}

type State = {
  internalPageSize: number
  total: number
  pageCount: number
  internalCurrentPage: number
}

const Pagination: any = (props: any) => {
  const { currentPage, pageSizes, pageSize, total, pageCount, layout } = props
  let internalPageSize = 0
  if (layout.split(',').indexOf('sizes') > -1 && Array.isArray(pageSizes)) {
    internalPageSize =
      pageSizes.indexOf(pageSize) > -1 ? pageSize : pageSizes[0]
  } else {
    internalPageSize = pageSize
  }
  /**
   * @description: 是否第一次加载组件
   * @param {*}
   * @return {*}
   */
  const initComponent = useRef(true)
  const [state = {}, setState]: any = useState<State>({
    internalPageSize,
    total,
    pageCount,
    internalCurrentPage: currentPage
  })
  /** 监听 变化current Start*/
  let watchITP = useRef('')
  let watchPageSize = useRef('')
  /** 监听 变化current End */

  useEffect(() => {
    if (initComponent.current) return
    let internalPageSize = state.internalPageSize

    const hasSizesLayout =
      props.layout
        .split(',')
        .map((item: any) => item.trim())
        .indexOf('sizes') > -1

    if (hasSizesLayout && Array.isArray(props.pageSizes)) {
      internalPageSize =
        props.pageSizes.indexOf(props.pageSize) > -1
          ? props.pageSize
          : props.pageSizes[0]
    }
    setState({
      ...state,
      internalPageSize: internalPageSize,
      total: props.total,
      pageCount: props.pageCount
    })
    watchITP.current = 'watchITP'
  }, [
    props.currentPage,
    props.pageSizes,
    props.pageSize,
    props.total,
    props.pageCount
  ])

  useEffect(() => {
    if (initComponent.current) return
    if (watchITP.current === 'watchITP') {
      setState({
        ...state,
        internalCurrentPage: props.currentPage
          ? getValidCurrentPage(props.currentPage)
          : 1
      })
      watchITP.current = ''
    }
  }, [state.internalPageSize, state.total, state.pageCount])

  function pre(): void {
    const oldPage = state.internalCurrentPage
    const newVal = state.internalCurrentPage - 1
    setState({
      ...state,
      internalCurrentPage: getValidCurrentPage(newVal)
    })
    if (getValidCurrentPage(newVal) !== oldPage) {
      const onCurrentChange = props.onCurrentChange
      onCurrentChange && onCurrentChange(getValidCurrentPage(newVal))
    }
  }

  function next(): void {
    const oldPage = state.internalCurrentPage
    const newVal = state.internalCurrentPage + 1

    setState({
      ...state,
      internalCurrentPage: getValidCurrentPage(newVal)
    })
    if (getValidCurrentPage(newVal) !== oldPage) {
      const onCurrentChange = props.onCurrentChange
      onCurrentChange && onCurrentChange(getValidCurrentPage(newVal))
    }
  }

  function getValidCurrentPage(value: string | number): number {
    value = parseInt(value as string, 10)
    let internalPageCountNum = internalPageCount()

    let resetValue
    if (!internalPageCountNum) {
      if (isNaN(value) || value < 1) resetValue = 1
    } else {
      if (value < 1) {
        resetValue = 1
      } else if (value > internalPageCountNum) {
        resetValue = internalPageCountNum
      }
    }

    if (resetValue === undefined && isNaN(value)) {
      resetValue = 1
    } else if (resetValue === 0) {
      resetValue = 1
    }

    return resetValue === undefined ? value : resetValue
  }

  function internalPageCount(): number | null {
    if (state) {
      if (typeof state.total === 'number') {
        return Math.ceil(state.total / state.internalPageSize)
      } else if (typeof state.pageCount === 'number') {
        return state.pageCount
      }
    }

    return null
  }

  function jumperToPage(page: number): void {
    const oldPage = state.internalCurrentPage
    setState({
      ...state,
      internalCurrentPage: getValidCurrentPage(page)
    })
    if (oldPage !== getValidCurrentPage(page)) {
      const onCurrentChange = props.onCurrentChange
      onCurrentChange && onCurrentChange(getValidCurrentPage(page))
    }
  }

  function handleCurrentChange(val: any) {
    const oldPage = state.internalCurrentPage
    setState({
      ...state,
      internalCurrentPage: getValidCurrentPage(val)
    })
    if (oldPage !== getValidCurrentPage(val)) {
      const onCurrentChange = props.onCurrentChange
      onCurrentChange && onCurrentChange(getValidCurrentPage(val))
    }
  }

  function onSizeChange(val: number | string) {
    if (val !== state.internalPageSize) {
      val = parseInt(val as string, 10)
      setState({
        ...state,
        internalPageSize: val
      })
      watchPageSize.current = 'watchPageSize'
    }
  }
  useEffect(() => {
    if (initComponent.current) return
    if (watchPageSize.current === 'watchPageSize') {
      setState({
        ...state,
        internalCurrentPage: getValidCurrentPage(state.internalCurrentPage)
      })
      const { onSizeChange } = props
      onSizeChange && onSizeChange(state.internalPageSize)
      watchPageSize.current = ''
    }
  }, [state.internalPageSize])
  useEffect(() => {
    initComponent.current = false
    setState({
      ...state,
      internalCurrentPage: currentPage ? getValidCurrentPage(currentPage) : 1
    })
  }, [])
  const className = classnames({
    'el-pagination': true,
    'el-pagination__rightwrapper': false,
    'el-pagination--small': props.small
  })

  const children: any = []

  if (!layout) return null
  const components = layout.split(',').map((item: any) => item.trim())
  const TEMPLATE_MAP = {
    prev: (
      <Pre
        key='pre'
        internalCurrentPage={state.internalCurrentPage}
        prev={pre}
      />
    ),
    jumper: (
      <Jumper
        key='jumper'
        jumper={jumperToPage}
        internalPageCount={internalPageCount()}
        internalCurrentPage={state.internalCurrentPage}
      />
    ),
    pager: (
      <Pager
        key='pager'
        currentPage={state.internalCurrentPage}
        pageCount={internalPageCount()}
        onChange={handleCurrentChange}
      />
    ),
    next: (
      <Next
        key='next'
        internalCurrentPage={state.internalCurrentPage}
        internalPageCount={internalPageCount()}
        next={next}
      />
    ),
    sizes: (
      <Sizes
        key='sizes'
        internalPageSize={internalPageSize}
        pageSizes={props.pageSizes}
        onSizeChange={onSizeChange}
      />
    ),
    total: <Total key='total' total={state.total} />
  }
  components.forEach((compo: any) => {
    if (compo !== '->') {
      children.push(TEMPLATE_MAP[compo])
    }
  })

  return (
    <div style={props.style} className={className}>
      {children}
    </div>
  )
}

Pagination.propTypes = {
  pageSize: PropTypes.number,
  small: PropTypes.bool,
  total: PropTypes.number,
  pageCount: PropTypes.number,
  currentPage: PropTypes.number,
  layout: PropTypes.string,
  pageSizes: PropTypes.array,

  //Event
  onCurrentChange: PropTypes.func,
  onSizeChange: PropTypes.func
}

Pagination.defaultProps = {
  small: false,
  pageSize: 10,
  currentPage: 1,
  layout: 'prev, pager, next, jumper, ->, total',
  pageSizes: [10, 20, 30, 40, 50, 100]
}

export default Pagination
