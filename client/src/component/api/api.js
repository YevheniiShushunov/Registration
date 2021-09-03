import axios from 'axios';

const instance = axios.create ({
    withCredentials: true,
    baseURL: 'http://localhost:3001/api/',
    
})

export const ApiService = {
    addUser: (email, login, real_name, password, birth_date, county, agree_condition) => {
        return instance.post('/register', {email, login, real_name, password, birth_date, county, agree_condition})
    },


    getAuth: () => {
        return instance.post('auth', {headers: {Authorization:`Bearer ${localStorage.getItem('token')}`}});
    },
    
    postLogin: (email, password) => {
        return instance.post('login', {email, password});
    }, 
}