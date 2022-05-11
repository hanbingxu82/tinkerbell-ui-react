/*
 * @Author: your name
 * @Date: 2022-05-09 18:35:46
 * @LastEditTime: 2022-05-11 16:35:36
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/Menu/MenuItemGroup.tsx
 */
// eslint-disable-next-line 
import React, { useEffect, useState } from 'react'

const classnames = require('classnames')
const PropTypes = require('prop-types')

type State = {
  paddingLeft: number
}

const MenuItemGroup: any = React.forwardRef((props: any, ref: any) => {
  const instanceType = 'MenuItemGroup'
  let [state, setState] = useState<State>({
    paddingLeft: 20
  })
  useEffect(() => {
    initPadding()
  }, [])// eslint-disable-line 

  function initPadding(): void {
    let level = 0,
      parent = props.parent,
      component = parent.instanceType

    while (component !== 'Menu') {
      if (component === 'SubMenu') {
        level++
      }

      parent = parent.props.parent
      component = parent.instanceType
    }

    setState({
      paddingLeft: state.paddingLeft + level * 10
    })
  }
  return (
    <li
      ref={ref}
      style={props.style}
      className={classnames('tb-menu-item-group')}
    >
      <div
        className='tb-menu-item-group__title'
        style={{
          paddingLeft: state.paddingLeft
        }}
      >
        {props.title}
      </div>
      <ul>
        {React.Children.map(props.children, (item) => {
          return React.cloneElement(item, {
            item,
            componentName: 'MenuItemGroup',
            parent: {
              props,
              state,
              instanceType
            }
          })
        })}
      </ul>
    </li>
  )
})

MenuItemGroup.propTypes = {
  title: PropTypes.string.isRequired
}

export default MenuItemGroup