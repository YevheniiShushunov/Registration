import React from 'react';
import { useAuth } from '../AuthContext';
import { useHistory } from 'react-router';
import '../../App.css';



export const User = () => {
    const { logout, currentUser } = useAuth()
    const history = useHistory();

    return (
        <div className='user'>
            <h1>User information</h1>
            <div className='user__item'>
                Name:
            </div>
            <div className='user__item'>
                Email: {/* {currentUser} */}
            </div>
            <div className='user__item'>
                Login:
            </div>
            <button className="btn" onClick={() => logout() && history.push('/')}>Logout</button>
        </div>
    )
}
