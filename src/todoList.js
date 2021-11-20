import react, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { auth, database, firebase } from "./firebase";
import { useHistory } from "react-router-dom";
import ScaleLoader from "react-spinners/ScaleLoader";
import { VscAdd } from "react-icons/vsc";
import { BiLogOut } from "react-icons/bi";
import todo from "./redux/reducer/data";
import { todoDatas } from "./redux/reducer/action";
// import { todoDatas } from "./redux/reducer/action/index";




function TodoList(props) {
  const [uid, setUid] = useState();
  const [inputList, setInputList] = useState("");
  const [items, setItems] = useState([]);
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [updateKey, setUpdateKey] = useState();
  const [delButton, setdelButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const selector = useSelector((state)=> state.todo);
  const reduxdata = useSelector((state)=>state.status)
  const dispatch = useDispatch();
  console.log("state===>", reduxdata)
  const history = useHistory();
  useEffect(() => {
    // setLoading(true);
    return auth.onAuthStateChanged((user) => {
      if (user) {
        setUid(user.uid);
        // setLoading(false);
      } else {
        history.push("/Login");
        // setLoading(false);
      }
    });
  }, []);

  const logOutButton = () => {
    auth.signOut();
    history.push("/Login");
  };
  const itemEvent = (event) => {
    setInputList(event.target.value);
    setError("");
  };

  const listOfItems = (e) => {
    e.preventDefault();

    if (inputList) {
      const todoRef = database.ref("/Todo/" + uid);
      // dispatch({ todo: inputList})
      dispatch(
        todoDatas({
          items: inputList
        })
      )


      const todo = {
        inputList,
      };
      todoRef.push(todo);
      setInputList("");
    } else if (inputList === "") {
      setError("Please fill up the TODO!!!!");
    }
  };

  useEffect(() => {
    setLoading(true);
    database.ref("/Todo/" + uid).on("value", (snapshot) => {
      let data = snapshot.val();
      if (snapshot.exists()) {
        setItems(data);
        setLoading(false);
      } else {
        setItems([]);
        setLoading(false);   
      }
    });
  }, [uid]);
  const removeButton = (userkey) => {
    database.ref("/Todo/" + uid + "/" + userkey).remove();
  };
  const editButton = (userkey, todo) => {
    setToggleSubmit(false);
    setInputList(todo);
    setdelButton(true);
    setUpdateKey(userkey);
  };
  const updateButton = (userkey, todo) => {
    database
      .ref("/Todo/" + uid)
      .child(updateKey)
      .update({
        inputList: inputList,
      });
    setToggleSubmit(true);
    setInputList("");
    setdelButton(false);
  };

  return (
          <div className={reduxdata.role==="Student" ?"studentbody": reduxdata.role==="Company" ? "companybody" : reduxdata.role==="Admin"? "adminbody": null}>
    
              <>
            <div className="button_div">
              <button className="logOutFunc" onClick={logOutButton}>
              <BiLogOut/> Logout
              </button>
            </div>
            <h1>
              <span className="styling">TODO</span>LIST
            </h1>
            <form className="input_div" onSubmit={listOfItems}>
              <input
                className="input"
                type="text"
                maxLength="20"
                placeholder="What do you want to do?"
                onChange={itemEvent}
                value={inputList}
              />
              {toggleSubmit ? (
                <button type="submit" className="addButton">
                  {" "}
                  <VscAdd />{" "}
                </button>
              ) : (
                <button
                  className="editButton"
                  onClick={() => updateButton(items[updateKey].inputList)}
                >
                  Update
                </button>
              )}
            </form>
            <div className="spani">
            <span className="span1">{error}</span>
            </div>
            <div className="container">
            {loading ? <div className="loader">
            <ScaleLoader
                            color={"#BFFF00"}
                            loading={loading}
                             />
              </div>:
              <ol>
                {!!Object.keys(items).length &&
                  Object.keys(items).map((chabi) => {
                    return (
                      <li>
                        <div className="item">
                          <div className="item_input">
                            {items[chabi].inputList}
                          </div>
                          <button
                            className="editButton"
                            onClick={() =>
                              editButton(chabi, items[chabi].inputList)
                            }
                          >
                            EDIT
                          </button>
                          <button
                            className="removeButton"
                            disabled={delButton}
                            onClick={() => removeButton(chabi)}
                          >
                            DELETE
                          </button>
                        </div>
                      </li>
                    );
                  })}
              </ol>
              }
            </div>
            </>
              
          </div>
        )
}

export default TodoList;
