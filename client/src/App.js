import {Route, Redirect} from 'react-router-dom';
import Login from './components/Login/Login';
import RegistrationForm from "./components/Registration/registrationForm";

function App() {
    return (
        <>
            <Route path="/" exact>
                <Redirect to='/login'/>
            </Route>
            <Route path='/login'>
                <Login/>
            </Route>
            <Route path='/registration'>
                <RegistrationForm/>
            </Route>
        </>
    );
}

export default App;
