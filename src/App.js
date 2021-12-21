import react, { useEffect, useState } from "react";
import "./App.css";
import { database, firebase, auth } from "./firebase";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch, Redirect } from "react-router-dom";
import TodoList from "./todoList";
import Login from "./login";
import SignUp from "./signUp";
import { useHistory } from "react-router-dom";
import { Provider } from "react-redux";
import ScaleLoader from "react-spinners/ScaleLoader";
import store from "./redux/store";
import Error from "./error";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedIn } from "./redux/reducer/action";
import status from "./redux/reducer/login";
import Profile from "./Profile";
import "bootstrap/dist/css/bootstrap.min.css";
import ChangePassword from "./ChangePassword";
import ForgetPassword from "./ForgetPassword";
import Company from "./Company";
import StudentProfileForCompany from "./StudentProfileForCompany";
import CompanyJobs from "./CompanyJobs";
import Student from "./Student";
import Vacancies from "./Vacancies";
import { jobsDatas } from "./redux/reducer/action";
import jobForm from "./redux/reducer/CompanyJobsForm";
import VacanciesDetail from "./VacanciesDetail";
import AppliedJobs from "./AppliedJobs";
import InboxMessagesOfStudents from "./InboxMessagesOfStudents";
import InboxMessagesDetails from "./InboxMessagesDetails";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userID, setUserID]= useState()
  const [key, setKey]= useState()
  const reduxdorm = useSelector((state)=> state.status)
  console.log(reduxdorm)
  const forID = useSelector((state)=> state.jobForm)
  console.log(forID, "ID")


  const history = useHistory();
  const dispatch = useDispatch();

  const style = {
    textAlign: "center",
    backgroundColor: "#190742",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100vh",
  };

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      setLoading(false);
      console.log("appuser==>", user);
      if (user) {
        setUser(user);
        database
          .ref("/USR")
          .child("/users" + "/" + user?.uid)
          .on("value", (snapshot) => {
            console.log("snapshot===>", snapshot.val());
            const roles = snapshot.val();
            dispatch(
              isLoggedIn({
                email: roles.email,
                name: roles.name,
                role: roles.role,
                uid: user.uid,
              })
            );
          });
      } else {
        setUser(null);
      }
    });
  }, []);
  useEffect(() => {
      var starCountRef = database
        .ref("/CompanyJobs")
        .child("/");
      starCountRef.on("value", (snapshot) => {
        const data = snapshot.val();
        console.log("data=====>", data);
        dispatch(
          jobsDatas(
            data,
          )
        );
      });
  }, [reduxdorm.uid]);
  useEffect(()=>{
    Object.values(forID).map((value,index)=>{
      console.log(value, "appvalue")
      Object.values(value).map((value1, index1)=>{
        console.log(value1, 'appvalue2')
        setUserID(value1.userID)
        setKey(value1.id)

      })
    })
  }, [])
  // console.log(userID)
  // console.log(key)
  return (
    <div>
      {loading ? (
        <div style={style}>
          <ScaleLoader color={"#BFFF00"} loading={loading} />
        </div>
      ) : (
        <BrowserRouter>
          {user ? (
            <>
              <Switch>
                <Route exact path="/" component={TodoList} />
                <Route path="/Profile" component={Profile} />
                <Route path="/ChangePassword" component={ChangePassword} />
                <Route path="/Company" component={Company} />
                <Route path="/CompanyJobs" component={CompanyJobs} />
                <Route
                  path="/StudentProfileCompany"
                  component={StudentProfileForCompany}
                />
                <Route path="/InboxMessagesOfStudents/:id" component={InboxMessagesOfStudents}/>
                <Route path="/Student" component = {Student}/>
                <Route path="/Vacancies" component={Vacancies}/>
                <Route path="/VacanciesDetail/:id" component={VacanciesDetail}/>
                <Route path="/InboxMessagesDetails/:applicantsID" component={InboxMessagesDetails}/>
              </Switch>
            </>
          ) : (
            <>
              <Switch>
                <Route exact path="/Login" component={Login} />
                <Route path="/SignUp" component={SignUp} />
                <Route path="/ForgetPassword" component={ForgetPassword} />
                <Route path="*">
                  <Error />
                </Route>
              </Switch>
            </>
          )}
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
