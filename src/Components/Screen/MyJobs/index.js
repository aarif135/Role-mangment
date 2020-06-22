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
      <div style={{overflowX:'hidden'}}>
        <Navbar />
        <button onClick={this.logout} style={{float:"right"}} className='btn btn-info'>LOGOUT</button>
        <div className='row'>
      <div className="col-lg-12 col-sm-12 col-sm-12 col-sm-12">
        
      <h2 style={{textAlign:'center'}}>COMPANY ADS</h2>
      </div>
        </div>
      <div className='row'> 
       {allData.map((item,index)=>{
         return <div style={{marginTop:"2rem"}}  className='container col-md-4 col-lg-3 col-sm-6 col-12'>
           <div className='container' style={{border:"solid black 1px"}}>
       <h1 style={{textAlign:'center'}}>  {`JOB # ${index+1}`}</h1>
       <p  style={{textAlign:'center'}}>  {item.tittle}</p>
       <p  style={{textAlign:'center'}}>  {item.description}</p>
       <p  style={{textAlign:'center'}}>  {item.salary}</p>
       <p  style={{textAlign:'center'}}>  {item.Designation}</p>
         </div>
         </div>
       })}

      </div>
      </div>
    );
  }
}
export default withRouter(Myjob);
