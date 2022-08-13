import { ApolloClient, InMemoryCache, NormalizedCacheObject } from "@apollo/client";
import axios from "axios";



let instance: ApolloClient<NormalizedCacheObject> | null = null

export default{
    get: async () => {

        if (!instance) {
            const uri = (await axios.get('/service/hosts/gql')).data
           
            instance = new ApolloClient({
                uri,
                cache: new InMemoryCache(),
            })
        }

        return instance
    }
}