import './App.css';
import { AuthProvider } from './component/AuthContext';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { PrivatRoute } from './component/PrivatRoute/PrivatRoute';
import { AuthContainer } from './component/Auth/AuthContainer';
import { Login } from './component/Login/Login';


function App() {
  return (
    <div className="App">
        <AuthProvider>
          <Router>
            <PrivatRoute exact path='/' component={AuthContainer}/>
            <Route exact path='/login' component={Login} />
          </Router>
        </AuthProvider>
    </div>
  );
}

export default App;
