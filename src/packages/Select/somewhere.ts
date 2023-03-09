/*
 * @Author: your name
 * @Date: 2022-04-15 16:10:33
 * @LastEditTime: 2023-03-09 15:27:38
 * @LastEditors: hanbingxu
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/Select/somewhere.ts
 */
export function listenForOutsideClicks(
  listening: any,
  setListening: (arg0: boolean) => void,
  menuRef: { current: { contains: (arg0: EventTarget | null) => any } },
  setVisible: any,
  hideMenu?: () => void
) {
  return () => {
    if (listening) return
    if (!menuRef.current) return
    console.log(123, listening, menuRef.current)
    setListening(true)
    // 自定义删除函数
    function documentSelectClickFun(evt: any) {
      if (!menuRef.current) return
      if (menuRef.current.contains(evt.target)) return
      if (hideMenu) {
        hideMenu()
      } else {
        setVisible(false)
      }
    }
    ;[`click`, `touchstart`].forEach((item) => {
      console.log(123)
      document.addEventListener(item, documentSelectClickFun)
    })
      return () => {
        // 组件销毁时，将对应的 document 绑定的click、touchstart销毁
        console.log('页面组件销毁时，当前有无执行')
          ;[`click`, `touchstart`].forEach((item) => {
            document.removeEventListener(item, documentSelectClickFun)
          })
      }
  }
}
