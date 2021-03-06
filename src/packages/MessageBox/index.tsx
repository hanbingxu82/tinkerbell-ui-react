/*
 * @Author: your name
 * @Date: 2022-04-11 16:04:32
 * @LastEditTime: 2022-06-10 21:59:48
 * @LastEditors: 韩旭小天才 905583741@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/MessageBox/index.tsx
 */
import React from 'react';
// import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client'
import MessageBox from './MessageBox';

function alert(message: any, title: any, props?: any) {
  if (typeof title === 'object') {
    props = title;
  }

  props = Object.assign({ title, message,
    modal: 'alert',
    closeOnPressEscape: false,
    closeOnClickModal: false
  }, props);

  return next(props);
}

function confirm(message: any, title: any, props?: any) {
  if (typeof title === 'object') {
    props = title;
  }

  props = Object.assign({ title, message,
    modal: 'confirm',
    showCancelButton: true
  }, props);

  return next(props);
}

function prompt(message: any, title: any, props?: any) {
  if (typeof title === 'object') {
    props = title;
  }

  props = Object.assign({ title, message,
    modal: 'prompt',
    showCancelButton: true,
    showInput: true
  }, props);

  return next(props);
}

function msgbox(props: any) {
  return next(props);
}

function next(props: { lockScroll: boolean; }) {
  return new Promise((resolve, reject) => {
    const div = document.createElement('div');
    const rootDiv = createRoot(div)
    document.body.appendChild(div);

    if (!!props.lockScroll !== false) {
      document.body.style.setProperty('overflow', 'hidden');
    }

    const component = React.createElement(MessageBox, Object.assign({}, props, {
      promise: { resolve, reject },
      willUnmount: () => {

        // requestAnimationFrame(() => {
          document.body.removeChild(div);
          document.body.style.removeProperty('overflow');
          rootDiv.unmount()
        // })
        // document.body.removeChild(div);
        // document.body.style.removeProperty('overflow');
        // rootDiv.unmount()
      }
    }));
    rootDiv.render(component)
    // ReactDOM.render(component, div);
  });
}

export default {
  alert,
  confirm,
  prompt,
  msgbox
}