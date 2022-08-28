import { ApolloClient, InMemoryCache, NormalizedCacheObject } from "@apollo/client";
import AxiosClient from "../axios/client";

const axiosClient = AxiosClient.get()
let instance: ApolloClient<NormalizedCacheObject> | null = null

export default{
    get: async () => {

        if (!instance) {
            const uri = (await axiosClient.get('/service/hosts/gql')).data

            instance = new ApolloClient({
                uri,
                cache: new InMemoryCache(),
            })
        }

        return instance
    }
}