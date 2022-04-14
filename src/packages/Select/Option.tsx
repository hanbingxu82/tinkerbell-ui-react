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
const Option: any = function (props: any) {
  const [state, setState] = useState<State>({
    index: -1,
    visible: true,
    hitState: false
  })
  const OptionChildObj = {
    state,
    setState,
    props,
    currentLabel,
    queryChange,
    resetIndex
  }
  useEffect(() => {
    props.onOptionCreate(OptionChildObj)
    setState({
      ...state,
      index: props.state.options.indexOf(OptionChildObj)
    })

    if (currentSelected() === true) {
      props.addOptionToValue(OptionChildObj, true)
    }
    return () => {
      props.onOptionDestroy(OptionChildObj)
    }
  }, [])
  function currentSelected(): boolean {
    return (
      props.selected ||
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
      Object.prototype.toString.call(props.state.selected) === '[object Object]'
    ) {
      return Option === props.state.selected
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
      props.setState({
        ...props.state,
        hoverIndex: props.state.options.indexOf(OptionChildObj)
      })
    }
  }

  function selectOptionClick() {
    if (props.disabled !== true && props.props.disabled !== true) {
      props.onOptionClick(OptionChildObj)
    }
  }
  // @ts-ignore 实例
  function queryChange(query: string) {
    console.log(query)
    // query 里如果有正则中的特殊字符，需要先将这些字符转义
    const parsedQuery = query.replace(
      /(\^|\(|\)|\[|\]|\$|\*|\+|\.|\?|\\|\{|\}|\|)/g,
      '\\$1'
    )
    const visible = new RegExp(parsedQuery, 'i').test(currentLabel())

    if (!visible) {
      props.setState({
        ...props.state,
        filteredOptionsCount: props.state.filteredOptionsCount - 1
      })
    }

    setState({ ...state, visible })
  }
  // @ts-ignore 实例
  function resetIndex() {
    setState({
      ...state,
      index: props.state.options.indexOf(OptionChildObj)
    })
  }

  const { visible, index } = state
  return (
    <div>
      {visible ? (
        <li
          style={props.style}
          className={classnames('tb-select-dropdown__item', {
            selected: itemSelected(),
            'is-disabled': props.disabled || props.props.disabled,
            hover: props.state.hoverIndex === index
          })}
          onMouseEnter={hoverItem}
          onClick={selectOptionClick}
        >
          {props.children || <span>{currentLabel()}</span>}
        </li>
      ) : null}
    </div>
  )
}

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
