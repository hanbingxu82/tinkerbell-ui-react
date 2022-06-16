/*
 * @Author: 韩旭小天才 905583741@qq.com
 * @Date: 2022-06-10 15:33:35
 * @LastEditors: 韩旭小天才 905583741@qq.com
 * @LastEditTime: 2022-06-16 16:23:19
 * @FilePath: /tinkerbell-ui-react/src/components/RightSmallNav/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// eslint-disable-next-line
import React from 'react'
import './index.scss'

function RightSmallNav(props: any) {
  function goMeowPoint(id: string | number) {
    props.goMeowPoint && props.goMeowPoint(id)
    /**
     * @description: 触发父元素函数
     * @param {id} id:当前点击对应的id
     * @return {*}
     */
    setTimeout(() => {
      const nodes = document.querySelectorAll('.slider_li')
      nodes.forEach((item: any) => {
        item.style.color = '#606266'
      })
      const nodeSelect: HTMLElement | null = document.querySelector('.' + id)
      ;(nodeSelect as HTMLElement).style.color = '#409eff'
    }, 0)
  }
  return (
    <div className='right_list_screen'>
      <div className='right_list'>
        {props.rightTitle.map((item: any) => {
          return (
            <div
              key={item.id}
              className={'slider_li ' + item.id}
              onClick={() => {
                goMeowPoint(item.id)
              }}
            >
              {item.title}
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default RightSmallNav
