/*
 * @Author: 韩旭小天才 905583741@qq.com
 * @Date: 2022-06-09 19:25:17
 * @LastEditors: 韩旭小天才 905583741@qq.com
 * @LastEditTime: 2022-06-10 13:06:01
 * @FilePath: /tinkerbell-ui-react/src/router/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/* eslint-disable */
import Home from '../views/Home/index'
import App from '../App'

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
    children: []
  },
  {
    path: '/App',
    exact: false,
    component: App,
    children: []
  }
]
