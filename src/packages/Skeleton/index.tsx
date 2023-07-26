// eslint-disable-next-line
import React from 'react'
import SkeletonItem from './item'
import { useThrottleRender } from './useThrottleRender'
import './index.scss'

const classnames = require('classnames')

function Skeleton(props: any) {
  const uiLoading = useThrottleRender(props.loading, props.throttle)

  return (
    <>
      {uiLoading && (
        <div
          style={props.style}
          className={['tb-skeleton', props.animation ? 'is-animated' : ''].join(
            ' '
          )}
        >
          {Array(props.count)
            .fill('')
            .map((k, i) => {
              console.log(k)
              return props.template ? (
                props.template
              ) : (
                <>
                  <SkeletonItem
                    key={'count' + i}
                    className='is-first'
                    variant='p'
                  />
                  {Array(props.rows)
                    .fill('')
                    .map((item: any, index) => {
                      console.log(item, index, index + 1, props.rows)
                      return (
                        <SkeletonItem
                          key={'row' + index}
                          className={classnames({
                            'tb-skeleton__paragraph': true,
                            'is-last':
                              index + 1 === props.rows && props.rows > 1
                          })}
                          variant='p'
                        />
                      )
                    })}
                </>
              )
            })}
        </div>
      )}
      {!uiLoading && props.children}
    </>
  )
}
Skeleton.defaultProps = {
  animation: false,
  count: 1,
  rows: 3,
  loading: true
}
export default Skeleton
