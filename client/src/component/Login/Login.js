import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { useHistory } from 'react-router';
import { RequestState } from '../requests/RequestState';
import { Redirect } from 'react-router';

export const Login = () => {
    const { login, currentUser } = useAuth();
    const [rsState, setRsState] = useState(RequestState.none);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    
    const handleChangeLogin = (e) => {
        return setEmail(e.target.value);
    }

    const handleChangePassword = (e) => {
        return  setPassword(e.target.value);
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        if(rsState !== RequestState.request) {
            try{
                setRsState(RequestState.request);
                await login(email, password);
                setPassword('');
                history.push('/');
                setRsState(RequestState.succes);            
            } catch(e) {
                console.log('wrong user data');
                setRsState(RequestState.failure); 
            }
        }    
    }

    if ( currentUser ) {
        return <Redirect to='/' />
    }

    return (
        <div className='login user'>
            <h1>Input</h1>
            <div className='login_item'>
                <div>Login or email adress :</div> 
                    <input type="text" value={email} placeholder='login or email' onChange={handleChangeLogin} className='input'/>
                </div>
            <div>
            <div className='login_item'>
                <div>Password :</div>
                    <input type="password" value={password} placeholder='password'onChange={handleChangePassword} className='input'/>
                </div>
            </div>
            
            <button className='btn btn__login ' onClick={handleLogin}>LogIn</button>
        </div>
    )
}
