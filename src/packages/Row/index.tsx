/*
 * @Author: your name
 * @Date: 2021-12-21 08:48:02
 * @LastEditTime: 2022-02-17 10:20:34
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/Row/index.tsx
 */
import React, { useEffect, useState, createContext } from 'react'
import './index.scss'
interface Iprops {
  justify: string
  align: string
  gutter: number
}
export const Context = createContext<any>(null)
function Row(props: any) {
  const [tbalign, setTbalign] = useState({})
  const [tbjustify, setTbjustify] = useState({})
  const { justify, align }: Iprops = props

  useEffect(() => {
    pjustify()
    palign()
  }, [])
  function pjustify() {
    if (justify == 'start') {
      setTbjustify({
        justifyContent: 'flex-start'
      })
    } else if (justify == 'center') {
      setTbjustify({
        justifyContent: 'center'
      })
    } else if (justify == 'end') {
      setTbjustify({
        justifyContent: 'flex-end'
      })
    } else if (justify == 'space-around') {
      setTbjustify({
        justifyContent: 'space-around'
      })
    } else if (justify == 'space-between') {
      setTbjustify({
        justifyContent: 'space-between'
      })
    } else {
      setTbjustify({})
    }
  }
  function palign() {
    if (align == 'top') {
      setTbalign({
        alignItems: 'flex-start'
      })
    } else if (align == 'middle') {
      setTbalign({
        alignItems: 'crenter'
      })
    } else if (align == 'bottom') {
      setTbalign({
        alignItems: 'flex-end'
      })
    } else {
      setTbalign({})
    }
  }
  return (
    <div className='tb-row' style={{ ...tbalign, ...tbjustify }}>
      <Context.Provider value={...{ ...props,  }}>
        {props.children}
      </Context.Provider>
    </div>
  )
}
export default Row
