import { View, Text } from '@tarojs/components'
import { HANGMAN_PARTS } from '../../constants/config'

interface IHangmanProps {
  wrongGuesses: number
}

const Hangman: React.FC<IHangmanProps> = ({ wrongGuesses }) => {
  return (
    <View className='hangman-display'>
      <View className='hangman-ascii'>
        {HANGMAN_PARTS[wrongGuesses].map((line, index) => (
          <Text key={index} className='hangman-line'>{line}</Text>
        ))}
      </View>
    </View>
  )
}

export default Hangman 