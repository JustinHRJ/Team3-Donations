import React from 'react';
import './style.css';
import Header from "./header";
import RegistrationFormOrg from "./registrationFormOrg";
import RegistrationFormOwner from "./registrationFormOwner";


function RegistrationForm() {
    return (
        <>
            <Header />
            <div class="row justify-content-center" id="regForm">
                <div class="card mx-4 mx-md-5 shadow-5-strong">
                    <div class="card-body py-5 px-md-5 text-center">
                        <div class="row">
                                <div class="card-header" id="box">
                                    <h2 class="fw-bold mb-1">Sign up As</h2>
                                </div>
                                <div class="card-body p-5 shadow-5 text-center">
                                    <ul class="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                                        <li class="nav-item" role="presentation"><a class="nav-link active" data-toggle="pill" href="#pills-owner">Home Owner</a></li>
                                        <li class="nav-item" role="presentation"><a class="nav-link" data-toggle="pill" href="#pills-org">Charity Organization</a></li>
                                    </ul>

                                    <div class="tab-content">
                                        <div class="tab-pane fade show active" id="pills-owner" role="tabpanel" aria-labelledby="tab-login">
                                            <RegistrationFormOwner />
                                        </div>
                                        <div class="tab-pane fade" id="pills-org" role="tabpanel" aria-labelledby="tab-register">
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
