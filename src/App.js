import react, { useEffect, useState } from 'react';
import './App.css';
import { database, firebase, auth } from './firebase'
import { BrowserRouter } from "react-router-dom"
import { Route, Switch, Redirect } from 'react-router-dom';
import TodoList from './todoList';
import Login from './login';
import SignUp from './signUp';
import { useHistory } from "react-router-dom";
import { Provider } from 'react-redux'
import store from './redux/store'




function App() {
  const [user, setUser] = useState(null)
  
  const history = useHistory()




  useEffect(() => {
    return auth.onAuthStateChanged(user => {
      console.log("appuser==>", user)
      if (user) {

        setUser(user)
      }
      else {
        setUser(null)

      }

    })

  }, [])

  return (
    <div>
      <Provider store={store}>
   
        <BrowserRouter>
          <Switch>
            {!!user ?
              <>
                <Route exact path="/" component={TodoList} />
                {/* < Route exact path="/" component={TodoList}>
                <TodoList user={user} />
              </Route> */}
              </> : <>
                <Route exact path="/Login" component={Login} />
                <Route exact path="/signUp" component={SignUp}/>
                <Route path="*" /><Redirect to="/Login" /> </>
            }

          </Switch>
        </BrowserRouter>
        
      </Provider>
    </div >
  );
}

export default App;
