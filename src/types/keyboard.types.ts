export interface IKeyboardProps {
  onKeyPress: (letter: string) => void
  guessedLetters: Set<string>
  currentAnswer: string
  disabled: boolean
  showKeyboard: boolean
}

export interface IKeyboardState {
  windowWidth: number
  windowHeight: number
  showKeyboard: boolean
}

export type KeyboardRow = string[]
export type KeyboardLayout = KeyboardRow[] 