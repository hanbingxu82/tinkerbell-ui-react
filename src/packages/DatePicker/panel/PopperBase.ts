/*
 * @Author: your name
 * @Date: 2022-04-21 10:33:04
 * @LastEditTime: 2022-04-22 10:31:04
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/DatePicker/panel/PopperBase.ts
 */
import React from 'react'
import { PopperReactMixin } from '../../../utils/popper-mixins'
const PropTypes = require('prop-types')


export class PopperBase extends React.Component {
  static get propTypes() {
    return {
      //()=>HtmlElement
      getPopperRefElement: PropTypes.func,
      popperMixinOption: PropTypes.object
    }
  }

  constructor(props: any) {
    super(props)

    PopperReactMixin.call(
      this,
      () => this.refs.root,
      props.getPopperRefElement,
      Object.assign(
        {
          boundariesPadding: 0,
          gpuAcceleration: false
        },
        props.popperMixinOption
      )
    )
  }
}
