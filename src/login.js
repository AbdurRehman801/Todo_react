import React, { useState, useEffect } from "react";
import {Link, Redirect } from "react-router-dom";
import "./login.css"
import { useHistory } from "react-router-dom";
import { auth, database } from "./firebase";
import validation from "./validation";
import ScaleLoader from "react-spinners/ScaleLoader";
import { findAllByDisplayValue } from "@testing-library/dom";



const Login = () => {
    const [values, setValues] = useState({
        email: "",
        password: ""
    })
    const [errors, setErrors] = useState({})
    let [loading, setLoading] = useState(false);
    const [errmessage, seterrmessage] = useState()

    const history = useHistory();

    useEffect( () => {
         return auth.onAuthStateChanged(user => {
            if (user) {
                history.push("/")
                
            }

        })

    }, [])

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors(validation(values));
        setLoading(true)
        await auth.signInWithEmailAndPassword(values.email, values.password).then((res) => {
            history.push("/")
            setLoading(false)
        }).catch((err) => {
            // alert(err.message)
            seterrmessage(err.message)
            setLoading(false)
        })

    }
    return (
        <div className="loginbody">
            <h1 className="styling1">Welcome to Todo List</h1>
            <h2 >Please Login!!</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="input1_div1">
                    <input className="input1" type="text" placeholder="Email" onChange={handleChange} value={values.email} name="email" />
                </div>
                {errors.email && <p className="error5">{errors.email}</p>}
                <div className="inputs_div1">
                    <input className="inputs" type="password" placeholder="Password" onChange={handleChange} value={values.password} name="password" />
                </div>
                {errors.password && <p className="error6">{errors.password}</p>}
                <div className="button_div1">

                    <button type="submit" className="loginButton">{
                        loading ? <ScaleLoader
                            color={"#0D0DAF"}
                            loading={loading}
                            height={"13"} /> :
                            "LOGIN"}</button>
                </div>
                <p className="error7">{errmessage}</p>
            </form >
            <div className="para_div1">

                <p className="para1">Don't have account Please!! <Link to="/signUp">SignUp </Link> </p>
            </div>
        </div>
    )
}

export default Login;