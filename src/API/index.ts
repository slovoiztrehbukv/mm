import axios from "axios";

declare global {
    interface Window {
        API_HOST?: string;
    }
}

const HOST = process.env.REACT_APP_API_HOST ?? window.API_HOST

export const API = {
    getQuestions: (params = {}) => axios.get(`${HOST}/getQuestions`, {params})
}