/*
 * @Author: 韩旭小天才 905583741@qq.com
 * @Date: 2022-06-16 10:37:36
 * @LastEditors: 韩旭小天才 905583741@qq.com
 * @LastEditTime: 2022-06-16 11:24:58
 * @FilePath: /tinkerbell-ui-react/src/components/HocMixins/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// eslint-disable-next-line
import React, { useEffect } from 'react'
const HocMixins = (OriginalComponent: any, rightTitle: any) => {
  const Component: React.FC = (props: any) => {
    useEffect(() => {
      let node: any = window.document.querySelector('.' + rightTitle[0].id)
      node.style.color = '#409eff'
      //   containers容器
      const containers: any = window.document.querySelector('#containers')
      containers.onscroll = () => {
        //   获取页面被卷去的高度
        rightTitle.forEach((item: { id: string }, index: number) => {
          let node: any = window.document.querySelector('#' + item.id)
          let nodetext: any = window.document.querySelector('.' + item.id)
          let nodedowntext: any = null
          if (rightTitle[index + 1]) {
            nodedowntext = window.document.querySelector(
              '#' + rightTitle[index + 1].id
            )
          }
          if (nodedowntext == null || index + 1 >= rightTitle.length) {
            nodedowntext = { offsetTop: containers.scrollHeight }
          }

          if (node) {
            nodetext.style.color = '#606266'
          }
          //   +61是页面导航栏的高度  以及padding 20
          if (
            node &&
            containers.scrollTop + 81 >= node.offsetTop &&
            containers.scrollTop + 81 < nodedowntext.offsetTop
          ) {
            nodetext.style.color = '#409eff'
          }
        })
        if (containers.scrollTop === 0 ||containers.scrollTop === '0') {
          let node: any = window.document.querySelector('.' + rightTitle[0].id)
          node.style.color = '#409eff'
        }
      }
      return () => {
        if (window.document.querySelector('#containers')) {
          const containers: any = window.document.querySelector('#containers')
          containers.onscroll = null
        }
      }
    }, [])
    return <OriginalComponent {...props}></OriginalComponent>
  }
  return Component
}
export default HocMixins
