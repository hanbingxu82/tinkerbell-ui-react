/*
 * @Author: your name
 * @Date: 2022-03-31 09:44:49
 * @LastEditTime: 2022-03-31 15:16:09
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/Upload/Upload.tsx
 */
import React, { useState, useEffect, useRef, useCallback } from 'react'
import Button from '../Button'
import UploadList from './UploadList'
import ajax from './ajax'
import './Upload.scss'

const classnames = require('classnames')
// const PropTypes = require('prop-types')

interface Iprops {
  action: string
  headers: object
  multiple: boolean
  data: any
  name: string
  withCredentials: boolean
  showFileList: true
  type: string
  format: string[]
  accept: string
  maxSize: number
  beforeUpload: void | boolean | Promise<any> | any
  onProgress: any
  onSuccess: any
  onError: any
  onRemove: any
  onPreview: any
  onExceededSize: any
  onFormatError: any
  defaultFileList: any
  disabled: boolean
}
const Upload = (props: any) => {
  const {
    action,
    headers = {},
    multiple = false,
    data,
    name = 'file',
    withCredentials = false,
    showFileList = true,
    type = 'select',
    format = [],
    accept,
    maxSize,
    beforeUpload,
    onProgress = () => {},
    onSuccess = () => {},
    onError = () => {},
    onRemove = () => {},
    onPreview = () => {},
    onExceededSize = () => {},
    onFormatError = () => {},
    defaultFileList = [],
    disabled = false
  }: Iprops = props
  // 强制更新视图方法 start
  const [, updateState] = useState<any>()
  const forceUpdate = useCallback(() => updateState({}), [])
  // 强制更新视图方法 end
  const [prefixCls] = useState('tb-upload')
  //   const [dragOver, setDragOver] = useState(false)
  //   const [, setFileList] = useState<any>([])
  //   const [tempIndex, setTempIndex] = useState(1)
  const dragOver = useRef<any>(false)
  const fileListRef = useRef<any>([])
  const tempIndex = useRef<number>(1)
  const inputRef = useRef<HTMLInputElement>(null)
  // 类似于 componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    if (defaultFileList) {
      // 如果传递了  那么根据map  首次状态一定就会是成功的  包括进度percentage也会是100   uid同样会给与初始值，这样就会展示在页面上
      const fileListArr = defaultFileList.map((item: any) => {
        item.status = 'finished'
        item.percentage = 100
        item.uid = Date.now() + tempIndex.current++
        return item
      })
      fileListRef.current = fileListArr
      //   setFileList(fileListArr)
    }
  }, [])

  // 点击上传部分触发上传勾选文件事件
  function handleClick() {
    if (disabled) return
    inputRef.current && inputRef.current.click()
  }
  // 选取完文件时触发的事件  这个时候
  function handleChange(e: any) {
    const files = e.target ? e.target.files : ''
    if (!files) {
      return
    }
    // 判断获取选取的文件然后触发上传事件
    uploadFiles(files)
    // 将所选择的file也就是值置空  以便重新选择
    inputRef.current && (inputRef.current.value = '')
  }
  // 当文件拖入进来的时候执行   拖入进去之后dragOver就变为了false  以便控制样式
  function onDrop(e: any) {
    e.preventDefault()
    dragOver.current = false
    // 如果是禁用那就不要继续向下执行了
    if (disabled) return
    // 如果不是禁用的话  可以获取到当前拖入的文件们 DataTransfer.files 获取的就是拖入进来的文件列表们  对应的也触发上传事件
    uploadFiles(e.dataTransfer.files)
  }
  // 上传文件事件
  function uploadFiles(files: any) {
    // 参数为文件列表  Array.prototype.slice.call  浅拷贝
    let postFiles = Array.prototype.slice.call(files)
    // 如果不是多选的话那就只取第一项
    if (!multiple) postFiles = postFiles.slice(0, 1)

    // 如果没有文件的话那就return停止运行
    if (postFiles.length === 0) return

    // 此处如果是多文件的话就循环遍历调用上传接口，单文件因为返还的是一个对象所以只会执行单次
    postFiles.forEach((file) => {
      upload(file)
    })
  }
  // 上传接口
  function upload(file: any): any {
    // 如果没有传递 beforeUpload 上传之前的钩子的话那么就可以直接执行 post 调用上传接口了
    if (!beforeUpload) {
      return post(file)
    }
    // 当然如果有 beforeUpload 的话那么就执行上传之前触发的事件，也就是触发上传之前的回调
    const before = beforeUpload(file)
    // 如果return的是一个promise 那么对应的 会触发他的.then事件  然后走上传，其实就是相当于手动手写一个ajax
    if (before && before.then) {
      // 如果.then 传递的是一个resolve（file）文件的话就会触发if事件，将传入的文件放进请求当中
      before.then(
        (processedFile: any) => {
          if (
            Object.prototype.toString.call(processedFile) === '[object File]'
          ) {
            post(processedFile)
          } else {
            post(file)
          }
        },
        () => {
          // 出错捕获
          // $emit('cancel', file);
        }
      )
    } else if (before !== false) {
      // 如果before里面没有返还 false 的话那么就可以走上传了
      post(file)
    } else {
      // 此处停止上传
      // $emit('cancel', file);
    }
  }
  // 上传接口
  function post(file: any): any {
    // 上传文件 校验 传递的是一个数组
    if (format.length) {
      // 拆分文件
      const fileFormat = file.name.split('.').pop().toLocaleLowerCase()
      // 用于判断传输的后缀  是否存在于format列表当中
      const checked = format.some(
        (item: string) => item.toLocaleLowerCase() === fileFormat
      )
      // 如果不存在那就报错,触发文件格式验证失败时的钩子
      if (!checked) {
        onFormatError(file, fileListRef.current)
        return false
      }
    }

    // 判断传输大小
    if (maxSize) {
      // 获取当前上传文件的大小，与之我们传入的maxSize进行对比  如果大于我们传入的最大值 那么就会触发文件超出指定大小限制时的钩子，返回字段为 file, fileList
      if (file.size > maxSize * 1024) {
        onExceededSize(file, fileListRef.current)
        return false
      }
    }
    // 如果正确的话  那么这个时候就可以传递进入fileList列表中了   开始走 tb-upload-list 组件流程
    handleStart(file)

    // 构建表单文件  后期可改造为  单次上传多个file文件
    // let formData = new FormData();
    // formData.append(name, file);

    /**
     * @description: 调用ajax上传接口  以此上传我们的文件
     * @param {*}
     * @return {*}
     */
    ajax({
      headers: headers, // 自定义的请求头
      withCredentials: withCredentials, // 当前请求为跨域类型时是否在请求中协带cookie
      file: file, // 文件
      data: data, //附带参数
      filename: name, // 上传文件的key值
      action: action, // 上传地址
      // 上传时的钩子
      onProgress: (e) => {
        forceUpdate()
        handleProgress(e, file)
        forceUpdate()
      },
      // 上传成功的钩子
      onSuccess: (res) => {
        forceUpdate()
        handleSuccess(res, file)
        forceUpdate()
      },
      // 上传失败触发的钩子
      onError: (err, response) => {
        forceUpdate()
        handleError(err, response, file)
        forceUpdate()
      }
    })
  }
  // 上传初始化，塞入到对应的fileList当中
  function handleStart(file: any) {
    file.uid = Date.now() + tempIndex.current++
    const _file = {
      status: 'uploading', // 上传加载中
      name: file.name,
      size: file.size,
      percentage: 0,
      uid: file.uid,
      showProgress: true
    }
    fileListRef.current = [...fileListRef.current, _file]
    // setFileList(fileListRef.current)
  }
  function getFile(file: any) {
    const fileListArr = fileListRef.current
    let target
    // 判断数组所有项返还的是不是true，找到当前上传文件对应的fileList对应的上传文件
    fileListArr.every((item: any) => {
      target = file.uid === item.uid ? item : null
      return !target
    })
    return target
  }
  /**
   * @description: 文件上传时触发事件
   * @param {*} e
   * @param {*} file
   * @return {*}
   */
  function handleProgress(e: any, file: any) {
    const _file: any = getFile(file)
    // 触发文件上传时的钩子，将我们在fileList中对应的那个file塞给this.onProgress上传时钩子
    onProgress(e, _file, fileListRef.current)
    // 将上传得值实时传递给子组件  也就是对应上传的那个值  如果没有就判定为0 其实就相当于失败了
    _file.percentage = e.percent || 0
    // setFileList(fileListRef.current)
  }
  function handleSuccess(res: any, file: any) {
    // 寻找对应的fileList中的file对应上传的那个文件
    const _file: any = getFile(file)

    // 如果有这个文件说明是通过了上传校验的
    if (_file) {
      // 文件上传状态变更为finished完成
      _file.status = 'finished'
      // 在文件上传成功之后，文件当中也塞入对应的上传回调
      _file.response = res
      onSuccess(res, _file, fileListRef.current)
      // 触发向上查找，form-change事件  此处可以暂时屏蔽
      //   this.dispatch('tbFormItem', 'form-change', _file)
      setTimeout(() => {
        // 上传成功500ms之后对应的上传进度条就不要在展示了
        _file.showProgress = false
        forceUpdate()
      }, 500)
    }
  }
  function handleError(err: any, response: any, file: any) {
    // 获取到指定的file
    const _file: any = getFile(file)
    const fileListArr = fileListRef.current
    // 更改上传文件为失败文件
    _file.status = 'fail'
    // 删除这个文件
    fileListArr.splice(fileListArr.indexOf(_file), 1)
    // setFileList(fileListRef.current)
    // 触发上传失败的钩子
    onError(err, response, file)
  }

  // fileList 点击x号删除时触发的事件
  function handleRemove(file: any) {
    const fileListArr = fileListRef.current
    fileListArr.splice(fileListArr.indexOf(file), 1)
    forceUpdate()
    // setFileList(fileListRef.current)
    // 触发文件移除列表时事件
    onRemove(file, fileListArr)
  }
  // 点击 fileList 单项触发的事件
  function handlePreview(file: any) {
    // 如果状态是已完成
    if (file.status === 'finished') {
      // 触发点击fileList单项 单击事件
      onPreview(file)
    }
  }
  // 移除fileList列表事件   使用父组件  $refs['upload(ref值)'].clearFiles()  就会移除所有的file文件
  //   function clearFiles() {
  //     // fileList = []
  //     setFileList([])
  //   }

  return (
    <div className={prefixCls}>
      <div
        className={[
          `${prefixCls}`,
          classnames({
            [`${prefixCls}-select`]: type === 'select',
            [`${prefixCls}-drag`]: type === 'drag',
            [`${prefixCls}-dragOver`]: type === 'drag' && dragOver
          })
        ].join(' ')}
        onClick={handleClick}
        onDrop={onDrop}
        onDragOver={(e: any) => {
          e.preventDefault()
          dragOver.current = true
        }}
        onDragLeave={(e: any) => {
          e.preventDefault()
          dragOver.current = false
        }}
      >
        <input
          ref={inputRef}
          type='file'
          className={`${prefixCls}-input`}
          onChange={handleChange}
          multiple={multiple}
          accept={accept}
        />
        {props.children || <Button icon='icon-upload'> 点击上传</Button>}
      </div>
      {/* <slot name='tip'></slot> */}
      {props.tip}
      {showFileList ? (
        <UploadList
          files={fileListRef.current}
          fileRemove={handleRemove}
          filePreview={handlePreview}
        ></UploadList>
      ) : null}
    </div>
  )
}
export default Upload
