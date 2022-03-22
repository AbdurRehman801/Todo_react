import react, { useEffect, useState } from "react";
import "./Profile.css";
import dummy from "../src/images/dummy.jpg";
import { database, firebase, auth, storage } from "./firebase";
import { BsCameraFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import UpdateProfile from "./UpdateProfile";

const Profile = () => {
  const [array, setArray] = useState([]);
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);
  const reduxdata = useSelector((state) => state.status);
  console.log(reduxdata);

  const types = ["image/jpeg", "image/png"];
  let dataArray = [];
  const handleChange = (e) => {
    console.log("===>");
    let selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      setImage(selected);
      setError("");
    } else {
      setImage(null);
      setError("Please Select an image file (png or jpeg format)");
    }
  };
  const uploadChange = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
            console.log(url);
            alert("Your picture has been uploaded");
            database
              .ref("/USR")
              .child("/users" + "/" + reduxdata.uid)
              .update({
                url: url,
              })
              .then(() => console.log("image upload successfully"))
              .catch((err) => console.log(err));
          });
      }
    );
  };

  useEffect(async () => {
    await auth.onAuthStateChanged(async (user) => {
      console.log("user===>", user.uid);
      await database
        .ref("/USR")
        .child("/users" + "/" + user.uid)
        .on("value", (snapshot) => {
          console.log("snapshot==>", snapshot.val());
          const data = snapshot.val();
          console.log(data, "asasasas");

          setArray(data);
        });
    });
  }, []);
  console.log("array", array);
  return (
    <div className="profile_body">
      <div className="info_div">
        <div className="image_div_parent">
        <div className="image_div">
          <div className="circle">
            <img src={array.url} className="image" />
            <label for="image-lab" className="customcss">
              <span>
                <BsCameraFill />
              </span>
            </label>
          </div>
          <input
            type="file"
            className="image_file"
            onChange={handleChange}
            id="image-lab"
          />
        </div>
        <div className="uploadButtondiv">
          <button onClick={uploadChange} className="uploadButton">
            Upload Picture
          </button>
        </div>
        </div>
        <div className="profile_div">
          <div className="profile_detail">
            <div className="profile_proper">
              <div className="fname_div">
                <h4>First Name {array.firstname}</h4>
              </div>
              <div className="lname_div">
                <h4>Last Name {array.lastname}</h4>
              </div>
              <div className="gen_div">
                <h4>Gender {array.gender}</h4>
              </div>
              <div className="dob_div">
                <h4>Date of Birth {array.dateofbirth}</h4>
              </div>
              <div className="email_div">
                <h4>Email {array.email}</h4>
              </div>
              <div className="rol_div">
                <h4>Role {array.role}</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="prop_class">
          {array.firstname ? <UpdateProfile datas={array} /> : "chal chal "}
        </div>
      </div>
    </div>
  );
};
export default Profile;
