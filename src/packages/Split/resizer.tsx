import React from 'react'
import './index.scss'

function Resizer(props: any) {
  return (
    <div
      style={props.style}
      className={[
        'tb-splitter-pane-resizer',
        props.split,
        props.className
      ].join(' ')}
      onDoubleClick={props.onDoubleClick}
      onMouseDown={props.onMouseDown}
    >
      {props.children}
    </div>
  )
}

export default Resizer
