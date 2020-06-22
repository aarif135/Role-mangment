import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Modal from "../../Utility/Modal";
import Navbar from "../../Utility/Navbar";
import { connect } from "react-redux";
import "firebase/auth";
import * as firebase from "firebase/app";
class Company extends Component {
  componentDidMount() {
    let data=localStorage.getItem("userData")
    let data1=JSON.parse(data)
  }
  myJob=()=>{
    
    
    let data=this.props.location.state.user.userId
    this.props.history.push({pathname:'/myjob',state:{
      userId:data

    }})
  }

  studentData=()=>{
 this.props.history.push('/studentData')
  }
  logout=()=>{

    firebase.auth().signOut().then(()=>{
      localStorage.removeItem('userData')
      this.props.history.push('/login')
    })
  }

  render() {
    let data=this.props.location.state.user
    return (
      <div  style={{ height: "100vh",overflow:'hidden' }}>
        <Navbar />
        <div style={{ backgroundColor: "lightgrey" }}>
          <button style={{float:'right'}} onClick={this.logout} className='btn btn-info'>LOGOUT</button>
          <h1 style={{ textAlign: "center" }}>Company Dashboard</h1>
        </div>
        <div
          style={{ display: "flex", justifyContent: "space-around" }}
          className="row"
         >
          <div >
            <Modal user={data}  />
          </div>
          <div >
            <button onClick={this.myJob} className="btn btn-primary">My Job</button>
          </div>
          <div >
            <button onClick={this.studentData} className="btn btn-primary">All Students</button>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
    return {
      user: state
    };
  };
export default connect(mapStateToProps)(withRouter(Company));
