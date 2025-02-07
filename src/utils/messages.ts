import { calculateScore } from './gameHelpers'

export const getFinalMessage = (correctCount: number, totalQuestions: number): string => {
  const percentage = calculateScore(correctCount, totalQuestions)

  if (percentage === 100) {
    return 'Incrível! Você acertou todas as questões!'
  } else if (percentage >= 80) {
    return 'Muito bem! Você teve um ótimo desempenho!'
  } else if (percentage >= 60) {
    return 'Bom trabalho! Continue praticando!'
  } else if (percentage >= 40) {
    return 'Você está no caminho certo! Tente novamente!'
  } else {
    return 'Não desista! A prática leva à perfeição!'
  }
}

export const getGameMessages = {
  lost: 'Não foi dessa vez...',
  won: 'Muito bem!',
  nextQuestion: 'Próxima pergunta em',
  restart: 'Reiniciando em',
  finalScore: 'Pontuação final:',
  playAgain: 'Jogar Novamente',
  typeLetter: 'Digite aqui para jogar...'
} 