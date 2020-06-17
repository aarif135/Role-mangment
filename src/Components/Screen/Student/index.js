import React,{Component} from 'react'
import Navbar from "../../Utility/Navbar";
import { withRouter } from "react-router-dom";
import Modal from '../../Utility/Modal'
import EditModal from '../../Utility/EditModel'


class Student extends Component{
    viewJobs=()=>{this.props.history.push('/AllJobs')

        
        
    }
    render(){
      let data=this.props.location.state.user

        return<div >
            <Navbar/>
            <div style={{ backgroundColor: "lightgrey",width:'100%' }}>
          <h1 style={{ textAlign: "center" }}>Student Dashboard</h1>

        </div>
        <div
          style={{ display: "flex", justifyContent: "space-around" }}
          className="row"
         >
          <div col-sm-4>
<Modal user={data}/>
          </div>
          <div col-sm-4>
      <EditModal userInfo={data}/>
          </div>
          <div col-sm-4>
            <button onClick={this.viewJobs} className="btn btn-primary">view All jobs</button>
          </div>
        </div>

        </div>
    }

}
export default withRouter(Student);
