import { Action as ReduxAction } from "redux"



export interface Question {
  id: number
  title: string
  answers: Answer[]
  userAnswer: number | null
}

export interface Batch {
  id: number
  questions: Question[]
}

export interface Answer {
  id: number
  value: string
}

export interface Category {
  id: number
  title: string
}

export interface BatchInitialAction {
  questionsQuantity?: number
  answersQuantity?: number
  categoryId?: number
}

export interface QuestionsInitialAction extends ReduxAction {
  payload: BatchInitialAction
}

export interface SettingsState {
  values: {
    questions: BatchInitialAction // ?TODO extend
  }
}

export interface UpdateSettingsAction extends ReduxAction {
  payload: SettingsState
}

export interface IconProps {
  fill?: string
  px?: number
}


// GQL types TODO move to external file
export interface userAnswersStoreData {
  batch_id: number
  answers_quantity: number
  answers_ids: number[]
}