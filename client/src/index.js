import {getCLS} from "web-vitals";

getCLSimport React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import { AuthContextProvider } from "./components/util/auth-context";

ReactDOM.render(
    <React.StrictMode>
        <AuthContextProvider>
            <BrowserRouter><App/></BrowserRouter>
        </AuthContextProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
