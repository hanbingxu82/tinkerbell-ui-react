/*
 * @Author: your name
 * @Date: 2022-04-22 11:24:22
 * @LastEditTime: 2022-04-22 11:25:25
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/utils/IDGenerator.ts
 */
export class IDGenerator {
  id: number
  constructor() {
    this.id = 0
  }

  next() {
    return this.id++ & 0xffff
  }
}
