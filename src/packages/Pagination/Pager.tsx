/*
 * @Author: 韩旭小天才 905583741@qq.com
 * @Date: 2022-06-06 17:30:47
 * @LastEditors: 韩旭小天才 905583741@qq.com
 * @LastEditTime: 2022-06-07 17:08:24
 * @FilePath: /tinkerbell-ui-react/src/packages/Pagination/Pager.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// eslint-disable-next-line
import React, { useState } from 'react'
import './index.scss'

const classnames = require('classnames')
const PropTypes = require('prop-types')

type State = {
  internalCurrentPage: number
  internalPageSize: number

  quickprevIconClass: string
  quicknextIconClass: string
  showPrevMore: boolean
  showNextMore: boolean
}

const Pager: any = (props: any) => {
  const [state, setState] = useState<State>({
    internalCurrentPage: 1,
    internalPageSize: 0,

    quickprevIconClass: 'icon-ellipsis',
    quicknextIconClass: 'icon-ellipsis',
    showPrevMore: false,
    showNextMore: false
  })
  function onPagerClick(e: any): void {
    const target = e.target
    if (target instanceof HTMLElement) {
      if (target.tagName === 'UL') {
        return
      }
      let newPage: any = Number(target.textContent)
      const pageCount = props.pageCount
      const currentPage = props.currentPage

      if (target.className.indexOf('more') !== -1) {
        if (target.className.indexOf('quickprev') !== -1) {
          newPage = currentPage - 5
        } else if (target.className.indexOf('quicknext') !== -1) {
          newPage = currentPage + 5
        }
      }
      /* istanbul ignore if */
      if (!isNaN(newPage)) {
        if (newPage < 1) {
          newPage = 1
        }
        if (newPage > pageCount) {
          newPage = pageCount
        }
      }

      if (newPage !== currentPage) {
        props.onChange(newPage)
      }
    }
  }

  function getPages(): Array<number> {
    const pagerCount = 7
    const currentPage = Number(props.currentPage)
    const pageCount = Number(props.pageCount)

    let showPrevMore = false
    let showNextMore = false

    if (pageCount > pagerCount) {
      if (currentPage > pagerCount - 2) {
        showPrevMore = true
      }
      if (currentPage < pageCount - 2) {
        showNextMore = true
      }
    }

    const array = []

    if (showPrevMore && !showNextMore) {
      const startPage = pageCount - (pagerCount - 2)
      for (let i = startPage; i < pageCount; i++) {
        array.push(i)
      }
    } else if (!showPrevMore && showNextMore) {
      for (let i = 2; i < pagerCount; i++) {
        array.push(i)
      }
    } else if (showPrevMore && showNextMore) {
      const offset = Math.floor(pagerCount / 2) - 1
      for (let i = currentPage - offset; i <= currentPage + offset; i++) {
        array.push(i)
      }
    } else {
      for (let i = 2; i < pageCount; i++) {
        array.push(i)
      }
    }

    state.showPrevMore = showPrevMore
    state.showNextMore = showNextMore
    state.quickprevIconClass = showPrevMore
      ? state.quickprevIconClass
      : 'icon-ellipsis'
    state.quicknextIconClass = showNextMore
      ? state.quicknextIconClass
      : 'icon-ellipsis'

    return array
  }

  const pagers = getPages()
  const { currentPage, pageCount } = props
  const { quickprevIconClass, quicknextIconClass } = state

  return (
    <ul onClick={onPagerClick} className='tb-pager'>
      {pageCount > 0 && (
        <li className={classnames('number', { active: currentPage === 1 })}>
          1
        </li>
      )}

      {state.showPrevMore && (
        <li
          className={classnames(
            'tb-icon more btn-quickprev iconfont',
            quickprevIconClass
          )}
          onMouseEnter={() => {
            setState({ ...state, quickprevIconClass: 'icon-double-arro-left' })
          }}
          onMouseLeave={() => {
            setState({ ...state, quickprevIconClass: 'icon-ellipsis' })
          }}
        />
      )}

      {pagers.map((pager, idx) => {
        return (
          <li
            key={idx}
            className={classnames('number', {
              active: currentPage === pager
            })}
          >
            {pager}
          </li>
        )
      })}

      {state.showNextMore && (
        <li
          className={classnames(
            'tb-icon more btn-quicknext iconfont',
            quicknextIconClass
          )}
          onMouseEnter={() => {
            setState({ ...state, quicknextIconClass: 'icon-double-arro-right' })
          }}
          onMouseLeave={() => {
            setState({ ...state, quicknextIconClass: 'icon-ellipsis' })
          }}
        />
      )}

      {pageCount > 1 && (
        <li
          className={classnames('number', {
            active: currentPage === pageCount
          })}
        >
          {pageCount}
        </li>
      )}
    </ul>
  )
}

Pager.propTypes = {
  currentPage: PropTypes.number,
  pageCount: PropTypes.number
}

export default Pager
