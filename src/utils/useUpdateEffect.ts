/*
 * @Author: your name
 * @Date: 2022-04-01 11:26:55
 * @LastEditTime: 2022-04-01 15:00:05
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/utils/useUpdateEffect.ts
 */
import { useEffect, useRef } from 'react'

const useUpdateEffect = (
  effect: (arg0: any, arg1: any) => any,
  oldProps: any,
  oldState: any
) => {
  const flag = useRef(true)
  let oldP = { ...oldProps }
  let oldS = { ...oldState }
  useEffect(() => {
    if (flag.current) {
      flag.current = false //当deps第一次变化时，不执行effect函数，而将flag.current置为false
    } else {
      return effect(oldP, oldS) //当deps第二次变化时，执行effect函数
    }
  }, [])
}

const useWillReceiveProps = (effect: (arg0: any) => any, oldProps: any) => {
  const flag = useRef(true)
  let oldP = { ...oldProps }
  useEffect(() => {
    if (flag.current) {
      flag.current = false //当deps第一次变化时，不执行effect函数，而将flag.current置为false
    } else {
      return effect(oldP) //当deps第二次变化时，执行effect函数
    }
  }, oldProps)
}
export { useUpdateEffect, useWillReceiveProps }
