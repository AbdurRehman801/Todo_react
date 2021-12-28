import React, { useState, useEffect } from "react";
import {Link, Redirect } from "react-router-dom";
import "./login.css"
import { useHistory } from "react-router-dom";
import { auth, database } from "./firebase";
import validation from "./validation";
import ScaleLoader from "react-spinners/ScaleLoader";
import { BiLogIn } from "react-icons/bi";
import ForgetPassword from "./ForgetPassword"




const Login = () => {
    const [values, setValues] = useState({
        email: "",
        password: ""
    })
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false);
    const [errmessage, seterrmessage] = useState()
    const [rule, setRule] = useState("")

    const history = useHistory();

    useEffect( () => {
        setLoading(true)
         return auth.onAuthStateChanged(user => {
            if (user) {
                if (rule === "Student") {
                    history.push("/")
                  }
                  else if (rule === "Company") {
                    history.push("/")
                  }
                setLoading(false)
            }else if(user===null){
                history.push("/Login")
                setLoading(false)
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
        await auth.signInWithEmailAndPassword(values.email, values.password).then(async(res) => {
            console.log("res===>", res.user.uid)
           await database.ref("/USR").child("/users" + "/" + res.user.uid)
            .once("value").then((snapshot)=>{
                console.log("snapshot===>", snapshot.val())
                const roles = snapshot.val();
                setRule(roles.role)
                if (roles.role === "Student") {
                    history.push("/")
                  }
                  else if (roles.role === "Company") {
                    history.push("/")
                  }
                setLoading(false)
            } )
        }).catch((err) => {
            seterrmessage(err.message)
            setLoading(false)
        })

    }
    return (
        <div className="loginbody">
            {
                loading ? <div className="loader2">
                    <ScaleLoader
                            color={"#BFFF00"}
                            loading={loading} />
                </div> :
                <> 
            <h1 className="styling1">Welcome to Todo List</h1>
            <h2 >Please Login!!</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="input1_div1">
                    <input className="input1" type="email" placeholder="Email" onChange={handleChange} value={values.email} name="email" />
                </div>
                {errors.email && <p className="error5">{errors.email}</p>}
                <div className="inputs_div1">
                    <input className="inputs" type="password" placeholder="Password" onChange={handleChange} value={values.password} name="password" />
                </div>
                {errors.password && <p className="error6">{errors.password}</p>}
                <div className="button_div1">

                    <button type="submit" className="loginButton">
                        {
                            loading ? <ScaleLoader
                            color={"#BFFF00"}
                            loading={loading} /> : "Login"
                        }</button>
                </div>
                <p className="error7">{errmessage}</p>
            </form >
            <div className = "forget_link">
                <Link to="/ForgetPassword"> Forget Password?</Link>
            </div>
            <div className="para_div1">

                <p className="para1">Don't have account Please!! <Link to="/signUp">SignUp </Link> </p>
            </div>
            </>
            }
        </div>
    )
}

export default Login;