/*
 * @Author: your name
 * @Date: 2022-04-21 10:27:37
 * @LastEditTime: 2022-04-21 10:45:09
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/DatePicker/ MountBody.tsx
 */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export class MountBody extends Component {
  componentWillMount() {
    let c = React.cloneElement(this.props.children)
    this.tnode = document.createElement('div')
    document.body.appendChild(this.tnode)
    ReactDOM.render(c, this.tnode)
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.tnode)
    document.body.removeChild(this.tnode)
  }

  contains(evt){
    let parent = this.tnode.childNodes[0]
    let rect = parent.getBoundingClientRect()
    let isContain = (evt.clientX >= rect.left && evt.clientX <= rect.right) && (evt.clientY >= rect.top && evt.clientY <= rect.bottom )
    return isContain
  }

  render(){
    return null
  }
}