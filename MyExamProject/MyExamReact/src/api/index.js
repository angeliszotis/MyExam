
import axios from 'axios'

export const BASE_URL = 'http://localhost:5257/';

export const ENDPOINTS = {
    user: 'user',
    login: 'user/login',
    register: 'user/register',
    exam: 'exam',
    answer: 'answer',
    question: 'question'
}

export const createAPIEndpoint = endpoint => {

    let url = BASE_URL + 'api/' + endpoint + '/';
    return {
        fetch: () => axios.get(url),
        fetchById: id => axios.get(url + id),
        post: newRecord => axios.post(url, newRecord),
        put: (id, updatedRecord) => axios.put(url + id, updatedRecord),
        delete: id => axios.delete(url + id),
    }
}