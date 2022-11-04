---
group:
  title: 组件
nav:
  title: Components
  path: /components
---

# Button 按钮

按钮用于开始一个即时操作。

## 基础用法

默认按钮，可设置 `dashed` 虚线和 `background` 拟物按钮

```tsx
import { Button } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => (
  <>
    <Button>Default</Button>
    <Button dashed>Dashed</Button>
    <Button background>Background</Button>
  </>
)

export default App
```

## 不同状态

使用 `type` 可以设置不同状态的按钮样式

```tsx
import { Button } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => (
  <>
    <Button type='primary'>Primary</Button>
    <Button type='success'>Success</Button>
    <Button type='info'>Info</Button>
    <Button type='warning'>Warning</Button>
    <Button type='danger'>Danger</Button>
  </>
)

export default App
```

## 不同的按钮效果

可以另外给按钮设置不同的按钮效果，如 `plain` 简约按钮， `round` 圆角按钮，dashed虚线按钮和 `transparent` 透明按钮四种不同种类的按钮

```tsx
import { Button,Divider } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => (
  <>
  <Divider orientation="left">[plain]简约按钮</Divider>
  <div>
    <Button type="primary" plain>Primary</Button>
    <Button type="success" plain>Success</Button>
    <Button type="info" plain>Info</Button>
    <Button type="warning" plain>Warning</Button>
    <Button type="danger" plain>Danger</Button>
  </div>
  <Divider orientation="left">[round]圆角按钮</Divider>
  <div>
    <Button type="primary" round>Primary</Button>
    <Button type="success" round>Success</Button>
    <Button type="info" round>Info</Button>
    <Button type="warning" round>Warning</Button>
    <Button type="danger" round>Danger</Button>
  </div>
  <Divider orientation="left">[dashed]虚线按钮</Divider>
  <div>
    <Button type="primary" dashed>Primary</Button>
    <Button type="success" dashed>Success</Button>
    <Button type="info" dashed>Info</Button>
    <Button type="warning" dashed>Warning</Button>
    <Button type="danger" dashed>Danger</Button>
  </div>
  <Divider orientation="left">[transparent]透明按钮</Divider>
  <div >
    <Button type="primary" transparent >Primary</Button>
    <Button type="success" transparent >Success</Button>
    <Button type="info" transparent >Info</Button>
    <Button type="warning" transparent >Warning</Button>
    <Button type="danger" transparent >Danger</Button>
  </div>
  </>
)

export default App
```

## 带图标的按钮

使用 `icon` 给按钮配置图标

```tsx
import { Button } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => (
  <>
    <Button icon="icon-search">search</Button>
    <Button icon="icon-add-select">create</Button>
    <Button icon="icon-add-select" type="primary">check</Button>
    <Button icon="icon-ashbin" type="danger">delete</Button>
  </>
)

export default App
```

## 禁用按钮

你可以使用 `disabled` 属性来定义按钮是否可用，它接受一个 `Boolean` 值。

```tsx
import { Button } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => (
  <>
  <div className="margin-6-0" >
    <Button disabled>Default</Button>
    <Button dashed disabled>Dashed</Button>
    <Button background disabled>Background</Button>
    <Button loading disabled>Loading</Button>
  </div>
  <div className="margin-6-0">
    <Button type="primary" disabled>Primary</Button>
    <Button type="success" disabled>Success</Button>
    <Button type="info" disabled>Info</Button>
    <Button type="warning" disabled>Warning</Button>
    <Button type="danger" disabled>Danger</Button>
  </div>
  <div className="margin-6-0">
    <Button type="primary" plain disabled>Primary</Button>
    <Button type="success" plain disabled>Success</Button>
    <Button type="info" plain disabled>Info</Button>
    <Button type="warning" plain disabled>Warning</Button>
    <Button type="danger" plain disabled>Danger</Button>
  </div>
  <div className="margin-6-0">
    <Button type="primary" round disabled>Primary</Button>
    <Button type="success" round disabled>Success</Button>
    <Button type="info" round disabled>Info</Button>
    <Button type="warning" round disabled>Warning</Button>
    <Button type="danger" round disabled>Danger</Button>
  </div>
  <div className="margin-6-0">
    <Button type="primary" dashed disabled>Primary</Button>
    <Button type="success" dashed disabled>Success</Button>
    <Button type="info" dashed disabled>Info</Button>
    <Button type="warning" dashed disabled>Warning</Button>
    <Button type="danger" dashed disabled>Danger</Button>
  </div>
  <div className="margin-6-0" >
    <Button type="primary" transparent  disabled>Primary</Button>
    <Button type="success" transparent  disabled>Success</Button>
    <Button type="info" transparent  disabled>Info</Button>
    <Button type="warning" transparent  disabled>Warning</Button>
    <Button type="danger" transparent  disabled>Danger</Button>
  </div>
  </>
)

export default App
```

