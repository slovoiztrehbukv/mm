import { Action as ReduxAction } from "redux"

enum QuestionType {
  Text = "TEXT",
  Image = "IMAGE"
}

export interface UserProfile{
  name?: string
  login?: string
  email?: string
  phone?: string
  vk_id?: string
  instagram_id?: string
  tlg_id?: string
  avatar?: string
}

export interface User extends UserProfile {
  id?: number
}

export interface AuthState {
  wasUserFetched: boolean // `getCurrentUser` attempt (flag for correct redirects handling)
  isAuthenticated: boolean // user data actually was (not empty) in `getCurrentUser` response 
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

export interface UserAvatarProps {
  src: string
  alt: string
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