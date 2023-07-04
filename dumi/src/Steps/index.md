---
group:
  title: 导航
  order: 5
nav:
  title: Components
  path: /components
---

# Steps 步骤条

引导用户按照流程完成任务的分步导航条，可根据实际应用场景设定步骤，步骤不得少于 2 步。

## 基础用法

简单的步骤条。

```tsx
import { Steps, Step, Button } from 'tinkerbell-ui-react'
import React, { useState } from 'react'

const App: React.FC = () => {
  const [active, setActive] = useState(0)
  function next() {
    let activeNum = active + 1
    if (activeNum > 3) {
      activeNum = 0
    }
    setActive(activeNum)
  }
  return (
    <div className='demo-Steps'>
      <Steps space={200} active={active} finishStatus='success'>
        <Step title='步骤 1'></Step>
        <Step title='步骤 2'></Step>
        <Step title='步骤 3'></Step>
      </Steps>
      <br />
      <Button onClick={() => next()}>下一步</Button>
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
