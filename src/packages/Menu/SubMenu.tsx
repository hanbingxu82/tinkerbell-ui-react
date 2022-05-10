/*
 * @Author: your name
 * @Date: 2022-05-09 18:36:20
 * @LastEditTime: 2022-05-10 19:06:19
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/Menu/SubMenu.tsx
 */
// eslint-disable-next-line
import React, { useEffect, useRef, useState } from 'react'
import { indexPath, rootMenu } from './MixinComponent'
import CollapseTransition from './Collapse'
import CSSMotion from 'rc-motion'

const classnames = require('classnames')
const PropTypes = require('prop-types')

type State = {
  active: boolean
}
let timeout: any
const SubMenu: any = React.forwardRef((props: any, _ref: any) => {
  const instanceType = 'SubMenu'

  const [state, setState] = useState<State>({
    active: false
  })
  const subRef = useRef<any>(null)
  const subTitleRef = useRef<any>(null)
  useEffect(() => {
    rootMenu(props).state.submenus[props.index] = {
      instanceType,
      state,
      props,
      onItemSelect,
      handleClick,
      handleMouseenter,
      handleMouseleave,
      opened,
      indexPath
    }
    initEvents()
  }, []) // eslint-disable-line

  function onItemSelect(_index: number, indexPath: Array<number>): void {
    setState({
      active: indexPath.indexOf(props.index) !== -1
    })
  }

  function handleClick(): void {
    rootMenu(props).handleSubmenuClick(props.index, indexPath(props))
  }

  function handleMouseenter(): void {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      rootMenu(props).openMenu(props.index, indexPath(props))
    }, 300)
  }

  function handleMouseleave(): void {
    clearTimeout(timeout)

    timeout = setTimeout(() => {
      rootMenu(props).closeMenu(props.index, indexPath(props))
    }, 300)
  }

  function initEvents(): void {
    if (
      rootMenu(props).props.mode === 'horizontal' &&
      rootMenu(props).props.menuTrigger === 'hover'
    ) {
      const triggerElm: any = subRef.current
      triggerElm.addEventListener('mouseenter', handleMouseenter)
      triggerElm.addEventListener('mouseleave', handleMouseleave)
    } else {
      const triggerElm = subTitleRef.current

      triggerElm.addEventListener('click', handleClick)
    }
  }

  function opened(): boolean {
    return rootMenu(props).state.openedMenus.indexOf(props.index) !== -1
  }

  return (
    <li
      ref={subRef}
      style={props.style}
      className={classnames('el-submenu', {
        'is-active': state.active,
        'is-opened': opened()
      })}
    >
      <div ref={subTitleRef} className='el-submenu__title'>
        {props.title}
        <i
          className={classnames(
            'el-submenu__icon-arrow',
            'iconfont',
            'icon-arrow-down'
          )}
        ></i>
      </div>
      {rootMenu(props).props.mode === 'horizontal' ? (
        <CSSMotion
          visible={opened()}
          onEnterActive={(HTMLElement) => {
            HTMLElement.style.display = 'block'
          }}
          removeOnLeave={false}
          onLeaveEnd={(HTMLElement) => {
            HTMLElement.style.display = 'none'
          }}
          motionName='tb-zoom-in-top'
        >
          {({ className, style }) => (
            <ul
              className={classnames('el-menu', className)}
              style={{ ...style }}
            >
              {React.Children.map(props.children, (item) => {
                return React.cloneElement(item, {
                  item,
                  componentName: 'SubMenu',
                  parent: {
                    instanceType,
                    state,
                    props,
                    onItemSelect,
                    handleClick,
                    handleMouseenter,
                    handleMouseleave,
                    opened
                  }
                })
              })}
            </ul>
          )}
        </CSSMotion>
      ) : (
        <CollapseTransition isShow={opened()}>
          <ul className='el-menu'>
            {' '}
            {React.Children.map(props.children, (item) => {
              return React.cloneElement(item, {
                item,
                componentName: 'SubMenu',
                parent: {
                  instanceType,
                  state,
                  props,
                  onItemSelect,
                  handleClick,
                  handleMouseenter,
                  handleMouseleave,
                  opened
                }
              })
            })}
          </ul>
        </CollapseTransition>
      )}
    </li>
  )
})

SubMenu.childContextTypes = {
  component: PropTypes.any
}

SubMenu.propTypes = {
  index: PropTypes.string.isRequired
}

export default SubMenu
