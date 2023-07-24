---
group:
  title: 其他
  order: 6
nav:
  title: Components
  path: /components
---

# Backtop 回到顶部

返回页面顶部的操作按钮

## 基础用法

滑动页面即可看到右下方的按钮。

```tsx
import { Backtop } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => {
  return (
    <div className='demo-Backtop'>
      Scroll down to see the bottom-right button.
      <Backtop bottom={100} right={30}></Backtop>
    </div>
  )
}

export default App
```

## 自定义显示内容

显示区域被固定为右下方按钮的区域, 其中的文本内容可支持自定义。

```tsx
import { Backtop } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => {
  function yourFunction() {
    console.log('到顶啦')
  }
  return (
    <div className='demo-Backtop'>
      Scroll down to see the bottom-right button.
      <Backtop
        text='UP'
        visibleY={100}
        duration={300}
        scrolledOnTop={yourFunction}
      ></Backtop>
    </div>
  )
}

export default App
```

### Backtop props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ---- | ---- | ---- | ------ | ------ |
| text | 文本 slot 内容 如果不传递默认展示图标 | string | — | - |
| target | 触发滚动的对象 如果没有默认就是 html 文档 | string | — | - |
| visibleY | 滚动高度达到此参数值才出现 | number | — | 200 |
| right | 控制其显示位置, 距离页面右边距 | number | — | 30 |
| bottom | 控制其显示位置, 距离页面底部距离 | number | — | 30 |
| duration | 到顶部的动画时间毫秒 | number | — | 600 |

### Backtop events

| 事件名        | 说明                       | 返回值 |
| ------------- | -------------------------- | ------ |
| scrolledOnTop | 当页面滚动到顶部时触发功能 | -      |
