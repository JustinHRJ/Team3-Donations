import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Container } from "semantic-ui-react";
import Header from "./components/Registration/header";
import RegistrationForm from "./components/Registration/registrationForm";

function App() {
  return (
    <div className="App">
        <Header />
		<RegistrationForm/>
    </div>
  );
}

export default App;
