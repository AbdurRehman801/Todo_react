import React, { useState, useEffect } from "react";
import "./InboxMessagesOfStudents.css";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { database, firebase, auth } from "./firebase";
import { NavLink } from "react-router-dom";

const InboxMessagesOfStudents = (props) => {
  const [oneKey, setOneKey] = useState();
  const [twokey, setTwoKey] = useState();
  const [threekey, setThreeKey] = useState();
  const [values, setValues] = useState();
  const select = useSelector((state) => state.jobForm);
  console.log(select);
  useEffect(() => {
    const arr = [];
    Object.values(select).map((value, index) => {
      console.log(value);
      Object.values(value).map((value1, index1) => {
        console.log(value1, "2nd");
        setOneKey(value1.userID);
        setTwoKey(value1.id);
        Object.values(value1).map((value2, index2) => {
          console.log(value2, "nested");
          
            arr.push( value2)
            
            
            if (value2.applicantsKey !== undefined) {
              setThreeKey(value2.applicantsKey);
            }
          });
        });
      });
      if(Object.keys(select || {}).length)
      setValues(Object.values(select)[0][props.match.params.id]);
    }, [select]);
    
  console.log(oneKey, "1st");
  console.log(twokey, "2nd");
  console.log(threekey, "3rd");
  console.log(values && values, "name", props.match.params.id);
  return (
    <div className="MessagesBody">
      {values && Object.values(values?.Applicants).map((value4, index4)=>{
        let applicantsID = value4.applicantsKey
        console.log(applicantsID)
        return <div className="message_show">
        <div className="message_title">
          <p className="message_title_p">Student Name: {value4?.fullName} </p>
        </div>
        <div className="message_detail_btn_div">
          <button className="messages_detail_btn">
            <NavLink to={`/InboxMessagesDetails/${applicantsID}`}> Details</NavLink>
          </button>
        </div>
      </div>
      })}
    </div>
  );
};
export default InboxMessagesOfStudents;
