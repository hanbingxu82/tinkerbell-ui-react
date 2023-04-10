---
group:
  title: 导航
  order: 5
nav:
  title: Components
  path: /components
---

# Tabs 标签页

分隔内容上有关联但属于不同类别的数据集合。

## 基础用法

基础的、简洁的标签页。

```tsx
import { Tabs } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => (
  <>
    <Tabs activeName='2' onTabClick={(tab) => console.log(tab.props.name)}>
      <Tabs.Pane label='用户管理' name='1'>
        用户管理
      </Tabs.Pane>
      <Tabs.Pane label='配置管理' name='2'>
        配置管理
      </Tabs.Pane>
      <Tabs.Pane label='角色管理' name='3'>
        角色管理
      </Tabs.Pane>
      <Tabs.Pane label='定时补偿任务' name='4'>
        定时补偿任务
      </Tabs.Pane>
    </Tabs>
  </>
)

export default App
```

## 选项卡样式

选项卡样式的标签页。

```tsx
import { Tabs } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => (
  <>
    <Tabs type='card' value='1'>
      <Tabs.Pane label='用户管理' name='1'>
        用户管理
      </Tabs.Pane>
      <Tabs.Pane label='配置管理' name='2'>
        配置管理
      </Tabs.Pane>
      <Tabs.Pane label='角色管理' name='3'>
        角色管理
      </Tabs.Pane>
      <Tabs.Pane label='定时补偿任务' name='4'>
        定时补偿任务
      </Tabs.Pane>
    </Tabs>
  </>
)

export default App
```

## 可关闭

可以关闭标签页。

```tsx
import { Tabs } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => (
  <>
    <Tabs
      type='card'
      closable
      activeName='1'
      onTabRemove={(tab) => console.log(tab.props.name)}
    >
      <Tabs.Pane label='用户管理' name='1'>
        用户管理
      </Tabs.Pane>
      <Tabs.Pane label='配置管理' name='2'>
        配置管理
      </Tabs.Pane>
      <Tabs.Pane label='角色管理' name='3'>
        角色管理
      </Tabs.Pane>
      <Tabs.Pane label='定时补偿任务' name='4'>
        定时补偿任务
      </Tabs.Pane>
    </Tabs>
  </>
)

export default App
```

## 卡片化

卡片化的标签页。

```tsx
import { Tabs } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => (
  <>
    <Tabs type='border-card' activeName='1'>
      <Tabs.Pane label='用户管理' name='1'>
        用户管理
      </Tabs.Pane>
      <Tabs.Pane label='配置管理' name='2'>
        配置管理
      </Tabs.Pane>
      <Tabs.Pane label='角色管理' name='3'>
        角色管理
      </Tabs.Pane>
      <Tabs.Pane label='定时补偿任务' name='4'>
        定时补偿任务
      </Tabs.Pane>
    </Tabs>
  </>
)

export default App
```

## 自定义标签页

可以通过 node 类型来实现自定义标签页的内容。

```tsx
import { Tabs, Icon } from 'tinkerbell-ui-react'
import React from 'react'

const label = (
  <div>
    <Icon name='icon-code' /> 用户管理
  </div>
)

const App: React.FC = () => (
  <>
    <Tabs type='border-card' activeName='1'>
      <Tabs.Pane label={label} name='1'>
        用户管理
      </Tabs.Pane>
      <Tabs.Pane label='配置管理' name='2'>
        配置管理
      </Tabs.Pane>
      <Tabs.Pane label='角色管理' name='3'>
        角色管理
      </Tabs.Pane>
      <Tabs.Pane label='定时补偿任务' name='4'>
        定时补偿任务
      </Tabs.Pane>
    </Tabs>
  </>
)

export default App
```

## 自定义标签页

可以通过 node 类型来实现自定义标签页的内容。

<code src="./codes/add.tsx"></code>

### Tabs Props

| 参数       | 说明                      | 类型    | 可选值            | 默认值              |
| ---------- | ------------------------- | ------- | ----------------- | ------------------- |
| type       | 风格类型                  | string  | card, border-card | -                   |
| closable   | 标签是否可关闭            | boolean | -                 | false               |
| addable    | 标签是否可增加            | boolean | -                 | false               |
| editable   | 标签是否同时可增加和关闭  | boolean | -                 | false               |
| activeName | 选中选项卡的 name         | string  | -                 | 第一个选项卡的 name |
| value      | 绑定值，选中选项卡的 name | string  | -                 | 第一个选项卡的 name |

### Tabs Events

| 事件名称    | 说明                                    | 回调参数              |
| ----------- | --------------------------------------- | --------------------- |
| onTabClick  | tab 被选中时触发                        | 被选中的标签 tab 实例 |
| onTabRemove | 点击 tab 移除按钮后触发                 | 被删除的标签的 name   |
| onTabAdd    | 点击 tabs 的新增按钮后触发              | -                     |
| onTabEdit   | 点击 tabs 的新增按钮或 tab 被关闭后触发 | (targetName, action)  |

### Tabs.Pane Props

| 参数     | 说明                                             | 类型        | 可选值 | 默认值                                                |
| -------- | ------------------------------------------------ | ----------- | ------ | ----------------------------------------------------- |
| label    | 选项卡标题                                       | string,node | -      | -                                                     |
| disabled | 是否禁用                                         | boolean     | -      | false                                                 |
| name     | 与选项卡 activeName 对应的标识符，表示选项卡别名 | string      | -      | 该选项卡在选项卡列表中的顺序值，如第一个选项卡则为'1' |
| closable | 标签是否可关闭                                   | boolean     | -      | false                                                 |
