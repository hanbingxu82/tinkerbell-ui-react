/*
 * @Author: your name
 * @Date: 2022-03-07 10:09:18
 * @LastEditTime: 2022-03-07 13:55:50
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/Avatar/index.tsx
 */
import React, { useState, useEffect } from 'react'
import './index.scss'

interface Iprops {
  size: number | string
  shape: string
  icon: string
  src: string
  alt: string
  srcSet: string
  error: any
  fit: any
}

function Avatar(props: any) {
  const {
    size,
    shape = 'circle',
    icon,
    src,
    alt,
    srcSet,
    error,
    fit = 'cover'
  }: Iprops = props
  // 声明一个名为“count”的新状态变量
  const [isImageExist, setIsImageExist] = useState<boolean>(true)
  const [avatarClass, setAvatarClass] = useState<string>('')

  useEffect(() => {
    let classList = ['tb-avatar']
    if (size && typeof size === 'string') {
      classList.push(`tb-avatar--${size}`)
    }

    if (icon) {
      classList.push('tb-avatar--icon')
    }

    if (shape) {
      classList.push(`tb-avatar--${shape}`)
    }
    setAvatarClass(classList.join(' '))
  }, [size, icon, shape])
  function handleError() {
    const errorFlag = error ? error() : undefined
    if (errorFlag !== false) {
      setIsImageExist(false)
    }
  }
  function renderAvatar() {
    // const { icon, src, alt, isImageExist, srcSet, fit } = this;
    if (isImageExist && src) {
      return (
        <img
          src={src}
          onError={handleError}
          alt={alt}
          srcSet={srcSet}
          style={{ objectFit: fit }}
        />
      )
    }

    if (icon) {
      return <i className={['iconfont', icon].join(' ')} />
    }

    return props.children
  }
  const sizeStyle =
    typeof size === 'number'||typeof size === 'string'
      ? {
          height: `${size}px`,
          width: `${size}px`,
          lineHeight: `${size}px`
        }
      : {}

  return (
    <span className={avatarClass} style={sizeStyle}>
      {renderAvatar()}
    </span>
  )
}
export default Avatar
