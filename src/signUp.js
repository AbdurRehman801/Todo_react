import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./signUp.css"
import { useHistory } from "react-router-dom";
import { auth, database } from "./firebase";
import validation from "./validation";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedIn } from "./redux/reducer/action";
import status from "./redux/reducer/login";




const SignUp = () => {
    const [values, setvalues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false);
    const [mass, setMass] = useState();
    const [role, setRole]= useState("");


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
        setLoading(true)
        auth.createUserWithEmailAndPassword(values.email, values.password)
            .then(() => {
                history.push("/")
                database
                    .ref("/USR").child("/users" + "/" + auth.currentUser.uid)
                    .set({
                        email: values.email,
                        name: values.firstName,
                        uid: auth.currentUser.uid,
                        role: role
                    }).then(() => console.log("user added successfully")).catch((err) => console.log(err))
                    console.log(role)
                setLoading(false)
                dispatch(isLoggedIn({
                    email: values.email,
                    name: values.firstName,
                    role:role
                }))
            })
            .catch((err) => {
                // alert(err.message)
                setMass(err.message)
                setLoading(false)
            })
    };
    return (
        <div className="loginbody">
            <h1 className="styling">Welcome to Todo List</h1>
            <h2 >Sign Up its Quick and Easy</h2>
            <form onSubmit={handleSignup}>
                <div className="name_div">
                    <input className="input" maxLength="10" type="text" placeholder="FirstName" onChange={handleChange} value={values.firstName} name="firstName" />
                    <input className="input" maxLength="10" type="text" placeholder="LastName" onChange={handleChange} value={values.lastName} name="lastName" />
                </div>
                <div className="errordiv1">
                {errors.firstName && <p className="error1">{errors.firstName}</p>}  {errors.lastName && <p className="error2">{errors.lastName}</p>}
                </div>
                <div className = "radioDiv">
                <input type="radio" id="std" name="age" value="Student" onClick={()=>setRole("Student")}  />
                <label className = "radio1" for="std">Student</label>
                <input type="radio" id="comp" name="age" value="Company" onClick={()=>setRole("Company")} />
                <label className="radio2" for="comp">Company</label>
                <input type="radio" id="admin" name="age" value="Admin"  onClick={()=>setRole("Admin")}/>
                <label className="radio3" for="comp">Admin</label>
              </div>
                <div className="mail_div2">
                    <input className="mail2" maxLength="30" type="text" placeholder="Email" onChange={handleChange} value={values.email} name="email" />
                </div>
                <div className="errordiv3">
                {errors.email && <p className="error3">{errors.email}</p>}
                </div>
                <div className="pass_div">
                    <input className="pass" maxLength="20" type="password" placeholder="Password" onChange={handleChange} value={values.password} name="password" />
                </div>
                <div className="errordiv4">
                {errors.password && <p className="error4">{errors.password}</p>}
                </div>
                <div className="buttons_div">

                    <button type="submit" className="signButton">{
                        loading ? <ScaleLoader
                            color={"#0D0DAF"}
                            loading={loading}
                            height={"13"} /> :
                            "SignUp"}</button>
                </div>
                <p className="error8">{mass}</p>
            </form >
            <div className="para_div2">

                <p className="para2">Go Back to Login!!! <Link to="/login">Login </Link> </p>
            </div>

        </div>
    )
}

export default SignUp;