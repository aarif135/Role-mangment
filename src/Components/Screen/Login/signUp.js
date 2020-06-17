import React, { Component } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import { Role } from '../../Role'
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import Swal from 'sweetalert2'
import NavBar from '../../Utility/Navbar'

import { withRouter } from 'react-router-dom'



class SignUp extends Component {

    constructor() {
        super()
        this.state = {
            userName: '',
            email: '',
            password: '',
            selectedValue: ''
        }
    }
    write = (key, value) => {
        this.setState({
            [key]: value
        })

    }

    Submit = () => {

        this.props.history.push("/Login")
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




        const { userName, email, password, selectedValue } = this.state
        let val = Role.studentRole
        if (selectedValue === 'COMPANY') {
            val = Role.companyRole

        } else {
            val = Role.studentRole
        }

        const info = {
            userName, email, selectedValue, val
        }
        console.log(info)

        firebase.auth().createUserWithEmailAndPassword(email, password).then(res => {

            Swal.fire({

                icon: 'success',
                title: 'Registration successfull',
                showConfirmButton: false,
                timer: 1500
            })


        }).catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message,

            })
        })

        firebase.firestore().collection('user').doc().set(info)



    }
    render() {


        return (
            <div style={{ height: "100vh", overflowY: "hidden" }}>
                <NavBar />
                <div style={{ width: 'fit-content', marginTop: '2rem', marginLeft: "3rem", padding: '4rem', boxShadow: "1px 1px 1px 2px grey", }}>
                    <h1 style={{ textAlign: 'center' }}>REGISTRATION</h1>
                    <div >
                        <div className='row'>
                            <div className='col-sm-12 col-lg-12 col-xs-12 col-md-12  '>
                                <p>User Name</p>
                                <input onChange={(e) => this.write("userName", e.target.value)} placeholder='User Name' className='form-control' />
                            </div>



                        </div>
                        <div className='row' style={{ marginTop: '2rem ' }}>
                            <div className='col-sm-12 col-lg-12 col-xs-12 col-md-12'>
                                <p>Email</p>
                                <input type='email' onChange={(e) => this.write("email", e.target.value)} placeholder='Email' className='form-control' />
                            </div>




                        </div>
                        <div className='row' style={{ marginTop: '2rem ' }}>
                            <div className='col-sm-12 col-lg-12 col-xs-12 col-md-06 '>
                                <p >password</p>

                                <input type='password' onChange={(e) => this.write("password", e.target.value)} placeholder='Password' className='form-control' />
                                <br />

                                <select className='form-control col-sm-12 col-lg-12 col-xs-12 col-md-10     ' onChange={(e) => this.write("selectedValue", e.target.value)}>
                                    <option>SELECT ROLE</option>?
        <option value="COMPANY">COMPANY</option>
                                    <option value='STUDENT'>Student</option>

                                </select>
                                <br />
                                <div style={{ marginLeft: "2rem" }} className='row'>
                                    <div className='col-lg-12'>

                                        <button onClick={this.Submit} className='btn btn-success'>SIGN UP</button>
                                    </div>
                                </div>


                            </div>




                        </div>


                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(SignUp);
