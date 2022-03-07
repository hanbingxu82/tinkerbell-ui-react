/*
 * @Author: your name
 * @Date: 2022-03-02 10:21:44
 * @LastEditTime: 2022-03-03 09:11:01
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/Tooltip/index.tsx
 */
import React, { useState, useEffect } from 'react'
import Tool from 'rc-tooltip'
import useMergedState from 'rc-util/lib/hooks/useMergedState'
import './index.scss'
interface Iprops {
  type: string

  title: any
  overlay: any
}
function Tooltip(props: any) {
  const { type, title, overlay }: Iprops = props
  const [tColor, setTColor] = useState<any>('default')
  const [visible, setVisible] = useMergedState(false, {
    value: props.visible,
    defaultValue: props.defaultVisible
  })
  const isNoTitle = () => {
    return !title && !overlay && title !== 0 // overlay for old version compatibility
  }

  const onVisibleChange = (vis: boolean) => {
    setVisible(isNoTitle() ? false : vis)

    if (!isNoTitle()) {
      props.onVisibleChange?.(vis)
    }
  }
  let tempVisible = visible
  // Hide tooltip when there is no title
  if (!('visible' in props) && isNoTitle()) {
    tempVisible = false
  }
  // 背景颜色监听器
  useEffect(() => {
    return setTColor(type)
  }, [type])
  return (
    <Tool
      placement={props.placement}
      prefixCls={'tb-tooltip'}
      overlay={props.title}
      trigger={props.trigger}
      align={props.align}
      defaultVisible={props.defaultVisible}
      overlayClassName={'tb-tooltip-color_' + tColor}
      visible={tempVisible}
      onVisibleChange={onVisibleChange}
    >
      {props.children}
    </Tool>
  )
}
Tooltip.defaultProps = {
  placement: 'top',
  mouseEnterDelay: 0.1,
  mouseLeaveDelay: 0.1,
  arrowPointAtCenter: false,
  autoAdjustOverflow: true
}
export default Tooltip