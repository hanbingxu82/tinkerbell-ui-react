/*
 * @Author your name
 * @Date: 2022-03-26 14:39:44
 * @LastEditTime: 2022-06-10 17:35:56
 * @LastEditors: 韩旭小天才 905583741@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/TimeLine/index.tsx
 */
// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import './index.scss'
const classnames = require('classnames')

interface Iprops {
  pending: boolean
  prefixCls: string
}
function TimeLine(props: any) {
  const { pending = false, prefixCls = 'tb-timeline' }: Iprops = props
  const [classes, setClasses] = useState('')
  useEffect(() => {
    setClasses(
      [
        `${prefixCls}`,
        classnames({
          [`${prefixCls}-pending`]: pending
        })
      ].join(' ')
    )
  }, [pending, prefixCls])
  return <ul className={classes}>{props.children}</ul>
}
export default TimeLine
