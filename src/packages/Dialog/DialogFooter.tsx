/*
 * @Author: your name
 * @Date: 2022-04-06 16:48:49
 * @LastEditTime: 2022-06-10 17:37:05
 * @LastEditors: 韩旭小天才 905583741@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/Dialog/DialogFooter.tsx
 */
// eslint-disable-next-line
import React from 'react'
function DialogFooter(props: any) {
  return (
    <div style={props.style} className={'tb-dialog__footer'}>
      {props.children}
    </div>
  )
}
export default DialogFooter
