export interface Question {
    id: number
    title: string
    answers: string[]
    userAnswer: number | null
}

export interface Questions {
  items: Question[]
}

export interface QuestionsInitialActionPayload {
  questionsQuantity?: number
  answersQuantity?: number
}

export interface QuestionsInitialAction {
  type: string
  payload: QuestionsInitialActionPayload
}