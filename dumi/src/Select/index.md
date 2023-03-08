---
group:
  title: 表单
  order: 2
nav:
  title: Components
  path: /components
---

# Select 选择器

当选项过多时，使用下拉菜单展示并选择内容。

## 基础用法

适用广泛的基础单选

```tsx
import React, { useState, useCallback } from 'react'
import { Select } from 'tinkerbell-ui-react'

const options = [
  {
    value: '选项1',
    label: '黄金糕'
  },
  {
    value: '选项2',
    label: '双皮奶'
  },
  {
    value: '选项3',
    label: '蚵仔煎'
  },
  {
    value: '选项4',
    label: '龙须面'
  },
  {
    value: '选项5',
    label: '北京烤鸭'
  }
]

const [value, setValue] = useState('选项3')

const App: React.FC = () => (
  <Select
    value={value}
    onChange={(newValue) => {
      setValue(newValue)
    }}
    placeholder='请选择'
  >
    {options.map((el) => {
      return <Select.Option key={el.value} label={el.label} value={el.value} />
    })}
  </Select>
)

export default App
```

## 禁用状态

选择器不可用状态，为 `Select` 设置 `disabled` 属性，则整个选择器不可用

```tsx
import React, { useState, useCallback } from 'react'
import { Select } from 'tinkerbell-ui-react'

const options = [
  {
    value: '选项1',
    label: '黄金糕'
  },
  {
    value: '选项2',
    label: '双皮奶'
  },
  {
    value: '选项3',
    label: '蚵仔煎'
  },
  {
    value: '选项4',
    label: '龙须面'
  },
  {
    value: '选项5',
    label: '北京烤鸭'
  }
]

const [value, setValue] = useState('选项3')

const App: React.FC = () => (
  <Select
    value={value}
    disabled
    onChange={(newValue) => {
      setValue(newValue)
    }}
    placeholder='请选择'
  >
    {options.map((el) => {
      return (
        <Select.Option
          key={el.value}
          disabled={el.disabled}
          label={el.label}
          value={el.value}
        />
      )
    })}
  </Select>
)

export default App
```

## 有禁用选项

在 `Option` 中，设定 `disabled` 值为 `true` ，即可禁用该选项

```tsx
import React, { useState, useCallback } from 'react'
import { Select } from 'tinkerbell-ui-react'

const options = [
  {
    value: '选项1',
    label: '黄金糕',
    disabled: true
  },
  {
    value: '选项2',
    label: '双皮奶'
  },
  {
    value: '选项3',
    label: '蚵仔煎'
  },
  {
    value: '选项4',
    label: '龙须面'
  },
  {
    value: '选项5',
    label: '北京烤鸭'
  }
]

const [value, setValue] = useState('选项3')

const App: React.FC = () => (
  <Select
    value={value}
    onChange={(newValue) => {
      setValue(newValue)
    }}
    placeholder='请选择'
  >
    {options.map((el) => {
      return (
        <Select.Option
          key={el.value}
          disabled={el.disabled}
          label={el.label}
          value={el.value}
        />
      )
    })}
  </Select>
)

export default App
```

## 可清空单选

包含清空按钮，可将选择器清空为初始状态

```tsx
import React, { useState, useCallback } from 'react'
import { Select } from 'tinkerbell-ui-react'

const options = [
  {
    value: '选项1',
    label: '黄金糕'
  },
  {
    value: '选项2',
    label: '双皮奶'
  },
  {
    value: '选项3',
    label: '蚵仔煎'
  },
  {
    value: '选项4',
    label: '龙须面'
  },
  {
    value: '选项5',
    label: '北京烤鸭'
  }
]

const [value, setValue] = useState('选项3')

const App: React.FC = () => (
  <Select
    value={value}
    clearable
    onChange={(newValue) => {
      setValue(newValue)
    }}
    placeholder='请选择'
  >
    {options.map((el) => {
      return <Select.Option key={el.value} label={el.label} value={el.value} />
    })}
  </Select>
)

export default App
```

## 基础多选

适用性较广的基础多选，用 Tag 展示已选项，为 `Select` 设置 `multiple` 属性即可启用多选，此时 `value` 的值为当前选中值所组成的数组

```tsx
import React, { useState, useCallback } from 'react'
import { Select } from 'tinkerbell-ui-react'

const options = [
  {
    value: '选项1',
    label: '黄金糕'
  },
  {
    value: '选项2',
    label: '双皮奶'
  },
  {
    value: '选项3',
    label: '蚵仔煎'
  },
  {
    value: '选项4',
    label: '龙须面'
  },
  {
    value: '选项5',
    label: '北京烤鸭'
  }
]

const [value, setValue] = useState([])

const App: React.FC = () => (
  <Select value={value} multiple placeholder='请选择'>
    {options.map((el) => {
      return <Select.Option key={el.value} label={el.label} value={el.value} />
    })}
  </Select>
)

export default App
```

## 自定义模板

可以自定义备选项，将自定义的 HTML 模板插入 Option 中即可。

