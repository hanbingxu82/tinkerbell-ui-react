/*
 * @Author: your name
 * @Date: 2022-05-09 18:35:12
 * @LastEditTime: 2022-05-10 18:40:13
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/Menu/Menu.tsx
 */
// eslint-disable-next-line
import React, { useState, useEffect, useRef, useCallback } from 'react'
const classnames = require('classnames')
const PropTypes = require('prop-types')

type State = {
  activeIndex: number
  openedMenus: Array<number>
  menuItems: any
  submenus: any
}

const Menu: any = React.forwardRef((props: any, ref: any) => {
  const instanceType = 'Menu'
  const [state] = useState<State>({
    activeIndex: props.defaultActive,
    openedMenus: props.defaultOpeneds ? props.defaultOpeneds.slice(0) : [],
    menuItems: {},
    submenus: {}
  })
  const defaultActiveValue: any = useRef('')

  // 强制更新视图方法 start
  const [, updateState] = useState<any>()
  const forceUpdate = useCallback(() => updateState({}), [])
  // 强制更新视图方法 end

  /** 监听 变化current Start*/
  // let watchStateAO = useRef('')
  // let watchStateA = useRef('')
  /** 监听 变化current End */

  useEffect(() => {
    openActiveItemMenus()
  }, []) // eslint-disable-line
  function openMenu(index: number, indexPath: Array<number>): void {
    let { openedMenus } = state
    if (openedMenus.indexOf(index) !== -1) return
    // 将不在该菜单路径下的其余菜单收起
    if (props.uniqueOpened) {
      openedMenus = openedMenus.filter((index) => {
        return indexPath.indexOf(index) !== -1
      })
    }
    openedMenus.push(index)
    state.openedMenus = openedMenus
    forceUpdate()
  }

  function closeMenu(index: number): void {
    let { openedMenus } = state
    openedMenus.splice(openedMenus.indexOf(index), 1)
    state.openedMenus = openedMenus
    forceUpdate()
  }

  function handleSubmenuClick(index: number, indexPath: Array<number>): void {
    let isOpened = state.openedMenus.indexOf(index) !== -1

    if (isOpened) {
      closeMenu(index)

      if (props.onClose) {
        props.onClose(index, indexPath)
      }
    } else {
      openMenu(index, indexPath)

      if (props.onOpen) {
        props.onOpen(index, indexPath)
      }
    }
  }

  function handleSelect(
    index: number,
    indexPath: Array<number>,
    instance: any
  ): void {
    let { activeIndex, openedMenus, submenus } = state
    activeIndex = index
    if (props.onSelect) {
      props.onSelect(index, indexPath, instance)
    }

    if (props.mode === 'horizontal') {
      for (const key in submenus) {
        submenus[key].onItemSelect(index, indexPath)
      }

      openedMenus = []
    }
    state.activeIndex = activeIndex
    state.openedMenus = openedMenus
    forceUpdate()
    if (props.mode === 'vertical') {
      openActiveItemMenus()
    }
  }

  function openActiveItemMenus(): void {
    let { activeIndex, menuItems, submenus } = state
    if (!menuItems[activeIndex]) return
    if (activeIndex && props.mode === 'vertical') {
      let indexPath = menuItems[activeIndex].indexPath
      // 展开该菜单项的路径上所有子菜单
      indexPath.forEach((index: number) => {
        const submenu = submenus[index]
        submenu && openMenu(index, submenu.indexPath)
      })
    }
  }
  useEffect(() => {
    if (props.defaultActive) {
      defaultActiveChanged(props.defaultActive)
    }
  }, [props.defaultActive]) // eslint-disable-line

  function defaultActiveChanged(value: number): void {
    defaultActiveValue.current = value
    state.activeIndex = value
    forceUpdate()
    // setState({ ...state, activeIndex: value })
    if (!state.menuItems[defaultActiveValue.current]) return
    let menuItem = state.menuItems[defaultActiveValue.current]
    let indexPath = menuItem.indexPath(menuItem.props)
    handleSelect(defaultActiveValue.current, indexPath, menuItem)
  }

  useEffect(() => {
    if (props.defaultOpeneds) {
      defaultOpenedsChanged(props.defaultOpeneds)
    }
  }, [props.defaultOpeneds]) // eslint-disable-line

  function defaultOpenedsChanged(value: any): void {
    state.openedMenus = value
    forceUpdate()
  }
  return (
    <ul
      ref={ref}
      style={props.style}
      className={classnames('el-menu', {
        'el-menu--horizontal': props.mode === 'horizontal',
        'el-menu--dark': props.theme === 'dark'
      })}
    >
      {React.Children.map(props.children, (item) => {
        return React.cloneElement(item, {
          item,
          componentName: 'Menu',
          parent: {
            props,
            state,
            defaultActiveChanged,
            defaultOpenedsChanged,
            instanceType,
            handleSelect,
            handleSubmenuClick,
            closeMenu,
            openMenu
          }
        })
      })}
    </ul>
  )
})

Menu.childContextTypes = {
  component: PropTypes.any
}

Menu.propTypes = {
  mode: PropTypes.string,
  defaultActive: PropTypes.string,
  defaultOpeneds: PropTypes.arrayOf(PropTypes.any),
  theme: PropTypes.string,
  uniqueOpened: PropTypes.bool,
  menuTrigger: PropTypes.string,
  onSelect: PropTypes.func,
  onOpen: PropTypes.func,
  onClose: PropTypes.func
}

Menu.defaultProps = {
  mode: 'vertical',
  theme: 'light',
  menuTrigger: 'hover'
}

export default Menu
