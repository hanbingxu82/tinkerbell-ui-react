/*
 * @Author: your name
 * @Date: 2022-04-06 10:48:25
 * @LastEditTime: 2022-04-06 10:48:26
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/utils/getRenderPropValue.ts
 */
import * as React from 'react';

export type RenderFunction = () => React.ReactNode;

export const getRenderPropValue = (
  propValue?: React.ReactNode | RenderFunction,
): React.ReactNode => {
  if (!propValue) {
    return null;
  }

  const isRenderFunction = typeof propValue === 'function';
  if (isRenderFunction) {
    return (propValue as RenderFunction)();
  }

  return propValue;
};
