export const calculateScore = (correctCount: number, totalQuestions: number): number => {
  return Math.round((correctCount / totalQuestions) * 100)
}

export const getMaskedWord = (answer: string, guessedLetters: Set<string>): string => {
  return answer
    .split("")
    .map((letter) => (letter === " " ? " " : guessedLetters.has(letter) ? letter : "_"))
    .join(" ")
}

export const isValidLetter = (key: string): boolean => {
  return /^[A-Z]$/.test(key)
}

export const hasWon = (maskedWord: string): boolean => {
  return !maskedWord.includes("_")
}

export const formatTime = (seconds: number): string => {
  return `${seconds} segundo${seconds !== 1 ? 's' : ''}`
} 