/*
 * @Author: your name
 * @Date: 2022-04-06 16:48:49
 * @LastEditTime: 2022-04-07 10:16:39
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/Dialog/DialogFooter.tsx
 */
import React from 'react'
function DialogFooter(props: any) {
  return (
    <div style={props.style} className={'el-dialog__footer'}>
      {props.children}
    </div>
  )
}
export default DialogFooter
