/*
 * @Author: your name
 * @Date: 2022-04-15 16:10:33
 * @LastEditTime: 2022-05-07 14:38:51
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/Input/somewhere.tsx
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
    setListening(true)
    ;[`click`, `touchstart`].forEach(() => {
      document.addEventListener(`click`, (evt) => {
        if (menuRef.current.contains(evt.target)) return
        if (hideMenu) {
          hideMenu()
        } else {
          setVisible(false)
        }
      })
    })
  }
}
