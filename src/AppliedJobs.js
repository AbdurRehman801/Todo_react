import React, { useState, useEffect } from "react";
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";
import "./AppliedJobs.css";
import { database, firebase, auth, storage } from "./firebase";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Form, FormGroup, Label, Input, FormText } from "reactstrap";
import validation from "./validation";
import { useSelector } from "react-redux";
import { Apply } from "./redux/reducer/action";

const AppliedJobs = ({userID, yellow}) => {
  const [modal, setModal] = useState(false);
  const [errors, setErrors] = useState({});
  const select = useSelector((state) => state.status);
  const [values, setValues] = useState({
    fullName: select.firstname+select.lastname,
    fatherName: "",
    address: "",
    qualification: "",
    experience: "",
    skills: "",
    phoneNumber: "",
  });
  const [isDisabled, setIsDisabled] = useState(false);
  const [key, setKey] = useState();
  const [userkey, setUserKey] = useState();
  const inputEvent = (e) => {
    setErrors(validation(values));
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  // console.log(select);
  const forKey = useSelector((state) => state.jobForm);
  
  console.log("id", userID);
  console.log("pushkey", yellow)

  useEffect(() => {
    console.log("chal bosidke");
    Object.values(forKey)?.map((value, index) => {
      console.log(value, "key1");
      Object.values(value)?.map((value1, index1) => {
        console.log(value1.id, "key2");
        setKey(value1.id);
        setUserKey(value1.userID);
      });
    });
  }, []);
  console.log(userkey, "userkey");
  console.log(key, "key");
  const onSubmits = (e) => {
    e.preventDefault();
    if (
      !values.fullName ||
      !values.fatherName ||
      !values.address ||
      !values.qualification ||
      !values.phoneNumber ||
      !values.experience ||
      !values.skills
    ) {
      alert("Please Fill Up the form");
    } else {
      setErrors(validation(values));
      database
        .ref("/CompanyJobs")
        .child("/" + userID + "/" + yellow + "/Applicants")
        .push({
          fullName: values.fullName,
          fatherName: values.fatherName,
          address: values.address,
          qualification: values.qualification,
          experience: values.experience,
          skills: values.skills,
          phoneNumber: values.phoneNumber,
        })

        .then((res) => {
          alert("Your Application has been Submitted");
          console.log(res, "response")
          database
        .ref("/CompanyJobs")
        .child("/" + userID + "/" + yellow + "/Applicants" +"/" + res.key)
        .update({
          applicantsKey: res.key
        })
          setModal(false);
        })
        .catch((err) => alert(err.message));
    }
  };
  return (
    <div>
      <button
        disabled={isDisabled}
        className="applyButton"
        onClick={() => setModal(true)}
      >
        Apply Now
      </button>
      <PureModal
        width="1000px"
        header="Send Application"
        isOpen={modal}
        closeButton="X"
        closeButtonPosition="bottom"
        onClose={() => {
          setModal(false);
          return true;
        }}
      >
        <Form onSubmit={onSubmits}>
          <fieldset>
            <legend
              style={{
                display: "block",
              }}
            >
              Application
            </legend>
            <FormGroup>
              <Label for="Full Name">Full Name</Label>
              <Input
                type="text"
                name="fullName"
                value={values.fullName}
                placeholder="Full Name"
                onChange={inputEvent}
                disabled
                maxLength="20"
              />
            </FormGroup>
            <div className="companyformerror1">
              {errors.fullName && (
                <p className="companyerror1">{errors.fullName}</p>
              )}
            </div>
            <FormGroup>
              <Label for="Father Name">Father Name</Label>
              <Input
                maxLength="15"
                type="text"
                name="fatherName"
                value={values.fatherName}
                placeholder="Father Name"
                onChange={inputEvent}
              />
            </FormGroup>
            <div className="companyformerror1">
              {errors.fatherName && (
                <p className="companyerror1">{errors.fatherName}</p>
              )}
            </div>
            <FormGroup>
              <Label for="Address">Address</Label>
              <Input
                maxLength="65"
                type="textarea"
                name="address"
                value={values.address}
                onChange={inputEvent}
              />
            </FormGroup>
            <div className="companyformerror9">
              {errors.address && (
                <p className="companyerror9">{errors.address}</p>
              )}
            </div>
            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              <Input
                disabled
                type="email"
                name="email"
                value={select.email}
                placeholder="Email"
                onChange={inputEvent}
              />
            </FormGroup>
            <FormGroup>
              <Label for="Qualification">Qualification</Label>
              <Input
                maxLength="15"
                type="text"
                name="qualification"
                value={values.qualification}
                placeholder="Qualification"
                onChange={inputEvent}
              />
            </FormGroup>
            <div className="companyformerror3">
              {errors.qualification && (
                <p className="companyerror3">{errors.qualification}</p>
              )}
            </div>
            <FormGroup>
              <Label for="Number">Phone Number</Label>
              <Input
                maxLength="10"
                type="number"
                name="phoneNumber"
                value={values.phoneNumber}
                placeholder="Phone Number"
                onChange={inputEvent}
              />
            </FormGroup>
            <div className="companyformerror4">
              {errors.phoneNumber && (
                <p className="companyerror4">{errors.phoneNumber}</p>
              )}
            </div>
            <FormGroup>
              <Label for="Experience">Experience</Label>
              <Input
                type="number"
                name="experience"
                min="0"
                value={values.experience}
                placeholder="Experience"
                onChange={inputEvent}
              />
            </FormGroup>
            <div className="companyformerror6">
              {errors.experience && (
                <p className="companyerror6">{errors.experience}</p>
              )}
            </div>
            <FormGroup>
              <Label for="Skills">Skills</Label>
              <Input
                maxLength="30"
                type="text"
                name="skills"
                value={values.skills}
                placeholder="Skills"
                onChange={inputEvent}
              />
            </FormGroup>
            <div className="companyformerror7">
              {errors.skills && (
                <p className="companyerror7">{errors.skills}</p>
              )}
            </div>

            <Button color="primary" size="lg" block type="submit">
              Apply
            </Button>
          </fieldset>
        </Form>
      </PureModal>
      ;
    </div>
  );
};

export default AppliedJobs;
