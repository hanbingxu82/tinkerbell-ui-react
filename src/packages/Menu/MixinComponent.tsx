/*
 * @Author: your name
 * @Date: 2022-05-09 18:36:12
 * @LastEditTime: 2022-05-10 16:30:20
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/Menu/MixinComponent.tsx
 */
export const indexPath: any = function (props: any) {
  let path = [props.index]
  let parent = props.parent

  while (parent.instanceType !== 'Menu') {
    if (parent.props.index) {
      path.unshift(parent.props.index)
    }

    parent = parent.props.parent
  }

  return path
}

export const rootMenu: any = function (props: any) {
  let parent = props.parent
  while (parent.instanceType !== 'Menu') {
    parent = parent.props.parent
  }

  return parent
}
