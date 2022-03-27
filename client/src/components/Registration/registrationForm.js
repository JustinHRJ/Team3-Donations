import React, {useState,setState} from 'react';
import './style.css';
import axios from "axios";
import Header from "./header";

let endpoint = "http://localhost:8888";

function RegistrationForm() {
	
	const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
	const [address, setAddress] = useState("");
    const [region, setRegion] = useState("");

    const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "firstName"){
            setFirstName(value);
        }
        if(id === "lastName"){
            setLastName(value);
        }
        if(id === "email"){
            setEmail(value);
        }
        if(id === "password"){
            setPassword(value);
        }
        if(id === "confirmPassword"){
            setConfirmPassword(value);
        }
		if(id === "address"){
            setAddress(value);
        }
        if(id === "region"){
            setRegion(value);
        }

    }

    const handleSubmit  = () => {
        
		let obj = {
            firstName : firstName,
            lastName:lastName,
            email:email,
            password:password,
            confirmPassword:confirmPassword,
			address:address,
			region:region,
        }  
		if (obj) {
      axios
        .post(
          endpoint + "/api/task",
          
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
    }
    }
    return(
        <>
            <Header />
            <div className="form">
                <div className="form-body">
                    <div className="username">
                        <label className="form__label" htmlFor="firstName">First Name </label>
                        <input className="form__input" type="text" value={firstName} onChange = {(e) => handleInputChange(e)} id="firstName" placeholder="First Name"/>
                    </div>
                    <div className="lastname">
                        <label className="form__label" htmlFor="lastName">Last Name </label>
                        <input  type="text" name="" id="lastName" value={lastName}  className="form__input" onChange = {(e) => handleInputChange(e)} placeholder="LastName"/>
                    </div>
                    <div className="email">
                        <label className="form__label" htmlFor="email">Email </label>
                        <input  type="email" id="email" className="form__input" value={email} onChange = {(e) => handleInputChange(e)} placeholder="Email"/>
                    </div>
                    <div className="password">
                        <label className="form__label" htmlFor="password">Password </label>
                        <input className="form__input" type="password"  id="password" value={password} onChange = {(e) => handleInputChange(e)} placeholder="Password"/>
                    </div>
                    <div className="confirm-password">
                        <label className="form__label" htmlFor="confirmPassword">Confirm Password </label>
                        <input className="form__input" type="password" id="confirmPassword" value={confirmPassword} onChange = {(e) => handleInputChange(e)} placeholder="Confirm Password"/>
                    </div>
                    <div className="address">
                        <label className="form__label" htmlFor="address">Address </label>
                        <input className="form__input" type="text" value={address} onChange = {(e) => handleInputChange(e)} id="address" placeholder="Address"/>
                    </div>
                    <div className="region">
                        <label className="form__label" htmlFor="region">Region </label>
                        <input  type="text" name="" id="region" value={region}  className="form__input" onChange = {(e) => handleInputChange(e)} placeholder="region"/>
                    </div>
                </div>
                <div className="footer">
                    <button onClick={()=>handleSubmit()} type="submit" className="btn btn-primary">Register</button>
                </div>
            </div>
        </>
    )       
}
export default RegistrationForm;
