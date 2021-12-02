import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { auth, database } from "./firebase";
import validation from "./validation";
import ScaleLoader from "react-spinners/ScaleLoader";
import "./ChangePassword.css";
import firebase from "firebase";

const ChangePassword = () => {
  const [values, setvalues] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const user = firebase.auth().currentUser;
  console.log("üser is ", user);
  const handleChange = (e) => {
    setErrors(validation(values));
    setvalues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validation(values));
    setLoading(true);
    const credential = firebase.auth.EmailAuthProvider?.credential(
      user.email,
      values.currentPassword
    );
    console.log("ressssss", credential);
    user
      .reauthenticateWithCredential(credential)
      .then((res) => {
        console.log("res", res);
        console.log(user.reauthenticateWithCredential);
        console.log(user);
        user
          .updatePassword(values.newPassword)
          .then(() => {
            alert("Password Changed");
            setLoading(false);
          })
          .catch((error) => {
            console.log("abcd", error);
            // alert(error.message);
            setLoading(false);
          });
      })
      .catch((error) => {
        console.log("alert", error);
        // alert(error.message);
        setLoading(false);
      });
  };

  return (
    <div className="password_body">
      <form onSubmit={handleSubmit}>
        <div className="pass_div">
          <input
            className="password_change_1"
            maxLength="20"
            type="password"
            placeholder="Current Password"
            onChange={handleChange}
            value={values.currentPassword}
            name="currentPassword"
          />
        </div>
        <div className="cp_errordiv1">
          {errors.currentPassword && (
            <p className="cp_error1">{errors.currentPassword}</p>
          )}
        </div>

        <div className="pass_div">
          <input
            className="password_change_2"
            maxLength="20"
            type="password"
            placeholder="New Password"
            onChange={handleChange}
            value={values.newPassword}
            name="newPassword"
          />
        </div>
        <div className="cp_errordiv2">
          {errors.newPassword && (
            <p className="cp_error2">{errors.newPassword}</p>
          )}
        </div>
        <div className="password_button_div">
          <button type="submit" className="password_button">
            {loading ? (
              <ScaleLoader color={"#0D0DAF"} loading={loading} height={"13"} />
            ) : (
              "Password Change"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
export default ChangePassword;
