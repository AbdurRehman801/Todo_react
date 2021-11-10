import react, { useEffect, useState } from 'react';
import './App.css';
import { auth, database, firebase } from './firebase'
import { useHistory } from "react-router-dom";

function TodoList(props) {
    const [uid, setUid] = useState()
    // console.log("userid", uid)
    const [inputList, setInputList] = useState("");
    const [items, setItems] = useState([])
    const [toggleSubmit, setToggleSubmit] = useState(true);
    const [updateKey, setUpdateKey] = useState()
    const history = useHistory();
    useEffect(() => {
        return auth.onAuthStateChanged(user => {
            console.log("appuser==>", user)
            if (user) {
                console.log("user if", user)
                setUid(user.uid)
            }
            else {
                console.log("user else", history)
            }

        })

    }, [])


    const logOutButton = () => {
        auth.signOut();
        history.push("/login")
    }
    const itemEvent = (event) => {
        setInputList(event.target.value);
    }

    const listOfItems = (user) => {
        if (inputList) {
            console.log("todouser", uid)
            const todoRef = database.ref("/Todo/" + uid);
            const todo = {
                inputList,
            };
            todoRef.push(todo);
            setInputList("")
        } else if (inputList === "") {
            alert("Please fill the TODO!!!")
        }
    }


    useEffect(() => {
        database
            .ref("/Todo/" + uid)
            .on("value", (snapshot) => {
                // console.log("snapshot1===>", user);
                let data = snapshot.val();
                if (snapshot.exists()) {
                    console.log("snapshot1===>", snapshot.val());
                    setItems(data);


                } else {
                    setItems([]);
                }
            });
    }, [uid]);
    console.log("items==>", items)
    const removeButton = (userkey) => {
        console.log("userkey==", userkey);
        database.ref("/Todo/" + uid + "/" + userkey).remove();
    }
    const editButton = (userkey, todo) => {
        console.log(todo, "todo")
        setToggleSubmit(false)
        setInputList(todo)
        setUpdateKey(userkey)




    }
    const updateButton = (userkey, todo) => {
        console.log("update", updateKey)
        database.ref("/Todo/" + uid).child(updateKey).update(
            {
                inputList: inputList
            }
        )
        setToggleSubmit(true)
        setInputList("")
    }



    console.log("toggle", toggleSubmit)

    console.log("snapshot===>", items);

    return (
        <div className="body">
            <div className='button_div'>
                <button className="logOutFunc" onClick={logOutButton}>LogOut</button>
            </div>
            <h1><span className="styling">TODO</span>LIST</h1>
            <div className="input_div">
                <input className="input" required type="text" placeholder="What do you want to do?" onChange={itemEvent} value={inputList} />
                {
                    toggleSubmit ? <button className="addButton" onClick={() => listOfItems(props.user)}><i className="fa fa-plus"></i>+</button> :
                        <button className="editButton" onClick={() => updateButton(items[updateKey].inputList)}>Update</button>

                }

            </div>
            <div className="container">
                <ol>
                    {!!Object.keys(items).length && Object.keys(items).map((chabi) => {
                        return <li >
                            <div className="item">
                                <div className="item_input"   >{items[chabi].inputList}</div>
                                < button className="editButton" onClick={() => editButton(chabi,
                                    items[chabi].inputList
                                )}>EDIT</button>
                                <button className="removeButton" onClick={() => removeButton(chabi)}>DELETE</button>
                            </div>
                        </li>
                    })}
                </ol>


            </div>

        </div >
    );
}

export default TodoList;
