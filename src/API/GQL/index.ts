import { BatchInitialAction, SignInParams, userAnswersStoreData } from '../../interfaces';
import queries from './queries';
import awaitedClient from './client';
import { gql, useMutation } from '@apollo/client';
import AxiosClient from '../axios/client';

export const GQL = {

    signIn: async (params: SignInParams) => {
        const res = await AxiosClient.get().head('/sanctum/csrf-cookie', {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            }
        }) // TODO .get.get TO SINGLETON FC 
        console.log(321, res)
        const client = await awaitedClient.get()

        return client.query({
            query: gql(queries.auth.signIn(params))
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