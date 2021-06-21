// import logo from './logo.svg';
import "./App.css";
import Navbar from "./components/shared/navbar/Navbar";
import Home from "./components/Home/Home";
import { FakePosts } from "./Fake_job_posts";
import { createContext, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PostJob from "./components/employer/PostJob";
import LogIn from "./components/LogIn/LogIn";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

export const UserContext = createContext();
function App() {
  const [loggedInUser, setLoggedInUser] = useState(false);
  return (
    <UserContext.Provider value={{ FakePosts, loggedInUser, setLoggedInUser }}>
      <div className="App"></div>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/login">
            <LogIn />
          </Route>
          <Route path="/employer/postJob">
            <PostJob />
          </Route>

          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
