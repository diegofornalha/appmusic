import { View, Text, Button } from '@tarojs/components'
import { getGameMessages } from '../../utils/messages'
import { formatTime } from '../../utils/gameHelpers'

interface IFinalScreenProps {
  message: string
  correctCount: number
  totalQuestions: number
  countdown: number
  onRestart: () => void
}

const FinalScreen: React.FC<IFinalScreenProps> = ({
  message,
  correctCount,
  totalQuestions,
  countdown,
  onRestart
}) => {
  return (
    <View className='final-screen'>
      <Text className='final-message'>{message}</Text>
      <Text className='final-score'>
        {getGameMessages.finalScore} {correctCount} de {totalQuestions}
      </Text>
      <Text className='countdown-text'>
        {getGameMessages.restart} {formatTime(countdown)}...
      </Text>
      <Button className='restart-button' onClick={onRestart}>
        {getGameMessages.playAgain}
      </Button>
    </View>
  )
}

export default FinalScreen 