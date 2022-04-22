/*
 * @Author: your name
 * @Date: 2022-04-22 11:12:11
 * @LastEditTime: 2022-04-22 11:30:12
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/utils/EventRegister.ts
 */
// @ts-nocheck
import PropTypes from 'prop-types'
import { Component } from 'react'
import { require_condition } from './assert'

let windowKey = Symbol.for('er_register_map')
const registerMap = (window[windowKey] = window[windowKey] || {
  ids: {}
})

const not_null = (t) => t != null

const hasRegistered = ({ id }) => {
  return not_null(registerMap.ids[id])
}

const cleanRegister = (props) => {
  const { target, eventName, func, isUseCapture, id } = props
  if (hasRegistered(props)) {
    target.removeEventListener(eventName, func, isUseCapture)
    delete registerMap.ids[id]
  }
}

const doRegister = (props) => {
  let { id, eventName, func, isUseCapture } = props
  registerMap.ids[id] = id
  document.addEventListener(eventName, func, isUseCapture)
}

/**
 * register events that hooked up react lifecycle
 */
export default class EventRegister extends Component {
  props: any
  componentDidMount() {
    let { eventName, id } = this.props
    eventName = eventName.toLowerCase()
    eventName = /^on/.test(eventName) ? eventName.substring(2) : eventName
    this.cached = Object.assign({}, this.props, { eventName })

    require_condition(typeof id === 'string', 'id prop is required')
    require_condition(
      !hasRegistered(this.cached),
      `id: ${id} has been registered`
    )

    doRegister(this.cached)
  }

  componentWillUnmount() {
    cleanRegister(this.cached)
  }

  render() {
    return null
  }
}

EventRegister.propTypes = {
  id: PropTypes.string.isRequired,
  target: PropTypes.object.isRequired,
  eventName: PropTypes.string.isRequired,
  func: PropTypes.func.isRequired,
  isUseCapture: PropTypes.bool
}
