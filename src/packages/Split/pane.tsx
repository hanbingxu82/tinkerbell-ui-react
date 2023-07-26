import React from 'react'
import './index.scss'

function Pane(props: any) {
  return (
    <div
      style={props.style}
      className={[props.split, props.className].join(' ')}
    >
      {props.children}
    </div>
  )
}

export default Pane
