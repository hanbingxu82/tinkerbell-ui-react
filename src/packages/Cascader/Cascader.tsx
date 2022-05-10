/*
 * @Author: your name
 * @Date: 2022-04-28 15:45:53
 * @LastEditTime: 2022-05-10 16:46:50
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/Cascader/Cascader.tsx
 */
// eslint-disable-next-line
import React, { useEffect, useRef, useState, useCallback } from 'react'
import ReactDOM from 'react-dom'
import { debounce } from 'throttle-debounce'
import { useWillReceiveProps } from '../../utils/useUpdateEffect'
import Popper from 'popper.js'
import CascaderMenu from './Menu'
import Input from '../Input'
import { listenForOutsideClicks } from '../Select/somewhere'
import './index.scss'
const classnames = require('classnames')
const PropTypes = require('prop-types')

type State = {
  currentValue: []
  menu: any
  inputHover: boolean
  inputValue: any
  flatOptions: []
}
let input: any

const Cascader: any = React.forwardRef((props: any, _ref: any) => {
  let popperJS: any
  const [state, setState] = useState<State>({
    currentValue: props.value,
    menu: null,
    // menuVisible: false,
    inputHover: false,
    inputValue: '',
    flatOptions: flattenOptions(props.options)
  })
  let [visible, setVisible] = useState(false)
  const [listening, setListening] = useState(false)
  // 强制更新视图方法 start
  const [, updateState] = useState<any>()
  const forceUpdate = useCallback(() => updateState({}), [])
  // 强制更新视图方法 end

  const inputRef: any = useRef(null)
  //   const input: any = useRef(null)
  const menuRef: any = useRef(null)
  const rootRef: any = useRef(null)
  const debouncedInputChange = debounce(props.debounce, () => {
    const value = state.inputValue
    const before = props.beforeFilter(value)

    if (before && before.then) {
      state.menu.setState({
        ...state.menu.state,
        options: [
          {
            __IS__FLAT__OPTIONS: true,
            label: '加载中',
            value: '',
            disabled: true
          }
        ]
      })

      before.then(() => {
        handleInputChange(value)
      })
    } else {
      handleInputChange(value)
    }
  })

  /**
   * @description: 点击页面其他区域 隐藏对应的 ref 节点
   * @param {*}
   * @return {*}
   */
  useEffect(
    listenForOutsideClicks(listening, setListening, rootRef, setVisible, () => {
      setVisible(false)
      if (state.menu) {
        state.menu.setState({
          ...state.menu.state,
          visible: false,
          activeValue: state.menu.state.value
        })
      }
    })
  )

  useEffect(() => {
    input = ReactDOM.findDOMNode(inputRef.current.Element as any)
    return () => {
      if (popperJS) {
        popperJS.destroy()
      }
    }
  }, []) // eslint-disable-line
  useWillReceiveProps(
    (_oldProps) => {
      setState({
        ...state,
        currentValue: props.value,
        flatOptions: flattenOptions(props.options)
      })

      //   state.menu.setState({ ...state.menu.state, options: props.options })
    },
    [props]
  )

  function menuVisibleChange() {
    if (visible) {
      showMenu()
      if (popperJS) {
        popperJS.update()
      } else {
        popperJS = new Popper(input, menuRef.current, {
          placement: 'bottom-start',
          modifiers: {
            computeStyle: {
              gpuAcceleration: false
            }
          }
        })
      }
    } else {
      hideMenu()
      if (popperJS) {
        popperJS.destroy()
      }

      //   delete popperJS
    }
  }
  // 点击文档之后的回调
  //   function isHidden() {
  //     console.log(111111)
  //     hideMenu()
  //     if (popperJS) {
  //       popperJS.destroy()
  //     }
  //   }
  function placeholder(): string {
    return props.placeholder || '请选择'
  }

  function updatePopper() {
    if (popperJS) {
      popperJS.update()
    }
  }
  // @ts-ignore 实例
  // eslint-disable-next-line
  function initMenu(menu: any) {
    state.menu = menu
  }

  function showMenu() {
    setVisible(true)
    state.menu.setState({
      ...state.menu.state,
      ...state,
      value: state.currentValue.slice(0),
      visible: true,
      options: props.options,
      inputWidth: input.offsetWidth - 2,
      activeValue: state.currentValue.slice(0)
    })
  }

  function hideMenu() {
    setState({ ...state, inputValue: '' })
    setVisible(false)
    if (state.menu) {
      state.menu.setState({
        ...state.menu.state,
        visible: false,
        activeValue: state.menu.state.value
      })
    }
  }

  function handleActiveItemChange(value: []) {
    updatePopper()
    if (props.activeItemChange) {
      props.activeItemChange(value)
    }
  }

  function handlePick(value: [], close: boolean = true) {
    state.currentValue = value
    if (close) {
      // setState({ ...state, menuVisible: false })
      visible = false
      forceUpdate()
      menuVisibleChange()
    }
    if (props.onChange) {
      props.onChange(value)
    }
  }

  function handleInputChange(value: any) {
    // if (!visible) return
    const flatOptions = state.flatOptions

    if (!value) {
      state.menu.setState({
        ...state.menu.state,
        options: props.options
      })
      return
    }

    let filteredFlatOptions: any = flatOptions.filter((optionsStack: any) => {
      return optionsStack.some((option: any) =>
        new RegExp(value, 'i').test(option[labelKey()])
      )
    })

    if (filteredFlatOptions.length > 0) {
      filteredFlatOptions = filteredFlatOptions.map((optionStack: any) => {
        return {
          __IS__FLAT__OPTIONS: true,
          value: optionStack.map((item: any) => item[valueKey()]),
          label: renderFilteredOptionLabel(value, optionStack)
        }
      })
    } else {
      filteredFlatOptions = [
        {
          __IS__FLAT__OPTIONS: true,
          label: '无匹配数据',
          value: '',
          disabled: true
        }
      ]
    }
    state.menu.setState({
      ...state.menu.state,
      visible:true,
      options: filteredFlatOptions
    })
  }

  function renderFilteredOptionLabel(inputValue: any, optionsStack: any): [] {
    return optionsStack.map((option: any, index: any) => {
      const label = option[labelKey()]
      const keywordIndex = label.toLowerCase().indexOf(inputValue.toLowerCase())
      const labelPart = label.slice(
        keywordIndex,
        inputValue.length + keywordIndex
      )
      const node =
        keywordIndex > -1 ? highlightKeyword(label, labelPart) : label
      return index === 0 ? node : [' / ', node]
    })
  }

  function highlightKeyword(label: string, keyword: string): any {
    return label.split(keyword).map((node, index) =>
      index === 0
        ? node
        : [
            <span key={index} className='tb-cascader-menu__item__keyword'>
              {keyword}
            </span>,
            node
          ]
    )
  }

  function flattenOptions(options: any, ancestor: any = []): [] {
    let flatOptions: any = []

    options.forEach((option: any) => {
      const optionsStack = ancestor.concat(option)
      if (!option[childrenKey()]) {
        flatOptions.push(optionsStack)
      } else {
        if (props.changeOnSelect) {
          flatOptions.push(optionsStack)
        }
        flatOptions = flatOptions.concat(
          flattenOptions(option[childrenKey()], optionsStack)
        )
      }
    })

    return flatOptions
  }

  function clearValue(e: any) {
    e.stopPropagation()

    handlePick([], true)
  }
  // @ts-ignore 实例
  // eslint-disable-next-line
  function handleClickOutside() {
    if (visible) {
      visible = false
      forceUpdate()
      menuVisibleChange()
    }
  }

  function handleClick() {
    if (props.disabled) return
    if (props.filterable) {
      visible = true
      forceUpdate()
      menuVisibleChange()
      return
    }
    visible = !visible
    forceUpdate()
    menuVisibleChange()
  }

  /* Computed Methods */

  function labelKey(): string {
    return props.props.label || 'label'
  }

  function valueKey(): string {
    return props.props.value || 'value'
  }

  function childrenKey(): string {
    return props.props.children || 'children'
  }

  function currentLabels(): [] {
    let options = props.options
    let labels: any = []

    state.currentValue.forEach((value) => {
      const targetOption =
        options &&
        options.filter((option: any) => option[valueKey()] === value)[0]

      if (targetOption) {
        labels.push(targetOption[labelKey()])
        options = targetOption[childrenKey()]
      }
    })

    return labels
  }

  /**
   * @description: 外抛指定ref
   * @param {*}
   * @return {*}
   */
  if (rootRef && rootRef.current) _ref = rootRef
  const { size, disabled, filterable, clearable, showAllLevels } = props
  //   const { menuVisible, inputHover, inputValue } = state
  const _currentLabels = currentLabels()
  return (
    <span
      ref={rootRef}
      className={classnames('tb-cascader', size ? 'tb-cascader--' + size : '', {
        'is-opened': visible,
        'is-disabled': disabled
      })}
    >
      <span
        onClick={handleClick}
        onMouseEnter={() => {
          setState({ ...state, inputHover: true })
        }}
        onMouseLeave={() => {
          setState({ ...state, inputHover: false })
        }}
      >
        <Input
          //   ref='input'
          ref={inputRef}
          readOnly={!filterable}
          placeholder={_currentLabels.length ? undefined : placeholder()}
          value={state.inputValue}
          onChange={(value: any) => {
            setState({ ...state, inputValue: value })
          }}
          onKeyUp={debouncedInputChange}
          size={size}
          disabled={disabled}
          icon={
            clearable && state.inputHover && _currentLabels.length ? (
              <i
                className=' tb-input__icon iconfont icon-close tb-cascader__clearIcon'
                onClick={clearValue}
              />
            ) : (
              <i
                className={classnames(
                  'tb-input__icon iconfont icon-arrow-up ',
                  {
                    'is-reverse': visible
                  }
                )}
              />
            )
          }
        />

        {_currentLabels.length ? (
          <span className='tb-cascader__label'>
            {showAllLevels
              ? _currentLabels.map((label, index) => {
                  return (
                    <label key={index}>
                      {label}
                      {index < _currentLabels.length - 1 && <span> / </span>}
                    </label>
                  )
                })
              : _currentLabels[_currentLabels.length - 1]}
          </span>
        ) : null}
      </span>
      <CascaderMenu
        props={props}
        initMenu={initMenu}
        handlePick={handlePick}
        handleActiveItemChange={handleActiveItemChange}
        ref={menuRef}
      />
    </span>
  )
})

Cascader.childContextTypes = {
  component: PropTypes.any
}

Cascader.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string
    })
  ).isRequired,
  props: PropTypes.object,
  value: PropTypes.array,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  clearable: PropTypes.bool,
  changeOnSelect: PropTypes.bool,
  popperClass: PropTypes.string,
  expandTrigger: PropTypes.string,
  filterable: PropTypes.bool,
  size: PropTypes.string,
  showAllLevels: PropTypes.bool,
  debounce: PropTypes.number,
  activeItemChange: PropTypes.func,
  beforeFilter: PropTypes.func,
  onChange: PropTypes.func
}

Cascader.defaultProps = {
  value: [],
  clearable: false,
  expandTrigger: 'click',
  showAllLevels: true,
  debounce: 300,
  props: {
    children: 'children',
    label: 'label',
    value: 'value',
    disabled: 'disabled'
  },
  beforeFilter: () => () => {}
}

export default Cascader
