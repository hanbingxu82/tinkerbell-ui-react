/*
 * @Author: your name
 * @Date: 2022-04-12 15:37:35
 * @LastEditTime: 2023-07-26 11:05:00
 * @LastEditors: hanbingxu
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/Select/Select.tsx
 */

/* eslint-disable */

import React, {
  useEffect,
  useRef,
  useCallback,
  useState,
  useContext
} from 'react'
import ReactDOM from 'react-dom'
import { listenForOutsideClicks } from './somewhere'
import { debounce } from 'throttle-debounce'
import Popper from 'popper.js'
import CSSMotion from 'rc-motion'
import {
  useWillReceiveProps,
  useUpdateEffect
} from '../../utils/useUpdateEffect'
import reset from './style'
import { addResizeListener, removeResizeListener } from './resize-event'

import Tag from '../Tag'
import Input from '../Input'
import './index.scss'
import { FormItemContext } from '../Form/FormItem'

const classnames = require('classnames')
const PropTypes = require('prop-types')

reset(`
  .tb-select-dropdown {
    position: absolute !important;
  }
`)

const sizeMap: { [size: string]: number } = {
  large: 42,
  small: 30,
  mini: 22
}
let popperJS: any
let timeout: any
let debouncedOnInputChange: any
let resetInputWidth: any
let popper: any
// let selectedInit1: any
let skip: any
let deleteTagTag: any

