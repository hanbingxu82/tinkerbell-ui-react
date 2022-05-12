/*
 * @Author: your name
 * @Date: 2022-05-11 20:07:52
 * @LastEditTime: 2022-05-12 12:21:17
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/Form/FormItem.tsx
 */
/* @flow */

import React, { useEffect, useState } from 'react'
import AsyncValidator from 'async-validator'
import Animate from 'rc-animate'
// import { Component, PropTypes, Transition } from '../../libs';

const classnames = require('classnames')
const PropTypes = require('prop-types')

type State = {
  error: string
  valid: boolean
  validating: boolean
}
let initialValue: any
let validateDisabled: any
const FormItem: any = React.forwardRef((props: any, ref: any) => {
  const state: any = useState<State>({
    error: '',
    valid: false,
    validating: false
  })
  const FormItemObj = {
    state,
    props,
    validate,
    resetField
  }
  useEffect(() => {
    const { prop } = props
    if (prop) {
      props.parent.addField(FormItemObj)
      initialValue = getInitialValue()
    }
    return () => {
      props.parent.removeField(FormItemObj)
    }
  }, [])

  function isRequired(): boolean {
    let rules = getRules()
    let isRequired = false

    if (rules && rules.length) {
      rules.every((rule: any) => {
        if (rule.required) {
          isRequired = true

          return false
        }
        return true
      })
    }

    return isRequired
  }

  function onFieldBlur(): void {
    validate('blur')
  }

  function onFieldChange(): void {
    if (validateDisabled) {
      validateDisabled = false
      return
    }

    setTimeout(() => {
      validate('change')
    })
  }

  function validate(trigger: string, cb?: Function): boolean | void {
    const rules = getFilteredRule(trigger)

    if (!rules || rules.length === 0) {
      if (cb instanceof Function) {
        cb()
      }

      return true
    }
    state.validating = true
    // setState({ validating: true })
    const descriptor = { [props.prop]: rules }
    const validator = new AsyncValidator(descriptor)
    const model = { [props.prop]: fieldValue() }

    validator.validate(model, { firstFields: true }, (errors) => {
      state.error = errors ? errors[0].message : ''
      state.validating = false
      state.valid = !errors
      if (cb instanceof Function) {
        cb(errors)
      }
    })
  }

  function getInitialValue(): string | void {
    const value = props.parent().props.model[props.prop]

    if (value === undefined) {
      return value
    } else {
      return JSON.parse(JSON.stringify(value))
    }
  }

  function resetField(): void {
    let { valid, error } = state

    valid = true
    error = ''

    state.valid = valid
    state.error = error

    let value = fieldValue()

    if (Array.isArray(value) && value.length > 0) {
      validateDisabled = true
      props.parent.props.model[props.prop] = []
    } else if (value) {
      validateDisabled = true
      props.parent.props.model[props.prop] = initialValue
    }
  }

  function getRules(): Array<any> {
    let formRules = props.parent.props.rules
    let selfRuels = props.rules

    formRules = formRules ? formRules[props.prop] : []
    return [].concat(selfRuels || formRules || [])
  }

  function getFilteredRule(trigger: string): Array<any> {
    const rules = getRules()

    return rules
      .filter((rule) => {
        if (!rule.trigger || trigger === '') return true
        if (Array.isArray(rule.trigger)) {
          return rule.trigger.indexOf(trigger) > -1
        } else {
          return rule.trigger === trigger
        }
      })
      .map((rule) => Object.assign({}, rule))
  }

  function labelStyle(): { width?: number | string } {
    const ret: any = {}

    if (props.parent.props.labelPosition === 'top') return ret

    const labelWidth = props.labelWidth || props.parent.props.labelWidth

    if (labelWidth) {
      ret.width = parseInt(labelWidth)
    }

    return ret
  }

  function contentStyle(): { marginLeft?: number | string } {
    const ret: any = {}

    if (props.parent.props.labelPosition === 'top' || props.parent.props.inline)
      return ret

    const labelWidth = props.labelWidth || props.parent.props.labelWidth

    if (labelWidth) {
      ret.marginLeft = parseInt(labelWidth)
    }

    return ret
  }

  function fieldValue(): any {
    const model = props.parent.props.model
    if (!model || !props.prop) {
      return
    }
    const temp = props.prop.split(':')
    return temp.length > 1 ? model[temp[0]][temp[1]] : model[props.prop]
  }
  const { error, validating } = state
  const { label, required } = props

  return (
    <div
      ref={ref}
      style={props.style}
      className={classnames('el-form-item', {
        'is-error': error !== '',
        'is-validating': validating,
        'is-required': isRequired() || required
      })}
      onBlur={onFieldBlur}
      onChange={onFieldChange}
    >
      {label && (
        <label className='el-form-item__label' style={labelStyle()}>
          {typeof label === 'string'
            ? label + props.parent.props.labelSuffix
            : label}
        </label>
      )}
      <div className='el-form-item__content' style={contentStyle()}>
        {props.children}
        {/* <Transition name="el-zoom-in-top"> */}
        <Animate component='' transitionName='tb-alert-fade'>
          {error ? <div className='el-form-item__error'>{error}</div> : null}
        </Animate>
        {/* </Transition> */}
      </div>
    </div>
  )
})

FormItem.contextTypes = {
  component: PropTypes.any
}

FormItem.childContextTypes = {
  form: PropTypes.any
}

FormItem.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  labelWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  prop: PropTypes.string,
  required: PropTypes.bool,
  rules: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
}

export default FormItem