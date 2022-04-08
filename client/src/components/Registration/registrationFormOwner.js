import React, { useState } from 'react';
import './style.css';
import axios from "axios";
import Swal from 'sweetalert2/dist/sweetalert2.js'

let endpoint = "http://localhost:8888";

function RegistrationFormOwner() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [address, setAddress] = useState("");
    const [region, setRegion] = useState("");
    const [passwordError, setPasswordErr] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [invalidCheck, setInvalidCheck] = useState("");
    const [checkboxError, setCheckboxError] = useState("");

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === "firstName") {
            setFirstName(value);
        }
        if (id === "lastName") {
            setLastName(value);
        }
        if (id === "email") {
            setEmail(value);
        }
        if (id === "password") {
            setPassword(value);
        }
        if (id === "confirmPassword") {
            setConfirmPassword(value);
        }
        if (id === "address") {
            setAddress(value);
        }
        if (id === "region") {
            setRegion(value);
        }

        if (id === "invalidCheck") {
            let isChecked = e.target.checked;
            setInvalidCheck(isChecked);
        }

    }

    const handlePasswordValidation = (evnt) => {
        const passwordInputValue = evnt.target.value.trim();
        const passwordInputFieldName = evnt.target.id;
        //for password 
        if (passwordInputFieldName === 'password') {
            const uppercaseRegExp = /(?=.*?[A-Z])/;
            const lowercaseRegExp = /(?=.*?[a-z])/;
            const digitsRegExp = /(?=.*?[0-9])/;
            const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
            const minLengthRegExp = /.{8,}/;
            const passwordLength = passwordInputValue.length;
            const uppercasePassword = uppercaseRegExp.test(passwordInputValue);
            const lowercasePassword = lowercaseRegExp.test(passwordInputValue);
            const digitsPassword = digitsRegExp.test(passwordInputValue);
            const specialCharPassword = specialCharRegExp.test(passwordInputValue);
            const minLengthPassword = minLengthRegExp.test(passwordInputValue);
            let errMsg = "";
            if (passwordLength === 0) {
                errMsg = "Password is empty";
            } else if (!uppercasePassword) {
                errMsg = "At least one Uppercase";
            } else if (!lowercasePassword) {
                errMsg = "At least one Lowercase";
            } else if (!digitsPassword) {
                errMsg = "At least one digit";
            } else if (!specialCharPassword) {
                errMsg = "At least one Special Characters";
            } else if (!minLengthPassword) {
                errMsg = "At least minumum 8 characters";
            } else {
                errMsg = "";
            }
            setPasswordErr(errMsg);
        }
        // for confirm password
        if (passwordInputFieldName === "confirmPassword" || (passwordInputFieldName === "password" && confirmPassword.length > 0)) {

            if (confirmPassword !== password) {
                setConfirmPasswordError("Confirm password is not matched");
            } else {
                setConfirmPasswordError("");
            }

        }
    }

    const handleSubmit = () => {

        let obj = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
            address: address,
            region: region,
            invalidCheck: invalidCheck,
        }
        if (obj) {
            if (obj.invalidCheck === true) {

                axios
                    .post(
                        endpoint + "/api/registerHomeOwner",
                        obj,
                        {
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded",
                            },
                        }
                    )
                    .then((res) => {
                        console.log(res);
                        Swal.fire({ title: 'Register Successfully!', text: 'Click OK to redirect to login page', type: 'success', confirmButtonText: 'OK' }).then(function () {
                            window.location = "/login";
                        });
                    });
            } else {
                setCheckboxError("You must agree before submitting.");
            }
        }
    }

    return (
        <>
            <div class="form">
                <div class="form-body row d-flex align-items-center justify-content-center">
                    {/*<div class="form-body">*/}
                    <div class="col-md-6">
                        <div class="card px-5 py-5">
                            <div class="form-input"> <i class="fa fa-user"></i>
                                <input class="form-control" type="text" id="firstName" value={firstName} onChange={(e) => handleInputChange(e)} placeholder="First Name" />
                            </div>
                            <div class="form-input"> <i class="fa fa-user-circle-o"></i>
                                <input class="form-control" type="text" id="lastName" value={lastName} onChange={(e) => handleInputChange(e)} placeholder="LastName" />
                            </div>
                            <div class="form-input"> <i class="fa fa-envelope"></i>
                                <input type="email" id="email" class="form-control" value={email} onChange={(e) => handleInputChange(e)} placeholder="Email" />
                            </div>
                            <div class="form-input"> <i class="fa fa-lock"></i>
                                <input class="form-control" type="password" id="password" value={password} onChange={(e) => handleInputChange(e)} onKeyUp={handlePasswordValidation} placeholder="Password" />
                                <p class="text-danger">{passwordError}</p>
                            </div>
                            <div class="form-input"> <i class="fa fa-unlock-alt"></i>
                                <input class="form-control" type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => handleInputChange(e)} onKeyUp={handlePasswordValidation} placeholder="Confirm Password" />
                                <p class="text-danger">{confirmPasswordError}</p>
                            </div>
                            <div class="form-input"> <i class="fa fa-map-marker"></i>
                                <input class="form-control" type="text" value={address} onChange={(e) => handleInputChange(e)} id="address" placeholder="Address" />
                            </div>
                            <div class="form-input"> <i class="fa fa-globe"></i>
                                <input class="form-control" type="text" name="" id="region" value={region} onChange={(e) => handleInputChange(e)} placeholder="Region" />
                            </div>
                            <div class="col-12">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value={invalidCheck} id="invalidCheck" required onChange={(e) => handleInputChange(e)} />
                                    <label class="form-check-label" for="invalidCheck" htmlFor="checkbox">
                                        Agree to terms and conditions
                                    </label>
                                    <p class="text-danger">{checkboxError}</p>
                                </div>
                            </div>
                            <div class="footer">
                                <button onClick={() => handleSubmit()} type="submit" class="btn btn-primary">Register</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default RegistrationFormOwner;
