import React from 'react';
import { useHistory } from 'react-router';
import '../../App.css';
import { RequestState } from '../requests/RequestState';

export const Registration = ({onUser, country=[], userData, setUserData, state}) => {
    const history = useHistory();

    const countries = () => {
        return country.map(itm =>(
            <option key={itm.id}>{itm.name}</option>
        ))
    }

    const handleChangeEmail = (e) => {
        setUserData((prevState) => ({...prevState, email: e.target.value}));
    }

    const handleChangeLogin = (e) => {
        setUserData((prevState) => ({...prevState, login: e.target.value}));
    }

    const handleChangeRealName = (e) => {
        setUserData((prevState) => ({...prevState, real_name: e.target.value}));
    }

    const handleChangePassword = (e) => {
        setUserData((prevState) => ({...prevState, password: e.target.value}));
    }

    const handleChangeBirthDate = (e) => {
        setUserData((prevState) => ({...prevState, birth_date: e.target.value}));
    }

    const handleChangeCountry = (e) => {
        setUserData((prevState) => ({...prevState, country: e.target.value}));
    }

    const handleChangeAgree = (e) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        setUserData((prevState) => ({...prevState, agree_condition: value}));
    }

    return (
        <div>
            <div className='user'>
                <div><h1>Input registration data</h1></div>
                <div className='fonts'>
                    <div>Email</div>
                    <input className='input' value={userData.email} onChange={handleChangeEmail}></input>
                </div>
                <div className='fonts'>
                    <div >Login</div>
                    <input className='input' value={userData.login} onChange={handleChangeLogin}></input>
                </div>
                <div className='fonts'>
                    <div> Real name</div>
                    <input className='input' value={userData.real_name} onChange={handleChangeRealName}></input>
                </div>
                <div className='fonts'>
                    <div>Password</div>
                    <input className='input' value={userData.password} type="password" onChange={handleChangePassword}></input>
                </div>
                <div className='fonts'>
                    <div>Birth date</div>
                    <input type='date' max='2021-12-31' value={userData.birth_date} className='input' onChange={handleChangeBirthDate}></input>
                </div>
                <div className='fonts'>
                    <div className='fonts'>Country</div>
                    <select className="select" id="" onChange={handleChangeCountry}>
                        {countries()}
                    </select>
                </div>
                <div className='check'>
                    <input name='agree' type='checkbox' onChange={handleChangeAgree} className="checkbox" />
                    <div className="check__title">Agree with terms and conditions</div>
                </div>
                <button disabled={state === RequestState.request} className="btn btn__login" onClick={onUser}>SignUp</button>
                <button className="btn btn__login redirect-button" onClick={() => history.push('/login')}>Go to logIn</button>
            </div> 
        </div>
    )
}
