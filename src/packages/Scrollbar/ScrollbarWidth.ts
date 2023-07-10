/*
 * @Author: your name
 * @Date: 2022-04-21 16:52:45
 * @LastEditTime: 2022-04-22 09:20:32
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/Scrollbar/scrollbar-width.ts
 */
let scrollBarWidth: number | undefined;

export default function getScrollBarWidth() {
  if (scrollBarWidth !== undefined) return scrollBarWidth;

  const outer:any = document.createElement('div');
  outer.className = 'tb-scrollbar__wrap';
  outer.style.visibility = 'hidden';
  outer.style.width = '100px';
  outer.style.position = 'absolute';
  outer.style.top = '-9999px';
  document.body.appendChild(outer);

  const widthNoScroll = outer.offsetWidth;
  outer.style.overflow = 'scroll';

  const inner = document.createElement('div');
  inner.style.width = '100%';
  outer.appendChild(inner);

  const widthWithScroll = inner.offsetWidth;
  scrollBarWidth = widthNoScroll - widthWithScroll;
  outer.parentNode.removeChild(outer);

  return scrollBarWidth;
}
