/*
 * @Author: your name
 * @Date: 2022-03-02 10:53:06
 * @LastEditTime: 2022-03-02 10:53:20
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/utils/motion.ts
 */
import { CSSMotionProps, MotionEventHandler, MotionEndEventHandler } from 'rc-motion';
import { MotionEvent } from 'rc-motion/lib/interface';

// ================== Collapse Motion ==================
const getCollapsedHeight: MotionEventHandler = () => ({ height: 0, opacity: 0 });
const getRealHeight: MotionEventHandler = node => {
  const { scrollHeight } = node;
  return { height: scrollHeight, opacity: 1 };
};
const getCurrentHeight: MotionEventHandler = node => ({ height: node ? node.offsetHeight : 0 });
const skipOpacityTransition: MotionEndEventHandler = (_, event: MotionEvent) =>
  event?.deadline === true || (event as TransitionEvent).propertyName === 'height';

const collapseMotion: CSSMotionProps = {
  motionName: 'ant-motion-collapse',
  onAppearStart: getCollapsedHeight,
  onEnterStart: getCollapsedHeight,
  onAppearActive: getRealHeight,
  onEnterActive: getRealHeight,
  onLeaveStart: getCurrentHeight,
  onLeaveActive: getCollapsedHeight,
  onAppearEnd: skipOpacityTransition,
  onEnterEnd: skipOpacityTransition,
  onLeaveEnd: skipOpacityTransition,
  motionDeadline: 500,
};

const getTransitionName = (rootPrefixCls: string, motion: string, transitionName?: string) => {
  if (transitionName !== undefined) {
    return transitionName;
  }
  return `${rootPrefixCls}-${motion}`;
};
export { getTransitionName };
export default collapseMotion;