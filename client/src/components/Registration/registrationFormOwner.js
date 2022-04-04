import React, { useState } from 'react';
import './style.css';
import axios from "axios";

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
                    });
            }else{
                setCheckboxError("You must agree before submitting.");
            }
        }
    }

    return (
        <>
            <div className="form">
                <div className="form-body">
                    <div className="username">
                        <label className="form__label" htmlFor="firstName">First Name </label>
                        <input className="form__input" type="text" value={firstName} onChange={(e) => handleInputChange(e)} id="firstName" placeholder="First Name" />
                    </div>
                    <div className="lastname">
                        <label className="form__label" htmlFor="lastName">Last Name </label>
                        <input type="text" name="" id="lastName" value={lastName} className="form__input" onChange={(e) => handleInputChange(e)} placeholder="LastName" />
                    </div>
                    <div className="email">
                        <label className="form__label" htmlFor="email">Email </label>
                        <input type="email" id="email" className="form__input" value={email} onChange={(e) => handleInputChange(e)} placeholder="Email" />
                    </div>
                    <div className="password">
                        <label className="form__label" htmlFor="password">Password </label>
                        <input className="form__input" type="password" id="password" value={password} onChange={(e) => handleInputChange(e)} onKeyUp={handlePasswordValidation} placeholder="Password" />
                        <p className="text-danger">{passwordError}</p>
                    </div>
                    <div className="confirm-password">
                        <label className="form__label" htmlFor="confirmPassword">Confirm Password </label>
                        <input className="form__input" type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => handleInputChange(e)} onKeyUp={handlePasswordValidation} placeholder="Confirm Password" />
                        <p className="text-danger">{confirmPasswordError}</p>
                    </div>
                    <div className="address">
                        <label className="form__label" htmlFor="address">Address </label>
                        <input className="form__input" type="text" value={address} onChange={(e) => handleInputChange(e)} id="address" placeholder="Address" />
                    </div>
                    <div className="region">
                        <label className="form__label" htmlFor="region">Region </label>
                        <input type="text" name="" id="region" value={region} className="form__input" onChange={(e) => handleInputChange(e)} placeholder="region" />
                    </div>
                    <div class="col-12">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value={invalidCheck} id="invalidCheck" required onChange={(e) => handleInputChange(e)} />
                            <label class="form-check-label" for="invalidCheck" htmlFor="checkbox">
                                Agree to terms and conditions
                            </label>
                            <p className="text-danger">{checkboxError}</p>
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <button onClick={() => handleSubmit()} type="submit" className="btn btn-primary">Register</button>
                </div>
            </div>
        </>
    )
}
export default RegistrationFormOwner;
