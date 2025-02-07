/// <reference types="@tarojs/taro" />
import React, { useEffect } from 'react'
import { View, Input, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import ReactConfetti from 'react-confetti'
import { APP_CONFIG } from '../../constants/config'
import { QUESTIONS } from '../../constants/questions'
import { KEYBOARD_CONFIG } from '../../constants/keyboard'
import { useGameLogic } from '../../hooks/useGameLogic'
import { useKeyboard } from '../../hooks/useKeyboard'
import Keyboard from '../../components/Keyboard'
import Hangman from '../../components/Hangman'
import GameStatus from '../../components/GameStatus'
import FinalScreen from '../../components/FinalScreen'
import LettersHistory from '../../components/LettersHistory'
import { getGameMessages } from '../../utils/messages'
import '../../styles/index.scss'

const Index: React.FC = () => {
  useEffect(() => {
    Taro.setNavigationBarTitle({
      title: APP_CONFIG.TITLE
    })
  }, [])

  const {
    state,
    handleGuess,
    restartGame,
    getMaskedWord,
    getFinalMessage
  } = useGameLogic()

  const {
    state: keyboardState,
    toggleKeyboard
  } = useKeyboard(handleGuess)

  const {
    currentQuestionIndex,
    guessedLetters,
    wrongGuesses,
    showTranslation,
    correctCount,
    gameStatus,
    countdown,
    showConfetti
  } = state

  const { windowWidth, windowHeight, showKeyboard } = keyboardState

  // Renderiza o confete apenas na versão H5
  const confetti = process.env.TARO_ENV === 'h5' && showConfetti ? (
    <ReactConfetti
      width={windowWidth}
      height={windowHeight}
      recycle={false}
      numberOfPieces={KEYBOARD_CONFIG.CONFETTI_PIECES}
      gravity={KEYBOARD_CONFIG.CONFETTI_GRAVITY}
    />
  ) : null

  if (gameStatus === 'finished' || currentQuestionIndex >= QUESTIONS.length) {
    return (
      <FinalScreen
        message={getFinalMessage()}
        correctCount={correctCount}
        totalQuestions={QUESTIONS.length}
        countdown={countdown}
        onRestart={restartGame}
      />
    )
  }

  const currentQuestion = QUESTIONS[currentQuestionIndex]

  return (
    <View className='game-container'>
      {confetti}
      
      <GameStatus
        currentQuestion={currentQuestion}
        currentIndex={currentQuestionIndex}
        totalQuestions={QUESTIONS.length}
        correctCount={correctCount}
        showTranslation={showTranslation}
        maskedWord={getMaskedWord()}
        isGameOver={gameStatus === 'lost'}
        countdown={countdown}
        answer={currentQuestion.answer}
        wrongGuesses={wrongGuesses}
        onKeyPress={handleGuess}
        guessedLetters={guessedLetters}
        disabled={gameStatus !== 'playing'}
        showKeyboard={showKeyboard}
      />

      <View className='game-content'>
        {process.env.TARO_ENV === 'weapp' && (
          <Button
            className='keyboard-toggle'
            onClick={toggleKeyboard}
          >
            {showKeyboard ? '⌨️' : '📱'}
          </Button>
        )}
      </View>
    </View>
  )
}

export default Index
