import { BatchInitialAction, LogInParams, userAnswersStoreData, UserProfile } from '../../interfaces';
import queries from './queries';
import awaitedClient from './client';
import { gql } from '@apollo/client';
import AxiosMethods from '../axios/methods';

export const GQL = {

    logIn: async (params: LogInParams) => {
        const client = await awaitedClient.get()

        return client.query({
            query: gql(queries.auth.logIn(params))
        })
    },

    getCurrentUser: async () => {
        const client = await awaitedClient.get()

        return client.query({
            query: gql(queries.auth.getCurrentUser())
        })
    },

    userProfileSave: async (params:UserProfile) => {
        const client = await awaitedClient.get()

        return client.mutate({
            mutation: gql(queries.user.update()),
            variables: {
                input: {
                    ...params
                }
            }
        })
    },

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