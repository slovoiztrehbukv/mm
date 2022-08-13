import { QuestionsInitialActionPayload } from "../../interfaces";

export default {
    questions: {
        get: (params: QuestionsInitialActionPayload) => `
            query GetQuestions {
                questions(questionsQuantity: ${params.questionsQuantity}, answersQuantity: ${params.answersQuantity}) {
                    id
                    title
                    answers {
                        id
                        value
                    }
                }
            }
        `
    }
  }
  