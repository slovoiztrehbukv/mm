import { BatchInitialAction, LogInParams } from "../../interfaces";

export default {
    auth: {

        logIn: (params: LogInParams) => `
            query LogIn {
                logIn(login: "${params.login}", password: "${params.password}") {
                    user {
                        id
                        name
                        login
                        email
                        phone
                        vk_id
                        instagram_id
                        tlg_id
                        avatar
                    }
                }
            }
        `,

        getCurrentUser: () => `
            query GetCurrentUser {
                me {
                    id
                    name
                    login
                    email
                    phone
                    vk_id
                    instagram_id
                    tlg_id
                    avatar
                }
            }
        `
        
    },

    user: {
        update: () => `
            mutation UserProfileUpdate($input: UserProfileUpdateInput!) {
                userProfileUpdate(input: $input) {
                    success
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
                    id
                }
            }
        `

    }
}