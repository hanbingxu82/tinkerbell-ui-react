/*
 * @Author: your name
 * @Date: 2022-04-21 16:52:02
 * @LastEditTime: 2022-04-22 11:59:57
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/Scrollbar/Bar.tsx
 */
import React from 'react'
import { BAR_MAP, renderThumbStyle } from './util'
import { on, off } from '../../utils/utils'
const classnames = require('classnames')
const PropTypes = require('prop-types')

export default class Bar extends React.Component {
  rootRef: any
  thumbRef: any
  props: any
  cursorDown: boolean | undefined
  static propTypes: { vertical: any; size: any; move: any; getParentWrap: any }
  constructor(props: any) {
    super(props)
    this.clickTrackHandler = this.clickTrackHandler.bind(this)
    this.clickThumbHandler = this.clickThumbHandler.bind(this)
    this.mouseMoveDocumentHandler = this.mouseMoveDocumentHandler.bind(this)
    this.mouseUpDocumentHandler = this.mouseUpDocumentHandler.bind(this)
  }

  get bar() {
    return BAR_MAP[this.props.vertical ? 'vertical' : 'horizontal']
  }

  get wrap() {
    return this.props.getParentWrap()
  }

  clickThumbHandler(e: any) {
    this.startDrag(e)
    this[this.bar.axis] =
      e.currentTarget[this.bar.offset] -
      (e[this.bar.client] -
        e.currentTarget.getBoundingClientRect()[this.bar.direction])
  }

  clickTrackHandler(e: any) {
    const offset = Math.abs(
      e.target.getBoundingClientRect()[this.bar.direction] - e[this.bar.client]
    )
    const thumbHalf = this.thumbRef[this.bar.offset] / 2
    const thumbPositionPercentage =
      ((offset - thumbHalf) * 100) / this.rootRef[this.bar.offset]

    this.wrap[this.bar.scroll] =
      (thumbPositionPercentage * this.wrap[this.bar.scrollSize]) / 100
  }

  startDrag(e: any) {
    e.nativeEvent.stopImmediatePropagation
    this.cursorDown = true

    on(document, 'mousemove', this.mouseMoveDocumentHandler)
    on(document, 'mouseup', this.mouseUpDocumentHandler)
    document.onselectstart = () => false
  }

  mouseMoveDocumentHandler(e: { [x: string]: number }) {
    if (this.cursorDown === false) return
    const prevPage = this[this.bar.axis]

    if (!prevPage) return

    const offset =
      e[this.bar.client] -
      this.rootRef.getBoundingClientRect()[this.bar.direction]
    const thumbClickPosition = this.thumbRef[this.bar.offset] - prevPage
    const thumbPositionPercentage =
      ((offset - thumbClickPosition) * 100) / this.rootRef[this.bar.offset]

    this.wrap[this.bar.scroll] =
      (thumbPositionPercentage * this.wrap[this.bar.scrollSize]) / 100
  }

  mouseUpDocumentHandler() {
    this.cursorDown = false
    this[this.bar.axis] = 0
    off(document, 'mousemove', this.mouseMoveDocumentHandler)
    document.onselectstart = null
  }

  render() {
    const { size, move } = this.props

    return (
      <div
        ref={(root) => (this.rootRef = root)}
        className={classnames('el-scrollbar__bar', `is-${this.bar.key}`)}
        onMouseDown={this.clickTrackHandler}
      >
        <div
          ref={(thumb) => (this.thumbRef = thumb)}
          className='el-scrollbar__thumb'
          onMouseDown={this.clickThumbHandler}
          style={renderThumbStyle({ size, move, bar: this.bar })}
        ></div>
      </div>
    )
  }
}

Bar.propTypes = {
  vertical: PropTypes.bool,
  size: PropTypes.string,
  move: PropTypes.number,
  getParentWrap: PropTypes.func.isRequired
}
