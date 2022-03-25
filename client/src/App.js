import {Route, Redirect} from 'react-router-dom';
import Login from './components/Login/Login';
import React from 'react';
import { Container } from "semantic-ui-react";
import Header from "./components/Registration/header";
import RegistrationForm from "./components/Registration/registrationForm";

function App() {
    return (
        <>
        	<Header />
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
