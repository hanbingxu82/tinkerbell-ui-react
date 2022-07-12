/*
 * @Author: your name
 * @Date: 2021-12-21 08:48:28
 * @LastEditTime: 2022-07-12 14:03:13
 * @LastEditors: 韩旭小天才
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/Col/index.tsx
 */
// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
// import { Context } from '../Row/index'
import './index.scss'
interface Iprops {
  span: number | string // 栅格占据的列数
  push: number | string // 栅格向右移动格数
  offset: number | string // 栅格左侧的间隔格数
  pull: number | string // 栅格向左移动格数
  xs: number | object // <768px 响应式栅格数或者栅格属性对象
  sm: number | object // ≥768px 响应式栅格数或者栅格属性对象
  md: number | object // ≥992 响应式栅格数或者栅格属性对象
  lg: number | object // ≥1200 响应式栅格数或者栅格属性对象
  xl: number | object // ≥1920px 响应式栅格数或者栅格属性对象 
}

function Col(props: any) {
  // const RowComponent = useContext(Context)
  // // 删除两个多余的传递属性 放置多个传递替换本身的 props 属性
  // if (RowComponent) {
  //   delete RowComponent.children
  //   delete RowComponent.item
  // }

  // 全部设置默认初始值
  const {
    span = 0,
    offset = 0,
    push = 0,
    pull,
    xs = 0,
    sm = 0,
    md = 0,
    lg = 0,
    xl = 0
  }: Iprops = props
  //   const [gutter, setGutter] = useState('')
  const [num, setNum] = useState(0)
  //   const [color, setColor] = useState('red')
  const [tbxs, setTbxs] = useState('')
  const [tbsm, setTbsm] = useState('')
  const [tbmd, setTbmd] = useState('')
  const [tblg, setTblg] = useState('')
  const [tbxl, setTbxl] = useState('')

  // 初始化
  useEffect(() => {
    setNum(4.1666)
    Pxs()
    Psm()
    Pmd()
    Plg()
    Pxl()
  }, []) // eslint-disable-line
  function Pxs() {
    // 如果是数值类型
    if (
      xs > 0 &&
      (/ Number/.test(Object.prototype.toString.call(xs)) ||
        / String/.test(Object.prototype.toString.call(xs)))
    ) {
      setTbxs('tb-col-xs-' + xs)
    } else if (xs && / Object/.test(Object.prototype.toString.call(xs))) {
      setTbxs(
        'tb-col-xs-' +
          (xs as { span: '' }).span +
          ' tb-col-xs-offset-' +
          (xs as { span: '' }).span
      )
    } else {
      setTbxs('')
    }
  }
  function Psm() {
    // 如果是数值类型
    if (
      sm > 0 &&
      (/ Number/.test(Object.prototype.toString.call(sm)) ||
        / String/.test(Object.prototype.toString.call(sm)))
    ) {
      setTbsm('tb-col-sm-' + sm)
    } else if (sm && / Object/.test(Object.prototype.toString.call(sm))) {
      setTbsm(
        'tb-col-sm-' +
          (sm as { span: '' }).span +
          ' tb-col-sm-offset-' +
          (sm as { span: '' }).span
      )
    } else {
      setTbsm('')
    }
  }
  function Pmd() {
    // 如果是数值类型
    if (
      md > 0 &&
      (/ Number/.test(Object.prototype.toString.call(md)) ||
        / String/.test(Object.prototype.toString.call(md)))
    ) {
      setTbmd('tb-col-md-' + md)
    } else if (md && / Object/.test(Object.prototype.toString.call(md))) {
      setTbmd(
        'tb-col-md-' +
          (md as { span: '' }).span +
          ' tb-col-md-offset-' +
          (md as { span: '' }).span
      )
    } else {
      setTbmd('')
    }
  }
  function Plg() {
    // 如果是数值类型
    if (
      lg > 0 &&
      (/ Number/.test(Object.prototype.toString.call(lg)) ||
        / String/.test(Object.prototype.toString.call(lg)))
    ) {
      setTblg('tb-col-lg-' + lg)
    } else if (lg && / Object/.test(Object.prototype.toString.call(lg))) {
      setTblg(
        'tb-col-lg-' +
          (lg as { span: '' }).span +
          ' tb-col-lg-offset-' +
          (lg as { span: '' }).span
      )
    } else {
      setTblg('')
    }
  }
  function Pxl() {
    // 如果是数值类型
    if (
      xl > 0 &&
      (/ Number/.test(Object.prototype.toString.call(xl)) ||
        / String/.test(Object.prototype.toString.call(xl)))
    ) {
      setTbxl('tb-col-xl-' + xl)
    } else if (xl && / Object/.test(Object.prototype.toString.call(xl))) {
      setTbxl(
        'tb-col-xl-' +
          (xl as { span: '' }).span +
          ' tb-col-xl-offset-' +
          (xl as { span: '' }).span
      )
    } else {
      setTbxl('')
    }
  }
  // const childrenItem = React.Children.map(props.children, (item) => {
  //   return React.cloneElement(item, {
  //     // ...RowComponent,
  //     item,
  //     instanceType:'Col',
  //     parent: {
  //       props
  //     }
  //   })
  // })

  return (
    <div
      className={`tb-col ${tbxs} ${tbsm} ${tbmd} ${tblg} ${tbxl} `}
      style={{
        width: `${num * Number(span)}%`,
        padding: `0 ${props.parent.props.gutter / 2}px`,
        marginLeft: `${num * Number(offset || pull) + '%'}`,
        marginRight: `${num * Number(push) + '%'}`
      }}
    >
      {/* {childrenItem ? childrenItem : props.children} */}
      {props.children}
    </div>
  )
}
export default Col
