import { QuestionsInitialActionPayload } from '../../interfaces';
import queries from './queries';
import client from './client';
import { gql } from '@apollo/client';

export const GQL = {

    getQuestions: async (params:QuestionsInitialActionPayload = {questionsQuantity: 10}) => (await client.get()).query({query: gql(queries.questions.get(params))})

}