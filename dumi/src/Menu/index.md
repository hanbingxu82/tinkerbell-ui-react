---
group:
  title: 导航
  order: 5
nav:
  title: Components
  path: /components
---

# Menu 导航菜单

为网站提供导航功能的菜单。

## 顶栏

适用广泛的基础用法。

```tsx
import { Menu, Divider } from 'tinkerbell-ui-react'
import React from 'react'

function onSelect(val) {
  console.log(val)
}

const App: React.FC = () => (
  <>
    <div>
      <Menu
        theme='dark'
        defaultActive='1'
        mode='horizontal'
        onSelect={onSelect}
      >
        <Menu.Item index='1'>处理中心</Menu.Item>
        <Menu.SubMenu index='2' title='我的工作台'>
          <Menu.Item index='2-1'>选项1</Menu.Item>
          <Menu.Item index='2-2'>选项2</Menu.Item>
          <Menu.Item index='2-3'>选项3</Menu.Item>
        </Menu.SubMenu>
        <Menu.Item index='3'>订单管理</Menu.Item>
      </Menu>
      <Divider></Divider>
      <Menu defaultActive='1' mode='horizontal' onSelect={onSelect}>
        <Menu.Item index='1'>处理中心</Menu.Item>
        <Menu.SubMenu index='2' title='我的工作台'>
          <Menu.Item index='2-1'>选项1</Menu.Item>
          <Menu.Item index='2-2'>选项2</Menu.Item>
          <Menu.Item index='2-3'>选项3</Menu.Item>
        </Menu.SubMenu>
        <Menu.Item index='3'>订单管理</Menu.Item>
      </Menu>
    </div>
  </>
)

export default App
```

## 侧栏

垂直菜单，可内嵌子菜单。

```tsx
import { Menu, Row, Col } from 'tinkerbell-ui-react'
import React from 'react'

function onOpen(val) {
  console.log(val)
}
function onClose(val) {
  console.log(val)
}

const App: React.FC = () => (
  <div className='demo-menu'>
    <Row>
      <Col span={8}>
        <h5>带 icon</h5>
        <Menu
          defaultActive='2'
          className='tb-menu-vertical-demo'
          onOpen={onOpen}
          onClose={onClose}
        >
          <Menu.SubMenu
            index='1'
            title={
              <span>
                <i className='iconfont icon-email-fill'></i>导航一
              </span>
            }
          >
            <Menu.ItemGroup title='分组一'>
              <Menu.Item index='1-1'>选项1</Menu.Item>
              <Menu.Item index='1-2'>选项2</Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup title='分组2'>
              <Menu.Item index='1-3'>选项3</Menu.Item>
            </Menu.ItemGroup>
          </Menu.SubMenu>
          <Menu.Item index='2'>
            <i className='iconfont icon-all-fill'></i>导航二
          </Menu.Item>
          <Menu.Item index='3'>
            <i className='iconfont icon-set1'></i>导航三
          </Menu.Item>
        </Menu>
      </Col>
      <Col span={8}>
        <h5>不带 icon</h5>
        <Menu
          defaultActive='2'
          className='tb-menu-vertical-demo'
          onOpen={onOpen}
          onClose={onClose}
          theme='dark'
        >
          <Menu.SubMenu index='1' title='导航一'>
            <Menu.ItemGroup title='分组一'>
              <Menu.Item index='1-1'>选项1</Menu.Item>
              <Menu.Item index='1-2'>选项2</Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup title='分组2'>
              <Menu.Item index='1-3'>选项3</Menu.Item>
            </Menu.ItemGroup>
          </Menu.SubMenu>
          <Menu.Item index='2'>导航二</Menu.Item>
          <Menu.Item index='3'>导航三</Menu.Item>
        </Menu>
      </Col>
      <Col span={8}>
        <h5>分组</h5>
        <Menu
          mode='vertical'
          defaultActive='1'
          className='tb-menu-vertical-demo'
        >
          <Menu.ItemGroup title='分组一'>
            <Menu.Item index='1'>
              <i className='iconfont icon-email-fill'></i>导航一
            </Menu.Item>
            <Menu.Item index='2'>
              <i className='iconfont icon-email-fill'></i>导航二
            </Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title='分组二'>
            <Menu.Item index='3'>
              <i className='iconfont icon-email-fill'></i>导航三
            </Menu.Item>
            <Menu.Item index='4'>
              <i className='iconfont icon-email-fill'></i>导航四
            </Menu.Item>
          </Menu.ItemGroup>
        </Menu>
      </Col>
    </Row>
  </div>
)

export default App
```

### Menu Props

| 参数           | 说明                                                 | 类型    | 可选值              | 默认值   |
| -------------- | ---------------------------------------------------- | ------- | ------------------- | -------- |
| mode           | 模式                                                 | string  | horizontal,vertical | vertical |
| theme          | 主题色                                               | string  | light,dark          | light    |
| defaultActive  | 当前激活菜单的 index                                 | string  | —                   | —        |
| defaultOpeneds | 当前打开的 submenu 的 key 数组                       | Array   | —                   | —        |
| uniqueOpened   | 是否只保持一个子菜单的展开                           | boolean | —                   | false    |
| menuTrigger    | 子菜单打开的触发方式(只在 mode 为 horizontal 时有效) | string  | —                   | hover    |

### Menu Events

| 事件名称 | 说明               | 回调参数                                                                 |
| -------- | ------------------ | ------------------------------------------------------------------------ |
| onSelect | 菜单激活回调       | index: 选中菜单项的 indexPath: 选中菜单项的 index path                   |
| onOpen   | SubMenu 展开的回调 | index: 打开的 subMenu 的 index， indexPath: 打开的 subMenu 的 index path |
| onClose  | SubMenu 收起的回调 | index: 收起的 subMenu 的 index， indexPath: 收起的 subMenu 的 index path |

### SubMenu Props

| 参数  | 说明     | 类型   | 可选值 | 默认值 |
| ----- | -------- | ------ | ------ | ------ |
| index | 唯一标志 | string | —      | —      |

### MenuItem Props

| 参数  | 说明     | 类型   | 可选值 | 默认值 |
| ----- | -------- | ------ | ------ | ------ |
| index | 唯一标志 | string | —      | —      |

### MenuGroup Props

| 参数  | 说明     | 类型   | 可选值 | 默认值 |
| ----- | -------- | ------ | ------ | ------ |
| title | 分组标题 | string | —      | —      |
