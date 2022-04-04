/*
 * @Author: your name
 * @Date: 2022-04-01 10:38:23
 * @LastEditTime: 2022-04-04 10:58:25
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/Tabs/index.tsx
 */

import React, { useState, useEffect, SyntheticEvent, useRef } from 'react'
import {
  useUpdateEffect,
  useWillReceiveProps
} from '../../utils/useUpdateEffect'
import TabPane from '../TabPane'
import './index.scss'
const classnames = require('classnames')
const PropTypes = require('prop-types')

type Props = {
  children: any
  type: 'card' | 'border-card'
  activeName: string
  value: string
  closable: boolean
  addable: boolean
  editable: boolean
  onTabClick: Function
  onTabRemove: Function
  onTabAdd: Function
  onTabEdit: Function
}

type State = {
  children: Array<any>
  currentName: any
  barStyle: Object
  navStyle: any
  scrollable: boolean
  scrollNext: boolean
  scrollPrev: boolean
  scrollablePrev: any
  scrollableNext: any
}

const Tabs: any = (props: Props) => {
  let { children, activeName, value, type, addable, closable, editable } = props
  let tabs: any = useRef([])
  let navScrollRef = useRef<any>(null)
  let navRef = useRef<any>(null)
  const [state, setState] = useState<State>({
    children: React.Children.toArray(children),
    currentName: value || activeName || children[0].props.name,
    barStyle: {},
    navStyle: {
      transform: ''
    },
    scrollable: false,
    scrollNext: false,
    scrollPrev: false,
    scrollablePrev: '',
    scrollableNext: ''
  })
  useEffect(() => {
    calcBarStyle(true)
    update()
  }, [])//eslint-disable-line

  /**
   * @description: 组件将要更新数据时触发的函数
   * @param {_oldProps，oldState}:旧props， 旧state
   * @return {*}
   */
  useUpdateEffect(
    (_oldProps, oldState) => {
      if (oldState.scrollable !== state.scrollable) {
        scrollToActiveTab()
      }
    },
    props,
    state
  )

  useWillReceiveProps(
    (oldProps) => {
      if (oldProps.activeName !== props.activeName) {
        setState({
          ...state,
          currentName: props.activeName
        })
      }

      if (oldProps.value !== props.value) {
        setState({
          ...state,
          currentName: props.value
        })
      }

      if (oldProps.children !== props.children) {
        setState({
          ...state,
          children: React.Children.toArray(props.children)
        })
      }
    },
    [props]
  )
  // 两个监听回调
  useEffect(() => {
    calcBarStyle()
    scrollToActiveTab()
  }, [state.currentName])// eslint-disable-line

  useEffect(() => {
    update()
    calcBarStyle()
  }, [state.children])// eslint-disable-line

  function handleTabAdd(): void {
    const { onTabAdd, onTabEdit } = props

    onTabEdit && onTabEdit('add')
    onTabAdd && onTabAdd()
  }

  function handleTabRemove(
    tab: any,
    index: number,
    e: SyntheticEvent<any>
  ): void {
    const { onTabRemove, onTabEdit } = props

    e.stopPropagation()
    let newCurrentName = null
    if (state.children[index].props.name === state.currentName) {
      const nextChild = state.children[index + 1]
      const prevChild = state.children[index - 1]
      newCurrentName = nextChild
        ? nextChild.props.name
        : prevChild
        ? prevChild.props.name
        : '-1'

      // setState({
      //   ...state,
      //   currentName: newCurrentName
      // })
    }

    state.children.splice(index, 1)
    setState({
      ...state,
      children: state.children,
      currentName: newCurrentName ? newCurrentName : state.currentName
    })
    setTimeout(() => {
      onTabEdit && onTabEdit('remove', tab)
      onTabRemove && onTabRemove(tab, e)
    }, 0)
  }

  function handleTabClick(tab: any, e: SyntheticEvent<any>): void | boolean {
    if (tab.props.disabled) {
      return false
    }

    setState({
      ...state,
      currentName: tab.props.name
    })

    const { onTabClick } = props

    onTabClick && onTabClick(tab, e)
  }

  function calcBarStyle(firstRendering?: boolean): void | Object {
    if (props.type || !tabs.current.length) return {}

    let style: any = {}
    let offset = 0
    let tabWidth = 0
    let children =
      state.children instanceof Array ? state.children : [state.children]

    children.every((item, index) => {
      let $el = tabs.current[index]

      if (item.props.name !== state.currentName) {
        offset += $el.clientWidth
        return true
      } else {
        tabWidth = $el.clientWidth
        return false
      }
    })

    style.width = tabWidth + 'px'
    style.transform = `translateX(${offset}px)`

    if (!firstRendering) {
      style.transition =
        'transform .3s cubic-bezier(.645,.045,.355,1), -webkit-transform .3s cubic-bezier(.645,.045,.355,1)'
    }

    setState({
      ...state,
      barStyle: style
    })
  }

  function scrollPrev(): void {
    const containerWidth = navScrollRef.current.offsetWidth
    const currentOffset = getCurrentScrollOffset()
    if (!currentOffset) return
    let newOffset =
      currentOffset > containerWidth ? currentOffset - containerWidth : 0
    setOffset(newOffset)
  }

  function scrollNext(): void {
    const navWidth = navRef.current.offsetWidth
    const containerWidth = navScrollRef.current.offsetWidth
    const currentOffset = getCurrentScrollOffset()
    if (navWidth - currentOffset <= containerWidth) return
    let newOffset =
      navWidth - currentOffset > containerWidth * 2
        ? currentOffset + containerWidth
        : navWidth - containerWidth
    setOffset(newOffset)
  }

  function scrollToActiveTab(): void {
    if (!state.scrollable) return

    const nav = navRef.current
    const activeTab = nav.querySelector('.is-active')
    const navScroll = navScrollRef.current
    const activeTabBounding = activeTab.getBoundingClientRect()
    const navScrollBounding = navScroll.getBoundingClientRect()
    const navBounding = nav.getBoundingClientRect()
    const currentOffset = getCurrentScrollOffset()
    let newOffset = currentOffset

    if (activeTabBounding.left < navScrollBounding.left) {
      newOffset =
        currentOffset - (navScrollBounding.left - activeTabBounding.left)
    }

    if (activeTabBounding.right > navScrollBounding.right) {
      newOffset =
        currentOffset + activeTabBounding.right - navScrollBounding.right
    }

    if (navBounding.right < navScrollBounding.right) {
      newOffset = nav.offsetWidth - navScrollBounding.width
    }

    setOffset(Math.max(newOffset, 0))
  }

  function getCurrentScrollOffset(): number {
    const { navStyle } = state
    return navStyle.transform
      ? Number(navStyle.transform.match(/translateX\(-(\d+(\.\d+)*)px\)/)[1])
      : 0
  }

  function setOffset(value: number): void {
    setState({
      ...state,
      navStyle: {
        transform: `translateX(-${value}px)`
      }
    })
  }

  function update(): void {
    const navWidth = navRef.current.offsetWidth
    const containerWidth = navScrollRef.current.offsetWidth
    const currentOffset = getCurrentScrollOffset()

    if (containerWidth < navWidth) {
      const currentOffset = getCurrentScrollOffset()
      setState({
        ...state,
        scrollable: true,
        scrollablePrev: currentOffset,
        scrollableNext: currentOffset + containerWidth < navWidth
      })

      if (navWidth - currentOffset < containerWidth) {
        setOffset(navWidth - containerWidth)
      }
    } else {
      setState({
        ...state,
        scrollable: false
      })

      if (currentOffset > 0) {
        setOffset(0)
      }
    }
  }
  const { barStyle, navStyle, scrollable } = state
  const tabsCls = classnames({
    'tb-tabs': true,
    'tb-tabs--card': type === 'card',
    'tb-tabs--border-card': type === 'border-card'
  })
  const addButton =
    editable || addable ? (
      <span className='tb-tabs__new-tab' onClick={() => handleTabAdd()}>
        <i className='iconfont icon-add-select' />
      </span>
    ) : null
  const scrollBtn = scrollable
    ? [
        <span
          key='tb-tabs__nav-prev'
          className={
            state.scrollPrev
              ? 'tb-tabs__nav-prev'
              : 'tb-tabs__nav-prev is-disabled'
          }
          onClick={() => scrollPrev()}
        >
          <i className='tb-icon-arrow-left' />
        </span>,
        <span
          key='tb-tabs__nav-next'
          className={
            state.scrollNext
              ? 'tb-tabs__nav-next'
              : 'tb-tabs__nav-next is-disabled'
          }
          onClick={() => scrollNext()}
        >
          <i className='tb-icon-arrow-right' />
        </span>
      ]
    : null

  return (
    <div className={tabsCls}>
      <div className='tb-tabs__header'>
        {addButton}
        <div
          className={
            scrollable ? 'tb-tabs__nav-wrap is-scrollable' : 'tb-tabs__nav-wrap'
          }
        >
          {scrollBtn}
          <div className='tb-tabs__nav-scroll' ref={navScrollRef}>
            <div className='tb-tabs__nav' ref={navRef} style={navStyle}>
              {React.Children.map(state.children, (item, index) => {
                const { name, label, disabled } = item.props
                const tabCls = classnames({
                  'tb-tabs__item': true,
                  'is-active': name === state.currentName,
                  'is-disabled': disabled,
                  'is-closable': closable || item.props.closable
                })

                return (
                  <div
                    key={`tb-tabs__item-${index}`}
                    ref={(tab) => tab && tabs.current.push(tab)}
                    // name={name}
                    className={tabCls}
                    onClick={(e) => handleTabClick(item, e)}
                  >
                    {label}

                    {editable || closable || item.props.closable ? (
                      <i
                        className='iconfont icon-close'
                        onClick={(e) => handleTabRemove(item, index, e)}
                      />
                    ) : null}
                  </div>
                )
              })}

              {!type ? (
                <div className='tb-tabs__active-bar' style={barStyle} />
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div className='tb-tabs__content'>
        {React.Children.map(state.children, (item) => {
          const { name } = item.props

          // let transitionName = '';
          //
          // if (name === currentName) {
          //   transitionName = 'slideInRight';
          // }

          return name === state.currentName ? item : null
        })}
      </div>
    </div>
  )
}

Tabs.propTypes = {
  type: PropTypes.oneOf(['card', 'border-card']),
  activeName: PropTypes.string,
  value: PropTypes.string,
  closable: PropTypes.bool,
  addable: PropTypes.bool,
  editable: PropTypes.bool,
  onTabClick: PropTypes.func,
  onTabRemove: PropTypes.func,
  onTabAdd: PropTypes.func,
  onTabEdit: PropTypes.func
}
Tabs.defaultProps = {
  closable: false,
  addable: false,
  edidable: false
}

Tabs.Pane = TabPane

export default Tabs
