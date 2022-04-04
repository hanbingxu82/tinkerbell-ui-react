/*
 * @Author: your name
 * @Date: 2022-04-01 10:39:48
 * @LastEditTime: 2022-04-04 10:58:52
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/TabPane/index.tsx
 */
/* @flow */

import React from 'react'
const classnames = require('classnames')
const PropTypes = require('prop-types')

type Props = {
  children: any
  label: string | any
  name: string
  disabled: boolean
  closable: boolean
}
const TabPane = (props: Props) => {
  return <div className={classnames('tb-tab-pane')}>{props.children}</div>
}

TabPane.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  name: PropTypes.string,
  disabled: PropTypes.bool,
  closable: PropTypes.bool
}

TabPane.defaultProps = {
  disabled: false,
  closable: false
}

export default TabPane
