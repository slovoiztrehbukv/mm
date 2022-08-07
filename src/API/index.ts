import axios from "axios";

export const API = {
    getQuestions: (params = {}) => axios.get('http://mm.loc/api/getQuestions', {params})
}