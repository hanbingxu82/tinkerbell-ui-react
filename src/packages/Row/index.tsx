/*
 * @Author: your name
 * @Date: 2021-12-21 08:48:02
 * @LastEditTime: 2022-07-12 13:57:35
 * @LastEditors: 韩旭小天才
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/Row/index.tsx
 */
/* eslint-disable */
import React, { useEffect, useState,  } from 'react'
import './index.scss'
interface Iprops {
  justify: string // 水平排列方式
  align: string // 垂直排列方式
  gutter: number // 栅格间隔
}
// export const Context = createContext<any>(null)
function Row(props: any) {
  const [tbalign, setTbalign] = useState({})
  const [tbjustify, setTbjustify] = useState({})
  const { justify, align }: Iprops = props

  useEffect(() => {
    pjustify()
    palign()
  }, [])
  // 判断
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
  // 判断布局
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
      {/* <Context.Provider value={{ ...{ ...props } }}> */}
        {React.Children.map(props.children, (item) => {
          return React.cloneElement(item, {
            item,
            parent: {
              props
            }
          })
        })}
      {/* </Context.Provider> */}
    </div>
  )
}
export default Row