## 文字按钮

没有边框和背景色的按钮。

```tsx
import { Button } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => (
  <>
    <div>
      <Button type="text">文字按钮</Button>
      <Button type="text" textColor="primary">Primary</Button>
      <Button type="text" textColor="success">Success</Button>
      <Button type="text" textColor="info">Info</Button>
      <Button type="text" textColor="warning">Warning</Button>
      <Button type="text" textColor="danger">Danger</Button>
      <Button type="text" textColor="#b37feb">多彩按钮</Button>
      <Button type="text" textColor="#f759ab">多彩按钮2</Button>
    </div>
    <div>
      <Button type="text" disabled>禁用按钮</Button>
      <Button type="text" textColor="primary" disabled>Primary</Button>
      <Button type="text" textColor="success" disabled>Success</Button>
      <Button type="text" textColor="info" disabled>Info</Button>
      <Button type="text" textColor="warning" disabled>Warning</Button>
      <Button type="text" textColor="danger" disabled>Danger</Button>
      <Button type="text" textColor="#f759ab" disabled>多彩按钮</Button>
      <Button type="text" textColor="#f759ab" disabled>多彩按钮2</Button>
    </div>
  </>
)

export default App
```

## 不同尺寸

Button 组件提供除了默认值以外的三种尺寸，可以在不同场景下选择合适的按钮尺寸。

```tsx
import { Button } from 'tinkerbell-ui-react'
import React from 'react'

const App: React.FC = () => (
  <>
  <div className="margin-6-0">
    <Button size="large">Large</Button>
    <Button>Default</Button>
    <Button size="small">Small</Button>
    <Button size="mini">Mini</Button>
  </div>
  <div className="margin-6-0">
    <Button size="large" round>Large</Button>
    <Button round>Default</Button>
    <Button size="small" round>Small</Button>
    <Button size="mini" round>Mini</Button>
  </div>
  </>
)

export default App
```

## 加载中状态

添加 `loading` 属性即可让按钮处于加载状态，最后两个按钮演示点击后进入加载状态。

```tsx
import { Button } from 'tinkerbell-ui-react';
import React, { useState } from 'react';

const App: React.FC = () => {
  const [loadings, setLoadings] = useState<boolean[]>([]);

  const enterLoading = (index: number) => {
    setLoadings(prevLoadings => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });

    setTimeout(() => {
      setLoadings(prevLoadings => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 6000);
  };

  return (
    <>
        <Button type="primary" loading>
          Loading
        </Button>
        <Button type="primary" size="small" loading>
          Loading
        </Button>
        <Button type="primary" icon='icon-switch' loading />

        <Button type="primary" loading={loadings[0]} onClick={() => enterLoading(0)}>
          Click me!
        </Button>
        <Button
          type="primary"
          icon='icon-switch'
          loading={loadings[1]}
          onClick={() => enterLoading(1)}
        >
          Click me!
        </Button>
        <Button
          type="primary"
          icon='icon-switch'
          loading={loadings[2]}
          onClick={() => enterLoading(2)}
        />

    </>
  );
};

export default App;
```

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| size | 尺寸 | string | large / small / mini | — |
| type | 类型 | string | primary / success / warning / danger / info / text | — |
| plain | 是否朴素按钮 | boolean | — | false |
| round | 是否圆角按钮 | boolean | — | false |
| transparent | 是否是透明按钮 | boolean | — | false |
| background | 默认按钮是否带有拟物背景 | boolean | — | false |
| loading | 是否加载中状态 | boolean | — | false |
| disabled | 是否禁用状态 | boolean | — | false |
| icon | 图标类名 | string | — | — |
| textColor | 文字按钮颜色，默认禁用文字颜色增加亮度区分 | string | primary / success / warning / danger / info / text / 自定义色值 | — |
| iconStyle | 图标样式, 可设置图标大小，字体对其等，可依托 text-color 设置颜色，也可以自定义 | Object | — | — |
| autofocus | 是否默认聚焦 | boolean | — | false |
| native-type | 原生 type 属性 | string | button / submit / reset | button |

More skills for writing demo: https://d.umijs.org/guide/demo-principle
