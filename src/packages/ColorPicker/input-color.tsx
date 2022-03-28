/*
 * @Author: your name
 * @Date: 2022-02-28 16:14:26
 * @LastEditTime: 2022-03-28 17:04:04
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/ColorPicker/input-color.tsx
 */
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { useState, useEffect } from 'react'
import Popover from '@xkit/popover'
import ColorPicker from './color-picker'
import { parseColor } from './utils'

function InputColor({
  initialValue,
  onChange,
  placement,
  disabled,
  ...props
}: any) {
  const [color, setColor] = useState(parseColor(initialValue))

  useEffect(() => {
    changeColor(parseColor(initialValue))
  }, [initialValue])// eslint-disable-line 

  function changeColor(color: any) {
    if (onChange) {
      setColor(color)
      onChange(color)
    }
  }

  return (
    <Popover
      placement={placement}
      body={
        <ColorPicker color={color} onChange={changeColor} disabled={disabled} />
      }
    >
      <span
        {...props}
        css={css`
          position: relative;
          display: inline-block;
          box-sizing: border-box;
          width: 49px;
          height: 24px;
          padding: 4px;
          background-color: #ffffff;
          border: 1px solid #bebebe;
          border-radius: 3px;
          user-select: none;
        `}
      >
        <span
          css={css`
            display: block;
            width: 100%;
            height: 100%;
            cursor: pointer;
          `}
          style={{ backgroundColor: color.rgba }}
        />
      </span>
    </Popover>
  )
}

InputColor.defaultProps = {
  placement: 'bottom',
  disabled: false
}

export default InputColor
