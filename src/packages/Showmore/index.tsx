/*
 * @Author: your name
 * @Date: 2022-03-03 10:40:28
 * @LastEditTime: 2022-03-28 12:11:13
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/Showmore/index.tsx
 */
import React, { useState, useEffect } from 'react'
import './index.scss'
interface Iprops {
  // 显示文本的长度  默认不折叠
  len: number
  // 文本
  text: string
  // 折叠时需要显示文案
  showText: string
  // 隐藏时需要显示文案
  hiddenText: string
  // 是否需要展示hiddenText  收起效果
  allowFold: boolean
}
// 点击展开收起执行事假
function Showmore(props: any) {
  const { len, text, showText, hiddenText, allowFold }: Iprops = props
  const [tbTextLen, setTbTextLen] = useState(len)
  function showMore() {
    setTbTextLen(tbTextLen === text.length ? len : text.length)
  }
  // 文本过滤
  function filterText(text: string, tbTextLen: number) {
    if (tbTextLen !== -1 && tbTextLen < text.length) {
      return text.substring(0, tbTextLen) + '...'
    }
    return text
  }
  // 类似于 componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    // 使用浏览器API更新文档标题
    document.title = `You clicked count times`
  }, [])// eslint-disable-line
  return (
    <span className='tb__show-more'>
      <span>{filterText(text, tbTextLen)}</span>
      {tbTextLen !== -1 && tbTextLen < text.length ? (
        <a href="/#" className='tb__show' onClick={showMore}>
          {showText}
        </a>
      ) : null}
      {tbTextLen !== -1 && tbTextLen === text.length && allowFold ? (
        <a href="/#" className='tb__hidden' onClick={showMore}>
          {hiddenText}
        </a>
      ) : null}
    </span>
  )
}
Showmore.defaultProps = {
  len: -1,
  text: '',
  showText: '显示更多',
  hiddenText: '收起'
}
export default Showmore
