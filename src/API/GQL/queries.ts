import { BatchInitialAction, SignInParams } from "../../interfaces";

export default {
    auth: {

        signIn: (params: SignInParams) => `
            query SignIn {
                auth(login: "${params.login}", password: "${params.password}") {
                    jwt
                }
            }
        `
        
    },

    questions: {

        get: (params: BatchInitialAction) => `
            query GetBatch {
                batch(questionsQuantity: ${params.questionsQuantity}, answersQuantity: ${params.answersQuantity}, categoryId: ${params.categoryId}) {
                    id
                    questions {
                        id
                        type
                        title
                        answers {
                            id
                            value
                            image {
                                url
                            }
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