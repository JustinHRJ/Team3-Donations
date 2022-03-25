import {useState} from 'react';
import './Login.css';
import { Link } from "react-router-dom";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const loginUser = (event) => {
        event.preventDefault();
    }

    const emailChangeHandler = (event) => {
        setEmail(event.target.value);
    }

    const passwordChangeHandler = (event) => {
        setPassword(event.target.value);
    }

    return (
        <>
            <div className='jumbotron vertical-center'>
                <div className='container'>
                    <h1>Login</h1>
                    <form onSubmit={loginUser}>
                        <div className="mb-3">
                            <label htmlFor="inputEmail" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp"
                                   placeholder="name@example.com" onChange={emailChangeHandler}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputPassword" className="form-label">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1"
                                   onChange={passwordChangeHandler}/>
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
