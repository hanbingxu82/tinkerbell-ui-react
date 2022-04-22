/*
 * @Author: your name
 * @Date: 2022-04-22 10:58:44
 * @LastEditTime: 2022-04-22 15:43:21
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/utils/dom.ts
 */
export const loadStyleString = (css: string, id = '') => {
    if (document.getElementById(id)) return;
    let style:any = document.createElement('style');
    style.type = 'text/css';
    style.id = id;
    try {
      style.appendChild(document.createTextNode(css));
    } catch (ex) {
      style.styleSheet.cssText = css;
    }
    const head = document.getElementsByTagName('head')[0];
    head.appendChild(style);
  }
  
  
  let isServer = false;
  /* istanbul ignore next */
  export const on = (function() {
    if (!isServer ) {
      return function(element: { addEventListener: (arg0: any, arg1: any, arg2: boolean) => void; }, event: any, handler: any) {
        if (element && event && handler) {
          element.addEventListener(event, handler, false);
        }
      };
    } else {
      return function(element: { attachEvent: (arg0: string, arg1: any) => void; }, event: string, handler: any) {
        if (element && event && handler) {
          element.attachEvent('on' + event, handler);
        }
      };
    }
  })();
  
  /* istanbul ignore next */
  export const off = (function() {
    if (!isServer) {
      return function(element: { removeEventListener: (arg0: any, arg1: any, arg2: boolean) => void; }, event: any, handler: any) {
        if (element && event) {
          element.removeEventListener(event, handler, false);
        }
      };
    } else {
      return function(element: { detachEvent: (arg0: string, arg1: any) => void; }, event: string, handler: any) {
        if (element && event) {
          element.detachEvent('on' + event, handler);
        }
      };
    }
  })();
  
  export function scrollIntoView(container: { scrollTop: number; clientHeight: number; }, selected: { offsetTop: any; offsetHeight: any; }) {
    if (isServer) return;
  
    if (!selected) {
      container.scrollTop = 0;
      return;
    }
  
    const top = selected.offsetTop;
    const bottom = selected.offsetTop + selected.offsetHeight;
    const viewRectTop = container.scrollTop;
    const viewRectBottom = viewRectTop + container.clientHeight;
  
    if (top < viewRectTop) {
      container.scrollTop = top;
    } else if (bottom > viewRectBottom) {
      container.scrollTop = bottom - container.clientHeight;
    }
  }