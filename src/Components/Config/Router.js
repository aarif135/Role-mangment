import React from "react";
import SignUp from '../Screen/Login/signUp'
import SignIn from '../Screen/Login/SignIn'
import Company from '../Screen/Company'
import Myjob from '../Screen/MyJobs'
import Student from '../Screen/Student'
import AllJobs from '../Screen/ViewJobs'
import StudentData from '../Screen/All_Student'
import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/" exact>
          <SignIn/>
         
          </Route>
          <Route path="/Login" >
          <SignIn/>
   
          </Route>
          <Route path="/Signup">
            <SignUp/>
        
    
          </Route>
          <Route path="/company">
            <Company/>
          </Route>
          <Route path="/myjob">
            <Myjob/>
          </Route>
          <Route path="/student">
            <Student/>
          </Route>
          <Route path="/AllJobs">
            <AllJobs/>
          </Route>
          <Route path="/studentData">
            <StudentData/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}