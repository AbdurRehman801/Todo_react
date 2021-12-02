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

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
                {/* <Route exact path="/" component={TodoList} /> */}
                <Route path="/Profile" component={Profile} />
                <Route path="/ChangePassword" component={ChangePassword} />
                <Route path="/Company" component={Company} />
                <Route path="/CompanyJobs" component={CompanyJobs} />
                <Route
                  path="/StudentProfileCompany"
                  component={StudentProfileForCompany}
                />
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
