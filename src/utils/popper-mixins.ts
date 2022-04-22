/*
 * @Author: your name
 * @Date: 2022-04-22 10:32:27
 * @LastEditTime: 2022-04-22 10:36:51
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/utils/ popper-mixins.ts
 */
// @ts-nocheck
import PopperJS from 'popper.js'
import { require_condition } from './assert'

const mixinPrototype = {
  //---------- start: public methods
  /**
   * @param {HTMLElement} popupElement - The reference element used to position the popper.
   * @param {HTMLElement} refElement - The HTML element used as popper, or a configuration used to generate the popper.
   * @param {object} popperOptions, PopperJS options
   */
  createPopper(
    popupElement: any,
    refElement: any,
    popperOptions: PopperJS.PopperOptions | undefined
  ) {
    require_condition(popupElement && refElement)

    const { visibleArrow, placement, zIndex, offset, width, ...others } =
      this._popper_config
    popperOptions = { ...popperOptions, ...others }

    if (!/^(top|bottom|left|right)(-start|-end)?$/g.test(placement)) {
      return
    }

    const popper = popupElement
    const reference = refElement

    if (!popper || !reference) return
    if (visibleArrow) this._appendArrow(popper)
    if (this._poperJS) {
      this._poperJS.destroy()
    }

    // these options are perserved only for smooth the migiration from eleme/element
    if (!popperOptions.placement) {
      popperOptions.placement = placement
    }
    if (!popperOptions.offset) {
      popperOptions.offset = offset
    }

    popperOptions.onCreate = () => {
      this._resetTransformOrigin()
      this._popper_state.isCreated = true
      this._poperJS.popper.style.zIndex = zIndex
      this._poperJS.popper.style.width =
        width !== null
          ? `${width}px`
          : reference.getBoundingClientRect().width + 'px'
    }

    this._poperJS = new PopperJS(reference, popper, popperOptions)
  },

  destroyPopper() {
    if (this._poperJS && this._popper_state.isCreated) {
      this._poperJS.destroy()
      this._poperJS = null
      this._popper_state = {}
      this._popper_config = {}
    }
  },

  updatePopper() {
    if (!this._poperJS && this._popper_state.isCreated) return
    this._poperJS.update()
  },

  //---------- end: public methods

  _resetTransformOrigin() {
    let placementMap = {
      top: 'bottom',
      bottom: 'top',
      left: 'right',
      right: 'left'
    }
    let placement = this._poperJS.popper
      .getAttribute('x-placement')
      .split('-')[0]
    let origin = placementMap[placement]
    this._poperJS.popper.style.transformOrigin =
      ['top', 'bottom'].indexOf(placement) > -1
        ? `center ${origin}`
        : `${origin} center`
  },

  _appendArrow(element: { appendChild: (arg0: HTMLDivElement) => void }) {
    if (this._popper_state.appended) {
      return
    }
    this._popper_state.appended = true
    const arrow = document.createElement('div')
    arrow.setAttribute('x-arrow', '')
    arrow.className = 'popper__arrow'
    element.appendChild(arrow)
  }
}

/**
 * @param {args} @see PopperMixin
 * @param {object} config
 * @param {String} [placement=button] - Placement of the popper accepted values: top(-start, -end), right(-start, -end), bottom(-start, -right), left(-start, -end)
 * @param {Number} [offset=0] - Amount of pixels the popper will be shifted (can be negative).
 * @param {Number} [boundariesPadding=5]
 * @param {Boolean} [visibleArrow=false] Visibility of the arrow, no style.
 */
export function PopperMixin(this: any, config: any) {
  this._popper_config = Object.assign(
    {},
    {
      width: null,
      zIndex: 1050,
      offset: 0,
      placement: 'bottom',
      boundariesPadding: 5,
      visibleArrow: false
    },
    config
  )
  this._popper_state = {}
}
PopperMixin.prototype = mixinPrototype

const PopperReactMixinMethods = {
  hookReactLifeCycle(getPopperRootDom: () => any, getRefDom: () => any) {
    const componentDidMount = this.componentDidMount
    const componentWillUnmount = this.componentWillUnmount

    this.componentDidMount = function (...args: any) {
      const root = getPopperRootDom()
      const ref = getRefDom()
      require_condition(
        root,
        'method `getPopperRootDom()` require a HTMLElement instance when componentDidMount is called'
      )
      require_condition(
        ref,
        'method `getRefDom()` require a HTMLElement instance when componentDidMount is called'
      )

      this.createPopper(root, ref)
      this._animateRef = window.requestAnimationFrame(
        this.updatePopper.bind(this)
      )

      if (typeof componentDidMount === 'function') {
        componentDidMount.apply(this, args)
      }
    }

    this.componentWillUnmount = function (...args: any) {
      window.cancelAnimationFrame(this._animateRef)
      this.destroyPopper()

      if (typeof componentWillUnmount === 'function') {
        componentWillUnmount.apply(this, args)
      }
    }
  }
}

/**
 * this Mixin provide utility method to hook reactjs component lifecycle
 *
 * @param getPopperRootDom: ()=>HTMLElement, return your popper root HTMLElement when componentDidMount is called
 * @param getRefDom: ()=>HTMLElement, ref node, the node that popper aligns its pop-up to, see the popperjs doc for more information
 */

export function PopperReactMixin(
  getPopperRootDom: any,
  getRefDom: any,
  config: any
) {
  require_condition(
    typeof getPopperRootDom === 'function',
    '`getPopperRootDom` func is required!'
  )
  require_condition(
    typeof getRefDom === 'function',
    '`getRefDom` func is required!'
  )

  PopperMixin.call(this, config)

  Object.keys(mixinPrototype).forEach((k) => (this[k] = mixinPrototype[k]))

  PopperReactMixinMethods.hookReactLifeCycle.call(
    this,
    getPopperRootDom,
    getRefDom
  )

  return this
}
