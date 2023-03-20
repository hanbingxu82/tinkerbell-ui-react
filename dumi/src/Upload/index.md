---
group:
  title: 表单
  order: 2
nav:
  title: Components
  path: /components
---

# Upload 上传

文件选择上传按钮，实现简单的上传封装

## 基础用法

最基本用法，点击上传，一次选择一个文件。

```tsx
import { Upload, Button } from 'tinkerbell-ui-react'
import React, { useState } from 'react'

const App: React.FC = () => (
  <>
    <Upload action='//jsonplaceholder.typicode.com/posts/'>
      <Button transparent icon='icon-upload' type='primary'>
        点击上传
      </Button>
    </Upload>
  </>
)

export default App
```

## 多选

可以开启多选模式来一次选择多个

```tsx
import { Upload, Button } from 'tinkerbell-ui-react'
import React, { useState } from 'react'

const App: React.FC = () => (
  <>
    <Upload action='//jsonplaceholder.typicode.com/posts/' multiple>
      <Button transparent icon='icon-upload' type='primary'>
        多选上传
      </Button>
    </Upload>
  </>
)

export default App
```

## 手动上传

绑定 before-upload，并返回 false，可以阻止默认上传流程，手动控制文件上传。

```tsx
import { Upload, Button, Message } from 'tinkerbell-ui-react'
import React, { useState } from 'react'

const [file, setFile] = useState(null)
const [loadingStatus, setLoadingStatus] = useState(false)

const handleUpload = (file) => {
  setFile(file)
  return false
}
const upload = () => {
  console
  setLoadingStatus(true)
  setTimeout(() => {
    setFile(null)
    setLoadingStatus(false)
    Message({
      message: '上传成功！',
      type: 'success'
    })
  }, 1500)
}
const App: React.FC = () => (
  <>
    <div style={{ width: 400 }}>
      <Upload
        action='//jsonplaceholder.typicode.com/posts/'
        beforeUpload={handleUpload}
      ></Upload>
      {file !== null && (
        <div>
          Upload file: {file.name}
          <Button type='text' onClick={upload} loading={loadingStatus}>
            {loadingStatus ? 'Uploading' : 'Click to upload'}
          </Button>
        </div>
      )}
    </div>
  </>
)

export default App
```

## 拖拽上传

设置属性 type 为 drag，可以拖拽上传。

```tsx
import { Upload, Button } from 'tinkerbell-ui-react'
import React, { useState } from 'react'

const App: React.FC = () => (
  <>
    <Upload action='//jsonplaceholder.typicode.com/posts/' multiple type='drag'>
      <div
        style={{
          padding: '20px 0',
          border: '1px dashed #eee',
          cursor: 'pointer'
        }}
      >
        <p style={{ textAlign: 'center' }}>
          <i
            className='iconfont icon-upload'
            style={{ color: '#3399ff', fontSize: 52 }}
          ></i>
        </p>
        <p style={{ textAlign: 'center' }}>
          Click or drag files here to upload
        </p>
      </div>
    </Upload>
  </>
)

export default App
```

### Upload props

| 参数            | 说明                                                                                                                                           | 类型        | 可选值                           | 默认值 |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | -------------------------------- | ------ |
| action          | 上传的地址，必填                                                                                                                               | string      | -                                | -      |
| headers         | 上传的请求头                                                                                                                                   | Object      | —                                | {}     |
| multiple        | 是否支持多选                                                                                                                                   | boolean     | —                                | false  |
| paste           | 是否支持粘贴上传                                                                                                                               | Boolean     | -                                | false  |
| disabled        | 禁用                                                                                                                                           | Boolean     | —                                | false  |
| data            | 上传时附带的额外参数                                                                                                                           | Object      | -                                | -      |
| name            | 上传的文件字段名                                                                                                                               | String      | -                                | file   |
| withCredentials | 支持发送 cookie 凭证信息                                                                                                                       | Boolean     | —                                | false  |
| showUploadList  | 是否显示已上传文件列表                                                                                                                         | Boolean     | —                                | true   |
| type            | 上传控件的类型                                                                                                                                 | string      | select（选择），drag（支持拖拽） | select |
| accept          | 接受上传的文件类型,input 标签原生的 accept 属性，会在选择文件时过滤                                                                            | string      | —                                | -      |
| format          | 支持的文件类型，与 accept 不同的是，format 是识别文件的后缀名                                                                                  | string      | —                                | -      |
| maxSize         | 文件大小限制，单位 kb                                                                                                                          | Number      | —                                | -      |
| beforeUpload    | 上传文件之前的钩子，参数为上传的文件,若返回 false 或者 Promise 则停止上传                                                                      | Function    | —                                | -      |
| onProgress      | 文件上传时的钩子，返回字段为 event, file, fileList                                                                                             | Function    | —                                | -      |
| onSuccess       | 文件上传成功时的钩子，返回字段为 response, file, fileList                                                                                      | Function    | —                                | -      |
| onError         | 文件上传失败时的钩子，返回字段为 error, file, fileList                                                                                         | Function    | —                                | -      |
| onPreview       | 点击已上传的文件链接时的钩子，返回字段为 file， 可以通过 file.response 拿到服务端返回数据                                                      | Function    | —                                | -      |
| onRemove        | 文件列表移除文件时的钩子，返回字段为 file, fileList                                                                                            | Function    | —                                | -      |
| onFormatError   | 文件格式验证失败时的钩子，返回字段为 file, fileList                                                                                            | Function    | —                                | -      |
| onExceededSize  | 文件超出指定大小限制时的钩子，返回字段为 file, fileList                                                                                        | Function    | —                                | -      |
| defaultFileList | 默认已上传的文件列表，例如：[{name: 'img1.jpg',url: 'http://www.xxx.com/img1.jpg' }, { name: 'img2.jpg', url: 'http://www.xxx.com/img2.jpg' }] | Array       | —                                | []     |
| tip             | 辅助的提示消息，如：单个文件不能超过 2M                                                                                                        | Node/String | -                                | -      |

### Upload events

| 事件名     | 说明             | 返回值 |
| ---------- | ---------------- | ------ |
| clearFiles | 清空已上传的列表 | -      |
