import { QuestionsInitialActionPayload } from "../../interfaces";

export default {
    questions: {
        get: (params: QuestionsInitialActionPayload) => `
            query GetQuestions {
                questions(questionsQuantity: ${params.questionsQuantity}) {
                    id
                    title
                    answers
                }
            }
        `
    }
  }
  