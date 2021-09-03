import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export const PrivatRoute = ({ component: Component, ...rest }) =>{
    const { currentUser } = useAuth()
    return (
      <Route
        {...rest}
        render={props => {
          return currentUser ? <Component {...props} /> : <Redirect to="/login" />
        }}
      ></Route>
    )
  }


