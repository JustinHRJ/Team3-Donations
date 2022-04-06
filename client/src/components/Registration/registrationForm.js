import {React, useContext }from 'react';
import './style.css';
import Header from "./header";
import RegistrationFormOrg from "./registrationFormOrg";
import RegistrationFormOwner from "./registrationFormOwner";
import AuthContext from "../util/auth-context";
import {useHistory} from "react-router-dom";


function RegistrationForm() {
    const history = useHistory();
    const authCtx = useContext(AuthContext);

    if(authCtx.isLoggedIn) {
        history.replace('/home');
    }

    return (
        <>
            <Header />
            <div className="row justify-content-center" id="regForm">
                <div className="card mx-4 mx-md-5 shadow-5-strong">
                    <div className="card-body py-5 px-md-5 text-center">
                        <div className="row">
                                <div className="card-header" id="box">
                                    <h2 className="fw-bold mb-1">Sign up As</h2>
                                </div>
                                <div className="card-body p-5 shadow-5 text-center">
                                    <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                                        <li className="nav-item" role="presentation"><a className="nav-link active" data-toggle="pill" href="#pills-owner">Home Owner</a></li>
                                        <li className="nav-item" role="presentation"><a className="nav-link" data-toggle="pill" href="#pills-org">Charity Organization</a></li>
                                    </ul>

                                    <div className="tab-content">
                                        <div className="tab-pane fade show active" id="pills-owner" role="tabpanel" aria-labelledby="tab-login">
                                            <RegistrationFormOwner />
                                        </div>
                                        <div className="tab-pane fade" id="pills-org" role="tabpanel" aria-labelledby="tab-register">
                                            <RegistrationFormOrg />
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default RegistrationForm;
