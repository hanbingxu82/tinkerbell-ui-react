/*
 * @Author: your name
 * @Date: 2022-03-02 10:50:57
 * @LastEditTime: 2022-03-02 10:50:57
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/utils/colors.ts
 */
import { ElementOf, tuple } from './type';

export const PresetStatusColorTypes = tuple('success', 'processing', 'error', 'default', 'warning');
// eslint-disable-next-line import/prefer-default-export
export const PresetColorTypes = tuple(
  'pink',
  'red',
  'yellow',
  'orange',
  'cyan',
  'green',
  'blue',
  'purple',
  'geekblue',
  'magenta',
  'volcano',
  'gold',
  'lime',
);

export type PresetColorType = ElementOf<typeof PresetColorTypes>;
export type PresetStatusColorType = ElementOf<typeof PresetStatusColorTypes>;