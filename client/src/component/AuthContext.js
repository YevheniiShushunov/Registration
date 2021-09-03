import React, {useState, useEffect, useContext} from 'react'
import { Preloader } from './preloader/Preloader';
import { ApiService } from './api/api';


export const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext)
}

export const  AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState({
        get: 'none',
        post: 'none',
    });
    const [loginStatus, setLoginStatus] = useState(false);

    const signup = async (email, login, real_name, password, birth_date, county, agree_condition) => {
        if (loading.post !== 'request') {
            try{
                setLoading({post : 'request'});
                await ApiService.addUser(email, login, real_name, password, birth_date, county, agree_condition);
                setLoading({post : 'succes'});
            } catch(e) {
                console.log(e);
            } 
        }
    }

    const login = async (email, password) => {
        if(loading.post !== 'request'){
            try{
                setLoading((prevState) =>({...prevState, post:'request'}));
                const response = await ApiService.postLogin(email, password);
                localStorage.setItem('token', response.data.token);
                setCurrentUser(response.data.email);
                setLoading((prevState) =>({...prevState, post:'succes'}));
            } catch(e) {
                console.log(e);
                localStorage.removeItem('token');
                setLoading((prevState) =>({...prevState, post:'fail'}));
            }    
        }
    }

    const auth = async () => {
        if(loading.get !== 'request'){
            try{
                setLoading((prevState) =>({...prevState, get:'request'}));
                const response = await ApiService.getAuth();
                console.log(response)
                setCurrentUser(response.data.user);
                localStorage.setItem('token', response.data.token);
                setLoading((prevState) =>({...prevState, get:'succes'}));
            } catch(e) {
                console.log(e);
                localStorage.removeItem('token');
                setLoading((prevState) =>({...prevState, get:'fail'}));
            }
              
        }
    }

    console.log(currentUser);
    
    const logout = () => {
        console.log("called")
        setCurrentUser(null);
        localStorage.removeItem('token');
    }

    useEffect(() => {
        auth();
    },[])

    const value = {
        currentUser,
        login,
        signup,
        loginStatus,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            <Preloader inProgress={loading.post === 'request' || loading.get === 'request'}>
                {children}
            </Preloader>
        </AuthContext.Provider>
    )
}