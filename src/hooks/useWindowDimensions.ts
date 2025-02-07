import { useState, useEffect, useCallback } from 'react'

interface WindowDimensions {
  width: number
  height: number
}

export const useWindowDimensions = (): WindowDimensions => {
  const [dimensions, setDimensions] = useState<WindowDimensions>({
    width: 0,
    height: 0
  })

  const updateDimensions = useCallback(() => {
    if (process.env.TARO_ENV === 'h5') {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
  }, [])

  useEffect(() => {
    if (process.env.TARO_ENV === 'h5') {
      updateDimensions()
      window.addEventListener('resize', updateDimensions)

      return () => {
        window.removeEventListener('resize', updateDimensions)
      }
    }
  }, [updateDimensions])

  return dimensions
} 