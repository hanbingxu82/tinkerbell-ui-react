---
group:
  title: 表单
  order: 2
nav:
  title: Components
  path: /components
---

# Form 表单

具有校验和提交功能的表单。

## 行内表单

行内表单用法。

<code src="./codes/line.tsx"></code>

## 对齐方式

根据具体目标和制约因素，选择最佳的标签对齐方式。

<code src="./codes/position.tsx"></code>

## 表单验证

在防止用户犯错的前提下，尽可能让用户更早地发现并纠正错误。

<code src="./codes/complete.tsx"></code>

## 自定义校验规则

这个例子中展示了如何使用自定义验证规则来完成密码的二次验证

<code src="./codes/custom.tsx"></code>

### Form Attributes

| 参数          | 说明                                                                    | 类型    | 可选值         | 默认值 |
| ------------- | ----------------------------------------------------------------------- | ------- | -------------- | ------ |
| model         | 表单数据对象                                                            | object  | —              | —      |
| rules         | 表单验证规则                                                            | object  | —              | —      |
| inline        | 行内表单模式                                                            | boolean | —              | false  |
| labelPosition | 表单域标签的位置                                                        | string  | right/left/top | right  |
| labelWidth    | 表单域标签的宽度，所有的 form-item 都会继承 form 组件的 labelWidth 的值 | string  | —              | —      |
| labelSuffix   | 表单域标签的后缀                                                        | string  | —              | —      |

### Form Methods

| 方法名                  | 说明                                                   |
| ----------------------- | ------------------------------------------------------ |
| validate(cb)            | 对整个表单进行校验的方法                               |
| validateField(prop, cb) | 对部分表单字段进行校验的方法                           |
| resetFields             | 对整个表单进行重置，将所有字段值重置为空并移除校验结果 |

### Form-Item Attributes

| 参数       | 说明                                         | 类型   | 可选值                            | 默认值 |
| ---------- | -------------------------------------------- | ------ | --------------------------------- | ------ |
| prop       | 表单域 model 字段                            | string | 传入 Form 组件的 `model` 中的字段 | —      |
| label      | 标签文本                                     | string | —                                 | —      |
| labelWidth | 表单域标签的的宽度，例如 '50px'              | string | —                                 | —      |
| required   | 是否必填，如不设置，则会根据校验规则自动生成 | bolean | —                                 | false  |
