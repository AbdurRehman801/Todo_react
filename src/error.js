import React from "react";
import { Link } from "react-router-dom";
import "./error.css"

const Error = () =>{
    return(
        <div className="errorbody">
        <h1>Oopss! Page Not Found!!</h1>
        <div className="errorDiv">
        <Link to="/" className="linkError">Home Page</Link>
        </div>
        </div>
    )
}
export default Error;
   