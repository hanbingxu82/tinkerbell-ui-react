/*
 * @Author: your name
 * @Date: 2022-04-07 10:12:01
 * @LastEditTime: 2022-04-07 10:13:02
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/utils/utils.ts
 */
export const cleanScrollBar = () => {
  document.querySelectorAll('.el-table__body-wrapper').forEach((el: any) => {
    setTimeout(() => {
      el.style.overflow = 'hidden'
      setTimeout(() => (el.style.overflow = 'auto'))
    })
  })
}
