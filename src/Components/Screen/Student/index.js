import React,{Component} from 'react'
import Navbar from "../../Utility/Navbar";
import { withRouter } from "react-router-dom";
import Modal from '../../Utility/Modal'
import EditModal from '../../Utility/EditModel'
import "firebase/auth";
import * as firebase from "firebase/app";




class Student extends Component{
    viewJobs=()=>{this.props.history.push('/AllJobs')

    }
    logout=()=>{
      firebase.auth().signOut().then(()=>{
        localStorage.removeItem('userData')
        this.props.history.push('/login')
      })
    }
    render(){
      let data=this.props.location.state.user

        return<div style={{overflowX:"hidden"}} >
            <Navbar/>
            <div style={{ backgroundColor: "lightgrey",width:'100%' }}>
          <button onClick={this.logout} className='btn btn-info' style={{float:'right'}}>LOGOUT</button>
          <h1 style={{ textAlign: "center" }}>Student Dashboard</h1>

        </div>
        <div
          style={{ display: "flex", justifyContent: "space-around" }}
          className="row"
         >
          <div >
<Modal user={data}/>
          </div>
          <div >
      <EditModal userInfo={data}/>
          </div>
          <div >
            <button onClick={this.viewJobs} className="btn btn-primary">view All jobs</button>
          </div>
        </div>

        </div>
    }

}
export default withRouter(Student);
