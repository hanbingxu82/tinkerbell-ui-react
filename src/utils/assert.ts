/*
 * @Author: your name
 * @Date: 2022-04-22 10:32:47
 * @LastEditTime: 2022-04-22 10:33:04
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/utils/assert.ts
 */
import { ExtendableError } from './errors'

class ErrorConditionFailed extends ExtendableError {
  constructor(...args: string[]) {
    super(args)
  }
}

export function require_condition(condition:any, msg = 'pre-condition failed') {
  if (!condition) {
    throw new ErrorConditionFailed(msg)
  }
}
