import { View, Text } from '@tarojs/components'

interface ILettersHistoryProps {
  guessedLetters: Set<string>
  currentAnswer: string
}

const LettersHistory: React.FC<ILettersHistoryProps> = ({
  guessedLetters,
  currentAnswer
}) => {
  const sortedLetters = Array.from(guessedLetters).sort()

  return (
    <View className='letters-history'>
      {sortedLetters.map((letter) => (
        <View
          key={letter}
          className={`letter-history-item ${
            currentAnswer.includes(letter) ? 'correct' : 'wrong'
          }`}
        >
          <Text>{letter}</Text>
        </View>
      ))}
    </View>
  )
}

export default LettersHistory 