/*
 * @Author: your name
 * @Date: 2022-04-21 10:33:04
 * @LastEditTime: 2022-04-21 10:43:55
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/DatePicker/panel/PopperBase.ts
 */
import { PropTypes, Component } from '../../../libs';
import { PopperReactMixin } from '../../../libs/utils'

export class PopperBase extends Component{
  static get propTypes() {
    return {
      //()=>HtmlElement
      getPopperRefElement: PropTypes.func,
      popperMixinOption: PropTypes.object
    }
  }

  constructor(props) {
    super(props)

    PopperReactMixin.call(this, () => this.refs.root, props.getPopperRefElement, Object.assign({
      boundariesPadding: 0,
      gpuAcceleration: false
    }, props.popperMixinOption));
  }
}