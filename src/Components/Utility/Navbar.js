import React,{Component} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
class Navbar extends Component{
    render(){
        return(<div  style={{backgroundColor:'black' ,width:'100%', height:'4rem'}} className='container-fluid'>
            <div className="row"  >
                <div className="col-12" style={{display:'flex' ,alignItems:'baseline' ,justifyContent:'center'}}  >
                    <h3     style={{color:'white',textAlign:'center'}}>ROLE MANAGMENT APP</h3>
                </div>
            </div>

        </div>)
    }
}
export default Navbar