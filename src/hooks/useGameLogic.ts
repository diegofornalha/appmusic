import { useState, useCallback, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { IGameState, GameStatus } from '../types/game.types'
import { QUESTIONS, MAX_WRONG_GUESSES, COUNTDOWN_TIME, CONFETTI_DURATION } from '../constants/questions'
import { getFinalMessage } from '../utils/messages'

export const useGameLogic = () => {
  const [state, setState] = useState<IGameState>({
    currentQuestionIndex: 0,
    guessedLetters: new Set(),
    wrongGuesses: 0,
    showTranslation: false,
    correctCount: 0,
    gameStatus: 'playing',
    countdown: COUNTDOWN_TIME,
    showConfetti: false
  })

  const [countdownTimer, setCountdownTimer] = useState<NodeJS.Timeout | null>(null)

  const startCountdown = useCallback(() => {
    setState(prev => ({ ...prev, countdown: COUNTDOWN_TIME }))
    
    const timer = setInterval(() => {
      setState(prev => {
        const newCount = prev.countdown - 1
        
        if (newCount <= 0) {
          clearInterval(timer)
          if (prev.gameStatus === 'finished') {
            restartGame()
          } else {
            nextQuestion()
          }
          return { ...prev, countdown: COUNTDOWN_TIME }
        }
        
        return { ...prev, countdown: newCount }
      })
    }, 1000)

    setCountdownTimer(timer)
  }, [])

  const handleGuess = useCallback((letter: string) => {
    if (state.gameStatus !== "playing") return

    const answer = QUESTIONS[state.currentQuestionIndex].answer
    const newGuessedLetters = new Set(state.guessedLetters)
    newGuessedLetters.add(letter)

    if (!answer.includes(letter)) {
      const newWrongGuesses = state.wrongGuesses + 1
      const newGameStatus = newWrongGuesses >= MAX_WRONG_GUESSES ? 'lost' as GameStatus : 'playing'
      
      setState(prev => ({
        ...prev,
        guessedLetters: newGuessedLetters,
        wrongGuesses: newWrongGuesses,
        gameStatus: newGameStatus
      }))

      if (newGameStatus === 'lost') {
        Taro.showToast({
          title: 'Não foi dessa vez...',
          icon: 'none',
          duration: 2000
        })
        startCountdown()
      }
    } else {
      const newMaskedWord = answer
        .split("")
        .map((l) => (l === " " ? " " : newGuessedLetters.has(l) ? l : "_"))
        .join("")

      const won = !newMaskedWord.includes("_")
      
      setState(prev => ({
        ...prev,
        guessedLetters: newGuessedLetters,
        showTranslation: won,
        gameStatus: won ? 'won' : 'playing',
        correctCount: won ? prev.correctCount + 1 : prev.correctCount,
        showConfetti: won
      }))

      if (won) {
        Taro.showToast({
          title: 'Muito bem!',
          icon: 'success',
          duration: 2000
        })

        setTimeout(() => {
          setState(prev => ({ ...prev, showConfetti: false }))
        }, CONFETTI_DURATION)

        setTimeout(() => {
          if (state.currentQuestionIndex === QUESTIONS.length - 1) {
            setState(prev => ({ 
              ...prev,
              gameStatus: 'finished',
              showConfetti: true
            }))
            startCountdown()
          } else {
            nextQuestion()
          }
        }, CONFETTI_DURATION)
      }
    }
  }, [state.currentQuestionIndex, state.guessedLetters, state.wrongGuesses, state.correctCount])

  const nextQuestion = useCallback(() => {
    const nextIndex = state.currentQuestionIndex + 1
    
    if (nextIndex >= QUESTIONS.length) {
      setState(prev => ({
        ...prev,
        gameStatus: 'finished'
      }))
      return
    }
    
    setState(prev => ({
      ...prev,
      currentQuestionIndex: nextIndex,
      guessedLetters: new Set(),
      wrongGuesses: 0,
      showTranslation: false,
      gameStatus: 'playing'
    }))
  }, [state.currentQuestionIndex])

  const restartGame = useCallback(() => {
    if (countdownTimer) {
      clearInterval(countdownTimer)
      setCountdownTimer(null)
    }
    
    setState({
      currentQuestionIndex: 0,
      guessedLetters: new Set(),
      wrongGuesses: 0,
      showTranslation: false,
      correctCount: 0,
      gameStatus: 'playing',
      countdown: COUNTDOWN_TIME,
      showConfetti: false
    })
  }, [countdownTimer])

  const getMaskedWord = useCallback(() => {
    const answer = QUESTIONS[state.currentQuestionIndex].answer
    return answer
      .split("")
      .map((letter) => (letter === " " ? " " : state.guessedLetters.has(letter) ? letter : "_"))
      .join(" ")
  }, [state.currentQuestionIndex, state.guessedLetters])

  useEffect(() => {
    return () => {
      if (countdownTimer) {
        clearInterval(countdownTimer)
      }
    }
  }, [countdownTimer])

  return {
    state,
    handleGuess,
    restartGame,
    getMaskedWord,
    getFinalMessage: () => getFinalMessage(state.correctCount, QUESTIONS.length)
  }
} 