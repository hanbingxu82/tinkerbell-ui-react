/*
 * @Author: your name
 * @Date: 2022-03-16 16:47:04
 * @LastEditTime: 2023-03-20 16:39:07
 * @LastEditors: hanbingxu
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/Rate/index.tsx
 */
// eslint-disable-next-line
import React, { useState, useEffect, ChangeEvent, useRef } from 'react'
import './index.scss'
const classnames = require('classnames')
interface Iprops {
  value: string | number
  name: string
  length: string | number
  showcount: boolean
  required: boolean
  ratedesc: any
  activecolor: string
  disabled: boolean
  readonly: boolean
  iconref: string
}
function Rate(props: any) {
  const {
    value = 0,
    name,
    length,
    showcount,
    required,
    ratedesc = [],
    activecolor,
    disabled,
    readonly,
    iconref = 'icon-collection-fill'
  }: Iprops = props
  /**
   * @description: 是否第一次加载组件
   * @param {*}
   * @return {*}
   */
  const initComponent = useRef(true)
  const [over, setOver] = useState(0)
  const [rate, setRate] = useState(0)
  const tb_rate = useRef<any>()
  function convertValue(value: any) {
    if (value >= length) {
      return length
    } else if (value < 0) {
      return 0
    } else {
      return value
    }
  }
  function onOver(index: any) {
    console.log(readonly)
    if (readonly || disabled) {
    } else {
      setOver(index)
    }
  }
  function onOut() {
    if (readonly || disabled) {
      return
    } else {
      setOver(rate)
    }
  }
  function setRateFn(index: any): void | boolean {
    if (readonly || disabled) return false
    props.beforeRate && props.beforeRate(rate)
    setRate(index)
    props.onChange && props.onChange(index)
    props.afterRate && props.afterRate(index)
  }
  function isFilled(index: any) {
    return index <= over
  }
  //   function isEmpty(index: any) {
  //     return index > over || (!value && !over)
  //   }
  useEffect(() => {
    if (initComponent.current) return
    setRate(convertValue(value))
    setOver(convertValue(value))
  }, [value]) // eslint-disable-line
  useEffect(() => {
    activecolor &&
      tb_rate.current.style.setProperty('--activeColor', activecolor)
  }, [activecolor]) // eslint-disable-line

  useEffect(() => {
    initComponent.current = false
    if (value >= length) {
      props.onChange && props.onChange(length)
      setRate(convertValue(length))
      setOver(convertValue(length))
    } else if (value < 0) {
      props.onChange && props.onChange(0)
      setRate(convertValue(0))
      setOver(convertValue(0))
    } else {
      setRate(convertValue(value))
      setOver(convertValue(value))
    }
  }, []) // eslint-disable-line
  const arr = []
  for (let index = 1; index <= length; index++) {
    arr.push(index)
  }
  return (
    <div ref={tb_rate} className='tb_rate'>
      <input
        type='hidden'
        name={name}
        value={rate}
        onChange={(e: ChangeEvent) => {
          setRate(e.target[`value`])
        }}
        required={required}
      />
      {arr.map((n: any) => {
        return (
          <button
            type='button'
            key={n}
            disabled={disabled}
            className={[
              classnames({
                tb_rate__star: true,
                hover: n <= over,
                filled: isFilled(n) // n <= rate || isFilled(n)
              })
            ].join(' ')}
            onMouseOver={() => {
              onOver(n)
            }}
            onMouseOut={() => {
              onOut()
            }}
            onClick={() => {
              setRateFn(n)
            }}
            onKeyUp={() => {
              onOver(n)
            }}
          >
            <i className={`icon iconfont ${iconref}`}></i>
          </button>
        )
      })}
      <div
        className={[
          'tb_rate__view',
          classnames({
            disabled: disabled
          })
        ].join(' ')}
      >
        {showcount && <span className='count'>{over}</span>}
        {ratedesc.length > 0 && (
          <span className='desc'>{ratedesc[over - 1]}</span>
        )}
      </div>
    </div>
  )
}
export default Rate
