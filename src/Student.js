import React from "react";
import { auth, database } from "./firebase";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import Profile from "./Profile";
import "./Student.css"



const Student = () =>{
    const history = useHistory();
    const studentLogOut = () => {
      auth
        .signOut()
        .then(() => {
          history.push("/Login");
        })
        .catch((error) => {});
    };
    return(
        <div className="student_body">
        <div className="student_navbar">
          <ul className="student_navbar_ul">
            <li>
              <NavLink
                activeClassName="active_class"
                to="/Vacancies"
              >
                Vacancies
              </NavLink>
            </li>
          
            <li>
              <NavLink activeClassName="active_class" to="/Profile">
                Profile
              </NavLink>
            </li>
          </ul>
          <div className="student_logout_div">
            <button className="student_logout" onClick={studentLogOut}>
              Logout
            </button>
          </div>
        </div>
      </div>
    )
}
export default Student
