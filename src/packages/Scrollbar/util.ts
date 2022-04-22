/*
 * @Author: your name
 * @Date: 2022-04-21 16:52:52
 * @LastEditTime: 2022-04-21 17:12:09
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/Scrollbar/util.js
 */
export const BAR_MAP = {
    vertical: {
      offset: 'offsetHeight',
      scroll: 'scrollTop',
      scrollSize: 'scrollHeight',
      size: 'height',
      key: 'vertical',
      axis: 'Y',
      client: 'clientY',
      direction: 'top'
    },
    horizontal: {
      offset: 'offsetWidth',
      scroll: 'scrollLeft',
      scrollSize: 'scrollWidth',
      size: 'width',
      key: 'horizontal',
      axis: 'X',
      client: 'clientX',
      direction: 'left'
    }
  }
  
  export function renderThumbStyle({ move, size, bar }:any) {
    const style:any = {};
    const translate = `translate${bar.axis}(${ move }%)`;
  
    style[bar.size] = size;
    style.transform = translate;
    style.msTransform = translate;
    style.WebkitTransform = translate;
  
    return style;
  }
  