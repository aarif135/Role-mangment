import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import "firebase/firestore";
import * as firebase from "firebase/app";
import "firebase/auth";
import '@firebase/firestore';
import 'firebase/storage';  // <----


import Swal from "sweetalert2";

class EditModal extends Component {
  constructor() {
    super();
    this.state = {
      tittle: "",
      descripttion: "",
      Designation: "",  
      salary: "",
      role: 0,
      name: "",
      email: "",
      qualification: "",
      stdnDetail: [],
      condtionalBtn: false,
      image:''
    };
  }
  componentDidMount() {
    let data = JSON.parse(localStorage.getItem("userData"));
    this.setState({
      role: data.role,
    });
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
    const { stdnDetail,email,qualification,name } = this.state;
    firebase
      .firestore()
      .collection("studentDetail")
      .get()
      .then((studentDetail) => {
        studentDetail.forEach((doc) => {
            for(var detail  in doc.data()){
                let get=  localStorage.getItem('userData')
                let anonther=JSON.parse(get)
                if(anonther.userId===doc.data()[detail]){
                           stdnDetail.push(doc.data())
        
        
                }
                  // l])
                }
        });
        
        this.setState({ stdnDetail });
        let emailAdd;
        let editedQul;
        let editedName;
        stdnDetail.map(item=>{
         emailAdd=item.email
         editedQul=item.qualification
         editedName=item.name
     
     
        })
        this.setState({
            email:emailAdd,
            qualification:editedQul,
            name:editedName
        })
      });

  }

  stateChange = () => {
    this.setState({
      smShow: true,
      setLgShow: true,
    });
  };
  hide = () => {
    this.setState({
      setLgShow: false,
      smShow: false,
    });
  };
  handleChange = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  addDetail = (e) => {
    e.preventDefault();
    const storage = firebase.storage();

    const { email, name, qualification,image } = this.state;
    const userId = this.props.userInfo.userId;
    let fileType=image.type.split('/')[1]
    let fileName=userId+"_"+Date.now()
    fileName=fileName+"."+fileType
     let storageRef = storage.ref("studentImage/" + fileName)

     storageRef.put(image).then(res=>{
         storageRef.getDownloadURL().then(url=>{
            
             const data = {
                email,
                name,
                qualification,
                userId,
                url
              };
            
              firebase
                .firestore()
                .collection("studentDetail")
                .doc(userId)
                .set(data)
          
                .then((res) => {
                  setTimeout(() => {
                    Swal.fire({
                      icon: "success",
                      title: "Your work has been set",
                      showConfirmButton: false,
                      timer: 1500,
                    });
                  }, 3000);
                  this.hide();
                })
                .catch((error) => {
                  alert(error.message);
                });

         })
     })
   
  };

  render() {
    const { smShow, role, stdnDetail,email,qualification,name } = this.state;
    // let loc = JSON.parse(localStorage.getItem("userData"));

    
    // for (let des in stdnDetail) {
    //     for (let inner in stdnDetail[des]) {
    //       if (stdnDetail[des][inner] ==loc.email) {
     
    //         inner] )
    //       }
    //     }
    //   }
  

    return (

      <>
       
          <div>
            <button className="btn btn-primary " onClick={this.stateChange}>
            EDIT DETAIL
            </button>
            <Modal
              size="lg"
              show={smShow}
              onHide={this.hide}
              aria-labelledby="example-modal-sizes-title-lg"
            >
              <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                  STUDENT DETAIL
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form onSubmit={this.addDetail}>
                  <div className="row">
                    <div className="col-sm-10">
                      <h3>Student Name</h3>
                      <input
                        placeholder="Name"
                        value={name}

                        onChange={(e) =>
                          this.handleChange("name", e.target.value)
                        }
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-10">
                      <h3>Email Address</h3>
                      <input
                        placeholder="Email"
                        value={email}
                        onChange={(e) =>
                          this.handleChange("email", e.target.value)
                        }
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-10">
                      <h3>Qualification</h3>
                      {/* <input
                        placeholder="qualification"
                        onChange={(e) =>
                          this.handleChange("qualification", e.target.value)
                        }
                        className="form-control"
                      /> */}
                      
                      <select value={qualification} className='form-control' onChange={(e) =>
                          this.handleChange("qualification", e.target.value)
                        } >
                          
                          <option>Matric</option>
                          <option>Intermidate</option>
                          <option>Undergraduate</option>
                          <option>masters</option>


                        </select>
                        <br/>
                  <input  type="file" onChange={(e)=>this.handleChange("image",e.target.files[0])}/>
                  
                    </div>
                  </div>

                 
                    <button type="submit" className="btn btn-success">
                      Submit
                    </button>
                 
                  
                </form>
              </Modal.Body>
            </Modal>
          </div>
       </>
    );
  }
}
export default EditModal;
