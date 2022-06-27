/*
 * @Author: 韩旭小天才
 * @Date: 2022-06-27 17:18:51
 * @LastEditors: 韩旭小天才
 * @LastEditTime: 2022-06-27 18:18:01
 * @Description: file content
 */

// eslint-disable-next-line
import React from 'react'
import RightSmallNav from '../../../components/RightSmallNav'
import HocMixins from '../../../components/HocMixins'

// 定义当前传递过来的数据是所有类型的数据
const rightTitle = [
  { title: '快速上手', id: 'kuai-su-shang-shou' },
  { title: '引入tinkerbell-ui', id: 'yin-ru-tinkerbell-ui' },
  { title: '开始使用', id: 'kai-shi-shi-yong' }
]

function QuickStart() {
  const nodeStr = `
  <h2
  id="kuai-su-shang-shou"
  style='box-sizing: border-box; margin: 0px; padding: 10px 0px; font-size: 28px; font-weight: 400; color: rgb(31, 47, 61); border-bottom: 1px solid rgb(197, 217, 232); font-family: -apple-system, system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; white-space: normal; background-color: rgb(255, 255, 255);'
>
  <a href="#kuai-su-shang-shou" class="header-anchor" style="box-sizing: border-box; color: rgb(16, 137, 255); text-decoration-line: none;">¶</a>&nbsp;快速上手
</h2>
<p
  style='box-sizing: border-box; margin-top: 1em; margin-bottom: 1em; padding: 0px; color: rgba(0, 0, 0, 0.85); font-family: -apple-system, system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; font-size: 14px; white-space: normal; background-color: rgb(255, 255, 255);'
>
  本节将介绍如何在项目中使用 tinkerbell-ui-react。
</p>
<h3
  id="yin-ru-tinkerbell-ui"
  style='box-sizing: border-box; margin: 36px 0px 20px; padding: 0px; font-size: 22px; font-weight: 400; color: rgb(31, 47, 61); font-family: -apple-system, system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; white-space: normal; background-color: rgb(255, 255, 255);'
>
  <a href="#yin-ru-tinkerbell-ui" class="header-anchor" style="box-sizing: border-box; color: rgb(16, 137, 255); text-decoration-line: none;">¶</a>&nbsp;引入 tinkerbell-ui
</h3>
  `
  const nodeStr1 = `
  <h3
  id="kai-shi-shi-yong"
  style='box-sizing: border-box; margin: 36px 0px 20px; padding: 0px; font-size: 22px; font-weight: 400; color: rgb(31, 47, 61); font-family: -apple-system, system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; white-space: normal; background-color: rgb(255, 255, 255);'
>
  <a href="#kai-shi-shi-yong" class="header-anchor" style="box-sizing: border-box; color: rgb(16, 137, 255); text-decoration-line: none;">¶</a>&nbsp;开始使用
</h3>
<p
  style='box-sizing: border-box; margin-top: 1em; margin-bottom: 1em; padding: 0px; color: rgba(0, 0, 0, 0.85); font-family: -apple-system, system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; font-size: 14px; white-space: normal; background-color: rgb(255, 255, 255);'
>
  至此，一个基于 React 和 tinkerbell-ui-react 的开发环境已经搭建完毕。各个组件的使用方法请参阅它们各自的文档。
</p>
  `
  const html1 = `import { Button } from 'antd';
import 'tinkerbell-ui-react/dist/index.css'

  const App = () => (
    &lt;&gt;
      &lt;Button type="primary"&gt;PRESS ME&lt/Button&gt;
    &lt;/&gt;
  );`
  /**
   * @description: 点击右侧区域跳转至对应的html区域
   * @param {id:string} id:id节点地址
   * @return {*}
   */
  function goMeowPoint(id: string) {
    const containern: any = window.document.querySelector('#' + id)
    containern.scrollIntoView(true)
  }
  return (
    <div className='QuickStart'>
      <div dangerouslySetInnerHTML={{ __html: nodeStr }}></div>
      <pre>
        <code dangerouslySetInnerHTML={{ __html: html1 }}></code>
      </pre>
      <div dangerouslySetInnerHTML={{ __html: nodeStr1 }}></div>
      <RightSmallNav rightTitle={rightTitle} goMeowPoint={goMeowPoint} />
    </div>
  )
}
export default HocMixins(QuickStart, rightTitle)
