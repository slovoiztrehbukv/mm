import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery } from '@apollo/client';
import { QuestionsInitialActionPayload } from '../../interfaces';
import queries from './queries';

declare global {
    interface Window {
        GQL_HOST?: string;
    }
}

const uri = process.env.REACT_APP_GQL_HOST ?? window.GQL_HOST

const client = new ApolloClient({
    uri,
    cache: new InMemoryCache(),
});

export const GQL = {

    getQuestions: (params:QuestionsInitialActionPayload = {questionsQuantity: 10}) => client.query({query: gql(queries.questions.get(params))})

}