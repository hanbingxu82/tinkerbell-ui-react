---
group:
  title: 其他
  order: 6
nav:
  title: Components
  path: /components
---

# CountTo 数字动画

数字动画为常用组件，因此收录至组件库便于使用，整体源码参考 vue-count-to 实现，props 参数也一样，由于纯数字显示，因此所有样式都可以自定义

## 基础用法

最简单的 CountTo

```tsx
import { CountTo, Button } from 'tinkerbell-ui-react'
import React from 'react'

const countTo = React.useRef<any>(null)

const App: React.FC = () => (
  <div className='demo-CountTo'>
    <Button
      type='primary'
      onClick={() => {
        countTo.current.restart()
      }}
    >
      restart
    </Button>
    <div>
      <CountTo startVal={0} endVal={2023} ref={countTo}></CountTo>
    </div>
  </div>
)

export default App
```

## 自定义参数

可以设置不同参数来定义时长、前缀、后缀、连接符等来定义显示

```tsx
import { CountTo, Button } from 'tinkerbell-ui-react'
import React from 'react'

const countTo1 = React.useRef<any>(null)
const countTo2 = React.useRef<any>(null)
const countTo3 = React.useRef<any>(null)
const countTo4 = React.useRef<any>(null)

const App: React.FC = () => (
  <div className='demo-CountTo'>
    <Button
      type='primary'
      onClick={() => {
        countTo1.current.restart()
        countTo2.current.restart()
        countTo3.current.restart()
        countTo4.current.restart()
      }}
    >
      restart
    </Button>
    <div
      style={{
        fontSize: 18,
        color: '#1089ff',
        width: 120,
        marginRight: 16
      }}
    >
      <CountTo
        startVal={0}
        endVal={2023}
        duration={3000}
        ref={countTo1}
      ></CountTo>
    </div>
    <div
      style={{
        fontSize: 18,
        color: '#1089ff',
        width: 120,
        marginRight: 16
      }}
    >
      <CountTo
        startVal={0}
        endVal={2023}
        duration={3000}
        decimals='2'
        ref={countTo2}
      ></CountTo>
    </div>
    <div
      style={{
        fontSize: 18,
        color: '#1089ff',
        width: 120,
        marginRight: 16
      }}
    >
      <CountTo
        startVal={0}
        endVal={2023}
        duration={3000}
        separator=''
        ref={countTo3}
      ></CountTo>
    </div>
    <div
      style={{
        fontSize: 18,
        color: '#1089ff',
        width: 120,
        marginRight: 16
      }}
    >
      <CountTo
        startVal={0}
        endVal={2023}
        duration={3000}
        prefix='$'
        suffix='美金'
        ref={countTo4}
      ></CountTo>
    </div>
  </div>
)

export default App
```

### CountTo Props

| 参数      | 说明                     | 类型    | 可选值 | 默认值 |
| --------- | ------------------------ | ------- | ------ | ------ |
| startVal  | 开始值                   | Number  | -      | -      |
| endVal    | 结束值                   | Number  | -      | 2000   |
| duration  | 动画持续时间             | Number  | -      | 2000   |
| autoplay  | 是否自动播放             | Boolean | -      | true   |
| decimals  | 小数点精度               | Number  | -      | 0      |
| decimal   | 小数点显示               | String  | -      | .      |
| separator | 数字分割                 | String  | -      | ,      |
| prefix    | 前缀，用于显示之前的字符 | String  | -      | -      |
| suffix    | 后缀，用于显示之后的字符 | String  | -      | -      |

### CountTo Events

| 事件名    | 说明     | 返回值 |
| --------- | -------- | ------ |
| onMounted | 开始渲染 | -      |
| callback  | 调用结束 | -      |

### CountTo Slot

| 事件名      | 说明       | 返回值          |
| ----------- | ---------- | --------------- |
| count       | 获取当前值 | timestamp，时间 |
| start       | 开始       | -               |
| pauseResume | 暂停和启动 | -               |
| reset       | 重置       | -               |
| restart     | 重启       | -               |

<!-- More skills for writing demo: https://d.umijs.org/guide/demo-principle -->
