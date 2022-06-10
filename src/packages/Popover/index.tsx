/*
 * @Author: your name
 * @Date: 2022-04-06 10:43:31
 * @LastEditTime: 2022-06-10 17:34:55
 * @LastEditors: 韩旭小天才 905583741@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/Popover/index.tsx
 */
// eslint-disable-next-line
import * as React from 'react'
import Tooltip from '../Tooltip'
import { getRenderPropValue } from '../../utils/getRenderPropValue'
import './index.scss'

interface Iprop {
  placement: string
  transitionName: string
  trigger: string
  mouseEnterDelay: number
  mouseLeaveDelay: number
  overlayStyle: any
  title: any
  content: any
}

const Popover: any = React.forwardRef<any>((props: any, ref) => {
  const { title, content, ...otherProps }: Iprop = props
  const getOverlay = () => {
    return (
      <React.Fragment>
        {title && (
          <div className={`tb-popover-title`}>{getRenderPropValue(title)}</div>
        )}
        <div className={`tb-popover-inner-content`}>
          {getRenderPropValue(content)}
        </div>
      </React.Fragment>
    )
  }

  //   const prefixCls = getPrefixCls('popover', customizePrefixCls)
  return (
    <Tooltip
      prefixCls='tb-popover'
      {...otherProps}
      ref={ref as any}
      title={getOverlay()}
    />
  )
})

Popover.displayName = 'Popover'

Popover.defaultProps = {
  placement: 'top',
  transitionName: 'zoom-big',
  trigger: 'hover',
  mouseEnterDelay: 0.1,
  mouseLeaveDelay: 0.1,
  overlayStyle: {}
}

export default Popover
