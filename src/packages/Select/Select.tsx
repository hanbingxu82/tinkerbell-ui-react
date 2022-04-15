/*
 * @Author: your name
 * @Date: 2022-04-12 15:37:35
 * @LastEditTime: 2022-04-15 13:51:20
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/Select/Select.tsx
 */

/* eslint-disable */

import React, { useEffect, useRef, useCallback, useState } from 'react'
import ReactDOM from 'react-dom'
import ClickOutside from 'react-click-outside'
import { debounce } from 'throttle-debounce'
import Popper from 'popper.js'
import CSSMotion from 'rc-motion'
import {
  useWillReceiveProps,
  useUpdateEffect
} from '../../utils/useUpdateEffect'
import reset from './style'
// import { Component, PropTypes, Transition, View } from '../../libs'
import { addResizeListener, removeResizeListener } from './resize-event'

// import { Scrollbar } from '../scrollbar'

import Tag from '../Tag'
import Input from '../Input'
// import i18n from '../locale'
import './index.scss'

const classnames = require('classnames')
const PropTypes = require('prop-types')

reset(`
  .tb-select-dropdown {
    position: absolute !important;
  }
`)

type State = {
  options: any
  isSelect: boolean
  inputLength: number
  inputWidth: number
  inputHovering: boolean
  filteredOptionsCount: number
  optionsCount: number
  hoverIndex: number
  bottomOverflowBeforeHidden: number
  cachedPlaceHolder: string
  currentPlaceholder: string
  selectedLabel: string
  value: any
  visible: boolean
  query: string
  selected: any
  voidRemoteQuery: boolean
  valueChangeBySelected: boolean
  selectedInit: boolean
  dropdownUl?: HTMLElement
}

const sizeMap: { [size: string]: number } = {
  large: 42,
  small: 30,
  mini: 22
}
let popperJS: any
let timeout: any
let debouncedOnInputChange: any
let resetInputWidth: any
let reference: any
let popper: any
// let selectedInit1: any
let skip: any
let deleteTagTag: any

