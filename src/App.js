import react, { useEffect, useState } from 'react';
import './App.css';
import { database, firebase } from './firebase'

function App() {
  const [inputList, setInputList] = useState("");
  const [items, setItems] = useState([])
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [updateKey, setUpdateKey] = useState()  




  const itemEvent = (event) => {
    setInputList(event.target.value);
  }

  const listOfItems = () => {
    const todoRef = database.ref("/Todo");
    const todo = {
      inputList,
    };
    todoRef.push(todo);
    setInputList("")
  }


  useEffect(() => {
    database
      .ref("/Todo")
      .on("value", (snapshot) => {
        console.log("snapshot1===>", snapshot.val());
        let data = snapshot.val();
        if (snapshot.exists()) {
          console.log("snapshot1===>", snapshot.val());
          setItems(data);

          // data && Object.keys(data).map((value, index) => {
          //   value["pushKey"] = Object.keys(data)[index];

          //   setUserKey(value.pushKey)
          //   console.log("pushkey", userkey)


          // });
        } else {
          setItems([]);
        }
      });
  }, []);
  const removeButton = (userkey) => {
    console.log("userkey==", userkey);
    database.ref("/Todo" + "/" + userkey).remove();
  }
  const editButton = (userkey, todo) => {
    console.log(todo, "todo" )
    setToggleSubmit(false)
    setInputList(todo)
      setUpdateKey(userkey)
    



  }
const updateButton = (userkey, todo) =>{
  console.log("update", updateKey)
     database.ref("/Todo").child(updateKey).update(
      {
        inputList:inputList
      }
   )
   setToggleSubmit(true)
   setInputList("")
}



console.log("toggle", toggleSubmit)

  console.log("snapshot===>", items);
  
  return (
    <div className="body">
      <h1><span className="styling">TODO</span>LIST</h1>
      <div className="input_div">
        <input className="input" type="text" placeholder="What do you want to do?" onChange={itemEvent} value={inputList} />
        {
          toggleSubmit ? <button className="addButton" onClick={listOfItems}><i className="fa fa-plus"></i>+</button>:
          <button className="editButton" onClick={()=>updateButton(items[updateKey].inputList)}>Update</button>

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

export default App;
