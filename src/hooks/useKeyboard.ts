import { useState, useEffect, useCallback } from 'react'
import { IKeyboardState } from '../types/keyboard.types'

export const useKeyboard = (onKeyPress: (letter: string) => void) => {
  const [state, setState] = useState<IKeyboardState>({
    windowWidth: 0,
    windowHeight: 0,
    showKeyboard: true
  })

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const key = event.key.toUpperCase()
    if (/^[A-Z]$/.test(key)) {
      onKeyPress(key)
    }
  }, [onKeyPress])

  const updateWindowDimensions = useCallback(() => {
    setState(prev => ({
      ...prev,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    }))
  }, [])

  const toggleKeyboard = useCallback(() => {
    setState(prev => ({
      ...prev,
      showKeyboard: !prev.showKeyboard
    }))
  }, [])

  useEffect(() => {
    if (process.env.TARO_ENV === 'h5') {
      document.addEventListener('keydown', handleKeyDown)
      window.addEventListener('resize', updateWindowDimensions)
      updateWindowDimensions()

      return () => {
        document.removeEventListener('keydown', handleKeyDown)
        window.removeEventListener('resize', updateWindowDimensions)
      }
    }
  }, [handleKeyDown, updateWindowDimensions])

  return {
    state,
    toggleKeyboard
  }
} 