import React, {useState, useEffect, useContext} from 'react'
import { Preloader } from './preloader/Preloader';
import { ApiService } from './api/api';
import { RequestState } from './requests/RequestState';


export const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext)
}

export const  AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState({
        get: RequestState.none,
        post: RequestState.none,
    });

    const signup = async (email, login, real_name, password, birth_date, county, agree_condition) => {
        if (loading.post !== RequestState.request) {
            try{
                setLoading({post : RequestState.request});
                await ApiService.addUser(email, login, real_name, password, birth_date, county, agree_condition);
                setLoading({post : RequestState.success});
            } catch(e) {
                console.log(e);
            } 
        }
    }

    const login = async (email, password) => {
        if(loading.post !== RequestState.request){
            try{
                setLoading((prevState) =>({...prevState, post:RequestState.request}));
                const response = await ApiService.postLogin(email, password);
                localStorage.setItem('token', response.data[0].token);
                setCurrentUser(response.data);
                setLoading((prevState) =>({...prevState, post:RequestState.success}));
            } catch(e) {
                console.log(e);
                localStorage.removeItem('token');
                setLoading((prevState) =>({...prevState, post:RequestState.failure}));
            }    
        }
    }

    const auth = async () => {
        if(loading.get !== RequestState.request){
            try{
                setLoading((prevState) =>({...prevState, get:RequestState.request}));
                const response = await ApiService.getAuth();
                setCurrentUser(response.data);
                setLoading((prevState) =>({...prevState, get:RequestState.success}));
            } catch(e) {
                console.log(e);
                setLoading((prevState) =>({...prevState, get:RequestState.failure}));
            }
              
        }
    }

    console.log(currentUser);
    
    const logout = () => {
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
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            <Preloader inProgress={loading.post === RequestState.request || loading.get === RequestState.request}>
                {children}
            </Preloader>
        </AuthContext.Provider>
    )
}