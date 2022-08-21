import { ApolloClient, InMemoryCache, NormalizedCacheObject } from "@apollo/client";
import axios from "axios";



let instance: ApolloClient<NormalizedCacheObject> | null = null

export default{
    get: async () => {

        if (!instance) {
            const endpoint = process.env.REACT_APP_HOST + '/service/hosts/gql'
            const uri = (await axios.get(endpoint)).data

            instance = new ApolloClient({
                uri,
                cache: new InMemoryCache(),
            })
        }

        return instance
    }
}