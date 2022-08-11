import axios from "axios";

declare global {
    interface Window {
        API_HOST?: string;
    }
  }

export const API = {
    getQuestions: (params = {}) => axios.get(`${window.API_HOST}/getQuestions`, {params})
}