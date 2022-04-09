import React, { useState } from 'react';

import axios from "axios";
import Swal from 'sweetalert2/dist/sweetalert2.js';



let endpoint = "http://localhost:8888";

function RegistrationFormOwner() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [address, setAddress] = useState("");
    const [region, setRegion] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [invalidCheck, setInvalidCheck] = useState("");
    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [addressError, setAddressError] = useState("");
    const [regionError, setRegionError] = useState("");
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
            if (isChecked) {
                setCheckboxError("");
            } else {
                setCheckboxError("You must agree before submitting.");
            }
        }

        handleValidation(e);

    }

    const handleValidation = (evnt) => {
        const inputValue = evnt.target.value.trim();
        const inputFieldName = evnt.target.id;

        // for first name
        if (inputFieldName === "firstName") {
            if (inputValue.length === 0) {
                setFirstNameError("First Name is empty");
            } else {
                setFirstNameError("");
            }
        }

        // for last name
        if (inputFieldName === "lastName") {
            if (inputValue.length === 0) {
                setLastNameError("Last Name is empty");
            } else {
                setLastNameError("");
            }
        }

        // for email
        if (inputFieldName === "email") {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(inputValue)) {
                setEmailError("");
            } else {
                setEmailError("Invalid Email");
            }
        }
        //for password 
        if (inputFieldName === 'password') {
            const uppercaseRegExp = /(?=.*?[A-Z])/;
            const lowercaseRegExp = /(?=.*?[a-z])/;
            const digitsRegExp = /(?=.*?[0-9])/;
            const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
            const minLengthRegExp = /.{8,}/;
            const passwordLength = inputValue.length;
            const uppercasePassword = uppercaseRegExp.test(inputValue);
            const lowercasePassword = lowercaseRegExp.test(inputValue);
            const digitsPassword = digitsRegExp.test(inputValue);
            const specialCharPassword = specialCharRegExp.test(inputValue);
            const minLengthPassword = minLengthRegExp.test(inputValue);
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
            setPasswordError(errMsg);
        }
        // for confirm password
        if (inputFieldName === "confirmPassword" || (inputFieldName === "password" && confirmPassword.length > 0)) {
            if (confirmPassword !== password) {
                setConfirmPasswordError("Confirm password is not matched");
            } else {
                setConfirmPasswordError("");
            }

        }

        // for address
        if (inputFieldName === "address") {
            if (inputValue.length === 0) {
                setAddressError("Address is required");
            } else {
                setAddressError("");
            }
        }

        // for region
        if (inputFieldName === "region") {
            if (inputValue.length === 0) {
                setRegionError("Region field is required");
            } else {
                setRegionError("");
            }
        }
    }

    const hasErrorMessage = () => {
        let hasMsg = false;
        if (firstNameError || lastNameError || emailError || passwordError || confirmPasswordError || addressError || regionError || checkboxError) {
            hasMsg = true;
        }
        return hasMsg;
    }

    const validate = () => {
        let isValidated = true;
        if (!firstName) {
            setFirstNameError("First name field is required");
            isValidated = false;
        }
        if (!lastName) {
            setLastNameError("Last name field is required");
            isValidated = false;
        }
        if (!email) {
            setEmailError("Email Field is Invalid ");
            isValidated = false;
        }
        if (!password) {
            setPasswordError("Password is required");
            isValidated = false;
        }
        if (!confirmPassword) {
            setConfirmPasswordError("This field is required");
            isValidated = false;
        }
        if (!address) {
            setAddressError("Address is required");
            isValidated = false;
        }
        if (!region) {
            setRegionError("Region is required");
            isValidated = false;
        }

        if(!invalidCheck){
            setCheckboxError("You must agree before submitting.");
            isValidated = false;
        }
        return isValidated;
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
            if (validate() && obj.invalidCheck === true && !hasErrorMessage()) {
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
                        Swal.fire({ title: 'Register Successfully!', text: 'Click OK to redirect to login page', type: 'success', confirmButtonText: 'OK' }).then(function () {
                            window.location = "/login";
                        });
                    });
            } 
        }
    }

    return (
        <>
            <div className="form">
                <div className="form-body row d-flex align-items-center justify-content-center">
                    <div className="col-md-6">
                        <div className="card px-5 py-5">
                            <div className="form-input"> <i className="fa fa-user"></i>
                                <input className="form-control" type="text" id="firstName" value={firstName} onChange={(e) => handleInputChange(e)} onKeyUp={handleValidation} placeholder="First Name" required />
                                <p className="text-danger">{firstNameError}</p>
                            </div>
                            <div className="form-input"> <i className="fa fa-user-circle-o"></i>
                                <input className="form-control" type="text" id="lastName" value={lastName} onChange={(e) => handleInputChange(e)} onKeyUp={handleValidation} placeholder="LastName" required={true}/>
                                <p className="text-danger">{lastNameError}</p>
                            </div>
                            <div className="form-input"> <i className="fa fa-envelope"></i>
                                <input type="email" id="email" className="form-control" value={email} onChange={(e) => handleInputChange(e)} onKeyUp={handleValidation} placeholder="Email" />
                                <p className="text-danger">{emailError}</p>
                            </div>
                            <div className="form-input"> <i className="fa fa-lock"></i>
                                <input className="form-control" type="password" id="password" value={password} onChange={(e) => handleInputChange(e)} onKeyUp={handleValidation} placeholder="Password" />
                                <p className="text-danger">{passwordError}</p>
                            </div>
                            <div className="form-input"> <i className="fa fa-unlock-alt"></i>
                                <input className="form-control" type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => handleInputChange(e)} onKeyUp={handleValidation} placeholder="Confirm Password" />
                                <p className="text-danger">{confirmPasswordError}</p>
                            </div>
                            <div className="form-input"> <i className="fa fa-map-marker"></i>
                                <input className="form-control" type="text" value={address} onChange={(e) => handleInputChange(e)} id="address" onKeyUp={handleValidation} placeholder="Address" />
                                <p className="text-danger">{addressError}</p>
                            </div>
                            <div className="form-input"> <i className="fa fa-globe"></i>
                                <select className="form-control" id="region" onChange={(e) => handleInputChange(e)} onKeyUp={handleValidation} >
                                    <option value="">Please select an option</option>
                                    <option value="West">West</option>
                                    <option value="East">East</option>
                                    <option value="North">North</option>
                                    <option value="Central">Central</option>
                                    <option value="South">South</option>
                                </select>
                                <p className="text-danger">{regionError}</p>
                            </div>
                            
                            <div className="col-12">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value={invalidCheck} id="invalidCheck" required onChange={(e) => handleInputChange(e)} />
                                    <label className="form-check-label" htmlFor="checkbox">
                                        Agree to terms and conditions
                                    </label>
                                    <p className="text-danger">{checkboxError}</p>
                                </div>
                            </div>
                            <div className="footer">
                                <button onClick={() => handleSubmit()} type="submit" className="btn btn-primary">Register</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )

}

export default RegistrationFormOwner;


