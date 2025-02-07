import { View, Button } from '@tarojs/components'
import { IKeyboardProps } from '../../types/keyboard.types'
import { KEYBOARD_LAYOUT } from '../../constants/keyboard'

const Keyboard: React.FC<IKeyboardProps> = ({
  onKeyPress,
  guessedLetters,
  currentAnswer,
  disabled,
  showKeyboard
}) => {
  if (!showKeyboard) return null

  return (
    <View className='keyboard-section'>
      {KEYBOARD_LAYOUT.map((row, rowIndex) => (
        <View key={rowIndex} className='keyboard-row'>
          {row.map((letter) => (
            <Button
              key={letter}
              className={`letter-button ${
                guessedLetters.has(letter)
                  ? currentAnswer.includes(letter)
                    ? 'correct'
                    : 'wrong'
                  : ''
              }`}
              onClick={() => onKeyPress(letter)}
              disabled={guessedLetters.has(letter) || disabled}
            >
              {letter}
            </Button>
          ))}
        </View>
      ))}
    </View>
  )
}

export default Keyboard 