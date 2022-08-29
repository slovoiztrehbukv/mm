import axios, { Axios } from "axios"


type AxiosSettings = {
    baseURL?: string,
}

let instance: Axios

export default {
    get: () => { // `get` means instance, NOT a HTTP method

        if (!instance) {
            let settings: AxiosSettings = {}

            if (process.env.REACT_APP_HOST) {
                settings.baseURL = process.env.REACT_APP_HOST
            }

            instance = new Axios(settings)
        }

        return instance
    }
}