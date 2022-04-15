/*
 * @Author: your name
 * @Date: 2022-04-08 09:00:21
 * @LastEditTime: 2022-04-15 15:49:33
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/Input/index.tsx
 */
/* @flow */

import React, {
  useEffect,
  useRef,
  useState,
  SyntheticEvent,
  useImperativeHandle
} from 'react'
import calcTextareaHeight from './calcTextareaHeight'
import './index.scss'

const classnames = require('classnames')
const PropTypes = require('prop-types')

type textareaStyle = { resize: string; height?: string }

const Input: any = React.forwardRef((props: any, ref: any) => {
  const [textareaStyle, setTextareaStyle] = useState<textareaStyle>({
    resize: props.resize
  })
  const inputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  useEffect(() => {
    resizeTextarea()
    // 合并判断
    if (inputRef && inputRef.current) {
      ref && (ref.current.Element = inputRef.current)
    } else if (textareaRef && textareaRef.current) {
      ref && (ref.current.Element = textareaRef.current)
    }
  }, [])// eslint-disable-line
  // 父->子实例
  function focus(): void {
    setTimeout(() => {
      ;(
        (inputRef.current as HTMLInputElement) ||
        (textareaRef.current as HTMLTextAreaElement)
      ).focus()
    })
  }
  // 父->子实例
  function blur(): void {
    setTimeout(() => {
      ;(
        (inputRef.current as HTMLInputElement) ||
        (textareaRef.current as HTMLTextAreaElement)
      ).blur()
    })
  }
  // 向外暴露两个实例方法
  useImperativeHandle(ref, () => {
    return { methods: { focus, blur } }
  })
  function fixControlledValue(value: any): any {
    if (typeof value === 'undefined' || value === null) {
      return ''
    }
    return value
  }

  function handleChange(e: any): void {
    const { onChange } = props

    if (onChange) {
      onChange(e.target.value)
    }
    resizeTextarea()
  }

  function handleFocus(e: SyntheticEvent<any>): void {
    const { onFocus } = props
    if (onFocus) onFocus(e)
  }

  function handleBlur(e: SyntheticEvent<any>): void {
    const { onBlur } = props
    if (props.trim) handleTrim()
    if (onBlur) onBlur(e)
  }

  function handleTrim(): void {
    ;(inputRef.current as HTMLInputElement).value = (
      inputRef.current as HTMLInputElement
    ).value.trim()
    if (props.onChange) {
      // this's for controlled components
      props.onChange((inputRef.current as HTMLInputElement).value.trim())
    }
  }

  function handleIconClick(e: SyntheticEvent<any>): void {
    if (props.onIconClick) {
      props.onIconClick(e)
    }
  }

  function resizeTextarea(): void {
    const { autosize, type } = props

    if (!autosize || type !== 'textarea') {
      return
    }

    const minRows = autosize.minRows
    const maxRows = autosize.maxRows
    // 获取初始化高度 传递的 autosize？ 最小行 最大行 应该多高
    const textareaCalcStyle = calcTextareaHeight(
      textareaRef.current as HTMLTextAreaElement,
      minRows,
      maxRows
    )

    setTextareaStyle(Object.assign({}, textareaStyle, textareaCalcStyle))
  }

  const {
    type,
    size,
    prepend,
    append,
    icon,
    autoComplete,
    validating,
    rows,
    onMouseEnter,
    onMouseLeave,
    trim,
    ...otherProps
  } = props
  const classname = classnames(
    type === 'textarea' ? 'tb-textarea' : 'tb-input',
    size && `tb-input--${size}`,
    {
      'is-disabled': props.disabled,
      'tb-input-group': prepend || append,
      'tb-input-group--append': !!append,
      'tb-input-group--prepend': !!prepend
    }
  )

  if ('value' in props) {
    otherProps.value = fixControlledValue(props.value)

    delete otherProps.defaultValue
  }

  delete otherProps.resize
  delete otherProps.style
  delete otherProps.autosize
  delete otherProps.onIconClick

  if (type === 'textarea') {
    return (
      <div style={props.style} className={classnames(classname)}>
        <textarea
          {...otherProps}
          ref={textareaRef}
          className='tb-textarea__inner'
          style={textareaStyle}
          rows={rows}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        ></textarea>
      </div>
    )
  } else {
    console.log(icon)
    return (
      <div
        style={props.style}
        className={classnames(classname)}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {prepend && <div className='tb-input-group__prepend'>{prepend}</div>}
        {typeof icon === 'string' ? (
          <i className={`tb-input__icon iconfont ${icon}`} onClick={handleIconClick}>
            {prepend}
          </i>
        ) : (
          icon
        )}
        <input
          {...otherProps}
          ref={inputRef}
          type={type}
          className='tb-input__inner'
          autoComplete={autoComplete}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {validating && <i className='tb-input__icon tb-icon-loading'></i>}
        {append && <div className='tb-input-group__append'>{append}</div>}
      </div>
    )
  }
})

Input.defaultProps = {
  type: 'text',
  autosize: false,
  rows: 2,
  trim: false,
  autoComplete: 'off'
}

Input.propTypes = {
  // base
  type: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  disabled: PropTypes.bool,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  autoFocus: PropTypes.bool,
  maxLength: PropTypes.number,
  minLength: PropTypes.number,
  defaultValue: PropTypes.any,
  value: PropTypes.any,
  trim: PropTypes.bool,

  // type !== 'textarea'
  size: PropTypes.oneOf(['large', 'small', 'mini']),
  prepend: PropTypes.node,
  append: PropTypes.node,

  // type === 'textarea'
  autosize: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  rows: PropTypes.number,
  resize: PropTypes.oneOf(['none', 'both', 'horizontal', 'vertical']),

  // event
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onIconClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,

  // autoComplete
  autoComplete: PropTypes.string,
  inputSelect: PropTypes.func,

  // form related
  form: PropTypes.string,
  validating: PropTypes.bool
}

export default Input
