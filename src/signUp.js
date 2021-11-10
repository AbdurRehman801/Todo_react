import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./signUp.css"
import { useHistory } from "react-router-dom";
import { auth, database } from "./firebase";
import validation from "./validation";


const SignUp = () => {
    const [values, setvalues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })
    const [errors, setErrors] = useState({})
    const handleChange = (e) => {
        setErrors(validation(values));
        setvalues({
            ...values,
            [e.target.name]: e.target.value
        })
    }
    const history = useHistory()
    const handleSignup = (e) => {
        e.preventDefault()
        setErrors(validation(values));
        auth.createUserWithEmailAndPassword(values.email, values.password)
            .then(() => {
                history.push("/")
                database
                    .ref("/USR").child("/users" + "/" + auth.currentUser.uid)
                    .set({
                        email: values.email,
                        name: values.firstName,
                        uid: auth.currentUser.uid
                    }).then(() => console.log("user added successfully")).catch((err) => console.log(err))
            })
            .catch(err => alert(err.message))
    };
    return (
        <div className="loginbody">
            <h1 className="styling">Welcome to Todo List</h1>
            <h2 >Sign Up its Quick and Easy</h2>
            <form onSubmit={handleSignup}>
                <div className="name_div">
                    <input className="input" type="text" placeholder="FirstName" onChange={handleChange} value={values.firstName} name="firstName" />
                    <input className="input" type="text" placeholder="LastName" onChange={handleChange} value={values.lastName} name="lastName" />
                </div>
                {errors.firstName && <h6>{errors.firstName}</h6>}
                {errors.lastName && <h6>{errors.lastName}</h6>}
                <div className="mail_div2">
                    <input className="mail2" type="text" placeholder="Email" onChange={handleChange} value={values.email} name="email" />
                </div>
                {errors.email && <h6>{errors.email}</h6>}
                <div className="pass_div">
                    <input className="pass" type="password" placeholder="Password" onChange={handleChange} value={values.password} name="password" />
                </div>
                {errors.password && <h6>{errors.password}</h6>}
                <div className="buttons_div">
                    <button type="submit" className="signButton">SignUp</button>
                </div>
            </form >

        </div>
    )
}

export default SignUp;