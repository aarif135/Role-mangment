import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Modal from "../../Utility/Modal";
import Navbar from "../../Utility/Navbar";
import { connect } from "react-redux";
class Company extends Component {
  componentDidMount() {
    let data=localStorage.getItem("userData")
    let data1=JSON.parse(data)
    console.log(data1)
  }
  myJob=()=>{
    
    
    let data=this.props.location.state.user.userId
    this.props.history.push({pathname:'/myjob',state:{
      userId:data

    }})
  }
  // userData=()=>{
  //   let data=localStorage.getItem("userData")
  //   let data1=JSON.stringify(data)
  // }
  studentData=()=>{
    console.log(this.props.history.push('/studentData'))
  }

  render() {
    let data=this.props.location.state.user
    console.log(data)
    return (
      <div  style={{ height: "100vh",overflow:'hidden' }}>
        <Navbar />
        <div style={{ backgroundColor: "lightgrey" }}>
          <h1 style={{ textAlign: "center" }}>Company Dashboard</h1>
        </div>
        <div
          style={{ display: "flex", justifyContent: "space-around" }}
          className="row"
         >
          <div col-sm-4>
            <Modal user={data}  />
          </div>
          <div col-sm-4>
            <button onClick={this.myJob} className="btn btn-primary">My Job</button>
          </div>
          <div col-sm-4>
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
