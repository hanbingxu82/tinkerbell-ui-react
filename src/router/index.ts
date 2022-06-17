/*
 * @Author: 韩旭小天才 905583741@qq.com
 * @Date: 2022-06-09 19:25:17
 * @LastEditors: 韩旭小天才 905583741@qq.com
 * @LastEditTime: 2022-06-17 14:08:45
 * @FilePath: /tinkerbell-ui-react/src/router/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/* eslint-disable */
import Home from '../views/Home/index'
import App from '../App'
import Guide from '../views/DevGuide/Guide'
import Installs from '../views/DevGuide/Installs'

/**
 * @description: 一级路由
 * @param {*}
 * @return {*}
 */
export const routers = [
  {
    path: '/',
    exact: false,
    component: Home,
    children: [
      {
        path: 'Guide', // 开发指南页面
        exact: false,
        component: Guide,
        children: []
      },
      {
        path: 'Installs', // 安装页面
        exact: false,
        component: Installs,
        children: []
      }
    ]
  },
  {
    path: '/App',
    exact: false,
    component: App,
    children: []
  }
]
