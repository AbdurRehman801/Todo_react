import React, { useEffect, useState } from "react";
import "./InboxMessagesDetails.css";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";

function InboxMessagesDetails() {
  const [filterData, setFilterData] = useState();
  const params = useParams();
  console.log(params, "params");
  const { applicantsID } = params;
  console.log(applicantsID, "????");
  const select = useSelector((state) => state.jobForm);
  console.log(select);
  useEffect(() => {
    Object.values(select).map((value, index) => {
      console.log(value, "1st");
      Object.values(value).map((value1, index1) => {
        console.log(value1.Applicants, "2nd");
        if (value1.Applicants !== undefined) {
          Object.values(value1.Applicants).map((value2, index2) => {
            console.log(value2, "3rd");
            if (value2.applicantsKey === applicantsID) {
              setFilterData(value2);
            }
          });
        }
      });
    });
  }, [select]);
  console.log(filterData);
  return (
    <div className="IMD_body">
      <div className="IMD_top"></div>
      <div className="IMD_detail_div">
        <div className="IMD_detail">
          <div className="IMD_deatil_CN_div">
            <div className="IMD_CN_title">Father Name</div>
            <div className="IMD_CN_name"> {filterData?.fatherName}</div>
          </div>
          <div className="IMD_deatil_CN_div">
            <div className="IMD_CN_title">Phone Number</div>
            <div className="IMD_CN_name">{filterData?.phoneNumber}</div>
          </div>
          <div className="IMD_deatil_CN_div">
            <div className="IMD_CN_title">Qualification</div>
            <div className="IMD_CN_name">{filterData?.qualification}</div>
          </div>
          <div className="IMD_deatil_CN_div">
            <div className="IMD_CN_title">Skills</div>
            <div className="IMD_CN_name">{filterData?.skills}</div>
          </div>
          <div className="IMD_deatil_CN_div">
            <div className="IMD_CN_title">Experience</div>
            <div className="IMD_CN_name">{filterData?.experience} Years</div>
          </div>
        </div>
        <div className="IMD_time_div">
          <div className="image_div_parent">
            <div className="image_div"></div>
          </div>
          <div className="jobType_div">
            <div className="jobType_show">{filterData?.fullName}</div>
          </div>
          <div className="IMD_detail_div2">
            <div className="IMD_deatil_CN_div">
              <div className="IMD_CN_title">Address</div>
              <div className="IMD_CN_name">{filterData?.address}</div>
            </div>
            <div className="IMD_deatil_CN_div">
              <div className="IMD_CN_title">Hobbies</div>
              <div className="IMD_CN_name">
                <ul>
                  <li>Punchual in Work</li>
                  <li>Reading Books</li>
                  <li>Playing Cricket</li>
                </ul>
              </div>
            </div>
            <div className="IMD_deatil_CN_div">
              <div className="IMD_CN_title"> </div>
              <div className="IMD_CN_name">
                <p className="time"></p>
              </div>
            </div>
          </div>
          <div className="apply_button_div"></div>
        </div>
      </div>
    </div>
  );
}

export default InboxMessagesDetails;
