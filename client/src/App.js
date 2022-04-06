import {Route, Redirect} from 'react-router-dom';
import Login from './components/Login/Login';
import RegistrationForm from "./components/Registration/registrationForm";
import Homeowner from "./components/Homeowner/Homeowner";
import Organization from "./components/Organization/Organization";

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
            <Route path='/home'>
                <Homeowner />
            </Route>
            <Route path='/org'>
                <Organization />
            </Route>
        </>
    );
}

export default App;
