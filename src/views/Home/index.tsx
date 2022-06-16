/*
 * @Author: 韩旭小天才 905583741@qq.com
 * @Date: 2022-06-09 19:33:36
 * @LastEditors: 韩旭小天才 905583741@qq.com
 * @LastEditTime: 2022-06-16 11:04:07
 * @FilePath: /tinkerbell-ui-react/src/views/Home/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// eslint-disable-next-line
import React, { useEffect } from 'react'
import { Menu, Icon } from '../../packages/index'
import { Outlet } from 'react-router-dom'
import './index.scss'
const logo = require('../../assets/images/logo.png')
function Home() {
  // 声明一个名为“count”的新状态变量
  //   const [count, setCount] = useState(0)
  // 类似于 componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    // 使用浏览器API更新文档标题
    document.title = `You clicked count times`
  }, [])
  return (
    <div className='home'>
      <div className='home-header'>
        <div className='home-header_logo'>
          <img className='home-header_logo_img' src={logo} alt='' />
          <span className='home-header_logo_text'>
            Tinkerbell <sup>React</sup>{' '}
          </span>
        </div>
        <div className='home-header_nav'>
          <Icon name='icon-search' size='30' />
          <Menu defaultActive='1' mode='horizontal'>
            <Menu.Item index='1'>指南</Menu.Item>
            <Menu.SubMenu index='2' title='我的工作台'>
              <Menu.Item index='2-1'>选项1</Menu.Item>
              <Menu.Item index='2-2'>选项2</Menu.Item>
              <Menu.Item index='2-3'>选项3</Menu.Item>
            </Menu.SubMenu>
            <Menu.Item index='3'>国内镜像</Menu.Item>
            <Menu.Item index='4'>github</Menu.Item>
          </Menu>
        </div>
      </div>
      <div className='home-content'>
        <div className='home-content-nav'>
          <Menu defaultActive='1'>
            <Menu.SubMenu index='1' title='开发指南'>
              <Menu.Item index='1-1'>指南</Menu.Item>
              <Menu.Item index='1-2'>快速开始</Menu.Item>
              <Menu.Item index='1-3'>更新日志</Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu index='2' title='导航一'>
              <Menu.ItemGroup title='分组一'>
                <Menu.Item index='2-1'>选项1</Menu.Item>
                <Menu.Item index='2-2'>选项2</Menu.Item>
              </Menu.ItemGroup>
            </Menu.SubMenu>
          </Menu>
        </div>
        <div className='home-content-main' id='containers'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
export default Home
