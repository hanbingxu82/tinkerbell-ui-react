---
group:
  title: 其他
  order: 6
nav:
  title: Components
  path: /components
---

# Popover 气泡弹窗

气泡类型的弹窗,用于放置更多信息或询问流程等。

## 基础用法

气泡弹窗基本用法

```tsx
import { Popover, Button } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => (
  <>
    <div className='demo-Popover'>
      <Popover trigger='hover' title='Title' content='content'>
        <Button>Hover</Button>
      </Popover>
      <Popover trigger='click' title='Title' content='content'>
        <Button>Click</Button>
      </Popover>
      <Popover trigger='focus' title='Title' content='content'>
        <Button>Focus</Button>
      </Popover>
    </div>
  </>
)

export default App
```

## 多种悬停方式

可以设置不同悬停方式

```tsx
import { Popover, Tooltip, Button } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => (
  <>
    <div className='demo-Popover'>
      <div className='box'>
        <div className='top'>
          <Popover
            className='item'
            content='Top Left 提示文字'
            placement='topLeft'
          >
            <Button>上左</Button>
          </Popover>
          <Popover
            className='item'
            content='Top Center 提示文字'
            placement='top'
          >
            <Button>上边</Button>
          </Popover>
          <Popover
            className='item'
            content='Top Right 提示文字'
            placement='topRight'
          >
            <Button>上右</Button>
          </Popover>
        </div>
        <div className='left'>
          <Popover
            className='item'
            content='Left Top 提示文字'
            placement='leftTop'
          >
            <Button>左上</Button>
          </Popover>
          <Popover
            className='item'
            content='Left Center 提示文字'
            placement='left'
          >
            <Button>左边</Button>
          </Popover>
          <Popover
            className='item'
            content='Left Bottom 提示文字'
            placement='leftBottom'
          >
            <Button>左下</Button>
          </Popover>
        </div>

        <div className='right'>
          <Popover
            className='item'
            content='Right Top 提示文字'
            placement='rightTop'
          >
            <Button>右上</Button>
          </Popover>
          <Popover
            className='item'
            content='Right Center 提示文字'
            placement='right'
          >
            <Button>右边</Button>
          </Popover>
          <Popover
            className='item'
            content='Right Bottom 提示文字'
            placement='rightBottom'
          >
            <Button>右下</Button>
          </Popover>
        </div>
        <div className='bottom'>
          <Popover
            className='item'
            content='Bottom Left 提示文字'
            placement='bottomLeft'
          >
            <Button>下左</Button>
          </Popover>
          <Popover
            className='item'
            content='Bottom Center 提示文字'
            placement='bottom'
          >
            <Button>下边</Button>
          </Popover>
          <Popover
            className='item'
            content='Bottom Right 提示文字'
            placement='bottomRight'
          >
            <Button>下右</Button>
          </Popover>
        </div>
      </div>
    </div>
  </>
)

export default App
```

## 更多内容

内容很长的文本弹出框。

```tsx
import { Popover, Button } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => (
  <>
    <div className='demo-Popover'>
      <Popover
        placement='top'
        content={
          <div>
            这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长的描述
          </div>
        }
      >
        <Button>长文本</Button>
      </Popover>
      <Popover
        placement='right'
        content={
          <div>
            <div>
              这是自定义内容~这是自定义内容~这是自定义内容~这是自定义内容~
            </div>
            <div>
              这是自定义内容~这是自定义内容~这是自定义内容~这是自定义内容~
            </div>
          </div>
        }
      >
        <Button>更多内容</Button>
      </Popover>
    </div>
  </>
)

export default App
```

## 更多内容

内容很长的文本弹出框。

```tsx
import { Popover, Button } from 'tinkerbell-ui-react'
import React, { useState } from 'react'

const App: React.FC = () => {
  const [visible, setVisible] = useState(false)
  return (
    <>
      <div className='demo-Popover'>
        <Popover
          placement='top'
          trigger='click'
          visible={visible}
          content={
            <div style={{ width: 200 }}>
              <p>这是一段内容这是一段内容确定删除吗？</p>
              <div style={{ textAlign: 'right', margin: 0 }}>
                <Button
                  size='mini'
                  type='text'
                  onClick={() => {
                    setVisible(false)
                  }}
                >
                  取消
                </Button>
                <Button
                  type='primary'
                  size='mini'
                  onClick={() => {
                    setVisible(false)
                  }}
                >
                  确定
                </Button>
              </div>
            </div>
          }
        >
          <Button
            type='danger'
            onClick={() => {
              setVisible(true)
            }}
          >
            删除
          </Button>
        </Popover>
      </div>
    </>
  )
}

export default App
```

### Popover props

| 参数            | 说明                                   | 类型    | 可选值                                                                                                    | 默认值 |
| --------------- | -------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------- | ------ |
| trigger         | 触发方式                               | String  | click/focus/hover                                                                                         | click  |
| title           | 标题                                   | String  | —                                                                                                         | —      |
| content         | 显示的内容，也可以通过 `slot` 传入 DOM | String  | —                                                                                                         | —      |
| placement       | 出现位置                               | String  | top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end | bottom |
| visible         | 状态是否可见                           | Boolean | —                                                                                                         | false  |
| mouseEnterDelay | 鼠标输入时显示的延迟时间单位：s。      | Number  | —                                                                                                         | 0      |
| mouseLeaveDelay | 鼠标离开时隐藏的延迟时间。单位：s。    | Number  | —                                                                                                         | 0.1    |
| overlayStyle    | 叠加节点的附加样式                     | Object  | —                                                                                                         | {}     |

### Popover events

| 事件名称        | 说明           | 回调参数 |
| --------------- | -------------- | -------- |
| onVisibleChange | 可见更改时调用 | -        |
