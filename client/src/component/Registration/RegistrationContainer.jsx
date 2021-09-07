import React, { useState,useEffect } from 'react';
import { Registration } from './Registration';
import { ApiService } from '../api/api';
import { RequestState } from '../requests/RequestState';
import { Preloader } from '../preloader/Preloader';
import { useHistory } from 'react-router'

export const  RegistrationContainer = () => {
    const [rsState, setRsState] = useState(RequestState.none);
    const [country, setCountry] = useState([]);
    const [userData, setUserData] = useState({
        email:'',
        login: '',
        real_name:'',
        password: '',
        birth_date:'',
        country: 'England',
        agree_condition: ''
    });
    const history = useHistory();
    const postUser = async (e) => {
        e.preventDefault();
        

        if(!userData.email || !userData.login  
            || !userData.real_name || !userData.password ){
                alert('Поле не может быть пустым');
            }
        if(!userData.agree_condition){
            alert('you must aply terms and conditions');
        }
           
        if(rsState !== RequestState.request && userData.email.length > 0 && userData.login.length > 0 
            && userData.real_name.length > 0 && userData.password.length > 0 && userData.birth_date.length > 0 && userData.agree_condition === true && emailValidation(userData.email)){
            try{
                setRsState(RequestState.request && userData)
                await ApiService.addUser(userData);
                setRsState(RequestState.success)
                history.push('/');
            } catch(e) {
                console.log(e);
                alert('Пользователь существует')
                setRsState(RequestState.failure);
            }
        }
    }


    const emailValidation =  (email) => {
        const reg = /\S+@\S+\.\S+/;
        if (reg.test(email)){
            return true
        } else {
            alert('введите корректно электронную почту');
            return false;
        }  
    }

    const countryList = async () => {
        if(rsState !== RequestState.request) {
            try{
                setRsState(RequestState.request);
                const response = await ApiService.getCountries();
                setCountry(response.data);
                setRsState(RequestState.success);
            } catch(e){
                console.log(e)
                setRsState(RequestState.failure);
            }
        }
    }

    useEffect(() => {
        countryList();
    },[]);

    return (
        <>
        <Preloader inProgress={rsState === RequestState.request}>
            <Registration 
            onUser={postUser}
            country={country}
            userData={userData}
            setUserData={setUserData}
            state={rsState}
            />
        </Preloader>
            
        </>
    )
}
