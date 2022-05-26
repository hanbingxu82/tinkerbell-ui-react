/*
 * @Author: your name
 * @Date: 2022-05-11 20:07:52
 * @LastEditTime: 2022-05-26 18:36:14
 * @LastEditors: 韩旭小天才 905583741@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/Form/FormItem.tsx
 */
// eslint-disable-next-line
import React, { useEffect, useState, useContext, useCallback } from 'react'
import AsyncValidator from 'async-validator'
import Animate from 'rc-animate'
import Context from './Context'

const classnames = require('classnames')
const PropTypes = require('prop-types')
type State = {
  error: string
  valid: boolean
  validating: boolean
}
// let initialValue: any
let validateDisabled: any
const FormItem: any = React.forwardRef((props: any, ref: any) => {
  const FormParent: any = useContext(Context)
  const [state]: any = useState<State>({
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

  // 强制更新视图方法 start
  const [, updateState] = useState<any>()
  const forceUpdate = useCallback(() => updateState({}), [])
  // 强制更新视图方法 end

  useEffect(() => {
    const { prop } = props
    if (prop) {
      FormParent.addField(FormItemObj)
      // initialValue = getInitialValue()
    }
    return () => {
      FormParent.removeField(FormItemObj)
    }
  }, []) // eslint-disable-line

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
    console.log(rules)
    if (!rules || rules.length === 0) {
      if (cb instanceof Function) {
        cb()
      }

      return true
    }
    state.validating = true
    forceUpdate()
    const descriptor = { [props.prop]: rules }
    const validator = new AsyncValidator(descriptor)
    const model = { [props.prop]: fieldValue() }
    validator.validate(model, { firstFields: true }, (errors) => {
      state.error = errors ? errors[0].message : ''
      state.validating = false
      state.valid = !errors
      console.log(   state.error)
      forceUpdate()
      // setState({...state})
      if (cb instanceof Function) {
        cb(errors)
      }
    })
  }

  // function getInitialValue(): string | void {
  //   const value = FormParent.parent.props.model[props.prop]
  //   if (value === undefined) {
  //     return value
  //   } else {
  //     return JSON.parse(JSON.stringify(value))
  //   }
  // }

  function resetField(): void {

    let { valid, error } = state

    valid = true
    error = ''

    state.valid = valid
    state.error = error
    forceUpdate()
    let value = fieldValue()
    if (Array.isArray(value) && value.length > 0) {
      validateDisabled = true
      // value 有值不需要重置
      // FormParent.parent.props.model[props.prop] = []
    } else if (value) {
      validateDisabled = true
      // value 有值不需要重置
      // FormParent.parent.props.model[props.prop] = initialValue
    }
  }

  function getRules(): Array<any> {
    let formRules = FormParent.parent.props.rules
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

    if (FormParent.parent.props.labelPosition === 'top') return ret

    const labelWidth = props.labelWidth || FormParent.parent.props.labelWidth

    if (labelWidth) {
      ret.width = parseInt(labelWidth)
    }

    return ret
  }

  function contentStyle(): { marginLeft?: number | string } {
    const ret: any = {}

    if (
      FormParent.parent.props.labelPosition === 'top' ||
      FormParent.parent.props.inline
    )
      return ret

    const labelWidth = props.labelWidth || FormParent.parent.props.labelWidth

    if (labelWidth) {
      ret.marginLeft = parseInt(labelWidth)
    }

    return ret
  }

  function fieldValue(): any {
    const model = FormParent.parent.props.model
    if (!model || !props.prop) {
      return
    }
    console.log(model,9999)
    const temp = props.prop.split(':')
    return temp.length > 1 ? model[temp[0]][temp[1]] : model[props.prop]
  }
  const { label, required } = props
  return (
    <div
      ref={ref}
      style={props.style}
      className={classnames('el-form-item', {
        'is-error': state.error !== '',
        'is-validating': state.validating,
        'is-required': isRequired() || required
      })}
      onBlur={onFieldBlur}
      onChange={onFieldChange}
    >
      {label && (
        <label className='el-form-item__label' style={labelStyle()}>
          {typeof label === 'string'
            ? label + FormParent.parent.props.labelSuffix
            : label}
        </label>
      )}
      <div className='el-form-item__content' style={contentStyle()}>
        {props.children}
        {/* <Transition name="el-zoom-in-top"> */}
        <Animate component='' transitionName='tb-form-error-fade'>
          {state.error ? (
            <div className='el-form-item__error'>{state.error}</div>
          ) : null}
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
