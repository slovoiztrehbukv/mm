import client from "./client"



const methods = {
    logIn: async () => {
        return await client.get().get('/sanctum/csrf-cookie', {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            }
        })
    },

    logOut: async () => {
        return await client.get().get('/auth/logout', {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            }
        })
    },
}

export default methods