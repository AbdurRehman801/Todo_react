import React, { useState, useEffect } from "react";
import "./CompanyJobs.css";
import CompanyJobsForm from "./CompanyJobsForm";
import { database, firebase, auth, storage } from "./firebase";
import { useSelector, useDispatch } from "react-redux";
import ScaleLoader from "react-spinners/ScaleLoader";
import CompanyJobsFormUpdate from "./companyJobsFormUpdate";
import { jobsDatas } from "./redux/reducer/action";
import jobForm from "./redux/reducer/CompanyJobsForm";

const CompanyJobs = () => {
  const [array, setArray] = useState({});
  const arr = [];
  const [loading, setLoading] = useState(false);
  const [datakey, setDataKey]= useState()
  const dispatch = useDispatch()

  const reduxdata = useSelector((state) => state.status);
  useEffect(() => {
    setLoading(true)
    if (reduxdata.uid) {
      var starCountRef = database
        .ref("/CompanyJobs")
        .child("/" + reduxdata.uid);
      starCountRef.on("value", (snapshot) => {
        const data = snapshot.val();
        console.log("data=====>", data);
        setArray(data ? data : {});
        data &&
          Object.values(data).map((value1, index1) => {
            value1["pushKey"] = Object.keys(data)[index1];
            arr.push(value1);
            setDataKey(value1.pushKey)
          });
          dispatch(
            jobsDatas({
              companyName: "",
              email: "",
              website: "",
              vancancies: "",
              dateOfApply: "",
              experience: "",
              skills: "",
              jobType: "",
              description: "",
            })
          )
      });
      setLoading(false)
    }
  }, [reduxdata.uid]);

  return (
    <div className="companyjob_body">
      {loading ? (
       <div className="companyjobloader"> 
        <ScaleLoader color={"#BFFF00"} loading={loading} />
        </div> ) : (
        Object.values(array).map((value3, index3) => {
          console.log(value3, "database");
          return (
            <div className="companyjob_show">
              <div className="companyname">
                <div>Company Name:</div>
                <div>{value3.companyName}</div>
              </div>
              <div className="companyemail">
                <div> Email:</div>
                <div>{value3.email}</div>
              </div>
              <div className="companywebsite ">
                <div>Website:</div>
                <div>{value3.website}</div>
              </div>
              <div className="companyvacancies">
                <div>Vacancies:</div>
                <div>{value3.vancancies}</div>
              </div>
              <div className="companydate">
                <div>Last Date of Apply:</div>
                <div>{value3.dateOfApply}</div>
              </div>
              <div className="companyexperience">
                <div>Experience:</div>
                <div>{value3.experience}</div>
              </div>
              <div className="companyskills">
                <div>Skills:</div>
                <div>{value3.skills}</div>
              </div>
              <div className="companyjobtype">
                <div>Job Type:</div>
                <div>{value3.jobType}</div>
              </div>
              <div className="companydescription">
                <div>Description:</div>
                <div>{value3.description}</div>
              </div>
              <CompanyJobsFormUpdate formValue={value3} pushKey={datakey}/>
            </div>
          );
        })
        )}

      <div className="companyjob_add_div">
        <CompanyJobsForm />
      </div>
    </div>
  );
};
export default CompanyJobs;
