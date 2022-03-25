import {useState} from 'react';
import './Login.css';
import { Link, useHistory } from "react-router-dom";
import { Toast, ToastContainer } from "react-bootstrap";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorOccurred, setErrorOccurred] = useState(false);
    const history = useHistory();


    const loginUser = (event) => {
        event.preventDefault();
        if(true) {
            setErrorOccurred(true);
            // history.replace('/registration');
        }
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


    return (
        <>
            <div aria-live="polite" aria-atomic="true" className="position-relative">
                <ToastContainer className="p-3" position='top-center'>
                    <Toast show={errorOccurred} onClose={removeErrorToastr} bg='danger' delay={5000} autohide>
                        <Toast.Header closeButton={true}>
                            <strong className="me-auto">Error</strong>
                        </Toast.Header>
                        <Toast.Body className='text-white'>Email may not be registered or Password is incorrect.</Toast.Body>
                    </Toast>
                </ToastContainer>
            </div>
            <div className='jumbotron vertical-center'>
                <div className='container'>
                    <h1>Login</h1>
                    <form onSubmit={loginUser}>
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="name@example.com" onChange={emailChangeHandler}/>
                            <label htmlFor="inputEmail" className="form-label">Email address</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="password" className="form-control" id="inputPassword" onChange={passwordChangeHandler} placeholder='Password'/>
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
