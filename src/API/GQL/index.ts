import { BatchInitialAction, userAnswersStoreData } from '../../interfaces';
import queries from './queries';
import awaitedClient from './client';
import { gql, useMutation } from '@apollo/client';

export const GQL = {

    getQuestions: async (params:BatchInitialAction = {questionsQuantity: 10}) => {
        const client = await awaitedClient.get()

        return client.query({
            query: gql(queries.questions.get(params))
        })
    },

    getCategories: async () => {
        const client = await awaitedClient.get()

        return client.query({
            query: gql(queries.categories.get())
        })
    },

    storeUserAnswer: async (params:userAnswersStoreData) => {
        const client = await awaitedClient.get()
        const {batch_id, answers_quantity, answers_ids} = params

        return client.mutate({
            mutation: gql(queries.userAnswers.store()),
            variables: {
                input: {
                    batch_id: Number(batch_id),
                    answers_quantity: Number(answers_quantity),
                    answers_ids: answers_ids.map(id => Number(id)),
                }
            }
        })
    },

}