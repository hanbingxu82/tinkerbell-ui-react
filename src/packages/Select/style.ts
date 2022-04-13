/*
 * @Author: your name
 * @Date: 2022-04-13 15:52:16
 * @LastEditTime: 2022-04-13 16:00:56
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/Select/style.tsx
 */
 function reset(css: any) {
  const style: any = document.createElement('style')

  style.type = 'text/css'

  if (style.styleSheet) {
    style.styleSheet.cssText = css
  } else {
    style.appendChild(document.createTextNode(css))
  }

  ;(document.head || document.getElementsByTagName('head')[0]).appendChild(
    style
  )
}

export default reset