const Select: any = React.memo((props: any) => {
  const onQueryChangeQuery = useRef('')
  const rootRef: any = useRef(null)
  const referenceRef: any = useRef(null)
  const popperRef: any = useRef(null)
  const inputRef: any = useRef(null)
  const tagsRef: any = useRef(null)
  const [listening, setListening] = useState(false)

  const FormParent: any = useContext(FormItemContext)

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
  const [visible, setVisible] = useState(false)
  let [options, setOptions] = useState<any>([])
  let [isSelect] = useState<boolean>(true)
  let [inputLength, setInputLength] = useState<number>(20)
  let [inputWidth, setInputWidth] = useState<number>(0)
  let [inputHovering, setInputHovering] = useState<boolean>(false)
  let [filteredOptionsCount, setFilteredOptionsCount] = useState<number>(0)
  let [optionsCount, setOptionsCount] = useState<number>(0)
  let [hoverIndex, setHoverIndex] = useState<number>(-1)
  let [bottomOverflowBeforeHidden, setBottomOverflowBeforeHidden] = useState<
    number | string
  >(0)
  let [cachedPlaceHolder] = useState<string>(props.placeholder || '请选择')
  let [currentPlaceholder, setCurrentPlaceholder] = useState<string>(
    props.placeholder || '请选择'
  )
  let [selectedLabel, setSelectedLabel] = useState<string>('')
  let [selectedInit, setSelectedInit] = useState<boolean>(
    props.multiple ? true : false
  )
  let [selected, setSelected] = useState<any>(props.multiple ? [] : null)
  let [value, setValue] = useState<any>(null)
  let [valueChangeBySelected, setValueChangeBySelected] =
    useState<boolean>(false)
  let [voidRemoteQuery, setVoidRemoteQuery] = useState<boolean>(false)
  let [query, setQuery] = useState<string>('')
  let [dropdownUl] = useState<any>(null)
  let [oldP, setOldP] = useState<any>({})

  /** 监听 变化current Start*/
  let watchStateValue = useRef('')
  let watchSelected = useRef('')
  let watchSelectedDel = useRef('')
  let watchAllSSCS = useRef('')
  let watchCurrentPlaceholder = useRef('')
  let watchVQHI = useRef('')
  let watchFilteredOptionsCount = useRef('')
  let watchHO = useRef('')
  let watchSS = useRef('')
  let watchUseEffectInit = useRef('')
  /** 监听 变化current End */

  let reference: any = useRef(null)

  if (props.remote) {
    setVoidRemoteQuery(true)
  }
  useEffect(
    listenForOutsideClicks(listening, setListening, rootRef, setVisible),
    []
  )
  useWillReceiveProps(
    (oldProps) => {
      if (props.placeholder != oldProps.placeholder) {
        setCurrentPlaceholder(props.placeholder)
      }
      if (oldProps.value !== undefined && props.value != oldProps.value) {
        watchStateValue.current = 'useWillReceiveProps'
        setValue(props.value)
      }
      reference.current &&
        setInputWidth(reference.current.getBoundingClientRect().width)

      setOldP({ ...props })
    },
    props,
    initComponent.current,
    oldP
  )

  function _debounce(): number {
    return props.remote ? 300 : 0
  }
  function handleValueChange(
    isFirst: boolean = false,
    transmitValue: any = props.value
  ) {
    const { multiple } = props
    if (multiple && Array.isArray(props.value)) {
      setSelected(
        options.reduce((prev: any, curr: any) => {
          return props.value.indexOf(curr.props.value) > -1
            ? prev.concat(curr)
            : prev
        }, [])
      )
      watchSelected.current = 'handleValueChangeSelected'
    } else {
      const selected: any = options.filter((option: any) => {
        return option.props.value === transmitValue
      })[0]
      onSelectedChange(selected, isFirst)
    }
  }

  /**
   * @description: 监听上方函数 selected 数据变化
   * @param {*}
   * @return {*}
   */
  useEffect(() => {
    if (initComponent.current) return
    if (watchSelected.current === 'handleValueChangeSelected') {
      onSelectedChange(selected, false)
    }
    watchSelected.current = ''
  }, [selected])

  function onVisibleChange(visible: boolean) {
    const { multiple, filterable } = props

    if (!visible) {
      reference.current.blur()
      if (rootRef.current.querySelector('.tb-input__icon')) {
        const elements = rootRef.current.querySelector('.tb-input__icon')

        for (let i = 0; i < elements.length; i++) {
          elements[i].classList.remove('is-reverse')
        }
      }

      if (inputRef && inputRef.current) {
        inputRef.current.blur()
      }

      resetHoverIndex()

      if (!multiple) {
        if (dropdownUl && selected) {
          const element: any = ReactDOM.findDOMNode(selected)
          setBottomOverflowBeforeHidden(
            element.getBoundingClientRect().bottom -
              popper.getBoundingClientRect().bottom
          )
        }

        if (selected && selected.props) {
          if (selected.props.value) {
            setSelectedLabel(selected.currentLabel())
          }
        } else if (filterable) {
          setSelectedLabel('')
        }
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
        setQuery(selectedLabel || '')
        if (multiple) {
          inputRef.current.focus()
        } else {
          reference.current.focus()
        }
      }
    }
  }
  function onValueChange(val: any) {
    const { multiple } = props
    if (valueChangeBySelected) {
      return setValueChangeBySelected(false)
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
        setSelectedInit(selectedInit)
        setCurrentPlaceholder(currentPlaceholder)
      } else {
        selected = {}
        selectedLabel = ''
        setSelectedInit(selectedInit)
        setSelected(selected)
        setCurrentPlaceholder(currentPlaceholder)
        setSelectedLabel(selectedLabel)
        watchAllSSCS.current = 'onValueChangeSSCS'
      }
    }
  }
  useEffect(() => {
    if (initComponent.current) return
    if (watchAllSSCS.current === 'onValueChangeSSCS') {
      resetHoverIndex()
    }
    watchAllSSCS.current === ''
  }, [selectedInit, selected, currentPlaceholder, selectedLabel])

  function onSelectedChange(val: any, bubble: boolean = true) {
    // 判断父组件是不是有 form context
    const { multiple, filterable, onChange } = props
    if (multiple) {
      if (val.length > 0) {
        setCurrentPlaceholder('')
        // 新增一个判断 如果 currentPlaceholder = '' 也同样会判断高度
        if (currentPlaceholder === '') {
          resetInputHeight()
        }
      } else {
        setCurrentPlaceholder(cachedPlaceHolder)
      }
      watchCurrentPlaceholder.current = 'onSelectedChangeCurrentPlaceholder'
      valueChangeBySelected = true

      if (bubble) {
        onChange &&
          onChange(
            val.map((item: any) => item.props.value),
            val
          )

        FormParent && FormParent.onFieldChange()
        console.log('我执行了')
        // props.context && props.context.form.onFieldChange()
      }

      if (filterable) {
        query = ''
        hoverIndex = -1
        inputLength = 20
        inputRef.current.focus()
      }
      setValueChangeBySelected(valueChangeBySelected)
      setQuery(query)
      setHoverIndex(hoverIndex)
      setInputLength(inputLength)
      watchVQHI.current = 'onSelectedChangeVQHI'
    } else {
      if (selectedInit) {
        return setSelectedInit(false)
      }

      if (bubble) {
        onChange && val && val.props && onChange(val.props.value, val)
        FormParent && FormParent.onFieldChange()
        // props.context && props.context.form.onFieldChange()
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
    if (
      watchCurrentPlaceholder.current === 'onSelectedChangeCurrentPlaceholder'
    ) {
      resetInputHeight()
    }
    watchCurrentPlaceholder.current = ''
  }, [currentPlaceholder])

  useEffect(() => {
    if (initComponent.current) return
    if (watchVQHI.current === 'onSelectedChangeVQHI') {
      if (inputRef && inputRef.current) {
        inputRef.current.value = ''
      }
    }
    watchVQHI.current = ''
  }, [valueChangeBySelected, query, hoverIndex, inputLength])

  function onQueryChange(query: string) {
    console.log(query)
    onQueryChangeQuery.current = query
    const { multiple, filterable, remote, remoteMethod, filterMethod } = props
    // let { voidRemoteQuery, hoverIndex, options, optionsCount } = state

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
      setFilteredOptionsCount(optionsCount)
      options.forEach((option: any) => {
        option.queryChange(onQueryChangeQuery.current)
      })
      watchFilteredOptionsCount.current = 'onQueryChangeFilteredOptionsCount'
    }
    setHoverIndex(hoverIndex)
    setVoidRemoteQuery(voidRemoteQuery)
  }
  /**
   * @description: 监听 onQueryChange watchFilteredOptionsCount
   * @param {*}
   * @return {*}
   */
  useEffect(() => {
    if (initComponent.current) return
    if (
      watchFilteredOptionsCount.current === 'onQueryChangeFilteredOptionsCount'
    ) {
      options.forEach((option: any) => {
        option.queryChange(onQueryChangeQuery.current)
      })
    }
    watchFilteredOptionsCount.current = ''
  }, [filteredOptionsCount])

  function onEnter(): void {
    popper = ReactDOM.findDOMNode(popperRef.current as any)
    popperJS = new Popper(reference.current, popper, {
      modifiers: {
        computeStyle: {
          gpuAcceleration: false
        },
        preventOverflow: {
          boundariesElement: 'window'
        }
      },

      onCreate: () => {
        console.log('create')
        resetTransformOrigin()
      },
      onUpdate: () => {
        console.log('onUpdate')
        resetTransformOrigin()
      }
    })
  }
  function resetTransformOrigin() {
    if (!popperJS) return
    let xPlacement = popperJS.popper.getAttribute('x-placement')
    let placementStart = xPlacement.split('-')[0]
    let placementEnd = xPlacement.split('-')[1]
    const leftOrRight = xPlacement === 'left' || xPlacement === 'right'
    if (!leftOrRight) {
      popperJS.popper.style.transformOrigin =
        placementStart === 'bottom' ||
        (placementStart !== 'top' && placementEnd === 'start')
          ? 'center top'
          : 'center bottom'
    }
  }
  function onAfterLeave(): void {
    popperJS.destroy()
  }

  function iconClass(): string {
    return showCloseIcon()
      ? 'icon-close'
      : props.remote && props.filterable
      ? ''
      : `icon-arrow-up ${visible ? 'is-reverse' : ''}`
  }

  function showCloseIcon(): boolean {
    let criteria =
      props.clearable &&
      inputHovering &&
      !props.multiple &&
      options.some((item: any) => {
        if (item && selected && selected.props) {
          return item.props.value == selected.props.value
        }
        return false
      })

    if (!rootRef.current) return false
    // let icon = rootRef.current.querySelector('.tb-input__icon')
    // if (icon) {
    //   if (criteria) {
    //     icon.addEventListener('click', deleteSelected)
    //     icon.classList.add('is-show-close')
    //   } else {
    //     icon.removeEventListener('click', deleteSelected)
    //     icon.classList.remove('is-show-close')
    //   }
    // }
    return criteria
  }

  function emptyText() {
    const { loading, filterable } = props
    // const { voidRemoteQuery, options, filteredOptionsCount } = state
    if (loading) {
      return '加载中'
    } else {
      if (voidRemoteQuery) {
        voidRemoteQuery = false
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
    setVisible(false)
  }
  function toggleLastOptionHitState(hit?: boolean): any {
    // const { selected } = state

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
      selected.pop()
      onSelectedChange(selected)
      setSelected([...selected])
    }
  }

  function addOptionToValue(option: any, _init?: boolean) {
    const { multiple, remote } = props
    if (multiple) {
      if (
        selected.indexOf(option) === -1 &&
        (remote ? value.indexOf(option.props.value) === -1 : true)
      ) {
        selected.push(option)

        resetHoverIndex()
      }
    } else {
      selected = option
      selectedLabel = option.currentLabel()
      hoverIndex = option.index
      setSelected(selected)
      setSelectedLabel(selectedLabel)
      setHoverIndex(hoverIndex)
    }
  }

  function managePlaceholder() {
    if (currentPlaceholder !== '') {
      currentPlaceholder = inputRef.current.value ? '' : cachedPlaceHolder
    }
    setCurrentPlaceholder(currentPlaceholder)
  }

  function resetInputState(e: any) {
    if (e.keyCode !== 8) {
      toggleLastOptionHitState(false)
    }
    setInputLength(inputRef.current.value.length * 15 + 20)
  }

  function _resetInputWidth() {
    setInputWidth(reference.current.getBoundingClientRect().width)
  }

  function resetInputHeight() {
    let inputChildNodes = reference.current
    inputChildNodes.style.height =
      Math.max(tagsRef.current.clientHeight, sizeMap[props.size] || 32) + 'px'

    if (popperJS) {
      popperJS.update()
    }
  }

  function resetHoverIndex() {
    const { multiple } = props
    // let { hoverIndex, options, selected } = state

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
      setHoverIndex(hoverIndex)
      // setState({ ...state, hoverIndex })
    }, 300)
  }

  function toggleMenu() {
    const { filterable, disabled } = props
    // const { query } = state
    if (filterable && query === '' && visible) {
      return
    }

    if (!disabled) {
      setVisible(!visible)
    }
  }

  function navigateOptions(direction: string) {
    // let { hoverIndex, options } = state
    if (!visible) {
      return setVisible(true)
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
    watchHO.current = 'navigateOptionsHO'
    setHoverIndex(hoverIndex)
    setOptions(options)
    // setState({ ...state, hoverIndex, options })
  }
  useEffect(() => {
    if (initComponent.current) return
    if (watchHO.current === 'navigateOptionsHO') {
      if (skip) {
        navigateOptions(skip)
      }
      resetScrollTop()
    }
    watchHO.current = ''
  }, [hoverIndex, options])

  function resetScrollTop() {
    const element: any = ReactDOM.findDOMNode(options[hoverIndex] as any)
    const bottomOverflowDistance =
      element.getBoundingClientRect().bottom -
      popper.getBoundingClientRect().bottom
    const topOverflowDistance =
      element.getBoundingClientRect().top - popper.getBoundingClientRect().top

    if (dropdownUl) {
      if (bottomOverflowDistance > 0) {
        dropdownUl.scrollTop += bottomOverflowDistance
      }
      if (topOverflowDistance < 0) {
        dropdownUl.scrollTop += topOverflowDistance
      }
    }
  }

  function selectOption() {
    // let { hoverIndex, options } = state

    if (options[hoverIndex]) {
      onOptionClick(options[hoverIndex])
    }
  }

  function deleteSelected(e: any) {
    e.stopPropagation()

    if (selectedLabel != '') {
      selected = null
      setSelected(null)
      setSelectedLabel('')
      setVisible(false)
      onQueryChange('')
      props.context && props.context.form && props.context.form.onFieldChange()
      watchSelectedDel.current = 'deleteTagSelected'
      if (props.onChange) {
        props.onChange('')
        FormParent && FormParent.onFieldChange()
      }

      if (props.onClear) {
        props.onClear()
        FormParent && FormParent.onFieldChange()
      }
    }
  }

  function deleteTag(tag: any) {
    const index = selected.indexOf(tag)
    deleteTagTag = tag
    if (index > -1 && !props.disabled) {
      selected.slice(0)
      selected.splice(index, 1)
      watchSelectedDel.current = 'deleteTagSelected'
      setSelected([...selected])
    }
  }
  /**
   * @description: 上方 deleteTag 处理监听selected
   * @param {*}
   * @return {*}
   */
  useEffect(() => {
    if (initComponent.current) return
    if (watchSelectedDel.current === 'deleteTagSelected') {
      if (props.onRemoveTag) {
        props.onRemoveTag(deleteTagTag.props.value)
      }
      // 判断是否为多选，如果多选也要新增一下判断
      if (multiple) {
        onSelectedChange(selected)
      }
    }
    watchSelectedDel.current = ''
  }, [selected])

  function handleIconClick(event: any) {
    if (iconClass().indexOf('icon-close') > -1) {
      deleteSelected(event)
    } else {
      toggleMenu()
    }
  }

  function onInputChange(e: any) {
    if (props.filterable && selectedLabel !== value) {
      setQuery(e.target.value)
      onQueryChange(e.target.value)
    }
  }

  function onOptionCreate(option: any) {
    options.push(option)
    setOptionsCount(++optionsCount)
    setFilteredOptionsCount(++filteredOptionsCount)
    forceUpdate()
    handleValueChange(false)
  }

  function onOptionDestroy(option: any) {
    setOptionsCount(--optionsCount)
    setFilteredOptionsCount(--filteredOptionsCount)
    const index = options.indexOf(option)

    if (index > -1) {
      options.splice(index, 1)
    }

    options.forEach((el: any) => {
      if (el != option) {
        el.resetIndex()
      }
    })

    forceUpdate()
    handleValueChange()
  }
  function hoverItem(iHover: number) {
    setHoverIndex(iHover)
  }
  function queryChange() {
    setFilteredOptionsCount(filteredOptionsCount - 1)
  }
  function onOptionClick(option: any) {
    const { multiple } = props
    if (!multiple) {
      selected = option
      selectedLabel = option.currentLabel()
      setSelected(selected)
      setVisible(false)
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
      setSelected(selected)
    }
    setSelectedLabel(selectedLabel)
    watchSS.current = 'onOptionClickSS'
  }
  /**
   * @description: 上方 onOptionClick 处理监听 selected、selectedLabel
   * @param {*}
   * @return {*}
   */
  useEffect(() => {
    if (initComponent.current) return
    if (watchSS.current === 'onOptionClickSS') {
      if (!props.multiple) {
        onSelectedChange(selected)
      } else {
        onSelectedChange(selected)
      }
    }
    watchSS.current = ''
  }, [selected, selectedLabel])

  function onMouseDown(event: any) {
    event.preventDefault()

    if (inputRef && inputRef.current) {
      inputRef.current.focus()
    }

    toggleMenu()
  }

  function onMouseEnter() {
    setInputHovering(true)
  }

  function onMouseLeave() {
    setInputHovering(false)
  }

  useEffect(() => {
    if (initComponent.current) return
    if (props.onVisibleChange) {
      props.onVisibleChange(visible)
    }
    onVisibleChange(visible)
  }, [visible])
  /**
   * @description: 初始化函数
   * @return {*}
   */
  useEffect(() => {
    initComponent.current = false
    reference.current = ReactDOM.findDOMNode(
      referenceRef.current.Element as any
    )

    // 第一次触发，并不需要触发校验事件、行为
    handleValueChange(false, props.value)
    debouncedOnInputChange = debounce(_debounce(), (e: any) => {
      onInputChange(e)
    })
    resetInputWidth = _resetInputWidth
    addResizeListener(rootRef.current, resetInputWidth)
    watchUseEffectInit.current = ''
    return () => {
      rootRef.current && removeResizeListener(rootRef.current, resetInputWidth)
    }
  }, [])
  /**
   * @description: 监听 useWillReceiveProps value值变化
   * @param {*}
   * @return {*}
   */
  useEffect(() => {
    if (watchStateValue.current === 'useWillReceiveProps') {
      // 并非第一次执行 就需要触发校验行为
      handleValueChange(true)
    }
    // 重置
    watchStateValue.current = ''
  }, [value])

  /**
   * @description: 组件将要更新数据时触发的函数
   * @param {_oldProps，oldState}:旧props， 旧state
   * @return {*}
   */
  useUpdateEffect(
    (_oldProps, oldState) => {
      if (value != oldState.value) {
        onValueChange(value)
      }
      if (visible != oldState.visible) {
        if (props.onVisibleChange) {
          props.onVisibleChange(visible)
        }
        onVisibleChange(visible)
      }

      if (query != oldState.query) {
        onQueryChange(query as string)
      }

      setInputWidth(reference.current.getBoundingClientRect().width)
    },
    props,
    {
      options,
      isSelect,
      inputLength,
      inputWidth,
      inputHovering,
      filteredOptionsCount,
      optionsCount,
      hoverIndex,
      bottomOverflowBeforeHidden,
      cachedPlaceHolder,
      currentPlaceholder,
      selectedLabel,
      selectedInit,
      selected: Array.isArray(selected) ? [...selected] : selected,
      value,
      valueChangeBySelected,
      voidRemoteQuery,
      query,
      visible
    },
    [
      ...Object.keys(props),
      options,
      isSelect,
      inputLength,
      inputWidth,
      inputHovering,
      filteredOptionsCount,
      optionsCount,
      hoverIndex,
      bottomOverflowBeforeHidden,
      cachedPlaceHolder,
      currentPlaceholder,
      selectedLabel,
      selectedInit,
      selected,
      value,
      valueChangeBySelected,
      voidRemoteQuery,
      query,
      visible
    ]
  )

  //  遍历dom子节点方式
  const SelectChildren = React.Children.map(props.children, (child) => {
    // to do sth
    return React.cloneElement(child, {
      onOptionCreate,
      onOptionDestroy,
      addOptionToValue,
      onOptionClick,
      hoverItem,
      queryChange,
      props,
      state: {
        options,
        isSelect,
        inputLength,
        inputWidth,
        inputHovering,
        filteredOptionsCount,
        optionsCount,
        hoverIndex,
        bottomOverflowBeforeHidden,
        cachedPlaceHolder,
        currentPlaceholder,
        selectedLabel,
        selectedInit,
        selected,
        value: props.value,
        valueChangeBySelected,
        voidRemoteQuery,
        query
      }
    })
  })
  const {
    multiple,
    size,
    disabled,
    filterable
    // loading
  } = props

  return (
    <div ref={rootRef} style={props.style} className={classnames('tb-select')}>
      {multiple && (
        <div
          ref={tagsRef}
          className='tb-select__tags'
          onClick={toggleMenu}
          style={{
            maxWidth: inputWidth - 32
          }}
        >
          {selected.map((el: any) => {
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
                width: inputLength,
                maxWidth: inputWidth - 42
              }}
              disabled={disabled}
              defaultValue={query}
              onKeyUp={managePlaceholder}
              onKeyDown={(e) => {
                resetInputState(e)
                switch (e.keyCode) {
                  case 27:
                    setVisible(false)
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
                  setQuery(e.target.value)
                  onQueryChange(e.target.value)
                  // onValueChange(value)
                }, _debounce())

                // value = e.target.value
              }}
            />
          )}
        </div>
      )}
      <Input
        ref={referenceRef}
        value={selectedLabel}
        type='text'
        placeholder={currentPlaceholder}
        name='name'
        size={size}
        disabled={disabled}
        readOnly={!filterable || multiple}
        icon={iconClass() || undefined}
        onChange={(value: any) => setSelectedLabel(value)}
        onIconClick={handleIconClick}
        onMouseDown={onMouseDown}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onKeyUp={debouncedOnInputChange}
        onKeyDown={(e: any) => {
          switch (e.keyCode) {
            case 9:
            case 27:
              setVisible(false)
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
        forceRender
        visible={visible && emptyText() !== false}
        onEnterActive={(HTMLElement) => {
          HTMLElement.style.display = 'block'
          onEnter()
        }}
        removeOnLeave={false}
        onLeaveEnd={(HTMLElement) => {
          HTMLElement.style.display = 'none'
          console.log('leave')
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
            style={{ minWidth: inputWidth, ...style }}
          >
            {SelectChildren ? SelectChildren : null}
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

export default Select
