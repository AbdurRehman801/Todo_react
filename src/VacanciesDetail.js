import React, { useState, useEffect } from "react";
import "./VacanciesDetail.css";
import { useSelector } from "react-redux";
import { database, firebase, auth, storage } from "./firebase";
import { useParams } from "react-router";
import status from "./redux/reducer/login";
import AppliedJobs from "./AppliedJobs";

const VacanciesDetail = (props) => {
  const [filterData, setFilterData] = useState();
  const params = useParams();
  const { id } = params;
  console.log(id);
  const arr = [];
  const select = useSelector((state) => state.status);
  const reduxdata = useSelector((state) => state.jobForm);

  console.log(reduxdata);
  useEffect(() => {
    Object.values(reduxdata).map((value, index) => {
      console.log(value, "1st");
      const items = Object.values(value)?.find(
        (value1, index1) => value1?.id === id
      );
      console.log(items);
      if (items !== undefined) {
        setFilterData(items);
      }
    });
  }, [reduxdata]);

  console.log(filterData);

  console.log(filterData, "akslaskla");
  return (
    <div className="VD_body">
      <div className="VD_top"></div>
      <div className="VD_detail_div">
        <div className="VD_detail">
          <div className="VD_deatil_CN_div">
            <div className="VD_CN_title">Company Name</div>
            <div className="VD_CN_name">{filterData?.companyName} </div>
          </div>
          <div className="VD_deatil_CN_div">
            <div className="VD_CN_title">Description</div>
            <div className="VD_CN_name">{filterData?.description}</div>
          </div>
          <div className="VD_deatil_CN_div">
            <div className="VD_CN_title">Skills Required</div>
            <div className="VD_CN_name">{filterData?.skills}</div>
          </div>
          <div className="VD_deatil_CN_div">
            <div className="VD_CN_title">Our Website</div>
            <div className="VD_CN_name">{filterData?.website}</div>
          </div>
          <div className="VD_deatil_CN_div">
            <div className="VD_CN_title">Experience Required</div>
            <div className="VD_CN_name">{filterData?.experience}</div>
          </div>
        </div>
        <div className="VD_time_div">
          <div className="image_div_parent">
            <div className="image_div"></div>
          </div>
          <div className="jobType_div">
            <div className="jobType_show">{filterData?.jobType}</div>
          </div>
          <div className="VD_detail_div2">
            <div className="VD_deatil_CN_div">
              <div className="VD_CN_title">Last Date of Apply</div>
              <div className="VD_CN_name">{filterData?.dateOfApply}</div>
            </div>
            <div className="VD_deatil_CN_div">
              <div className="VD_CN_title">Extra Benefits</div>
              <div className="VD_CN_name">
                <ul>
                  <li>Medical Free</li>
                  <li>Transport Free</li>
                  <li>Life Insurance</li>
                </ul>
              </div>
            </div>
            <div className="VD_deatil_CN_div">
              <div className="VD_CN_title">Timing </div>
              <div className="VD_CN_name">
                <p className="time">9:00PM to 5PM (Monday to Saturday)</p>
              </div>
            </div>
          </div>
          <div className="apply_button_div">
            <AppliedJobs userID={filterData?.userID} yellow={filterData?.id} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default VacanciesDetail;
