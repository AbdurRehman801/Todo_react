import React, { useState, useEffect } from "react";
import { database, firebase, auth, storage } from "./firebase";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { isLoggedIn } from "./redux/reducer/action";
import status from "./redux/reducer/login";
import ChangePassword from "./ChangePassword";
import { Link } from "react-router-dom";
import PureModal from 'react-pure-modal';
import 'react-pure-modal/dist/react-pure-modal.min.css';

const Update = (props) => {
  console.log(props, "pppppp");
  const [profile, setProfile] = useState({
    firstname: "",
    lastname: "",
    dateofbirth: "",
    email: "",
    gender: "",
    role: "",
    password: "",
  });
  const reduxdata = useSelector((state) => state.status);
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
const style ={
  backgroundColor: "blue",
  padding: "10px 15px",
  border: "none",
  borderRadius: "20px",
  color: "white",
}

  const onSubmits = (event) => {
    event.preventDefault();
    database
      .ref("/USR")
      .child("/users" + "/" + reduxdata.uid)
      .update({
        firstname: profile.firstname,
        lastname: profile.lastname,
        dateofbirth: profile.dateofbirth,
      })
      .then(() => console.log("User Updated Success"))
      .catch((err) => console.log(err));
    dispatch(
      isLoggedIn({
        firstname: profile.firstname,
        lastname: profile.lastname,
        dateofbirth: profile.dateofbirth,
      })
    );
    setModal(false);
  };
  const faltu = useSelector((state) => state.status);
  console.log(faltu, "faltu");
  useEffect(() => {
    setProfile();
  }, [isLoggedIn]);

  console.log(profile, "profile");

  const inputEvent = (event) => {
    setProfile({
      ...profile,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    setProfile(props.datas);
  }, []);

  const { buttonLabel, className, datas } = props;


  return (
    <div>
      <button style={style} onClick={() => setModal(true)}>Update</button>
     <PureModal
        width="520px"

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
                Update Profile
              </legend>

              <FormGroup>
                <Label for="First Name">First Name</Label>
                <Input
                  type="text"
                  name="firstname"
                  value={profile.firstname}
                  placeholder="First Name"
                  onChange={inputEvent}
                />
              </FormGroup>
              <FormGroup>
                <Label for="Last Name">Last Name</Label>
                <Input
                  type="text"
                  name="lastname"
                  value={profile.lastname}
                  placeholder="Last Name"
                  onChange={inputEvent}
                />
              </FormGroup>
              <FormGroup>
                <Label for="Date of Birth">Date of Birth</Label>
                <Input
                  type="date"
                  name="dateofbirth"
                  value={profile.dateofbirth}
                  placeholder="date placeholder"
                  onChange={inputEvent}
                />
              </FormGroup>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="mail"
                  name="email"
                  value={profile.email}
                  onChange={inputEvent}
                  disabled
                />
              </FormGroup>
              <FormGroup>
                <Label for="gender">Gender</Label>
                <Input
                  type="text"
                  name="gender"
                  value={profile.gender}
                  onChange={inputEvent}
                  disabled
                />
              </FormGroup>
              <FormGroup>
                <Label for="role">Role</Label>
                <Input
                  type="text"
                  name="role"
                  value={profile.role}
                  onChange={inputEvent}
                  disabled
                />
              </FormGroup>
              <div>
                <Link to="/ChangePassword">Change Password</Link>
              </div>
              <Button color="primary" size="lg" block type="submit">
                Update
              </Button>
            </fieldset>
          </Form>
          <br />
</PureModal>;
  
    </div>
  );
};
export default Update;
