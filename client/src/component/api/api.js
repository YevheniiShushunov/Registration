import axios from 'axios';

const instance = axios.create ({
    withCredentials: true,
    baseURL: 'http://localhost:3001/api/',
    
})

export const ApiService = {
    addUser: (data) => {
        return instance.post('/register', {data});
    },


    getAuth: () => {
        return instance.get('auth', {headers: {Authorization:`Bearer ${localStorage.getItem('token')}`}});
    },
    
    postLogin: (email, password) => {
        return instance.post('login', {email, password});
    },
    
    getCountries: () => {
        return instance.get('countries');
    }
}