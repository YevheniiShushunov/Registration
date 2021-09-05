import React from 'react';
import { useAuth } from '../AuthContext';
import { useHistory } from 'react-router';
import '../../App.css';



export const User = () => {
    const { logout, currentUser=[] } = useAuth()
    const history = useHistory();
    console.log(currentUser)
    
    const userData = () => {
        return currentUser.map(itm =>(
            <div key={itm.id} className='user__item'>
                    <p>Name: {itm.real_name}</p>
                    <p>Email: {itm.email}</p>
                    <p>Login:{itm.login}</p>
            </div>  
        ))
    }
    



    return (
        <div className='user'>
            <h1>User information</h1>
            {userData()}
            <button className="btn" onClick={() => logout() && history.push('/')}>Logout</button>
        </div>
    )
}
