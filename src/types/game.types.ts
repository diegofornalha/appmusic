export interface IGameState {
  currentQuestionIndex: number
  guessedLetters: Set<string>
  wrongGuesses: number
  showTranslation: boolean
  correctCount: number
  gameStatus: GameStatus
  countdown: number
  showConfetti: boolean
}

export type GameStatus = 'playing' | 'won' | 'lost' | 'finished'

export interface IQuestion {
  id: string
  question: string
  answer: string
  translation: string
}

export interface IGameProps {
  onGameEnd?: (score: number) => void
}

export interface IGameContext {
  state: IGameState
  handleGuess: (letter: string) => void
  restartGame: () => void
  getMaskedWord: () => string
} 