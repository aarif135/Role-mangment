import React, { Component } from "react";
import NavBar from "../../Utility/Navbar";
import * as firebase from "firebase/app";

class ViewJob extends Component {
  state = {
    PostedJob: [],
    searchlist: [],
    searchFlag: false,
  };
  componentDidMount() {
    var firebaseConfig = {
      apiKey: "AIzaSyAd7C7vZlvhY0BT3wza_lIP_YewMmywnEY",
      authDomain: "owais-1d9f6.firebaseapp.com",
      databaseURL: "https://owais-1d9f6.firebaseio.com",
      projectId: "owais-1d9f6",
      storageBucket: "owais-1d9f6.appspot.com",
      messagingSenderId: "267556268221",
      appId: "1:267556268221:web:57e64c0ee9871923",
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    let { PostedJob } = this.state;
    firebase
      .firestore()
      .collection("companyData")
      .get()
      .then((data) => {
        data.forEach((docs) => {
          PostedJob.push(docs.data());
        });
        this.setState({
          PostedJob,
        });
      });
  }
  search = (e) => {
    const { PostedJob } = this.state;
    let searchlist = PostedJob.filter((index) => {
      return index.tittle.includes(e.target.value.toLowerCase()) == true;
    });
    console.log(searchlist);
    this.setState({
      searchlist,
      searchFlag: true,
    });
  };
apply= (item,index)=>{
 let lcData= localStorage.getItem("userData")
 let data=JSON.parse(lcData)
 let currentUser=data.userId
 
  const applicant={...item,currentUser}
firebase.firestore().collection("appliedJob").add(applicant).then(res=>{
  alert("you have succesfully apllied for this job")
  
}) 
}
  render() {
    const { PostedJob, searchlist, searchFlag } = this.state;
    console.log(PostedJob);

    return (
      <div style={{ background: "lightblue" }}>
        <NavBar />
        <div style={{ backgroundColor: "lightgrey", width: "100%" }}>
          <p
            className="display-4"
            style={{
              fontWeight: "bold",
              textAlign: "center",
              border: "solid black 2px",
              textTransform: "uppercase",
            }}
          >
            available JOBS
          </p>
        </div>
        <div className="row container">
          <div className="col-md-4">
            <input
              onChange={this.search}
              className="form-control"
              placeholder="Search for jobs"
              style={{ float: "right" }}
            />{" "}
          </div>
        </div>
        <div className="row container-fluid">
          {searchFlag
            ? searchlist.map((item,index) => {
                return (
                  <div
                    className="col-md-5"
                    style={{
                      boxShadow: "1px 1px 1px 1px grey",
                      marginLeft: "50px",
                      height: "13rem",
                      background: "white",
                      marginTop: "15px",
                    }}
                  >
                    <p
                      className="display-4"
                      style={{
                        fontWeight: "bold",
                        textTransform: "capitalize",
                        textAlign: "center",
                      }}
                    >
                      {item.tittle}
                    </p>
                    <table>
                      <tr style={{ fontWeight: "bold" }}>
                        Designation :<td>{item.Designation}</td>
                      </tr>
                      <tr style={{ fontWeight: "bold", textAlign: "center" }}>
                        DESCRIPTION :<td>{item.descripttion}</td>
                      </tr>
                      <tr style={{ fontWeight: "bold", textAlign: "center" }}>
                        SALARY:
                        <td>{item.salary}</td>
                      </tr>
                      <tr style={{ textAlign: "center" }}>
                        {" "}
                        <button
                          onClick={()=>this.apply(item,index)}
                          className="btn btn-success"
                        >
                          APPLY
                        </button>
                      </tr>
                    </table>
                  </div>
                );
              })
            : PostedJob.map((item,index) => {
                return (
                  <div
                    className="col-md-5"
                    style={{
                      boxShadow: "1px 1px 1px 1px grey",
                      marginLeft: "50px",
                      height: "13rem",
                      background: "white",
                      marginTop: "15px",
                    }}
                  >
                    <p
                      className="display-4"
                      style={{
                        fontWeight: "bold",
                        textTransform: "capitalize",
                        textAlign: "center",
                      }}
                    >
                      {item.tittle}
                    </p>
                    <table>
                      <tr style={{ fontWeight: "bold" }}>
                        Designation :<td>{item.Designation}</td>
                      </tr>
                      <tr style={{ fontWeight: "bold", textAlign: "center" }}>
                        DESCRIPTION :<td>{item.descripttion}</td>
                      </tr>
                      <tr style={{ fontWeight: "bold", textAlign: "center" }}>
                        SALARY:
                        <td>{item.salary}</td>

                      </tr>
                    <tr style={{display:'none'}}><td>{item.userId}</td></tr>
                      <button onClick={()=>this.apply(item,index)} className="btn btn-success">APPLY</button>

                    </table>
                  </div>
                );
              })}

          {/*             
            {PostedJob.map((item)=>{
                
                

                return<div className='col-md-5' style={{boxShadow:"1px 1px 1px 1px grey",marginLeft:"50px",height:"13rem",background:"white",marginTop:'15px' }}>
               
                    <p className='display-4' style={{fontWeight:'bold',textTransform:'capitalize',textAlign:'center'}}>{item.tittle}</p>
                    <table >
                        <tr  style={{fontWeight:"bold",}}>Designation :
            <td>{item.Designation}</td>
                        </tr>
                        <tr style={{fontWeight:"bold",textAlign:'center'}}>DESCRIPTION :
            <td>{item.descripttion}</td>
                        </tr>
                        <tr style={{fontWeight:"bold",textAlign:'center'}}>
                            SALARY:
            <td>{item.salary}</td>
                        </tr>
                        <tr style={{textAlign:"center"}}> <button className="btn btn-success">APPLY</button></tr>
                    </table>
                </div>
            })} */}
        </div>
      </div>
    );
  }
}
export default ViewJob;
