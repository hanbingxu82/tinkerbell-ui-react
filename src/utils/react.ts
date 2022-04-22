/*
 * @Author: your name
 * @Date: 2022-04-22 11:22:50
 * @LastEditTime: 2022-04-22 11:22:50
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/utils/react.ts
 */
import React from 'react'


function firstChild(props: { children: string | number | boolean | {} | React.ReactElement<any, string | ((props: any) => React.ReactElement<any, any> | null) | (new (props: any) => React.Component<any, any, any>)> | React.ReactNodeArray | React.ReactPortal | React.ReactNode[] | null | undefined; }) {
  const childrenArray = React.Children.toArray(props.children);
  return childrenArray[0] || null;
}

export {firstChild}