import { BatchInitialAction, userAnswersStoreData } from "../../interfaces";

export default {
    questions: {

        get: (params: BatchInitialAction) => `
            query GetBatch {
                batch(questionsQuantity: ${params.questionsQuantity}, answersQuantity: ${params.answersQuantity}, categoryId: ${params.categoryId}) {
                    id
                    questions {
                        id
                        title
                        answers {
                            id
                            value
                        }
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

    userAnswers: {

        store: () => `
            mutation StoreUserAnswer($input: StoreUserAnswersInput!) {
                storeTempUserAnswers(input: $input) {
                    code
                }
            }
        `

    }
}