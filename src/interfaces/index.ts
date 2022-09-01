import { Action as ReduxAction } from "redux"

enum QuestionType {
  Text = "TEXT",
  Image = "IMAGE"
}

export interface User {
  id?: number
  name?: string
  login?: string
  email?: string
  phone?: string
  vk_id?: string
  instagram_id?: string
  tlg_id?: string
}

export interface AuthState {
  isAuthenticated: boolean
  user?: User
}

export interface Question {
  id: number
  type: QuestionType
  title: string
  answers: Answer[]
  userAnswer: number | null
}

export interface Batch {
  id: number
  questions: Question[]
}

export interface Image {
  id: number
  url: string
}

export interface Answer {
  id: number
  value: string
  image?: Image
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
    tempAnswersCode?: string
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

export interface LogInParams {
  login: string
  password: string
}