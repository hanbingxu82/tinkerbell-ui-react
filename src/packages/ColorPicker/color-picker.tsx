/** @jsx jsx */
import { jsx } from '@emotion/core'
import InputSlider from 'react-input-slider'
import InputNumber from 'react-input-number'
import {
  rgb2hsv,
  hsv2hex,
  rgb2hex,
  hex2rgb,
  rgba,
  hsv2rgb
} from '@swiftcarrot/color-fns'
import { rgba2hex } from './utils'

const KEY_ENTER = 13
const styles: any = {
  picker: {
    fontFamily: `'Helvetica Neue',Helvetica,Arial,sans-serif`,
    width: 230,

    '*': {
      userSelect: 'none'
    }
  },

  selector: {
    position: 'relative',
    width: 230,
    height: 230
  },

  gradientWhite: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      'linear-gradient(to right, #ffffff 0%, rgba(255, 255, 255, 0) 100%)'
  },

  gradientDark: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(to bottom, transparent 0%, #000000 100%)'
  },

  inputs: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%'
  },

  input: {
    textAlign: 'center',
    fontSize: 13,
    fontWeight: 'normal',
    color: '#000',

    input: {
      width: 30,
      textAlign: 'center'
    },

    div: {
      marginTop: 4
    }
  }
}
const ColorPicker = ({ color, onChange, disabled }: any) => {
  const { r, g, b, a, h, s, v } = color

  //   (1)HSB模式
  // 这是一种基于人眼视觉的颜色模式。是用色相(H)、饱和度(S)、亮度(B)这3个颜色属性来描述颜色的表色法。
  // 注意，B不是亮度的绝对值而是相对值，即相对亮度，用百分比表示。亮度有0%～100%变化:0%代表黑色；100%代表白色。
  // 简单的说就是各种模式下的着色通道
  function changeColor(color: { r: any; g: any; b: any; a: any }) {
    if (onChange) {
      onChange({
        ...color,
        rgba: rgba(color.r, color.g, color.b, color.a),
        hex: rgba2hex(color.r, color.g, color.b, color.a)
      })
    }
  }

  function changeHSV(h: any, s: any, v: number) {
    const { r, g, b } = hsv2rgb(h, s, v)
    const hex = rgb2hex(r, g, b)
    changeColor({ ...color, h, s, v, r, g, b, hex })
  }

  function changeRGB(r: any, g: any, b: any) {
    const hex = rgb2hex(r, g, b)
    const { h, s, v } = rgb2hsv(r, g, b)

    changeColor({ ...color, r, g, b, h, s, v, hex })
  }

  function changeAlpha(a: any) {
    changeColor({ ...color, a })
  }

  function changeHex(hex: string) {
    const { r, g, b } = hex2rgb(hex)
    const { h, s, v } = rgb2hsv(r, g, b)
    changeColor({ ...color, r, g, b, h, s, v, hex })
  }

  function handleHexKeyUp(e: any) {
    if (e.keyCode === KEY_ENTER) {
      const hex = e.target.value.trim()
      const { r, g, b } = hex2rgb(hex)
      changeColor({ ...color, r, g, b, a, hex })
    }
  }

  function handleClick(e: {
    stopPropagation: () => void
    nativeEvent: { stopImmediatePropagation: () => void }
  }) {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
  }

  const rgbaBackground = rgba(r, g, b, a)
  const rgba0 = rgba(r, g, b, 0)
  const rgba100 = rgba(r, g, b, 100)
  const opacityGradient = `linear-gradient(to right, ${rgba0}, ${rgba100})`
  const hueBackground = hsv2hex(h, 100, 100)

  return (
    <div css={styles.picker} onClick={handleClick}>
      <div css={styles.selector} style={{ backgroundColor: hueBackground }}>
        <div css={styles.gradientWhite} />
        <div css={styles.gradientDark} />
        <InputSlider
          axis='xy'
          x={s}
          xmax={100}
          y={100 - v}
          ymax={100}
          onChange={({ x, y }: any) => changeHSV(h, x, 100 - y)}
          disabled={disabled}
          styles={{
            track: { width: '100%', height: '100%', background: 'none' },
            thumb: {
              width: 12,
              height: 12,
              backgroundColor: 'rgba(0,0,0,0)',
              border: '2px solid #fff',
              borderRadius: '50%'
            }
          }}
        />
      </div>

      <div
        css={{
          width: '100%',
          marginTop: 10,
          marginBottom: 10,
          display: 'flex'
        }}
      >
        <div css={{ flex: 1, marginRight: 10 }}>
          <InputSlider
            axis='x'
            x={h}
            xmax={359}
            onChange={({ x }: any) => changeHSV(x, s, v)}
            disabled={disabled}
            styles={{
              track: {
                width: '100%',
                height: 12,
                borderRadius: 0,
                background:
                  'linear-gradient(to left, #FF0000 0%, #FF0099 10%, #CD00FF 20%, #3200FF 30%, #0066FF 40%, #00FFFD 50%, #00FF66 60%, #35FF00 70%, #CDFF00 80%, #FF9900 90%, #FF0000 100%)'
              },
              active: {
                background: 'none'
              },
              thumb: {
                width: 5,
                height: 14,
                borderRadius: 0,
                backgroundColor: '#eee'
              }
            }}
          />
          <InputSlider
            axis='x'
            x={a}
            xmax={100}
            styles={{
              track: {
                width: '100%',
                height: 12,
                borderRadius: 0,
                background: opacityGradient
              },
              active: {
                background: 'none'
              },
              thumb: {
                width: 5,
                height: 14,
                borderRadius: 0,
                backgroundColor: '#eee'
              }
            }}
            onChange={({ x }: any) => changeAlpha(x)}
            disabled={disabled}
          />
        </div>
        <div
          style={{ backgroundColor: rgbaBackground, width: 30, height: 30 }}
        />
      </div>

      <div css={styles.inputs}>
        <div css={styles.input}>
          <input
            style={{ width: 70, textAlign: 'left' }}
            type='text'
            value={color.hex}
            onChange={(e) => changeHex(e.target.value)}
            onKeyUp={handleHexKeyUp}
            disabled={disabled}
          />
          <div>Hex</div>
        </div>

        <div css={styles.input}>
          <InputNumber
            min={0}
            max={255}
            value={r}
            onChange={(r: any) => changeRGB(r, g, b)}
            disabled={disabled}
          />
          <div>R</div>
        </div>
        <div css={styles.input}>
          <InputNumber
            min={0}
            max={255}
            value={g}
            onChange={(g: any) => changeRGB(r, g, b)}
            disabled={disabled}
          />
          <div>G</div>
        </div>
        <div css={styles.input}>
          <InputNumber
            min={0}
            max={255}
            value={b}
            onChange={(b: any) => changeRGB(r, g, b)}
            disabled={disabled}
          />
          <div>B</div>
        </div>

        <div css={styles.input}>
          <InputNumber
            min={0}
            max={100}
            value={a}
            onChange={(a: any) => changeAlpha(a)}
            disabled={disabled}
          />
          <div>A</div>
        </div>
      </div>
    </div>
  )
}



export default ColorPicker
