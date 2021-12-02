import React, { useState, useEffect } from "react";
import { database, firebase, auth, storage } from "./firebase";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IoAddSharp } from "react-icons/io5";
import { jobsDatas } from "./redux/reducer/action";
import jobForm from "./redux/reducer/CompanyJobsForm";
import validation from "./validation";
import "./companyJobsFormUpdate.css"

const CompanyJobsFormUpdate = (props) => {
  const [values, setValues] = useState({
    companyName: "",
    email: "",
    website: "",
    vancancies: "",
    dateOfApply: "",
    experience: "",
    skills: "",
    jobType: "",
    description: "",
  });
  const [errors, setErrors] = useState({});

  const reduxdata = useSelector((state) => state.status);
  const dispatch = useDispatch();
  // console.log(reduxdata);
  const inputEvent = (e) => {
    setErrors(validation(values));
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmits = (e) => {
    e.preventDefault();
    if (
      !values.companyName ||
      !values.email ||
      !values.website ||
      !values.vancancies ||
      !values.dateOfApply ||
      !values.experience ||
      !values.skills ||
      !values.jobType ||
      !values.description
    ) {
      alert("Please Fill Up the form");
    } else {
      setErrors(validation(values));
      database
        .ref("/CompanyJobs")
        .child("/" + reduxdata.uid + "/" + props.pushKey)
        .update({
          companyName: values.companyName,
          email: values.email,
          website: values.website,
          vancancies: values.vancancies,
          dateOfApply: values.dateOfApply,
          experience: values.experience,
          skills: values.skills,
          jobType: values.jobType,
          description: values.description,
        })
        .then(() => alert("Job Update"))
        .catch((err) => alert(err.message));
    }
  };
  useEffect(() => {
    setValues(props.formValue);
}
    , []);
    const deleted = () =>{
      database
      .ref("/CompanyJobs")
        .child("/" + reduxdata.uid + "/" + props.pushKey)
        .remove()
  }
  const awain = useSelector((state) => state);
  // console.log(awain)

  const { buttonLabel, className, pushKey, formValue } = props;

  const [modal, setModal] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [closeAll, setCloseAll] = useState(false);

  const toggle = () => setModal(!modal);
  const toggleNested = () => {
    setNestedModal(!nestedModal);
    setCloseAll(false);
  };
  const toggleAll = () => {
    setNestedModal(!nestedModal);
    setCloseAll(true);
  };
  return (
    <div>
      <div className="companyCardbottons">
      <Button color="primary" onClick={toggle}>
        {buttonLabel}
        Update
      </Button>
      <Button color="danger" onClick={deleted}>
        {buttonLabel}
        Delete
      </Button>
      </div>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Job Form</ModalHeader>
        <ModalBody>
          <Form style={{ overflow: "scroll" }} onSubmit={onSubmits}>
            <fieldset>
              <legend
                style={{
                  display: "block",
                }}
              >
                Post Jobs
              </legend>

              <FormGroup>
                <Label for="Company Name">Company Name</Label>
                <Input
                  type="text"
                  name="companyName"
                  value={values.companyName}
                  placeholder="Company Name"
                  onChange={inputEvent}
                />
              </FormGroup>
              <div className="companyformerror1">
                {errors.companyName && (
                  <p className="companyerror1">{errors.companyName}</p>
                )}
              </div>
              <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={values.email}
                  placeholder="Email"
                  onChange={inputEvent}
                />
              </FormGroup>
              <div className="companyformerror2">
                {errors.email && (
                  <p className="companyerror2">{errors.email}</p>
                )}
              </div>
              <FormGroup>
                <Label for="Website">Website</Label>
                <Input
                  type="url"
                  name="website"
                  value={values.website}
                  placeholder="http://www.example.com"
                  onChange={inputEvent}
                />
              </FormGroup>
              <div className="companyformerror3">
                {errors.website && (
                  <p className="companyerror3">{errors.website}</p>
                )}
              </div>
              <FormGroup>
                <Label for="Number">Number of Vacancies</Label>
                <Input
                  type="number"
                  name="vancancies"
                  value={values.vancancies}
                  placeholder="number of Vacacies"
                  onChange={inputEvent}
                />
              </FormGroup>
              <div className="companyformerror4">
                {errors.vancancies && (
                  <p className="companyerror4">{errors.vancancies}</p>
                )}
              </div>
              <FormGroup>
                <Label for="exampleDate">Last Date of Apply</Label>
                <Input
                  type="date"
                  name="dateOfApply"
                  value={values.dateOfApply}
                  placeholder="date placeholder"
                  onChange={inputEvent}
                />
              </FormGroup>
              <div className="companyformerror5">
                {errors.dateOfApply && (
                  <p className="companyerror5">{errors.dateOfApply}</p>
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
              <FormGroup>
                <Label for="Job Type">Job Type</Label>
                <Input
                  type="select"
                  name="jobType"
                  value={values.jobType}
                  onChange={inputEvent}
                >
                  <option>Part Time</option>
                  <option>Full Time</option>
                </Input>
              </FormGroup>
              <div className="companyformerror8">
                {errors.jobType && (
                  <p className="companyerror8">{errors.jobType}</p>
                )}
              </div>
              <FormGroup>
                <Label for="Description">Description</Label>
                <Input
                  type="textarea"
                  name="description"
                  value={values.description}
                  onChange={inputEvent}
                />
              </FormGroup>
              <div className="companyformerror9">
                {errors.description && (
                  <p className="companyerror9">{errors.description}</p>
                )}
              </div>
              <Button color="primary" size="lg" block type="submit">
                Post
              </Button>
            </fieldset>
          </Form>
          <br />
        </ModalBody>
      </Modal>
    </div>
  );
};
export default CompanyJobsFormUpdate;