```tsx
import React, { useState, useCallback } from 'react'
import { Select } from 'tinkerbell-ui-react'

const options = [
  {
    value: 'Beijing',
    label: '北京'
  },
  {
    value: 'Shanghai',
    label: '上海'
  },
  {
    value: 'Nanjing',
    label: '南京'
  },
  {
    value: 'Chengdu',
    label: '成都'
  },
  {
    value: 'Shenzhen',
    label: '深圳'
  },
  {
    value: 'Guangzhou',
    label: '广州'
  }
]

const [value, setValue] = useState([])

const App: React.FC = () => (
  <Select value={value} multiple placeholder='请选择'>
    {options.map((el) => {
      return (
        <Select.Option key={el.value} label={el.label} value={el.value}>
          <span style={{ float: 'left' }}>{el.label}</span>
          <span style={{ float: 'right', color: '#8492a6', fontSize: 13 }}>
            {el.value}
          </span>
        </Select.Option>
      )
    })}
  </Select>
)

export default App
```

## 分组

备选项进行分组展示，使用 OptionGroup 对备选项进行分组，它的 label 属性为分组名

```tsx
import React, { useState, useCallback } from 'react'
import { Select } from 'tinkerbell-ui-react'

const options = [
  {
    label: '热门城市',
    options: [
      {
        value: 'Shanghai',
        label: '上海'
      },
      {
        value: 'Beijing',
        label: '北京'
      }
    ]
  },
  {
    label: '城市名',
    options: [
      {
        value: 'Chengdu',
        label: '成都'
      },
      {
        value: 'Shenzhen',
        label: '深圳'
      },
      {
        value: 'Guangzhou',
        label: '广州'
      },
      {
        value: 'Dalian',
        label: '大连'
      }
    ]
  }
]

const [value, setValue] = useState([])

const App: React.FC = () => (
  <Select
    onChange={(newValue) => {
      setValue(newValue)
    }}
    value={value}
    placeholder='请选择'
  >
    {options.map((group) => {
      return (
        <Select.OptionGroup key={group.label} label={group.label}>
          {group.options.map((el) => {
            return (
              <Select.Option key={el.value} label={el.label} value={el.value}>
                <span style={{ float: 'left' }}>{el.label}</span>
                <span
                  style={{ float: 'right', color: '#8492a6', fontSize: 13 }}
                >
                  {el.value}
                </span>
              </Select.Option>
            )
          })}
        </Select.OptionGroup>
      )
    })}
  </Select>
)

export default App
```

## 可搜索

包含清空按钮，可将选择器清空为初始状态

```tsx
import React, { useState, useCallback } from 'react'
import { Select } from 'tinkerbell-ui-react'

const options = [
  {
    value: '选项1',
    label: '黄金糕'
  },
  {
    value: '选项2',
    label: '双皮奶'
  },
  {
    value: '选项3',
    label: '蚵仔煎'
  },
  {
    value: '选项4',
    label: '龙须面'
  },
  {
    value: '选项5',
    label: '北京烤鸭'
  }
]

const [value, setValue] = useState('选项3')

const App: React.FC = () => (
  <Select
    value={value}
    clearable
    filterable
    onChange={(newValue) => {
      setValue(newValue)
    }}
    placeholder='请选择'
  >
    {options.map((el) => {
      return <Select.Option key={el.value} label={el.label} value={el.value} />
    })}
  </Select>
)

export default App
```

### Select props

| 参数         | 说明                      | 类型     | 可选值 | 默认值 |
| ------------ | ------------------------- | -------- | ------ | ------ |
| multiple     | 是否多选                  | Boolean  | -      | false  |
| disabled     | 是否禁用                  | Boolean  | —      | false  |
| clearable    | 单选时是否可以清空选项    | Boolean  | —      | false  |
| name         | select input 的 name 属性 | String   | -      | -      |
| placeholder  | 占位符                    | String   | —      | 请选择 |
| filterable   | 是否可搜索                | Boolean  | -      | false  |
| filterMethod | 自定义过滤方法            | Function | -      | -      |
| remote       | 是否为远程搜索            | Boolean  | —      | false  |
| remoteMethod | 远程搜索方法              | Function | —      | -      |
| loading      | 是否正在从远程获取数据    | Boolean  | —      | false  |

### Select events

| 事件名          | 说明                                     | 返回值                        |
| --------------- | ---------------------------------------- | ----------------------------- |
| onChange        | 选中值发生变化时触发                     | 目前的选中值                  |
| onVisibleChange | 下拉框出现/隐藏时触发                    | 出现则为 true，隐藏则为 false |
| onRemoveTag     | 多选模式下移除 tag 时触发                | 移除的 tag 值                 |
| onClear         | 可清空的单选模式下用户点击清空按钮时触发 | -                             |

### Option Group props

| 参数     | 说明                           | 类型    | 可选值 | 默认值 |
| -------- | ------------------------------ | ------- | ------ | ------ |
| label    | 分组的组名                     | String  | -      | -      |
| disabled | 是否将该分组下所有选项置为禁用 | Boolean | —      | false  |

### Option props

| 参数     | 说明                                    | 类型                 | 可选值 | 默认值 |
| -------- | --------------------------------------- | -------------------- | ------ | ------ |
| value    | 选项的值                                | String/number/object | -      | -      |
| label    | 选项的标签，若不设置则默认与 value 相同 | String/number        | —      | -      |
| disabled | 是否禁用该选项                          | Boolean              | —      | false  |
