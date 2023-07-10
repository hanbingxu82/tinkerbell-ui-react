/*
 * @Author: your name
 * @Date: 2022-04-21 16:52:15
 * @LastEditTime: 2023-07-10 17:39:40
 * @LastEditors: hanbingxu
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/Scrollbar/Scrollbar.tsx
 */

import React from 'react'
import ReactDOM from 'react-dom'
import { addResizeListener, removeResizeListener } from '../Select/resize-event'
import getScrollBarWidth from './ScrollbarWidth'
import Bar from './B'

const classnames = require('classnames')
const PropTypes = require('prop-types')

export default class Scrollbar extends React.Component<any, any> {
  update: () => void
  native: any
  cleanRAF!: () => void
  resizeDom!: Element | Text | null
  cleanResize: any
  static propTypes: {
    native: any
    wrapStyle: any
    wrapClass: any
    viewClass: any
    viewStyle: any
    className: any
    viewComponent: any
    noresize: any
  }
  static defaultProps: { viewComponent: string }
  constructor(props: any) {
    super(props)

    this.state = {
      sizeWidth: '0',
      sizeHeight: '0',
      moveX: 0,
      moveY: 0
    }

    this.update = this._update.bind(this)
  }

  get wrap() {
    return this.refs.wrap
  }

  componentDidMount() {
    if (this.native) return
    let rafId = requestAnimationFrame(this.update)
    this.cleanRAF = () => {
      cancelAnimationFrame(rafId)
    }
  }

  componentDidUpdate() {
    this.resizeDom = ReactDOM.findDOMNode(this.refs.resize)
    if (!this.props.noresize) {
      this.cleanResize && this.cleanResize()
      addResizeListener(this.resizeDom, this.update)
      this.cleanResize = () => {
        removeResizeListener(this.resizeDom, this.update)
      }
    }
  }

  componentWillUnmount() {
    this.cleanRAF()
    this.cleanResize && this.cleanResize()
  }

  handleScroll() {
    const wrap: any = this.wrap
    this.setState({
      moveY: (wrap.scrollTop * 100) / wrap.clientHeight,
      moveX: (wrap.scrollLeft * 100) / wrap.clientWidth
    })
  }

  _update() {
    let heightPercentage, widthPercentage
    const { wrap, state }: any = this
    if (!wrap) return

    heightPercentage = (wrap.clientHeight * 100) / wrap.scrollHeight
    widthPercentage = (wrap.clientWidth * 100) / wrap.scrollWidth

    let sizeHeight = heightPercentage < 100 ? heightPercentage + '%' : ''
    let sizeWidth = widthPercentage < 100 ? widthPercentage + '%' : ''

    if (state.sizeHeight !== sizeHeight || state.sizeWidth !== sizeWidth) {
      this.setState({ sizeHeight, sizeWidth })
    }
  }

  render() {
    /* eslint-disable */
    let {
      native,
      viewStyle,
      wrapStyle,
      viewClass,

      viewComponent,
      wrapClass,
      noresize,
      className,
      ...others
    } = this.props
    let { moveX, moveY, sizeWidth, sizeHeight }: any = this.state
    /* eslint-enable */

    let style = wrapStyle
    const gutter = getScrollBarWidth()
    if (gutter) {
      const gutterWith = `-${gutter}px`
      if (Array.isArray(wrapStyle)) {
        style = Object.assign.apply(null, [
          ...wrapStyle,
          { marginRight: gutterWith, marginBottom: gutterWith }
        ] as any)
      } else {
        style = Object.assign({}, wrapStyle, {
          marginRight: gutterWith,
          marginBottom: gutterWith
        })
      }
    }

    const view = React.createElement(
      viewComponent,
      {
        className: this.classNames('tb-scrollbar__view', viewClass),
        style: viewStyle,
        ref: 'resize'
      },
      this.props.children
    )

    let nodes
    if (!native) {
      const wrap = (
        <div
          {...others}
          ref='wrap'
          key={0}
          style={style}
          onScroll={this.handleScroll.bind(this)}
          className={classnames(
            wrapClass,
            'tb-scrollbar__wrap',
            gutter ? '' : 'tb-scrollbar__wrap--hidden-default'
          )}
        >
          {view}
        </div>
      )
      nodes = [
        wrap,
        <Bar
          key={1}
          move={moveX}
          size={sizeWidth}
          getParentWrap={() => this.wrap}
        ></Bar>,
        <Bar
          key={2}
          move={moveY}
          size={sizeHeight}
          getParentWrap={() => this.wrap}
          vertical={true}
        ></Bar>
      ]
    } else {
      nodes = [
        <div
          {...others}
          key={0}
          ref='wrap'
          className={this.classNames(wrapClass, 'tb-scrollbar__wrap')}
          style={style}
        >
          {view}
        </div>
      ]
    }

    return React.createElement(
      'div',
      { className: this.classNames('tb-scrollbar', className) },
      nodes
    )
  }
  classNames(_arg0: string, _viewClass: any): any {
    throw new Error('Method not implemented.')
  }
}

Scrollbar.propTypes = {
  native: PropTypes.bool,
  wrapStyle: PropTypes.object,
  wrapClass: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  viewClass: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  viewStyle: PropTypes.object,
  className: PropTypes.string,
  viewComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  noresize: PropTypes.bool
}

Scrollbar.defaultProps = {
  viewComponent: 'div'
}
