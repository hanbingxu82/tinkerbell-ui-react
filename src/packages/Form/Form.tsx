/*
 * @Author: your name
 * @Date: 2022-05-11 20:07:44
 * @LastEditTime: 2023-03-23 15:59:55
 * @LastEditors: hanbingxu
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/Form/Form.tsx
 */

// eslint-disable-next-line
import React, {
  useState,
  useCallback,
  useImperativeHandle,
  useEffect
} from 'react'
import Context from './Context'
const classnames = require('classnames')
const PropTypes = require('prop-types')

type State = {
  fields: any
}

const Form: any = React.forwardRef((props: any, _ref: any) => {
  const [state] = useState<State>({
    fields: []
  })
  const [cpValue, setCpValue] = useState({
    componentName: 'Form',
    instanceType: 'Form',
    parent: {
      props
    },
    getPosition,
    addField,
    removeField,
    resetFields,
    validate,
    validateField
  })
  cpValue.parent.props = props
  // 强制更新视图方法 start
  const [, updateState] = useState<any>()
  const forceUpdate = useCallback(() => updateState({}), [])
  // 强制更新视图方法 end

  function addField(field: any): void {
    state.fields.push(field)
    forceUpdate()
  }
  function getPosition(setValue: Function) {
    setValue(props.value)
  }
  function removeField(field: any): void {
    if (field.props.prop) {
      state.fields.splice(state.fields.indexOf(field), 1)
      forceUpdate()
    }
  }

  function resetFields(): void {
    state.fields.forEach((field: any) => {
      field.resetField()
    })
    forceUpdate()
  }

  function validate(callback: Function): void {
    console.log('ceshi')
    let valid = true
    let count = 0
    // 如果需要验证的fields为空，调用验证时立刻返回callback
    if (state.fields.length === 0 && callback) {
      callback(true)
    }

    state.fields.forEach((field: any) => {
      field.validate('', (errors: string) => {
        if (errors) {
          valid = false
        }
        if (typeof callback === 'function' && ++count === state.fields.length) {
          callback(valid)
        }
      })
    })
    forceUpdate()
  }

  function validateField(prop: string, cb: Function): void {
    const field = state.fields.filter(
      (field: any) => field.props.prop === prop
    )[0]

    if (!field) {
      throw new Error('must call validateField with valid prop string!')
    }

    field.validate('', cb)
    forceUpdate()
  }

  useEffect(() => {
    setCpValue(cpValue)
  }, [props.model, props.labelPosition]) // eslint-disable-line
  useImperativeHandle(_ref, () => ({
    addField,
    removeField,
    resetFields,
    validate,
    validateField
  }))

  return (
    <form
      ref={_ref}
      style={props.style}
      className={classnames(
        'tb-form',
        props.labelPosition && `tb-form--label-${props.labelPosition}`,
        {
          'tb-form--inline': props.inline
        }
      )}
      onSubmit={props.onSubmit}
    >
      <Context.Provider value={cpValue}>{props.children}</Context.Provider>
    </form>
  )
})

Form.childContextTypes = {
  component: PropTypes.any
}

Form.propTypes = {
  model: PropTypes.object,
  rules: PropTypes.object,
  labelPosition: PropTypes.oneOf(['right', 'left', 'top']),
  labelWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  labelSuffix: PropTypes.string,
  inline: PropTypes.bool,
  onSubmit: PropTypes.func
}

Form.defaultProps = {
  labelPosition: 'right',
  labelSuffix: ''
}

export default Form
