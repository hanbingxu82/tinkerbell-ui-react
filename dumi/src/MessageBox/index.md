---
group:
  title: 通知
  order: 4
nav:
  title: Components
  path: /components
---

# MessageBox 弹框

弹窗是为了模拟快速创建模态框准备的，基于 Modal 框生成的窗口实例。

## 消息提示

当用户进行操作时会被触发，该对话框中断用户操作，直到用户确认知晓后才可关闭。

```tsx
import { Button, MessageBox } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => (
  <>
    <div className='demo-component'>
      <Button
        type='primary'
        onClick={() => MessageBox.alert('这是一段内容', '标题名称')}
      >
        打开 MessageBox
      </Button>
    </div>
  </>
)

export default App
```

## 确认消息

提示用户确认其已经触发的动作，并询问是否进行此操作时会用到此对话框。

```tsx
import { Button, MessageBox, Message } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => (
  <>
    <div className='demo-component'>
      <Button
        type='primary'
        onClick={() => {
          MessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            type: 'warning'
          })
            .then(() => {
              Message({
                type: 'success',
                message: '删除成功!'
              })
            })
            .catch(() => {
              Message({
                type: 'info',
                message: '已取消删除'
              })
            })
        }}
      >
        confirm 弹窗
      </Button>
    </div>
  </>
)

export default App
```

## 提交内容

当用户进行操作时会被触发，中断用户操作，提示用户进行输入的对话框。

```tsx
import { Button, MessageBox, Message } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => (
  <>
    <div className='demo-component'>
      <Button
        type='primary'
        onClick={() => {
          MessageBox.prompt('请输入邮箱', '提示', {
            inputPattern:
              /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
            inputErrorMessage: '邮箱格式不正确'
          })
            .then(({ value }) => {
              Message({
                type: 'success',
                message: '你的邮箱是: ' + value
              })
            })
            .catch(() => {
              Message({
                type: 'info',
                message: '取消输入'
              })
            })
        }}
      >
        email 弹窗
      </Button>
    </div>
  </>
)

export default App
```

## 自定义

可自定义配置不同内容。

```tsx
import { Button, MessageBox, Message } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => (
  <>
    <div className='demo-component'>
      <Button
        type='primary'
        onClick={() => {
          MessageBox.msgbox({
            title: '消息',
            message:
              '这是一段内容, 这是一段内容, 这是一段内容, 这是一段内容, 这是一段内容, 这是一段内容, 这是一段内容',
            showCancelButton: true
          }).then((action) => {
            Message({
              type: 'info',
              message: 'action: ' + action
            })
          })
        }}
      >
        msgbox 自定义弹窗
      </Button>
    </div>
  </>
)

export default App
```

## 单独引用

单独引入 MessageBox:

```javascript
import { MessageBox } from 'tinkerbell-ui-react'
```

对应于上述四个全局方法的调用方法依次为： MessageBox.alert, MessageBox.confirm, MessageBox.prompt 和 MessageBox.msgbox。

### MessageBox Props

| 参数               | 说明                                                                                               | 类型                | 可选值                         | 默认值                                          |
| ------------------ | -------------------------------------------------------------------------------------------------- | ------------------- | ------------------------------ | ----------------------------------------------- |
| title              | MessageBox 标题                                                                                    | string              | —                              | —                                               |
| customClass        | 对话框外层容器的类名                                                                               | string              | —                              | -                                               |
| message            | MessageBox 消息正文内容                                                                            | string/ReactElement | —                              | —                                               |
| type               | 消息类型，用于显示图标                                                                             | string              | success/info/<br>warning/error | —                                               |
| lockScroll         | 是否在 MessageBox 出现时将 body 滚动锁定                                                           | boolean             | —                              | true                                            |
| showClose          | 是否显示关闭按钮                                                                                   | boolean             | —                              | true                                            |
| showCancelButton   | 是否显示取消按钮                                                                                   | boolean             | —                              | false（以 confirm 和 prompt 方式调用时为 true） |
| showConfirmButton  | 是否显示确定按钮                                                                                   | boolean             | —                              | true                                            |
| cancelButtonText   | 取消按钮的文本内容                                                                                 | string              | —                              | 取消                                            |
| confirmButtonText  | 确定按钮的文本内容                                                                                 | string              | —                              | 确定                                            |
| cancelButtonClass  | 取消按钮的自定义类名                                                                               | string              | —                              | —                                               |
| confirmButtonClass | 确定按钮的自定义类名                                                                               | string              | —                              | —                                               |
| showInput          | 是否显示输入框                                                                                     | boolean             | —                              | false（以 prompt 方式调用时为 true）            |
| inputPlaceholder   | 输入框的占位符                                                                                     | string              | —                              | —                                               |
| inputType          | 输入框的类型                                                                                       | string              | —                              | text                                            |
| inputValue         | 输入框的初始文本                                                                                   | string              | —                              | —                                               |
| inputPattern       | 输入框的校验表达式                                                                                 | regexp              | —                              | —                                               |
| inputValidator     | 输入框的校验函数。可以返回布尔值或字符串，若返回一个字符串, 则返回结果会被赋值给 inputErrorMessage | function            | —                              | —                                               |
| inputErrorMessage  | 校验未通过时的提示文本                                                                             | string              | —                              | 输入的数据不合法!                               |
