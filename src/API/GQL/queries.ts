import { QuestionsInitialActionPayload } from "../../interfaces";

export default {
    questions: {

        get: (params: QuestionsInitialActionPayload) => `
            query GetQuestions {
                questions(questionsQuantity: ${params.questionsQuantity}, answersQuantity: ${params.answersQuantity}, categoryId: ${params.categoryId}) {
                    id
                    title
                    answers {
                        id
                        value
                    }
                }
            }
        `

    },

    categories: {

        get: () => `
            query GetCategories {
                categories{
                    id
                    title
                }
            }
        `
        
    },
}