import { ApolloClient, createHttpLink, InMemoryCache, NormalizedCacheObject } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import AxiosClient from "../axios/client";

const axiosClient = AxiosClient.get()
let instance: ApolloClient<NormalizedCacheObject> | null = null

export default{
    get: async () => {

        if (!instance) {
            const httpLink = createHttpLink({
                uri: (await axiosClient.get('/service/hosts/gql')).data,
                credentials: 'include' // same-origin
            });

            const [tokenHeaderKey, tokenHeaderKeyValue] = document.cookie.split('=')

            const authLink = setContext((_, { headers }) => {
                // get the authentication token from local storage if it exists
                const token = localStorage.getItem('token');
                // return the headers to the context so httpLink can read them
                return {
                    headers: {
                        ...headers,
                        'XSRF-TOKEN': tokenHeaderKeyValue
                        // authorization: token ? `Bearer ${token}` : "",
                    }
                }
                });

            instance = new ApolloClient({
                link: authLink.concat(httpLink),
                cache: new InMemoryCache(),
            })
        }

        return instance
    }
}