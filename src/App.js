import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/shared/navbar/Navbar";
import Home from "./components/Home/Home";
import { FakePosts } from "./Fake_job_posts";
import { createContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PostJob from "./components/employer/PostJob";
import LogIn from "./components/LogIn/LogIn";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Profile from "./components/employer/Profile";

export const UserContext = createContext();
function App() {
  const [loggedInUser, setLoggedInUser] = useState(false);
  const [allJobPost, setAllJobPost] = useState([]);
  useEffect(() => {
    fetch(`https://frozen-shelf-53269.herokuapp.com/allPostedJobs`)
      .then((res) => res.json())
      .then((data) => {
        console.log("all psted job data ", data);
        setAllJobPost(data);
      });
  }, []);
  return (
    <UserContext.Provider value={{ allJobPost, loggedInUser, setLoggedInUser }}>
      <div className="App">this is home section</div>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/login">
            <LogIn />
          </Route>
          <Route path="/employer/postJob">
            <PostJob />
          </Route>
          <PrivateRoute path="/user/profile">
            <Profile />
          </PrivateRoute>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
