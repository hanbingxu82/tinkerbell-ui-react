/*
 * @Author: your name
 * @Date: 2022-04-22 10:34:03
 * @LastEditTime: 2022-04-22 10:34:04
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/utils/errors.ts
 */
export class ExtendableError extends Error {
  constructor(message: any) {
    super(message)
    this.name = this.constructor.name
    this.message = message
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor)
    } else {
      this.stack = new Error(message).stack
    }
  }
}

export class MethodImplementationRequiredError extends ExtendableError {
  constructor(msg: any) {
    super(msg)
  }
}
