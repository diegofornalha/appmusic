import { IQuestion } from '../types/game.types'

export const QUESTIONS: IQuestion[] = [
  { id: "q1", question: "How are you?", answer: "FINE", translation: "Como você está?" },
  { id: "q2", question: "What is your name?", answer: "MY NAME IS", translation: "Qual é o seu nome?" },
  { id: "q3", question: "Where are you from?", answer: "I AM FROM", translation: "De onde você é?" },
  { id: "q4", question: "Nice to meet you", answer: "LIKEWISE", translation: "Prazer em conhecer você" },
  { id: "q5", question: "How is it going?", answer: "GREAT", translation: "Como vai?" },
]

export const MAX_WRONG_GUESSES = 6
export const COUNTDOWN_TIME = 5
export const CONFETTI_DURATION = 3000 