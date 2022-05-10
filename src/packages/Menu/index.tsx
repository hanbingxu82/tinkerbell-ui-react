/*
 * @Author: your name
 * @Date: 2022-05-09 18:36:27
 * @LastEditTime: 2022-05-09 19:19:47
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/Menu/index.tsx
 */
import './index.scss'
import Menu from './Menu'
import SubMenu from './SubMenu'
import MenuItem from './MenuItem'
import MenuItemGroup from './MenuItemGroup'

Menu.SubMenu = SubMenu
Menu.Item = MenuItem
Menu.ItemGroup = MenuItemGroup

export default Menu
