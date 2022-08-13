import { QuestionsInitialActionPayload } from '../../interfaces';
import queries from './queries';
import awaitedClient from './client';
import { gql } from '@apollo/client';

export const GQL = {

    getQuestions: async (params:QuestionsInitialActionPayload = {questionsQuantity: 10}) => {
        const client = await awaitedClient.get()

        client.query({
            query: gql(queries.questions.get(params))
        })
    }

}