/*
 * @Author: your name
 * @Date: 2022-03-31 09:44:58
 * @LastEditTime: 2022-06-10 17:36:45
 * @LastEditors: 韩旭小天才 905583741@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/Upload/UploadList.tsx
 */
// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import Progress from '../Progress'
import Animate from 'rc-animate'
const classnames = require('classnames')

function UploadList(props: any) {
  const { files = [] } = props
  // 声明一个名为“count”的新状态变量
  const [prefixCls] = useState('tb-upload')
  useEffect(() => {
    // 使用浏览器API更新文档标题
    document.title = `You clicked count times`
  }, [])

  function fileCls(file: { status: string }) {
    // 对应已完成的是一个新增的file-finish  其他的就是普通状态
    return [
      `${prefixCls}-list-file`,
      classnames({
        [`${prefixCls}-list-file-finish`]: file.status === 'finished'
      })
    ].join(' ')
  }
  // 此处可以不使，将其区分为两个  handlePreview、handleRemove
  function handleClick(file: any) {
    props.fileClick && props.fileClick(file)
  }
  // 单击li标签时触发的事件
  function handlePreview(file: any) {
    props.filePreview && props.filePreview(file)
  }
  // 单击删除时触发的事件
  function handleRemove(file: any) {
    props.fileRemove && props.fileRemove(file)
  }
  function format(file: any) {
    // 根据文件名称来判断分类  如果是属于对应的后缀名  对应的icon展示图标就变更
    const format = file.name.split('.').pop().toLocaleLowerCase() || ''
    let type = 'icon-file'

    if (['gif', 'jpg', 'jpeg', 'png', 'bmp', 'webp'].indexOf(format) > -1) {
      type = 'icon-image-text'
    }
    if (
      ['mp4', 'm3u8', 'rmvb', 'avi', 'swf', '3gp', 'mkv', 'flv'].indexOf(
        format
      ) > -1
    ) {
      type = 'icon-film'
    }
    if (['mp3', 'wav', 'wma', 'ogg', 'aac', 'flac'].indexOf(format) > -1) {
      type = 'icon-mic'
    }
    if (['doc', 'txt', 'docx', 'pages', 'epub', 'pdf'].indexOf(format) > -1) {
      type = 'icon-file'
    }
    if (['numbers', 'csv', 'xls', 'xlsx'].indexOf(format) > -1) {
      type = 'icon-file-common'
    }
    if (['keynote', 'ppt', 'pptx'].indexOf(format) > -1) {
      type = 'icon-history'
    }

    return type
  }
  function parsePercentage(val: string) {
    console.log(val)
    // 使用10进制去解析数值
    return parseInt(val, 10)
  }

  return (
    <ul className='tb-upload-list'>
      {files.map((file: any, index: number) => {
        return (
          <li
            key={index}
            className={fileCls(file)}
            onClick={() => {
              handleClick(file)
            }}
          >
            <span
              onClick={() => {
                handlePreview(file)
              }}
            >
              <i className={`iconfont ${format(file)}`}></i> {file.name}{' '}
            </span>
            {file.status === 'finished' ? (
              <i
                className='iconfont icon-close tb-upload-list-remove'
                onClick={() => {
                  handleRemove(file)
                }}
              ></i>
            ) : null}
            <Animate name='fade-progress' component=''>
              {file.showProgress ? (
                <Progress
                  lineHeight={2}
                  status={
                    file.status === 'finished' && file.showProgress
                      ? 'success'
                      : null
                  }
                  percent={parsePercentage(file.percentage)}
                ></Progress>
              ) : null}
            </Animate>
          </li>
        )
      })}
    </ul>
  )
}
export default UploadList
