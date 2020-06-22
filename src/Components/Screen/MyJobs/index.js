import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "firebase/firestore";
import * as firebase from "firebase/app";
import Navbar from "../../Utility/Navbar";
import "firebase/auth";

class Myjob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allData: [],
      userId: "",
      dataId: [],
    };
  }
  componentDidMount() {
    var firebaseConfig = {
      apiKey: "AIzaSyAd7C7vZlvhY0BT3wza_lIP_YewMmywnEY",
      authDomain: "owais-1d9f6.firebaseapp.com",
      databaseURL: "https://owais-1d9f6.firebaseio.com",
      projectId: "owais-1d9f6",
      storageBucket: "owais-1d9f6.appspot.com",
      messagingSenderId: "267556268221",
      appId: "1:267556268221:web:57e64c0ee9871923"
    };
    // Initialize Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
  }
      let userId = this.props.location.state.userId;
    this.setState({
      userId,
    });

    let companyData = [];


    firebase.firestore().collection("companyData").get().then((data)=>{
      data.forEach((com)=>{
        for(var detail  in com.data()){
        let get=  localStorage.getItem('userData')
        let anonther=JSON.parse(get)
        if(anonther.userId===com.data()[detail]){
          companyData.push(com.data())


        }
        }
        
      })
      this.setState({
        allData:companyData
      })
    

    })
  }
  logout=()=>{

    firebase.auth().signOut().then(()=>{
      localStorage.removeItem('userData')
      this.props.history.push('/login')
    })
  }

  render() {
    const { allData } = this.state;

    return (
      <div>
        <Navbar />
        <button onClick={this.logout} style={{float:"right"}} className='btn btn-info'>LOGOUT</button>
        <h1>Company ads</h1>
        <table className="table table-hover">
          <tr>
            <th>JOB TITLE</th>
            <th>JOB DESIGNATION</th>
            <th>JOB DESCRIPTION</th>
            <th>SALARY</th>
          </tr>
          {allData.map((item) => {  
            return (
              <tr>
                <td>{item.tittle}</td>
            <tr>{item.Designation}</tr>
                <td>{item.descripttion}</td>
                <td>{item.salary}</td>
              </tr>
            );
          })}
        </table>
      </div>
    );
  }
}
export default withRouter(Myjob);
