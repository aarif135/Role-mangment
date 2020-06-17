import React, { Component } from "react";
import NavBar from "../../Utility/Navbar";
import * as firebase from "firebase/app";
import Css from "../../../App.css";
import { compose } from "redux";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

class StudentData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentInfo: [],
    };
  }
  componentDidMount() {
    const { studentInfo } = this.state;

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

    firebase
      .firestore()
      .collection("studentDetail")
      .get()
      .then((data) => {
        data.forEach((docs) => {
          this.state.studentInfo.push(docs.data());
        });
        this.setState({
          studentInfo,
        });
      });
  }
  abc = (e) => {
    console.log(e.target);
  };

  render() {
    const { studentInfo } = this.state;
    console.log(studentInfo.length !== 0);
    return (
      <div
        className={studentInfo.length !== 0 ? "card-div" : "card-ex"}
        style={{ overflow: "hidden", background:studentInfo==0?"white":'' }}
      >
        <NavBar />
        <div style={{ backgroundColor: "lightgrey", width: "100%" }}>
          <h1 style={{ textAlign: "center", border: "solid black 2px" }}>
            Student Information
          </h1>
        </div>
        {studentInfo.length == 0 ? (
          <div style={{ marginLeft: "45%", }}>
            <Loader type="ThreeDots" color="black" height={100} width={100} />
          </div>
        ) : (
          <div className="row ">
            {studentInfo.map((item) => {
              return (
                <div
                  onMouseOver={this.abc}
                  className="col-md-8 col-sm-8 col-lg-4 col-xs-4 Card-inner"
                >
                  <div
                    className="card text-center card-inner "
                    style={{
                      margin: "34px",
                      marginLeft: "44",
                      border: "solid black 1px",
                    }}
                  >
                    <p
                      className="display-5"
                      style={{
                        fontWeight: "bold",
                        fontSize: "30px",
                        fontStyle: "italic",
                      }}
                    >
                      STUDENT INFORMATION
                    </p>
                    <img
                      src={item.url}
                      className="rounded-circle img"
                      height="170px"
                      style={{
                        margin: "auto",
                        boxShadow: "1rem 1rem 1rem grey;",
                      }}
                      alt="profile picture"
                    />
                    <p className="text-center" style={{ fontWeight: "bold" }}>
                      {"NAME:" + item.name}
                    </p>

                    <p className="text-center" style={{ fontWeight: "bold" }}>
                      {"EMAIL:" + item.email}
                    </p>
                    <p className="text-center" style={{ fontWeight: "bold" }}>
                      {"Qulification:" + item.qualification}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}
export default StudentData;
