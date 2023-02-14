/*
 * @Author: your name
 * @Date: 2022-04-01 11:26:55
 * @LastEditTime: 2023-02-14 18:12:55
 * @LastEditors: hanbingxu
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/utils/useUpdateEffect.ts
 */
/* eslint-disable */
import { useEffect, useRef } from 'react'

const useUpdateEffect = (
  effect: (oldP: any, oldS: any, oldV?: any) => any,
  oldProps: any = {},
  oldState: any = {},
  deps?: any[]
  // oldVisible?: any
) => {
  const flag = useRef(true)
  let oldP = { ...oldProps }
  let oldS = { ...oldState }
  // console.log(oldS)
  // let oldV = oldVisible
  useEffect(
    () => {
      if (flag.current) {
        flag.current = false //当deps第一次变化时，不执行effect函数，而将flag.current置为false
      } else {
        return effect(oldP, oldS) //当deps第二次变化时，执行effect函数
      }
    },
    deps ? deps : []
  )
}
const useWillReceiveProps = (effect: (arg0: any) => any, props: any, isFirst: Boolean, oldP: any) => {
  useEffect(() => {
    if (isFirst) {
      effect(oldP) //当deps第二次变化时，执行effect函数
    }
  }, Object.keys(props).map(item => 'props.' + item))
}
export { useUpdateEffect, useWillReceiveProps }
