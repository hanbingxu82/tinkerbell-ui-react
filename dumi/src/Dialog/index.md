---
group:
  title: 其他
  order: 6
nav:
  title: Components
  path: /components
---

# Dialog 对话框

在保留当前页面状态的情况下，告知用户并承载相关操作。

## 基础用法

Dialog 弹出一个对话框，适合需要定制性更大的场景。

```tsx
import { Dialog, Button } from 'tinkerbell-ui-react'
import React, { useState } from 'react'

const App: React.FC = () => {
  const [value, setValue] = useState(false)
  return (
    <div className='demo-Dialog'>
      <Button
        style={{ marginLeft: 20 }}
        // type='text'
        onClick={() => setValue(true)}
      >
        点击打开 Dialog
      </Button>
      <Dialog
        destroyOnClose
        title='提示'
        size='tiny'
        visible={value}
        onCancel={() => setValue(false)}
        lockScroll={false}
      >
        <Dialog.Body>
          <span>这是一段信息</span>
          <input type='text' />
        </Dialog.Body>
        <Dialog.Footer className='dialog-footer'>
          <Button onClick={() => setValue(false)}>取消</Button>
          <Button type='primary' onClick={() => setValue(false)}>
            确定
          </Button>
        </Dialog.Footer>
      </Dialog>
    </div>
  )
}

export default App
```

## 含状态步骤条

每一步骤显示出该步骤的状态。

```tsx
import { Steps } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => {
  return (
    <div className='demo-Steps'>
      <Steps space={100} active={1} finishStatus='success'>
        <Steps.Step title='已完成'></Steps.Step>
        <Steps.Step title='进行中'></Steps.Step>
        <Steps.Step title='步骤 3'></Steps.Step>
      </Steps>
    </div>
  )
}

export default App
```

## 有描述的步骤条

每个步骤有其对应的步骤状态描述。

```tsx
import { Steps } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => {
  return (
    <div className='demo-Steps'>
      <Steps space={200} active={1}>
        <Steps.Step
          title='步骤 1'
          description='这是一段很长很长很长的描述性文字'
        ></Steps.Step>
        <Steps.Step
          title='步骤 2'
          description='这是一段很长很长很长的描述性文字'
        ></Steps.Step>
        <Steps.Step
          title='步骤 3'
          description='这是一段很长很长很长的描述性文字'
        ></Steps.Step>
      </Steps>
    </div>
  )
}

export default App
```

## 带图标的步骤条

步骤条内可以启用各种自定义的图标。

```tsx
import { Steps } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => {
  return (
    <div className='demo-Steps'>
      <Steps space={200} active={1}>
        <Steps.Step title='步骤 1' icon='icon-Daytimemode-fill'></Steps.Step>
        <Steps.Step title='步骤 2' icon='icon-messagecenter'></Steps.Step>
        <Steps.Step title='步骤 3' icon='icon-packaging'></Steps.Step>
      </Steps>
    </div>
  )
}

export default App
```

## 竖式步骤条

竖直方向的步骤条。

```tsx
import { Steps } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => {
  return (
    <div className='demo-Steps'>
      <Steps space={100} direction='vertical' active={1}>
        <Steps.Step title='步骤 1'></Steps.Step>
        <Steps.Step title='步骤 2'></Steps.Step>
        <Steps.Step title='步骤 3'></Steps.Step>
      </Steps>
    </div>
  )
}

export default App
```

### Steps Props

| 参数          | 说明                                 | 类型   | 可选值                            | 默认值     |
| ------------- | ------------------------------------ | ------ | --------------------------------- | ---------- |
| space         | 每个 step 的间距，不填写将自适应间距 | Number | —                                 | —          |
| direction     | 显示方向                             | String | vertical/horizontal               | horizontal |
| active        | 设置当前激活步骤                     | Number | —                                 | 0          |
| processStatus | 设置当前步骤的状态                   | String | wait/process/finish/error/success | process    |
| finishStatus  | 设置结束步骤的状态                   | String | wait/process/finish/error/success | finish     |

### Step Props

| 参数        | 说明       | 类型                | 可选值 | 默认值 |
| ----------- | ---------- | ------------------- | ------ | ------ |
| title       | 标题       | string              | —      | —      |
| description | 描述性文字 | String/ReactElement | —      | —      |
| icon        | 图标       | icon-class          | string | —      |
