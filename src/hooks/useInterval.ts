import { useEffect, useRef } from 'react'

const useInterval = (callback: () => void) => {
  const cachedCallback = useRef<() => void>(callback)

  useEffect(() => {
    const timerId = setInterval(() => cachedCallback.current(), 1000)
    return () => clearInterval(timerId)
  }, [])
}

export default useInterval
