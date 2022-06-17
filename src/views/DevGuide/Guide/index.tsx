/*
 * @Author: 韩旭小天才 905583741@qq.com
 * @Date: 2022-06-09 19:39:45
 * @LastEditors: 韩旭小天才 905583741@qq.com
 * @LastEditTime: 2022-06-16 18:01:57
 * @FilePath: /tinkerbell-ui-react/src/views/Guide/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// eslint-disable-next-line
import React from 'react'
import RightSmallNav from '../../../components/RightSmallNav'
import HocMixins from '../../../components/HocMixins'

// 定义当前传递过来的数据是所有类型的数据
const rightTitle = [
  { title: '介绍', id: 'jie-shao' },
  { title: '概述', id: 'gai-shu' },
  { title: '最新版本', id: 'zui-xin-ban-ben' },
  { title: '支持环境', id: 'zhi-chi-huan-jing' },
  { title: '相关链接', id: 'xiang-guan-lian-jie' }
]

function Guide() {
  const nodeStr = `
  <h2 id="jie-shao" className="Guide1" style="box-sizing: border-box; margin: 0px; padding: 10px 0px; font-size: 28px; font-weight: 400; color: rgb(31, 47, 61); border-bottom: 1px solid rgb(197, 217, 232); font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;; white-space: normal; background-color: rgb(255, 255, 255);">
      <a href="#jie-shao" class="header-anchor"  style="box-sizing: border-box; color: rgb(16, 137, 255); text-decoration-line: none;">¶</a>&nbsp;介绍
  </h2>
  <p style="box-sizing: border-box; margin-top: 1em; margin-bottom: 1em; padding: 0px; color: rgba(0, 0, 0, 0.85); font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;; font-size: 14px; white-space: normal; background-color: rgb(255, 255, 255);">
      tinkerbell-ui-react 是一款基于 React-Hook 技术实现的的前端 UI 组件库，是个人在工作中为了更好的学习和使用 React 相关技术栈而实现的。
  </p>
  <p style="box-sizing: border-box; margin-top: 1em; margin-bottom: 1em; padding: 0px; color: rgba(0, 0, 0, 0.85); font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;; font-size: 14px; white-space: normal; background-color: rgb(255, 255, 255);">
      本项目的源码和文档主要参考借鉴了&nbsp;<code style="box-sizing: border-box; margin: 0px; padding: 0px 4px; background-color: rgb(249, 250, 252); border: 1px solid rgb(234, 238, 251); border-radius: 4px; line-height: 2em;">element-ui</code>和&nbsp;<code style="box-sizing: border-box; margin: 0px; padding: 0px 4px; background-color: rgb(249, 250, 252); border: 1px solid rgb(234, 238, 251); border-radius: 4px; line-height: 2em;">Ant Design</code>以及&nbsp;<code style="box-sizing: border-box; margin: 0px; padding: 0px 4px; background-color: rgb(249, 250, 252); border: 1px solid rgb(234, 238, 251); border-radius: 4px; line-height: 2em;">bin-ui</code>。分离了常用业务组件并封装，部分组件参考这三个开源库进行了简化实现。现已实现扩展了约 50 个组件可供日常开发。
  </p>
  <p style="box-sizing: border-box; margin-top: 1em; margin-bottom: 1em; padding: 0px; color: rgba(0, 0, 0, 0.85); font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;; font-size: 14px; white-space: normal; background-color: rgb(255, 255, 255);">
      添加了开源协议，编写本UI库的目的也是为了学习提升，熟悉 React 相关技术栈及相关UI控件的实现和开发。
  </p>
  <p style="box-sizing: border-box; margin-top: 1em; margin-bottom: 1em; padding: 0px; color: rgba(0, 0, 0, 0.85); font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;; font-size: 14px; white-space: normal; background-color: rgb(255, 255, 255);">
      组件库的更新请参考[更新日志]
  </p>
  <h3 id="gai-shu" style="box-sizing: border-box; margin: 36px 0px 20px; padding: 0px; font-size: 22px; font-weight: 400; color: rgb(31, 47, 61); font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;; white-space: normal; background-color: rgb(255, 255, 255);">
      <a href="#gai-shu" class="header-anchor" style="box-sizing: border-box; color: rgb(16, 137, 255); text-decoration-line: none;">¶</a>&nbsp;概述
  </h3>
  <ul  class=" list-paddingleft-2">
      <li style="list-style: circle;margin:20px 20px">
          <p>
          💪 基于 React 16.8+ Hook API
          </p>
      </li>
      <li style="list-style: circle;margin:20px 20px">
          <p>
          🌈 最新图标基于阿里iconfont 图标精简版
          </p>
      </li>
      <li style="list-style: circle;margin:20px 20px">
          <p>
          ⌨️ 部分组件代码进行重构
          </p>
      </li>
      <li style="list-style: circle;margin:20px 20px">
          <p>
          🗑 移除了部分冗余代码
          </p>
      </li>
  </ul>
  <h3 id="zui-xin-ban-ben" style="box-sizing: border-box; margin: 36px 0px 20px; padding: 0px; font-size: 22px; font-weight: 400; color: rgb(31, 47, 61); font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;; white-space: normal; background-color: rgb(255, 255, 255);">
      <a href="#zui-xin-ban-ben" class="header-anchor" style="box-sizing: border-box; color: rgb(16, 137, 255); text-decoration-line: none;">¶</a>&nbsp;最新版本
  </h3>
  <p style="box-sizing: border-box; margin-top: 1em; margin-bottom: 1em; padding: 0px; color: rgba(0, 0, 0, 0.85); font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;; font-size: 14px; white-space: normal; background-color: rgb(255, 255, 255);">
      <a href="https://www.npmjs.com/package/tinkerbell-ui" style="box-sizing: border-box; color: rgb(16, 137, 255); text-decoration-line: none;">
     <img alt="npm" src="https://img.shields.io/npm/v/tinkerbell-ui-react" style="box-sizing: border-box; border: 0px;"/>
      </a>
  </p>
  <h3 id="zhi-chi-huan-jing" style="box-sizing: border-box; margin: 36px 0px 20px; padding: 0px; font-size: 22px; font-weight: 400; color: rgb(31, 47, 61); font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;; white-space: normal; background-color: rgb(255, 255, 255);">
  <a href="#zhi-chi-huan-jing" class="header-anchor" style="box-sizing: border-box; color: rgb(16, 137, 255); text-decoration-line: none;">¶</a>&nbsp;支持环境
</h3>
<ul  class=" list-paddingleft-2">
<li style="list-style: circle;margin:20px 20px">
    <p>
    暂不支持IE所有版本，建议使用 谷歌Chrome 浏览器
    </p>
</li>

</ul>
  <h3 id="xiang-guan-lian-jie" style="box-sizing: border-box; margin: 36px 0px 20px; padding: 0px; font-size: 22px; font-weight: 400; color: rgb(31, 47, 61); font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;; white-space: normal; background-color: rgb(255, 255, 255);">
      <a href="#xiang-guan-lian-jie" class="header-anchor" style="box-sizing: border-box; color: rgb(16, 137, 255); text-decoration-line: none;">¶</a>&nbsp;相关链接
  </h3>
  <p style="box-sizing: border-box; margin-top: 1em; margin-bottom: 1em; padding: 0px; color: rgba(0, 0, 0, 0.85); font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;; font-size: 14px; white-space: normal; background-color: rgb(255, 255, 255);">
      <a href="https://element.eleme.cn/" style="box-sizing: border-box; color: rgb(16, 137, 255); text-decoration-line: none;">element-ui</a>
  </p>
  <p style="box-sizing: border-box; margin-top: 1em; margin-bottom: 1em; padding: 0px; color: rgba(0, 0, 0, 0.85); font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;; font-size: 14px; white-space: normal; background-color: rgb(255, 255, 255);">
      <a href="https://ant-design.gitee.io/index-cn" style="box-sizing: border-box; color: rgb(16, 137, 255); text-decoration-line: none;">Ant Design</a>
  </p>
  <p style="box-sizing: border-box; margin-top: 1em; margin-bottom: 1em; padding: 0px; color: rgba(0, 0, 0, 0.85); font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;; font-size: 14px; white-space: normal; background-color: rgb(255, 255, 255);">
      <a href="https://wangbin3162.gitee.io/bin-ui/" style="box-sizing: border-box; color: rgb(16, 137, 255); text-decoration-line: none;">bin-ui</a>
  </p>
  `
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
    <div className='Guide'>
      <div dangerouslySetInnerHTML={{ __html: nodeStr }}></div>
      <RightSmallNav rightTitle={rightTitle} goMeowPoint={goMeowPoint} />
    </div>
  )
}
export default HocMixins(Guide, rightTitle)
