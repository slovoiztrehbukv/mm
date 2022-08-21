import { BatchInitialAction } from '../../interfaces';
import queries from './queries';
import awaitedClient from './client';
import { gql } from '@apollo/client';

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
    }

}