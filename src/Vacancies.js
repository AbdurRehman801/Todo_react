import React, { useState, useEffect } from "react";
import "./Vacancies.css";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { database, firebase, auth } from "./firebase";
import { NavLink } from "react-router-dom";

const Vacancies = () => {
  const arr = [];
  const goto = [];
  const history = useHistory();
  const goToDetails = () => {
    history.push("/VacanciesDetail");
  };
  const selection = useSelector((state) => state.jobForm);
  const reduxdata = useSelector((state) => state.status);

  console.log(selection, "selection");
  Object.values(selection).map((value, index) => {
    console.log("vac", value);
    Object.values(value).map((value1, index1) => {
      arr.push(value1);
    });
  });
  console.log(arr, "state");
  
  
  return (
    <div className="vacancies_body">
      {arr.map((value2, index1) => {
        console.log(value2)
        let id = value2.id;
        console.log(id)
        return (
          <div className="vacancies_show">
            <div className="vacancy_title">
              <p className="vacancy_title_p">
                Company Name:{value2.companyName}
              </p>
            </div>
            <div className="vacancy_detail_btn_div">
              <button className="vacancy_detail_btn">
                <NavLink to={`/VacanciesDetail/${id}`}> Details</NavLink>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Vacancies;
