import { Action as ReduxAction } from "redux"



export interface Question {
    id: number
    title: string
    answers: Answer[]
    userAnswer: number | null
}

export interface Questions {
  items: Question[]
}

export interface Answer {
  id: number
  value: string
}

export interface Category {
  id: number
  title: string
}

export interface QuestionsInitialActionPayload {
  questionsQuantity?: number
  answersQuantity?: number
}

export interface QuestionsInitialAction extends ReduxAction {
  payload: QuestionsInitialActionPayload
}

export interface SettingsState {
  values: {
    questions: QuestionsInitialActionPayload // ?TODO extend
  }
}

export interface UpdateSettingsAction extends ReduxAction {
  payload: SettingsState
}

export interface IconProps {
  fill?: string
  px?: number
}