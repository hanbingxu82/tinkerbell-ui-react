/*
 * @Author: your name
 * @Date: 2022-05-09 18:35:23
 * @LastEditTime: 2022-05-10 18:23:38
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/Menu/MenuItem.tsx
 */
// eslint-disable-next-line
import React, { useEffect } from 'react'
import { indexPath, rootMenu } from './MixinComponent'

const classnames = require('classnames')
const PropTypes = require('prop-types')

const MenuItem: any = React.forwardRef((props: any, ref: any) => {
  const instanceType = 'MenuItem'
  useEffect(() => {
    rootMenu(props).state.menuItems[props.index] = {
      instanceType,
      props,
      handleClick,
      active,
      indexPath
    }
  }, []) // eslint-disable-line
  function handleClick(): void {
    console.log(rootMenu(props))
    rootMenu(props).handleSelect(props.index, indexPath(props))
  }

  function active(): boolean {
    return props.index === rootMenu(props).state.activeIndex
  }
  return (
    <li
      ref={ref}
      style={props.style}
      className={classnames('el-menu-item', {
        'is-active': active(),
        'is-disabled': props.disabled
      })}
      onClick={handleClick}
    >
      {props.children}
    </li>
  )
})

MenuItem.propTypes = {
  index: PropTypes.string.isRequired,
  disabled: PropTypes.bool
}

export default MenuItem
