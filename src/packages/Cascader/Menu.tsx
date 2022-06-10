/*
 * @Author: 韩旭小天才 905583741@qq.com
 * @Date: 2022-04-28 15:46:06
 * @LastEditors: 韩旭小天才 905583741@qq.com
 * @LastEditTime: 2022-06-10 17:34:42
 * @FilePath: /tinkerbell-ui-react/src/packages/Cascader/Menu.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// eslint-disable-next-line
import React, { useEffect, useState, useCallback } from 'react'
import CSSMotion from 'rc-motion'

const PropTypes = require('prop-types')
const classnames = require('classnames')
type State = {
  inputWidth: number
  options: []
  props: {}
  visible: boolean
  activeValue: any
  value: []
  expandTrigger: string
  changeOnSelect: boolean
  popperClass: string
}

const CascaderMenu: any = React.forwardRef((props: any, ref: any) => {
  let [state, setState] = useState<State>({
    inputWidth: 0,
    options: [],
    props: {},
    visible: false,
    activeValue: [],
    value: [],
    expandTrigger: 'click',
    changeOnSelect: false,
    popperClass: ''
  })

  // 强制更新视图方法 start
  const [, updateState] = useState<any>()
  const forceUpdate = useCallback(() => updateState({}), [])
  // 强制更新视图方法 end

  useEffect(() => {
    props.initMenu({
      state,
      setState,
      props,
      select,
      activeItem,
      _activeOptions
    })
  }, []) // eslint-disable-line

  // 因为缓存的关系只有二者发生变化  才会触发
  // useEffect(() => {
  // setState({ ...state, activeValue: state.value })
  // }, [state.value, state.visible])

  function select(item: any, menuIndex: number) {
    let { activeValue } = state
    if (item.__IS__FLAT__OPTIONS) {
      activeValue = item.value
    } else {
      if (!menuIndex) {
        activeValue = [item.value]
      } else {
        activeValue.splice(menuIndex, activeValue.length - 1, item.value)
      }
    }

    forceUpdate()
    props.handlePick(activeValue)
  }

  //   function handleMenuLeave() {}

  function activeItem(item: any, menuIndex: number) {
    const activeOptions = _activeOptions()
    state.activeValue.splice(menuIndex, activeOptions.length, item.value)
    forceUpdate()
    if (props.props.changeOnSelect) {
      props.handlePick(state.activeValue, false)
    } else {
      props.handleActiveItemChange(state.activeValue)
    }
  }
  /* Computed Methods */

  function _activeOptions(): [] {
    const activeValue = state.activeValue
    const configurableProps = ['label', 'value', 'children', 'disabled']
    const formatOptions = (options: any) => {
      options.forEach((option: any) => {
        if (option.__IS__FLAT__OPTIONS) return
        configurableProps.forEach((prop) => {
          const value = option[props.props.props[prop] || prop]
          if (value) option[prop] = value
        })
        if (Array.isArray(option.children)) {
          formatOptions(option.children)
        }
      })
    }
    const loadActiveOptions = (options: any, activeOptions: any = []): [] => {
      const level = activeOptions.length
      activeOptions[level] = options
      let active = activeValue[level]
      if (active) {
        options = options.filter((option: any) => option.value === active)[0]
        if (options && options.children) {
          loadActiveOptions(options.children, activeOptions)
        }
      }
      return activeOptions
    }

    formatOptions(state.options)

    return loadActiveOptions(state.options)
  }
  let activeOptions = _activeOptions()
  // useEffect(() => {
  //   activeOptions = _activeOptions()
  // }, [state.options])
  const { expandTrigger, popperClass } = props.props
  // const { activeValue, visible } = state

  const menus = activeOptions.map((menu: any, menuIndex: number) => {
    let isFlat = false

    const items = menu.map((item: any, index: number) => {
      const events: any = {}

      if (item.__IS__FLAT__OPTIONS) isFlat = true

      if (!item.disabled) {
        if (item.children) {
          let triggerEvent = {
            click: 'onClick',
            hover: 'onMouseEnter'
          }[expandTrigger]
          events[triggerEvent] = () => {
            activeItem(item, menuIndex)
          }
        } else {
          events.onClick = () => {
            select(item, menuIndex)
          }
        }
      }

      return (
        <li
          key={index}
          className={classnames({
            'tb-cascader-menu__item': true,
            'tb-cascader-menu__item--extensible': item.children,
            'is-active': item.value === state.activeValue[menuIndex],
            'is-disabled': item.disabled
          })}
          {...events}
        >
          {item.label}
        </li>
      )
    })

    let menuStyle: { minWidth: null | string | any } = { minWidth: null }

    if (isFlat) {
      menuStyle.minWidth = state.inputWidth + 'px'
    }

    return (
      <ul
        key={menuIndex}
        className={classnames({
          'tb-cascader-menu': true,
          'tb-cascader-menu--flexible': isFlat
        })}
        style={menuStyle}
      >
        {items}
      </ul>
    )
  })

  return (
    <span ref={ref}>
      <CSSMotion
        visible={state.visible}
        onEnterActive={(HTMLElement) => {
          HTMLElement.style.display = 'block'
          //   onEnter()
        }}
        removeOnLeave={false}
        onLeaveEnd={(HTMLElement) => {
          HTMLElement.style.display = 'none'
          //   onAfterLeave()
        }}
        motionName='tb-zoom-in-top'
      >
        {({ className, style }) => (
          <div
            className={classnames('tb-cascader-menus', popperClass, className)}
            style={{ ...style }}
          >
            {menus}
          </div>
        )}
      </CSSMotion>
    </span>
  )
})

CascaderMenu.contextTypes = {
  component: PropTypes.any
}

export default CascaderMenu
