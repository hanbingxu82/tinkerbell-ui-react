/*
 * @Author: your name
 * @Date: 2022-05-11 20:07:44
 * @LastEditTime: 2022-05-12 12:22:01
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/Form/Form.tsx
 */
import React, { useState } from 'react'
// import { Component, PropTypes } from '../../libs';

const classnames = require('classnames')
const PropTypes = require('prop-types')

type State = {
  fields: any
}

const Form: any = React.forwardRef((props: any, ref: any) => {
  const state: any = useState<State>({
    fields: []
  })

  function addField(field: any): void {
    state.fields.push(field)
  }

  function removeField(field: any): void {
    if (field.props.prop) {
      state.fields.splice(state.fields.indexOf(field), 1)
    }
  }

  function resetFields(): void {
    state.fields.forEach((field: any) => {
      field.resetField()
    })
  }

  function validate(callback: Function): void {
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
  }

  function validateField(prop: string, cb: Function): void {
    const field = state.fields.filter(
      (field: any) => field.props.prop === prop
    )[0]

    if (!field) {
      throw new Error('must call validateField with valid prop string!')
    }

    field.validate('', cb)
  }

  return (
    <form
      ref={ref}
      style={props.style}
      className={classnames(
        'el-form',
        props.labelPosition && `el-form--label-${props.labelPosition}`,
        {
          'el-form--inline': props.inline
        }
      )}
      onSubmit={props.onSubmit}
    >
      {React.Children.map(props, (item) => {
        return React.cloneElement(item, {
          item,
          componentName: 'Form',
          parent: {
            state,
            props,
            addField,
            removeField,
            resetFields,
            validate,
            validateField
          }
        })
      })}
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
