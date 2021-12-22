import React from "react";
import { NavLink } from "react-router-dom";
import CompanyJobs from "./CompanyJobs";
import StudentProfileForCompany from "./StudentProfileForCompany";
import Profile from "./Profile";
import "./Company.css";
import { auth, database } from "./firebase";
import { useHistory } from "react-router";

const Company = () => {
  const history = useHistory();
  const companyLogOut = () => {
    auth
      .signOut()
      .then(() => {
        history.push("/");
      })
      .catch((error) => {});
  };
  return (
    <div className="company_body">
      <div className="company_navbar">
        <ul className="company_navbar_ul">
          <li>
            <NavLink
              activeClassName="active_class"
              to="/StudentProfileForCompany"
            >
              Students
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active_class" to="/CompanyJobs">
              Jobs
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active_class" to="/Profile">
              Profile
            </NavLink>
          </li>
        </ul>
        <div className="company_logout_div">
          <button className="company_logout" onClick={companyLogOut}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
export default Company;