const Select: any = React.forwardRef((props: any, _ref: any) => {
  const onQueryChangeQuery = useRef('')
  const rootRef: any = useRef(null)
  const referenceRef: any = useRef(null)
  const popperRef: any = useRef(null)
  const inputRef: any = useRef(null)
  const tagsRef: any = useRef(null)

  // 强制更新视图方法 start
  const [, updateState] = useState<any>()
  const forceUpdate = useCallback(() => updateState({}), [])
  // 强制更新视图方法 end
  /**
   * @description: 是否第一次加载组件
   * @param {*}
   * @return {*}
   */
  const initComponent = useRef(true)
  const [state, setState] = useState<State>({
    options: [],
    isSelect: true,
    inputLength: 20,
    inputWidth: 0,
    inputHovering: false,
    filteredOptionsCount: 0,
    optionsCount: 0,
    hoverIndex: -1,
    bottomOverflowBeforeHidden: 0,
    cachedPlaceHolder: props.placeholder || '请选择',
    currentPlaceholder: props.placeholder || '请选择',
    selectedLabel: '',
    selectedInit: false,
    visible: false,
    selected: null,
    value: props.value,
    valueChangeBySelected: false,
    voidRemoteQuery: false,
    query: ''
  })
  if (props.multiple) {
    state.selectedInit = true
    state.selected = []
  }

  if (props.remote) {
    state.voidRemoteQuery = true
  }

  // function getChildContext(): Object {
  //   return {
  //     component: ref
  //   }
  // }
  // console.log(getChildContext)
  useWillReceiveProps(
    (oldProps) => {
      if (props.placeholder != oldProps.placeholder) {
        state.currentPlaceholder = props.placeholder
      }

      if (props.value != oldProps.value) {
        state.value = props.value
      }
      state.inputWidth = reference.getBoundingClientRect().width
    },
    [props]
  )
  /**
   * @description: 监听 useWillReceiveProps value值变化
   * @param {*}
   * @return {*}
   */
  useEffect(() => {
    if (initComponent.current) return
    handleValueChange()
  }, [props.value])

  /**
   * @description: 组件将要更新数据时触发的函数
   * @param {_oldProps，oldState}:旧props， 旧state
   * @return {*}
   */
  useUpdateEffect((_oldProps, oldState) => {
    if (state.value != oldState.value) {
      onValueChange(state.value)
    }

    if (state.visible != oldState.visible) {
      if (props.onVisibleChange) {
        props.onVisibleChange(state.visible)
      }

      onVisibleChange(state.visible)
    }

    if (state.query != state.query) {
      onQueryChange(state.query)
    }

    if (Array.isArray(state.selected)) {
      if (state.selected.length != state.selected.length) {
        onSelectedChange(state.selected)
      }
    }
    state.inputWidth = reference.getBoundingClientRect().width
    // 更新 state
    setState({ ...state })
  }, props)

  function _debounce(): number {
    return props.remote ? 300 : 0
  }
  // @ts-ignore
  function handleClickOutside() {
    if (state.visible) {
      setState({ ...state, visible: false })
    }
  }
  function handleValueChange() {
    const { multiple } = props
    const { value, options } = state

    if (multiple && Array.isArray(value)) {
      setState({
        ...state,
        selected: options.reduce((prev: any, curr: any) => {
          return value.indexOf(curr.props.value) > -1 ? prev.concat(curr) : prev
        }, [])
      })
    } else {
      const selected: any = options.filter((option: any) => {
        return option.props.value === value
      })[0]
      if (selected) {
        setState({
          ...state,
          selectedLabel: selected.props.label || selected.props.value
        })
      }
    }
  }
  /**
   * @description: 监听上方函数 selected 数据变化
   * @param {*}
   * @return {*}
   */
  useEffect(() => {
    if (initComponent.current) return
    onSelectedChange(state.selected, false)
  }, [state.selected])

  function onVisibleChange(visible: boolean) {
    const { multiple, filterable } = props
    let {
      query,
      dropdownUl,
      selected,
      selectedLabel,
      bottomOverflowBeforeHidden
    } = state

    if (!visible) {
      reference.querySelector('input').blur()
      if (rootRef.current.querySelector('.tb-input__icon')) {
        const elements = rootRef.current.querySelector('.tb-input__icon')

        for (let i = 0; i < elements.length; i++) {
          elements[i].classList.remove('is-reverse')
        }
      }

      if (inputRef && inputRef.current) {
        inputRef.current.Element.blur()
      }

      resetHoverIndex()

      if (!multiple) {
        if (dropdownUl && selected) {
          const element: any = ReactDOM.findDOMNode(selected)
          bottomOverflowBeforeHidden =
            element.getBoundingClientRect().bottom -
            popper.getBoundingClientRect().bottom
        }

        if (selected && selected.props) {
          if (selected.props.value) {
            selectedLabel = selected.currentLabel()
          }
        } else if (filterable) {
          selectedLabel = ''
        }

        setState({ ...state, bottomOverflowBeforeHidden, selectedLabel })
      }
    } else {
      let icon = rootRef.current.querySelector('.tb-input__icon')

      if (icon && !icon.classList.contains('icon-reeor-fill')) {
        const elements = rootRef.current.querySelector('.tb-input__icon')

        for (let i = 0; i < elements.length; i++) {
          elements[i].classList.add('is-reverse')
        }
      }

      if (popperJS) {
        popperJS.update()
      }

      if (filterable) {
        query = selectedLabel

        if (multiple) {
          inputRef.current.Element.focus()
        } else {
          referenceRef.current.Element.focus()
        }
      }

      if (!dropdownUl) {
        let dropdownChildNodes = popper.childNodes
        dropdownUl = [].filter.call(
          dropdownChildNodes,
          (item: any) => item.tagName === 'UL'
        )[0]
      }

      if (!multiple && dropdownUl) {
        if (bottomOverflowBeforeHidden > 0) {
          dropdownUl.scrollTop += bottomOverflowBeforeHidden
        }
      }

      setState({ ...state, query: query || '', dropdownUl })
    }
  }
  function onValueChange(val: any) {
    const { multiple } = props

    let {
      options,
      valueChangeBySelected,
      selectedInit,
      selected,
      selectedLabel,
      currentPlaceholder,
      cachedPlaceHolder
    } = state

    if (valueChangeBySelected) {
      return setState({
        ...state,
        valueChangeBySelected: false
      })
    }

    if (multiple && Array.isArray(val)) {
      resetInputHeight()

      selectedInit = true
      selected = []
      currentPlaceholder = cachedPlaceHolder

      val.forEach((item) => {
        let option = options.filter(
          (option: any) => option.props.value === item
        )[0]
        if (option) {
          addOptionToValue(option)
        }
      })
      forceUpdate()
    }

    if (!multiple) {
      let option = options.filter(
        (option: any) => option.props.value === val
      )[0]

      if (option) {
        addOptionToValue(option)
        setState({ ...state, selectedInit, currentPlaceholder })
      } else {
        selected = {}
        selectedLabel = ''
        setState({
          ...state,
          selectedInit,
          selected,
          currentPlaceholder,
          selectedLabel
        })
      }
    }
  }
  useEffect(() => {
    if (initComponent.current) return
    resetHoverIndex()
  }, [
    state.selectedInit,
    state.selected,
    state.currentPlaceholder,
    state.selectedLabel
  ])

  function onSelectedChange(val: any, bubble: boolean = true) {
    // 判断父组件是不是有 form context
    const { multiple, filterable, onChange } = props
    let {
      query,
      hoverIndex,
      inputLength,
      selectedInit,
      currentPlaceholder,
      cachedPlaceHolder,
      valueChangeBySelected
    } = state

    if (multiple) {
      if (val.length > 0) {
        currentPlaceholder = ''
      } else {
        currentPlaceholder = cachedPlaceHolder
      }
      state.currentPlaceholder = currentPlaceholder
      valueChangeBySelected = true

      if (bubble) {
        onChange &&
          onChange(
            val.map((item: any) => item.props.value),
            val
          )
        props.context && props.context.form.onFieldChange()
      }

      if (filterable) {
        query = ''
        hoverIndex = -1
        inputLength = 20

        inputRef.current.Element.focus()
      }
      state.valueChangeBySelected = valueChangeBySelected
      state.query = query
      state.hoverIndex = hoverIndex
      state.inputLength = inputLength
      setState({
        ...state
      })
    } else {
      if (selectedInit) {
        return setState({
          ...state,
          selectedInit: false
        })
      }

      if (bubble) {
        onChange && onChange(val.props.value, val)
        props.context && props.context.form.onFieldChange()
      }
    }
  }
  /**
   * @description: 上方数据变化 onSelectedChange
   * @param {*}
   * @return {*}
   */
  useEffect(() => {
    if (initComponent.current) return
    if (inputRef && inputRef.current) {
      inputRef.current.Element.value = ''
    }
  }, [
    state.valueChangeBySelected,
    state.query,
    state.hoverIndex,
    state.inputLength
  ])

  function onQueryChange(query: string) {
    onQueryChangeQuery.current = query
    const { multiple, filterable, remote, remoteMethod, filterMethod } = props
    let { voidRemoteQuery, hoverIndex, options, optionsCount } = state

    if (popperJS) {
      popperJS.update()
    }

    if (multiple && filterable) {
      resetInputHeight()
    }

    if (remote && typeof remoteMethod === 'function') {
      hoverIndex = -1
      voidRemoteQuery = query === ''

      remoteMethod(query)

      options.forEach((option: any) => {
        option.resetIndex()
      })
    } else if (typeof filterMethod === 'function') {
      filterMethod(query)
    } else {
      state.filteredOptionsCount = optionsCount
    }
    setState({ ...state, hoverIndex, voidRemoteQuery })
  }
  useEffect(() => {
    if (initComponent.current) return
    state.options.forEach((option: any) => {
      option.queryChange(onQueryChangeQuery.current)
    })
  }, [state.filteredOptionsCount])

  function onEnter(): void {
    popper = ReactDOM.findDOMNode(popperRef.current as any)
    popperJS = new Popper(reference, popper, {
      modifiers: {
        computeStyle: {
          gpuAcceleration: false
        },
        preventOverflow: {
          boundariesElement: "window",
        },
      },
      
      onCreate: () => {
        console.log('create')
        resetTransformOrigin();
        // onEnter()
      },
      onUpdate: () => {
        console.log('onUpdate')
        resetTransformOrigin();
      },
    })
  }
  function resetTransformOrigin() {
    if (!popperJS) return;
    let xPlacement = popperJS.popper.getAttribute("x-placement");
    let placementStart = xPlacement.split("-")[0];
    let placementEnd = xPlacement.split("-")[1];
    const leftOrRight = xPlacement === "left" || xPlacement === "right";
    if (!leftOrRight) {
      popperJS.popper.style.transformOrigin = placementStart === "bottom" || (placementStart !== "top" && placementEnd === "start") ? "center top" : "center bottom";
    }
  }
  function onAfterLeave(): void {
    // popperJS.destroy()
  }

  function iconClass(): string {
    return showCloseIcon()
      ? 'icon-close'
      : props.remote && props.filterable
      ? ''
      : `icon-arrow-up ${state.visible ? 'is-reverse' : ''}`
  }

  function showCloseIcon(): boolean {
    let criteria =
      props.clearable &&
      state.inputHovering &&
      !props.multiple &&
      state.options.indexOf(state.selected) > -1

    if (!rootRef.current) return false
    let icon = rootRef.current.querySelector('.tb-input__icon')

    if (icon) {
      if (criteria) {
        icon.addEventListener('click', deleteSelected)
        icon.classList.add('is-show-close')
      } else {
        icon.removeEventListener('click', deleteSelected)
        icon.classList.remove('is-show-close')
      }
    }
    return criteria
  }

  function emptyText() {
    const { loading, filterable } = props
    const { voidRemoteQuery, options, filteredOptionsCount } = state

    if (loading) {
      return '加载中'
    } else {
      if (voidRemoteQuery) {
        state.voidRemoteQuery = false
        return false
      }

      if (filterable && filteredOptionsCount === 0) {
        return '无匹配数据'
      }

      if (options.length === 0) {
        return '无数据'
      }
    }

    return null
  }
  // @ts-ignore
  function handleClose() {
    setState({ ...state, visible: false })
  }
  function toggleLastOptionHitState(hit?: boolean): any {
    const { selected } = state

    if (!Array.isArray(selected)) return

    const option = selected[selected.length - 1]

    if (!option) return

    if (hit === true || hit === false) {
      return (option.hitState = hit)
    }

    option.hitState = !option.hitState

    return option.hitState
  }

  function deletePrevTag(e: any) {
    if (e.target.value.length <= 0 && !toggleLastOptionHitState()) {
      state.selected.pop()
      setState({ ...state })
    }
  }

  function addOptionToValue(option: any, init?: boolean) {
    const { multiple, remote } = props
    let { selected, selectedLabel, hoverIndex, value } = state

    if (multiple) {
      if (
        selected.indexOf(option) === -1 &&
        (remote ? value.indexOf(option.props.value) === -1 : true)
      ) {
        state.selectedInit = !!init
        selected.push(option)
        resetHoverIndex()
      }
    } else {
      state.selectedInit = !!init
      selected = option
      selectedLabel = option.currentLabel()
      hoverIndex = option.index
      setState({ ...state, selected, selectedLabel, hoverIndex })
    }
  }

  function managePlaceholder() {
    let { currentPlaceholder, cachedPlaceHolder } = state

    if (currentPlaceholder !== '') {
      currentPlaceholder = inputRef.current.Element.value
        ? ''
        : cachedPlaceHolder
    }

    setState({ ...state, currentPlaceholder })
  }

  function resetInputState(e: any) {
    if (e.keyCode !== 8) {
      toggleLastOptionHitState(false)
    }

    setState({
      ...state,
      inputLength: inputRef.current.Element.value.length * 15 + 20
    })
  }

  function _resetInputWidth() {
    setState({
      ...state,
      inputWidth: reference.getBoundingClientRect().width
    })
  }

  function resetInputHeight() {
    let inputChildNodes = reference.childNodes
    let input: any = [].filter.call(
      inputChildNodes,
      (item: any) => item.tagName === 'INPUT'
    )[0]

    input.style.height =
      Math.max(tagsRef.current.clientHeight + 6, sizeMap[props.size] || 36) +
      'px'

    if (popperJS) {
      popperJS.update()
    }
  }

  function resetHoverIndex() {
    const { multiple } = props
    let { hoverIndex, options, selected } = state

    setTimeout(() => {
      if (!multiple) {
        hoverIndex = options.indexOf(selected)
      } else {
        if (selected.length > 0) {
          hoverIndex = Math.min.apply(
            null,
            selected.map((item: any) => options.indexOf(item))
          )
        } else {
          hoverIndex = -1
        }
      }

      setState({ ...state, hoverIndex })
    }, 300)
  }

  function toggleMenu() {
    const { filterable, disabled } = props
    const { query, visible } = state

    if (filterable && query === '' && visible) {
      return
    }

    if (!disabled) {
      setState({
        ...state,
        visible: !visible
      })
    }
  }

  function navigateOptions(direction: string) {
    let { visible, hoverIndex, options } = state
    if (!visible) {
      return setState({
        ...state,
        visible: true
      })
    }

    if (
      options.length !=
      options.filter((item: any) => item.props.disabled === true).length
    ) {
      if (direction === 'next') {
        hoverIndex++

        if (hoverIndex === options.length) {
          hoverIndex = 0
        }

        if (
          options[hoverIndex].props.disabled === true ||
          options[hoverIndex].props.groupDisabled === true ||
          !options[hoverIndex].state.visible
        ) {
          skip = 'next'
        }
      }

      if (direction === 'prev') {
        hoverIndex--

        if (hoverIndex < 0) {
          hoverIndex = options.length - 1
        }

        if (
          options[hoverIndex].props.disabled === true ||
          options[hoverIndex].props.groupDisabled === true ||
          !options[hoverIndex].state.visible
        ) {
          skip = 'prev'
        }
      }
    }

    setState({ ...state, hoverIndex, options })
  }
  useEffect(() => {
    if (initComponent.current) return
    if (skip) {
      navigateOptions(skip)
    }
    resetScrollTop()
  }, [state.hoverIndex, state.options])

  function resetScrollTop() {
    const element: any = ReactDOM.findDOMNode(
      state.options[state.hoverIndex] as any
    )
    const bottomOverflowDistance =
      element.getBoundingClientRect().bottom -
      popper.getBoundingClientRect().bottom
    const topOverflowDistance =
      element.getBoundingClientRect().top - popper.getBoundingClientRect().top

    if (state.dropdownUl) {
      if (bottomOverflowDistance > 0) {
        state.dropdownUl.scrollTop += bottomOverflowDistance
      }
      if (topOverflowDistance < 0) {
        state.dropdownUl.scrollTop += topOverflowDistance
      }
    }
  }

  function selectOption() {
    let { hoverIndex, options } = state

    if (options[hoverIndex]) {
      onOptionClick(options[hoverIndex])
    }
  }

  function deleteSelected(e: any) {
    e.stopPropagation()

    if (state.selectedLabel != '') {
      setState({
        ...state,
        selected: {},
        selectedLabel: '',
        visible: false
      })

      props.context.form && props.context.form.onFieldChange()

      if (props.onChange) {
        props.onChange('')
      }

      if (props.onClear) {
        props.onClear()
      }
    }
  }

  function deleteTag(tag: any) {
    const index = state.selected.indexOf(tag)
    deleteTagTag = tag
    if (index > -1 && !props.disabled) {
      const selected = state.selected.slice(0)

      selected.splice(index, 1)

      setState({ ...state, selected })
    }
  }
  /**
   * @description: 上方 deleteTag 处理监听selected
   * @param {*}
   * @return {*}
   */
  useEffect(() => {
    if (initComponent.current) return
    if (props.onRemoveTag) {
      props.onRemoveTag(deleteTagTag.props.value)
    }
  }, [state.selected])

  function handleIconClick(event: any) {
    if (iconClass().indexOf('circle-close') > -1) {
      deleteSelected(event)
    } else {
      toggleMenu()
    }
  }

  function onInputChange() {
    if (props.filterable && state.selectedLabel !== state.value) {
      setState({
        ...state,
        query: state.selectedLabel
      })
    }
  }

  function onOptionCreate(option: any) {
    state.options.push(option)
    state.optionsCount++
    state.filteredOptionsCount++

    forceUpdate()
    handleValueChange()
  }

  function onOptionDestroy(option: any) {
    state.optionsCount--
    state.filteredOptionsCount--

    const index = state.options.indexOf(option)

    if (index > -1) {
      state.options.splice(index, 1)
    }

    state.options.forEach((el: any) => {
      if (el != option) {
        el.resetIndex()
      }
    })

    forceUpdate()
    handleValueChange()
  }

  function onOptionClick(option: any) {
    const { multiple } = props
    let { selected, selectedLabel } = state

    if (!multiple) {
      selected = option
      selectedLabel = option.currentLabel()
      state.visible = false
    } else {
      let optionIndex = -1

      selected = selected.slice(0)

      selected.forEach((item: any, index: any) => {
        if (item === option || item.props.value === option.props.value) {
          optionIndex = index
        }
      })

      if (optionIndex > -1) {
        selected.splice(optionIndex, 1)
      } else {
        selected.push(option)
      }
    }
    setState(() => ({ ...state, selected, selectedLabel }))
  }
  /**
   * @description: 上方 onOptionClick 处理监听 selected、selectedLabel
   * @param {*}
   * @return {*}
   */
  useEffect(() => {
    if (initComponent.current) return
    if (!props.multiple) {
      onSelectedChange(state.selected)
    }
  }, [state.selected, state.selectedLabel, state.visible])

  function onMouseDown(event: any) {
    event.preventDefault()

    if (inputRef && inputRef.current) {
      inputRef.current.Element.focus()
    }

    toggleMenu()
  }

  function onMouseEnter() {
    setState({
      ...state,
      inputHovering: true
    })
  }

  function onMouseLeave() {
    setState({
      ...state,
      inputHovering: false
    })
  }
  useEffect(() => {
    initComponent.current = false
    reference = ReactDOM.findDOMNode(referenceRef.current.Element as any)
    popper = ReactDOM.findDOMNode(popperRef.current as any)
    console.log(reference, popper)
    handleValueChange()
    debouncedOnInputChange = debounce(_debounce(), () => {
      onInputChange()
    })
    resetInputWidth = _resetInputWidth
    addResizeListener(rootRef.current, resetInputWidth)
    return () => {
      removeResizeListener(rootRef.current, resetInputWidth)
    }
  }, [])

  const {
    multiple,
    size,
    disabled,
    filterable
    // loading
  } = props
  const {
    // selected,
    // inputWidth,
    // inputLength,
    // query,
    // selectedLabel,
    // visible,
    // options,
    // filteredOptionsCount,
    // currentPlaceholder
  } = state
  return (
    <div ref={rootRef} style={props.style} className={classnames('tb-select')}>
      {multiple && (
        <div
          ref={tagsRef}
          className='tb-select__tags'
          onClick={toggleMenu}
          style={{
            maxWidth: state.inputWidth - 32
          }}
        >
          {state.selected.map((el: any) => {
            return (
              <Tag
                type='primary'
                key={el.props.value}
                hit={el.hitState}
                closable={!disabled}
                // closeTransition={true}
                onClose={() => {
                  deleteTag(el)
                }}
              >
                <span className='tb-select__tags-text'>
                  {el.currentLabel()}
                </span>
              </Tag>
            )
          })}
          {filterable && (
            <input
              ref={inputRef}
              type='text'
              className={classnames('tb-select__input', size && `is-${size}`)}
              style={{
                width: state.inputLength,
                maxWidth: state.inputWidth - 42
              }}
              disabled={disabled}
              defaultValue={state.query}
              onKeyUp={managePlaceholder}
              onKeyDown={(e) => {
                resetInputState(e)
                switch (e.keyCode) {
                  case 27:
                    setState({ ...state, visible: false })
                    e.preventDefault()
                    break
                  case 8:
                    deletePrevTag(e)
                    break
                  case 13:
                    selectOption()
                    e.preventDefault()
                    break
                  case 38:
                    navigateOptions('prev')
                    e.preventDefault()
                    break
                  case 40:
                    navigateOptions('next')
                    e.preventDefault()
                    break
                  default:
                    break
                }
              }}
              onChange={(e) => {
                clearTimeout(timeout)

                timeout = setTimeout(() => {
                  setState({
                    ...state,
                    query: state.value
                  })
                }, _debounce())

                state.value = e.target.value
              }}
            />
          )}
        </div>
      )}
      <Input
        ref={referenceRef}
        value={state.selectedLabel}
        type='text'
        placeholder={state.currentPlaceholder}
        name='name'
        size={size}
        disabled={disabled}
        readOnly={!filterable || multiple}
        icon={iconClass() || undefined}
        onChange={(value: any) => setState({ ...state, selectedLabel: value })}
        onIconClick={handleIconClick}
        onMouseDown={onMouseDown}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onKeyUp={debouncedOnInputChange}
        onKeyDown={(e: any) => {
          switch (e.keyCode) {
            case 9:
            case 27:
              setState({ ...state, visible: false })
              e.preventDefault()
              break
            case 13:
              selectOption()
              e.preventDefault()
              break
            case 38:
              navigateOptions('prev')
              e.preventDefault()
              break
            case 40:
              navigateOptions('next')
              e.preventDefault()
              break
            default:
              break
          }
        }}
      />
      <CSSMotion
        visible={state.visible && emptyText() !== false}
        onEnterActive={() => {
          onEnter()
        }}
        onLeaveEnd={() => {
          console.log(123123123)
          onAfterLeave()
        }}
        motionName='tb-zoom-in-top'
      >
        {({ className, style }) => (
          <div
            ref={popperRef}
            className={classnames(
              'tb-select-dropdown',
              {
                'is-multiple': multiple
              },
              className
            )}
            style={{ minWidth: state.inputWidth, ...style }}
          >
            {/* {options.length > 0 && filteredOptionsCount > 0 && !loading ? (
              <Scrollbar
                viewComponent='ul'
                wrapClass='tb-select-dropdown__wrap'
                viewClass='tb-select-dropdown__list'
              > */}
            {React.Children.map(props.children, (child) => {
              // to do sth
              return React.cloneElement(child, {
                onOptionCreate,
                onOptionDestroy,
                addOptionToValue,
                onOptionClick,
                props,
                state,
                setState
              })
            })}
            {/* </Scrollbar>
            ) : null} */}

            {emptyText() && (
              <p className='tb-select-dropdown__empty'>{emptyText()}</p>
            )}
          </div>
        )}
      </CSSMotion>
    </div>
  )
})

Select.childContextTypes = {
  component: PropTypes.any
}

Select.contextTypes = {
  form: PropTypes.any
}

Select.propTypes = {
  value: PropTypes.any,
  size: PropTypes.string,
  disabled: PropTypes.bool,
  clearable: PropTypes.bool,
  filterable: PropTypes.bool,
  loading: PropTypes.bool,
  remote: PropTypes.bool,
  remoteMethod: PropTypes.func,
  filterMethod: PropTypes.func,
  multiple: PropTypes.bool,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onVisibleChange: PropTypes.func,
  onRemoveTag: PropTypes.func,
  onClear: PropTypes.func
}

export default ClickOutside(Select)
