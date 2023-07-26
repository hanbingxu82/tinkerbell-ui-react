// eslint-disable-next-line
import React from 'react'
import ImgPlaceholder from './img-placeholder'
import './index.scss'

interface Iprops {
  variant: string
}

function Item(props: any) {
  const { variant, ...otherProps }: Iprops = props
  return (
    <div
      {...otherProps}
      // key={props.key}
      className={[
        'tb-skeleton__item',
        props.className,
        `tb-skeleton__${variant}`
      ].join(' ')}
    >
      {variant === 'image' && <ImgPlaceholder />}
    </div>
  )
}
Item.defaultProps = {
  variant: 'text'
}
export default Item
