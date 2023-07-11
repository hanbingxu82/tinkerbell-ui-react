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
import { Dialog, Button, Input } from 'tinkerbell-ui-react'
import React, { useState } from 'react'

const App: React.FC = () => {
  const [value, setValue] = useState(false)
  return (
    <div className='demo-Dialog'>
      <Button style={{ marginLeft: 20 }} onClick={() => setValue(true)}>
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
          <p>这是一段信息：</p>
          <Input type='text' />
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

## 嵌套表格弹窗

嵌套表格的弹窗。

```tsx
import { Dialog, Button, Table } from 'tinkerbell-ui-react'
import React, { useState } from 'react'

const App: React.FC = () => {
  const [value, setValue] = useState(false)
  const table = {
    columns: [
      {
        label: '姓名',
        align: 'center',
        field: 'name'
      },
      {
        label: '年龄',
        align: 'center',
        field: 'age'
      },
      {
        label: '生日',
        align: 'center',
        field: 'birthday'
      },
      {
        label: '地址',
        align: 'center',
        field: 'address'
      }
    ],
    data: [
      {
        name: '王小帅',
        age: 24,
        birthday: '1998-05-20',
        address: '天津市南开区红旗南路1号'
      },
      {
        name: '王小帅',
        age: 25,
        birthday: '1997-05-20',
        address: '天津市南开区红旗南路2号'
      },
      {
        name: '王小帅',
        age: 26,
        birthday: '1996-05-20',
        address: '天津市南开区红旗南路3号'
      },
      {
        name: '王小帅',
        age: 27,
        birthday: '1995-05-20',
        address: '天津市南开区红旗南路4号'
      },
      {
        name: '王小帅',
        age: 28,
        birthday: '1994-05-20',
        address: '天津市南开区红旗南路5号'
      }
    ]
  }
  return (
    <div className='demo-Dialog'>
      <Button style={{ marginLeft: 20 }} onClick={() => setValue(true)}>
        打开嵌套表格的 Dialog
      </Button>
      <Dialog
        destroyOnClose
        title='提示'
        size='small'
        visible={value}
        onCancel={() => setValue(false)}
        lockScroll={false}
      >
        <Dialog.Body>
          {value && <Table rows={table.data} cols={table.columns}></Table>}
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

## 嵌套表单弹窗

嵌套表单的弹窗。

```tsx
import { Dialog, Button, Input, Form, Select } from 'tinkerbell-ui-react'
import React, { useState } from 'react'

const App: React.FC = () => {
  const [value, setValue] = useState(false)
  const form = {
    name: '',
    region: ''
  }
  return (
    <div className='demo-Dialog'>
      <Button style={{ marginLeft: 20 }} onClick={() => setValue(true)}>
        打开嵌套表单的 Dialog
      </Button>
      <Dialog
        destroyOnClose
        title='提示'
        width={'50%'}
        visible={value}
        onCancel={() => setValue(false)}
        lockScroll={false}
      >
        <Dialog.Body>
          {value && (
            <Form model={form}>
              <Form.Item label='活动名称：' labelWidth='120'>
                <Input value={form.name}></Input>
              </Form.Item>
              <Form.Item label='活动区域：' labelWidth='120'>
                <Select value={form.region} placeholder='请选择活动区域'>
                  <Select.Option
                    label='区域一'
                    value='shanghai'
                  ></Select.Option>
                  <Select.Option label='区域二' value='beijing'></Select.Option>
                </Select>
              </Form.Item>
            </Form>
          )}
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

### Dialog props

| 参数               | 说明                                                 | 类型    | 可选值                | 默认值 |
| ------------------ | ---------------------------------------------------- | ------- | --------------------- | ------ |
| title              | Dialog 的标题                                        | string  | —                     | —      |
| width              | Dialog 的宽度                                        | string  | —                     | —      |
| size               | Dialog 的大小                                        | string  | tiny/small/large/full | small  |
| top                | Dialog CSS 中的 top 值（仅在 size 不为 full 时有效） | string  | —                     | 15%    |
| modal              | 是否需要遮罩层                                       | boolean | —                     | true   |
| lockScroll         | 是否在 Dialog 出现时将 body 滚动锁定                 | boolean | —                     | true   |
| customClass        | Dialog 的自定义类名                                  | string  | —                     | —      |
| closeOnClickModal  | 是否可以通过点击 modal 关闭 Dialog                   | boolean | —                     | true   |
| closeOnPressEscape | 是否可以通过按下 ESC 关闭 Dialog                     | boolean | —                     | true   |

### Dialog events

| 事件名称 | 说明              | 回调参数 |
| -------- | ----------------- | -------- |
| onClose  | Dialog 关闭的回调 | —        |
| onOpen   | Dialog 打开的回调 | —        |
