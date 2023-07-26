import { useRef, useEffect } from 'react'

export const useThrottleRender = (loading: any, throttle = 0) => {
  const throttled = useRef(false)
  let timeoutHandle = 0

  const dispatchThrottling = () => {
    if (timeoutHandle) {
      clearTimeout(timeoutHandle)
    }
    timeoutHandle = window.setTimeout(() => {
      throttled.current = loading
    }, throttle)
  }

  useEffect(() => {
    dispatchThrottling()
  }, [])

  useEffect(() => {
    if (loading) {
      dispatchThrottling()
    } else {
      throttled.current = loading
    }
  }, [loading])
  console.log(loading, 333)
  if (throttle === 0) return loading

  return throttled
}
