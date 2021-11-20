import React from "react";
import { Link } from "react-router-dom";
import "./error.css"

const Error = () =>{
    return(
        <div>
        <h1>Oopss! Page Not Found!!</h1>
        <div className="errorDiv">
        <Link to="/Login" className="linkError">Go Back to Home Page</Link>
        </div>
        </div>
    )
}
export default Error;
   