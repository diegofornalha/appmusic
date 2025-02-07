import { View, Text, Input } from '@tarojs/components'
import { useState } from 'react'
import { IQuestion } from '../../types/game.types'
import { getGameMessages } from '../../utils/messages'
import { formatTime } from '../../utils/gameHelpers'
import Hangman from '../Hangman'
import Keyboard from '../Keyboard'
import LettersHistory from '../LettersHistory'

interface IGameStatusProps {
  currentQuestion: IQuestion
  currentIndex: number
  totalQuestions: number
  correctCount: number
  showTranslation: boolean
  maskedWord: string
  isGameOver: boolean
  countdown: number
  answer?: string
  wrongGuesses: number
  onKeyPress: (letter: string) => void
  guessedLetters: Set<string>
  disabled: boolean
  showKeyboard: boolean
}

const GameStatus: React.FC<IGameStatusProps> = ({
  currentQuestion,
  currentIndex,
  totalQuestions,
  correctCount,
  showTranslation,
  maskedWord,
  isGameOver,
  countdown,
  answer,
  wrongGuesses,
  onKeyPress,
  guessedLetters,
  disabled,
  showKeyboard
}) => {
  const [inputValue, setInputValue] = useState('')

  return (
    <View className='game-container'>
      <View className='score-container'>
        <Text className='progress-text'>
          Questão {currentIndex + 1} de {totalQuestions}
        </Text>
        <Text className='score-text'>
          Pontuação: {correctCount}/{totalQuestions}
        </Text>
      </View>

      <View className='game-content'>
        <View className='question-section'>
          <Text className='question-text'>{currentQuestion.question}</Text>
          <Hangman wrongGuesses={wrongGuesses} />
          {showTranslation && (
            <Text className='translation-text'>
              Tradução: {currentQuestion.translation}
            </Text>
          )}
          <Text className='word-display'>{maskedWord}</Text>
          {isGameOver && (
            <View className='game-over-section'>
              <Text className='answer-text'>
                A resposta era: {answer}
              </Text>
              <Text className='countdown-text'>
                {getGameMessages.nextQuestion} {formatTime(countdown)}...
              </Text>
            </View>
          )}
        </View>

        {(process.env.TARO_ENV === 'h5' || showKeyboard) && (
          <Keyboard
            onKeyPress={onKeyPress}
            guessedLetters={guessedLetters}
            currentAnswer={currentQuestion.answer}
            disabled={disabled}
            showKeyboard={showKeyboard}
          />
        )}

        {process.env.TARO_ENV === 'weapp' && !showKeyboard && (
          <View className='input-container'>
            <Input
              type='text'
              className='letter-input'
              value={inputValue}
              onInput={(e) => {
                const input = e.detail.value.toUpperCase()
                // Processa cada letra da entrada
                input.split('').forEach(letter => {
                  if (/^[A-Z]$/.test(letter) && !guessedLetters.has(letter)) {
                    onKeyPress(letter)
                  }
                })
                // Limpa o input
                setInputValue('')
              }}
              placeholder={getGameMessages.typeLetter}
            />
            <LettersHistory
              guessedLetters={guessedLetters}
              currentAnswer={currentQuestion.answer}
            />
          </View>
        )}
      </View>
    </View>
  )
}

export default GameStatus 