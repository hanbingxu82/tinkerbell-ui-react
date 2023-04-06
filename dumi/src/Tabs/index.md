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
