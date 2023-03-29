---
group:
  title: 数据
  order: 3
nav:
  title: Components
  path: /components
---

# Showmore 文本省略

当文本过长时，使用文本省略。

## 基础用法

文本省略的基本用法

```tsx
import { Showmore } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => (
  <>
    <div className='demo-showmore'>
      <div className='title'>展开</div>
      <div>
        <Showmore
          len={10}
          text='文本超出显示长度，折叠起来，通过len属性显示从何处开始折叠'
        ></Showmore>
      </div>
      <div className='title' style={{ marginTop: 20 }}>
        展开 / 收起
      </div>
      <div>
        <Showmore
          allowFold
          len={10}
          showText='show'
          hiddenText='hidden'
          text='文本超出显示长度，折叠起来，通过len属性显示从何处开始折叠'
        ></Showmore>
      </div>
    </div>
  </>
)

export default App
```

### Showmore Props

| 参数      | 说明                             | 类型    | 可选值 | 默认值   |
| --------- | -------------------------------- | ------- | ------ | -------- |
| len       | 显示文本的长度 默认不折叠        | Number  | -      | -1       |
| text      | 文本                             | string  | -      | -        |
| showText  | 折叠时需要显示文案               | Number  | -      | 显示更多 |
| allowFold | 是否需要展示 hiddenText 收起效果 | boolean | -      | false    |
