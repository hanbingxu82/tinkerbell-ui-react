/*
 * @Author: your name
 * @Date: 2022-02-11 14:29:00
 * @LastEditTime: 2022-12-09 18:13:13
 * @LastEditors: hanbingxu
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/CheckBoxGroup/index.tsx
 */
// eslint-disable-next-line
import React from 'react'
import CheckBox from '../CheckBox/index'
interface Iprops {
  name?: string // 原生 name 属性
  disabled: boolean // 是否统一禁用
  options: any // js编程式组件列表
  value: any // 绑定 value 值
}
function CheckBoxGroup(props: any) {
  const { name, value = [], options = [] }: Iprops = props
  function handleChange(evt: any) {
    //  有就删除 没有就新增
    value.indexOf(evt.target.value) > -1
      ? value.splice(value.indexOf(evt.target.value), 1)
      : value.push(evt.target.value)
    //  判断check选中状态
    props.onChange && props.onChange(value, evt)
  }
  //  options 循环遍历
  const checkboxDom = options.map((item: any) => {
    return (
      <CheckBox
        key={item.value}
        value={item.value}
        checkGroupValue={value}
        name={name}
        disabled={item.disabled ? item.disabled : props.disabled ? true : false}
        onChange={handleChange}
        componentName ='checkboxGroup'
        isGroup={true}
      >
        {item.label}
      </CheckBox>
    )
  })
  //  遍历dom子节点方式
  const checkboxItems = React.Children.map(props.children, (item) => {
    return React.cloneElement(item, {
      item,
      componentName: 'checkboxGroup',
      checkGroupValue: value,
      name,
      isGroup: true,
      onChange: handleChange
    })
  })

  return (
    <div className='tb-checkbox-group'>
      {checkboxItems ? checkboxItems : checkboxDom}
    </div>
  )
}
export default CheckBoxGroup
