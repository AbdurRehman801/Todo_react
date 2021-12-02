import React, { useState, useEffect } from "react";
import "./ForgetPassword.css";
import { auth, database } from "./firebase";

const ForgetPassword = () => {
  const [Forget, setForget] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    auth.sendPasswordResetEmail(Forget).then((res)=>{
        console.log(res)
        alert("Please check your email")
    }).catch((e)=>{
        alert(e.message)
    })
  };
  return (
    <div className="forget_body">
      <form onSubmit={handleSubmit}>
        <div className="forget_input_div">
          <input
            className="forget_input"
            type="email"
            placeholder="Email"
            name="email"
            value={Forget}
            onChange={(e) => setForget(e.target.value)}
          />

        </div>
        <div className="forget_button_div">
          <button className="forget_button" type="submit">
            Send!!
          </button>
        </div>
      </form>
    </div>
  );
};
export default ForgetPassword;
