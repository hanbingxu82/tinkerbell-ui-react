/*
 * @Author: your name
 * @Date: 2022-04-12 15:38:05
 * @LastEditTime: 2022-04-20 10:04:54
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/Select/OptionGroup.tsx
 */
import React from 'react'
const classnames = require('classnames')
const PropTypes = require('prop-types')

const OptionGroup = function (props: any) {
  return (
    <ul style={props.style} className={classnames('tb-select-group__wrap')}>
      <li className='tb-select-group__title'>{props.label}</li>
      <li>
        <ul className='tb-select-group'>
          {React.Children.map(props.children, (child) => {
            // to do sth
            return React.cloneElement(child, {
              onOptionCreate: props.onOptionCreate,
              onOptionDestroy: props.onOptionDestroy,
              addOptionToValue: props.addOptionToValue,
              onOptionClick: props.onOptionClick,
              hoverItem: props.hoverItem,
              queryChange: props.queryChange,
              props: props.props,
              state: props.state
            })
          })}
        </ul>
      </li>
    </ul>
  )
}
OptionGroup.propTypes = {
  label: PropTypes.string
}

export default OptionGroup
