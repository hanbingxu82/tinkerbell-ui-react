/*
 * @Author: your name
 * @Date: 2022-04-11 09:23:23
 * @LastEditTime: 2022-04-11 14:07:51
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/InputNumber/index.tsx
 */
/* @flow */

import React, { useEffect, useRef, useState } from 'react'
import Input from '../Input'
import { accAdd, accSub } from './util'
import { useWillReceiveProps } from '../../utils/useUpdateEffect'
import { useImperativeHandle } from 'react'
import './index.scss'

type State = {
  value: number | undefined | string
  inputActive: boolean
}

const classnames = require('classnames')
const PropTypes = require('prop-types')

const InputNumber: any = React.forwardRef((props: any, ref: any) => {
  const [state, setState] = useState<State>({
    value: props.defaultValue,
    inputActive: false
  })
  let timeout: any = useRef(null)
  useWillReceiveProps(
    (oldProps) => {
      if (props.value !== oldProps.value) {
        setState({ inputActive: state.inputActive, value: props.value })
      }
    },
    [props]
  )
  useEffect(() => {
    onChange()

    if (timeout.current) {
      clearTimeout(timeout.current)
      timeout.current = setTimeout(() => {
        onBlur()
      }, 750)
    }
  }, [state.value]) // eslint-disable-line
  function onKeyDown(e: any): void {
    switch (e.keyCode) {
      case 38: // KeyUp
        e.preventDefault()
        increase()
        break
      case 40: // KeyDown
        e.preventDefault()
        decrease()
        break
      default:
        break
    }
  }

  function onBlur(): void {
    let value = state.value

    if (isValid()) {
      value = Number(value)

      if (value > props.max) {
        value = Number(props.max)
      } else if (value < props.min) {
        value = Number(props.min)
      }
    } else {
      value = undefined
    }

    setState({ ...state, value })
  }

  function onInput(value: number): void {
    setState({ ...state, value })
  }

  function onChange(): void {
    if (props.onChange) {
      props.onChange(state.value)
    }
  }

  function isValid(): boolean {
    return state.value !== '' && !isNaN(Number(state.value))
  }

  function minDisabled(): boolean {
    return (
      !isValid() || (state.value as number) - Number(props.step) < props.min
    )
  }

  function maxDisabled(): boolean {
    return (
      !isValid() || (state.value as number) + Number(props.step) > props.max
    )
  }

  function increase(): void {
    const { step, max, disabled, min } = props
    let { value, inputActive } = state

    if (maxDisabled()) {
      inputActive = false
    } else {
      if ((value as number) + Number(step) > max || disabled) return
      if ((value as number) + Number(step) < min) value = min - Number(step)

      value = accAdd(step, value as number)
    }
    setState({ value, inputActive })
  }

  function decrease(): void {
    const { step, min, disabled, max } = props
    let { value, inputActive } = state

    if (minDisabled()) {
      inputActive = false
    } else {
      if ((value as number) - Number(step) < min || disabled) return
      if ((value as number) - Number(step) > max)
        value = Number(max) + Number(step)
      value = accSub(value as number, step)
    }

    setState({ value, inputActive })
  }

  function activeInput(disabled: boolean): void {
    if (!props.disabled && !disabled) {
      setState({
        ...state,
        inputActive: true
      })
    }
  }

  function inactiveInput(disabled: boolean): void {
    if (!props.disabled && !disabled) {
      setState({
        ...state,
        inputActive: false
      })
    }
  }

  // 向外暴露两个实例方法
  useImperativeHandle(ref, () => {
    return { methods: { activeInput, inactiveInput } }
  })
  const { controls, disabled, size } = props
  const { value, inputActive } = state
  return (
    <div
      style={props.style}
      className={classnames(
        'tb-input-number',
        size && `tb-input-number--${size}`,
        {
          'is-disabled': disabled,
          'is-without-controls': !controls
        }
      )}
    >
      {controls && (
        <span
          className={classnames('tb-input-number__decrease', {
            'is-disabled': minDisabled()
          })}
          onClick={decrease}
        >
          <i className='iconfont icon-sami-select'></i>
        </span>
      )}
      {controls && (
        <span
          className={classnames('tb-input-number__increase', {
            'is-disabled': maxDisabled()
          })}
          onClick={increase}
        >
          <i className='iconfont icon-add-select'></i>
        </span>
      )}
      <Input
        className={classnames({
          'is-active': inputActive
        })}
        ref={ref}
        value={value}
        disabled={disabled}
        size={size}
        onChange={onInput}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
      />
    </div>
  )
})

InputNumber.propTypes = {
  defaultValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  value: PropTypes.number,
  step: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  min: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  disabled: PropTypes.bool,
  controls: PropTypes.bool,
  size: PropTypes.string,
  onChange: PropTypes.func
}

InputNumber.defaultProps = {
  step: 1,
  controls: true,
  max: Infinity,
  min: 0
}

export default InputNumber
