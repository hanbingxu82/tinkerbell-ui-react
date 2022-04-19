// eslint-disable
import React, { useState, useEffect } from 'react'
// import { Component, PropTypes, View } from '../../libs';

const classnames = require('classnames')
const PropTypes = require('prop-types')

type State = {
  index: number
  visible: boolean
  hitState: boolean
}
const Option: any = React.forwardRef((props: any, _ref: any) => {
  const optionRef: any = React.createRef()
  const [state, setState] = useState<State>({
    index: -1,
    visible: true,
    hitState: false
  })

  // React.useImperativeHandle(
  //   optionRef,
  //   () => ({
  //     currentLabel,
  //     queryChange,
  //     resetIndex
  //   }),
  //   [state]
  // )
  useEffect(() => {
    optionRef.current = optionRef.current ? optionRef.current : {}
    optionRef.current.currentLabel = currentLabel
    optionRef.current.queryChange = queryChange
    optionRef.current.resetIndex = resetIndex
    optionRef.current.props = {}
    optionRef.current.props.value = props.value
  }, [state])

  useEffect(() => {
    // console.log(optionRef.current.currentLabel)
    props.onOptionCreate(optionRef.current)
    const index = props.state.options.indexOf(optionRef.current)
    setState({ ...state, index })
    if (currentSelected() === true) {
      props.addOptionToValue(optionRef.current, true)
    }

    return () => {
      props.onOptionDestroy(optionRef.current)
    }
  }, [])

  function currentSelected(): boolean {
    return (
      props.state.selected ||
      (props.props.multiple
        ? props.state.value.indexOf(props.value) > -1
        : props.state.value === props.value)
    )
  }
  function currentLabel(): string {
    return (
      props.label ||
      (typeof props.value === 'string' || typeof props.value === 'number'
        ? props.value
        : '')
    )
  }
  function itemSelected(): boolean {
    if (
      Object.prototype.toString.call(props.state.selected) ===
        '[object Object]' ||
      Object.prototype.toString.call(props.state.selected) ===
        '[object HTMLDivElement]'
    ) {
      // console.log(props.state.selected.props.value)
      return props.value === props.state.selected.props.value
    } else if (Array.isArray(props.state.selected)) {
      return (
        props.state.selected
          .map((el: { props: { value: any } }) => el.props.value)
          .indexOf(props.value) > -1
      )
    }

    return false
  }

  function hoverItem() {
    if (!props.disabled && !props.props.disabled) {
      props.hoverItem(props.state.options.indexOf(optionRef.current))
    }
  }

  function selectOptionClick() {
    if (props.disabled !== true && props.props.disabled !== true) {
      props.onOptionClick(optionRef.current)
    }
  }
  // @ts-ignore 实例
  function queryChange(query: string) {
    // query 里如果有正则中的特殊字符，需要先将这些字符转义
    const parsedQuery = query.replace(
      /(\^|\(|\)|\[|\]|\$|\*|\+|\.|\?|\\|\{|\}|\|)/g,
      '\\$1'
    )
    const visible = new RegExp(parsedQuery, 'i').test(currentLabel())

    if (!visible) {
      props.queryChange()
    }
    setState({ ...state, visible })
  }
  // @ts-ignore 实例
  function resetIndex() {
    setState({
      ...state,
      index: props.state.options.indexOf(optionRef.current)
    })
  }

  return (
    <div ref={optionRef}>
      {state.visible ? (
        <li
          style={props.style}
          className={classnames('tb-select-dropdown__item', {
            selected: itemSelected(),
            'is-disabled': props.disabled || props.props.disabled,
            hover: props.state.hoverIndex === state.index
          })}
          onMouseEnter={hoverItem}
          onClick={selectOptionClick}
        >
          {props.children || <span>{currentLabel()}</span>}
        </li>
      ) : null}
    </div>
  )
})

Option.contextTypes = {
  component: PropTypes.any
}

Option.propTypes = {
  value: PropTypes.any.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  selected: PropTypes.bool,
  disabled: PropTypes.bool
}

export default Option
