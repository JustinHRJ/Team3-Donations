import {React, useState, useContext} from 'react';
import './Login.css';
import {Link, useHistory} from "react-router-dom";
import {Toast, ToastContainer} from "react-bootstrap";
import AuthContext from "../util/auth-context";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorOccurred, setErrorOccurred] = useState(false);
    const history = useHistory();
    const [emailValid, setEmailValid] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");

    const authCtx = useContext(AuthContext);

    async function loginUser(event) {
        event.preventDefault();
        if (email === "" || password === "") {
            setErrorOccurred(true);
            setErrorMsg("Email and Password cannot be left blank. Please try again");
            return;
        }

        const record = {
            "Email": email,
            "Password": password
        };

        let hasError;


        const response = await fetch("http://localhost:8888/api/login", {
            method: "POST",
            body: JSON.stringify(record),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        hasError = data.Success != 1;
        if (hasError) {
            setErrorMsg(data.ErrorMsg);
            setErrorOccurred(true);
            return;
        }

        authCtx.login(data.LoginKey);
        history.replace('/registration');

    }

    const emailChangeHandler = (event) => {
        setEmail(event.target.value);
    }

    const passwordChangeHandler = (event) => {
        setPassword(event.target.value);
    }

    const removeErrorToastr = () => {
        setErrorOccurred(false);
    }

    const checkValidity = (event) => {
        if (!event.target.validity.valid) {
            setEmailValid((false));
        } else {
            setEmailValid(true);
        }
    }


    let emailClass = "form-control"
    if (!emailValid && email !== "") {
        emailClass = "form-control is-invalid"
    } else if (emailValid && email !== "") {
        emailClass = "form-control is-valid"
    }

    return (
        <>
            <div aria-live="polite" aria-atomic="true" className="position-relative">
                <ToastContainer className="p-3" position='top-center'>
                    <Toast show={errorOccurred} onClose={removeErrorToastr} bg='danger' delay={5000} autohide>
                        <Toast.Header closeButton={true}>
                            <strong className="me-auto">Authentication Failed</strong>
                        </Toast.Header>
                        <Toast.Body className='text-white'>{errorMsg}</Toast.Body>
                    </Toast>
                </ToastContainer>
            </div>
            <div className='jumbotron vertical-center'>
                <div className='container'>
                    <h1>Login</h1>
                    <form onSubmit={loginUser}>
                        <div className="form-floating mb-3">
                            <input type="email" className={emailClass} id="inputEmail" aria-describedby="emailHelp"
                                   placeholder="name@example.com" onChange={emailChangeHandler} onBlur={checkValidity}/>
                            <label htmlFor="inputEmail" className="form-label">Email address</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="password" className="form-control" id="inputPassword"
                                   onChange={passwordChangeHandler} placeholder='Password'/>
                            <label htmlFor="inputPassword" className="form-label">Password</label>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                    <br/>
                    <Link to='/registration' className="link-primary">Sign up for an Account now!</Link>
                </div>
            </div>
        </>
    )
}

export default Login;
