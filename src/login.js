import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./login.css"
import { useHistory } from "react-router-dom";
import { auth, database } from "./firebase";
import validation from "./validation";


const Login = () => {
    // const [email, setEmail] = useState()
    // const [password, setPassword] = useState()
    const [values, setValues] = useState({
        email: "",
        password: ""
    })
    const [errors, setErrors] = useState({})
    const history = useHistory();

    useEffect(() => {
        return auth.onAuthStateChanged(user => {
            console.log("appuser==>", user)
            if (user) {
                history.push("/")
                console.log("user if", user)
            }

        })

    }, [])

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(validation(values));
        auth.signInWithEmailAndPassword(values.email, values.password).then((res) => {
            console.log("response==>", auth.currentUser.uid)
            database.ref("/USR").child("/users" + "/" + auth.currentUser.uid)
                .once("value").then((snapshot) => {
                    const users = snapshot.val();
                    console.log("user===>", users)
                    history.push("/")
                })
        })

    }
    return (
        <div className="loginbody">
            <h1 className="styling1">Welcome to Todo List</h1>
            <h2 >Please Login!!</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="input1_div1">
                    <input className="input1" type="text" placeholder="Username" onChange={handleChange} value={values.email} name="email" />
                </div>
                {errors.email && <h6>{errors.email}</h6>}
                <div className="inputs_div1">
                    <input className="inputs" type="password" placeholder="Password" onChange={handleChange} value={values.password} name="password" />
                </div>
                {errors.password && <h6>{errors.password}</h6>}
                <div className="button_div1">
                    <button type="submit" className="loginButton">LOGIN</button>
                </div>
            </form >
            <div className="para_div1">
                <p className="para1">don't have account Please!! <Link to="/signUp">SignUp </Link> </p>
            </div>
        </div>
    )
}

export default Login;