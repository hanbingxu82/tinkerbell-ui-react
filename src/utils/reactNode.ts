/*
 * @Author: your name
 * @Date: 2022-03-02 10:48:45
 * @LastEditTime: 2022-03-02 10:48:45
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/utils/reactNode.ts
 */
import * as React from 'react'

export const { isValidElement } = React

type AnyObject = Record<any, any>

type RenderProps =
  | undefined
  | AnyObject
  | ((originProps: AnyObject) => AnyObject | undefined)

export function replaceElement(
  element: React.ReactNode,
  replacement: React.ReactNode,
  props: RenderProps
): React.ReactNode {
  if (!isValidElement(element)) return replacement

  return React.cloneElement(
    element,
    typeof props === 'function' ? props(element.props || {}) : props
  )
}

export function cloneElement(
  element: React.ReactNode,
  props?: RenderProps
): React.ReactElement {
  return replaceElement(element, element, props) as React.ReactElement
}
