import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { useHistory } from 'react-router';
import { RequestState } from '../requests/RequestState';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

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
                setRsState(RequestState.success);            
            }catch(e) {
                console.log(e);
                alert('wrong user data or password');
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
            <div className='fonts'>
                <div>Login or email adress :</div> 
                    <input type="text" value={email} placeholder='login or email' onChange={handleChangeLogin} className='input'/>
                </div>
            <div>
            <div className='fonts'>
                <div>Password :</div>
                    <input type="password" value={password} placeholder='password'onChange={handleChangePassword} className='input'/>
                </div>
            </div>
            
            <button className='btn btn__login ' onClick={handleLogin}>LogIn</button>
            <div className='fonts'>Haven't account? <Link to='/registration'>SignUp</Link></div>
        </div>
    )
}
