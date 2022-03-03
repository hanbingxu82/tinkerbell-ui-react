/*
 * @Author: your name
 * @Date: 2022-03-02 10:51:14
 * @LastEditTime: 2022-03-02 10:51:15
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/utils/type.ts
 */
// https://stackoverflow.com/questions/46176165/ways-to-get-string-literal-type-of-array-values-without-enum-overhead
export const tuple = <T extends string[]>(...args: T) => args

export const tupleNum = <T extends number[]>(...args: T) => args

/**
 * https://stackoverflow.com/a/59187769 Extract the type of an element of an array/tuple without
 * performing indexing
 */
export type ElementOf<T> = T extends (infer E)[]
  ? E
  : T extends readonly (infer F)[]
  ? F
  : never

/** https://github.com/Microsoft/TypeScript/issues/29729 */
export type LiteralUnion<T extends U, U> = T | (U & {})
