/*
 * @Author: your name
 * @Date: 2022-05-11 20:07:52
 * @LastEditTime: 2023-07-10 17:36:25
 * @LastEditors: hanbingxu
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/Form/FormItem.tsx
 */
// eslint-disable-next-line
import React, {
  useEffect,
  useState,
  useContext,
  useCallback,
  createContext
} from 'react'
import AsyncValidator from 'async-validator'
// import Animate from 'rc-animate'
import CSSMotion from 'rc-motion'
import Context from './Context'

export const FormItemContext = createContext<any>(null)
const classnames = require('classnames')
const PropTypes = require('prop-types')
type State = {
  error: string
  errorMsg: string
  valid: boolean
  validating: boolean
}
// let initialValue: any
let validateDisabled: any
const FormItem: any = React.forwardRef((props: any, ref: any) => {
  const FormParent: any = useContext(Context)
  const [lStyle, setLabelStyle] = useState({})
  const [cStyle, setContentStyle] = useState({})
  const [state]: any = useState<State>({
    error: '',
    errorMsg: '',
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
    setTimeout(() => {
      validate('blur')
    }, 100)
  }

  function onFieldChange(): void {
    if (validateDisabled) {
      validateDisabled = false
      return
    }
    setTimeout(() => {
      validate('change')
    }, 100)
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
    forceUpdate()
    const descriptor = { [props.prop]: rules }
    const validator = new AsyncValidator(descriptor)
    const model = { [props.prop]: fieldValue() }
    validator.validate(model, { firstFields: true }, (errors) => {
      console.log(errors)
      state.error = errors ? errors[0].message : ''
      state.errorMsg = errors ? errors[0].message : state.errorMsg
      state.validating = false
      state.valid = !errors
      forceUpdate()
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
    state.errorMsg = ''
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

  function labelStyle() {
    console.log(FormParent.parent.props.labelPosition)
    const ret: any = {}
    if (FormParent.parent.props.labelPosition === 'top') {
    } else {
      const labelWidth = props.labelWidth || FormParent.parent.props.labelWidth
      if (labelWidth) {
        ret.width = parseInt(labelWidth)
      }
    }

    setLabelStyle(ret)
  }
  function contentStyle() {
    const ret: any = {}
    if (
      FormParent.parent.props.labelPosition === 'top' ||
      FormParent.parent.props.inline
    ) {
    } else {
      const labelWidth = props.labelWidth || FormParent.parent.props.labelWidth
      if (labelWidth) {
        ret.marginLeft = parseInt(labelWidth)
      }
    }
    setContentStyle(ret)
  }

  useEffect(() => {
    setTimeout(() => {
      labelStyle()
      contentStyle()
    }, 100)
  }, [FormParent.parent.props.labelPosition]) // eslint-disable-line
  function fieldValue(): any {
    const model = FormParent.parent.props.model
    if (!model || !props.prop) {
      return
    }
    const temp = props.prop.split(':')
    return temp.length > 1 ? model[temp[0]][temp[1]] : model[props.prop]
  }
  const { label, required } = props
  return (
    <div
      ref={ref}
      style={props.style}
      className={classnames('tb-form-item', {
        'is-error': state.error !== '',
        'is-validating': state.validating,
        'is-required': isRequired() || required
      })}
      onBlur={() => {
        onFieldBlur()
        onFieldChange()
      }}
    >
      {label && (
        <label className='tb-form-item__label' style={lStyle}>
          {typeof label === 'string'
            ? label + FormParent.parent.props.labelSuffix
            : label}
        </label>
      )}
      <div className='tb-form-item__content' style={cStyle}>
        <FormItemContext.Provider value={{ onFieldChange }}>
          {props.children}
        </FormItemContext.Provider>
        <CSSMotion
          forceRender
          visible={state.error}
          onEnterActive={(HTMLElement) => {
            HTMLElement.style.display = 'block'
          }}
          removeOnLeave={false}
          onLeaveEnd={(HTMLElement) => {
            HTMLElement.style.display = 'none'
          }}
          motionName='tb-form-error-fade'
        >
          {({ className, style }) => (
            <div
              className={classnames('tb-form-item__error', className)}
              style={{ ...style }}
            >
              {state.errorMsg}
            </div>
          )}
        </CSSMotion>
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
