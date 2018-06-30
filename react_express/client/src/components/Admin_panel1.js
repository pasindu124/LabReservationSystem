import React, { Component } from 'react';
import '../assert/style.css';
import axios from 'axios';

import ReactTable from "react-table";
import "react-table/react-table.css";
import Datepickerfrom from "./Datepickerfrom";
import Datepickerto from "./Datepickerto";

var dateFormat = require('dateformat');
class Admin_panel1 extends Component{
    constructor(props) {
        super(props);
        this.state = {
            tabledata: [

            ],
            signUpEmail: '',
            signUpPassword: '',
            signUpFname: '',
            signUpLname: '',
            signUpError: '',
            makeAdminMessage: '',

            messageAdmin:'',
            isLoading: true,

        };
        this.onChangeSignUpFname = this.onChangeSignUpFname.bind(this);
        this.onChangeSignUpLname = this.onChangeSignUpLname.bind(this);
        this.onChangeSignUpEmail = this.onChangeSignUpEmail.bind(this);
        this.onChangeSignUpPassword = this.onChangeSignUpPassword.bind(this);
        this.onSignUp = this.onSignUp.bind(this);
        this.onAdminSubmit = this.onAdminSubmit.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


    }
    onChangeSignUpFname(event){
         this.setState({
            signUpFname: event.target.value
        })
    }
    onChangeSignUpLname(event){
        this.setState({
            signUpLname: event.target.value
        })
    }
    onChangeSignUpEmail(event){
        this.setState({
            signUpEmail: event.target.value
        })
    }
    onChangeSignUpPassword(event){
        this.setState({
            signUpPassword: event.target.value
        })
    }

    onSignUp(){
        const {
            signUpFname,
            signUpLname,
            signUpEmail,
            signUpPassword
        }= this.state


        fetch('/register',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstname:signUpFname,
                lastname:signUpLname,
                email:signUpEmail,
                password:signUpPassword
            })
        })
            .then(res => res.json())
            .then(json => {
                if(json.success){
                    this.setState({
                        signUpError: json.message,
                        signUpEmail: '',
                        signUpPassword:'',
                        signUpFname: '',
                        signUpLname: ''
                    });

                }else {
                    this.setState({
                        signUpError: json.message,

                    });
                }
            })


    }
    componentDidMount(){
        this.setState({
            isLoading: true,
            tabledata: []
        })
        axios.get('http://localhost:5000/getLatestReservationsAdmin')
            .then((response) => {
                var data= response.data.result
                var length = data.length;

                for(var i=length-1;i>-1;i--){
                    let myobj = {}
                    myobj.labname=data[i].name;
                    var date = dateFormat(data[i].date, "isoDate");
                    myobj.date=date;
                    myobj.time=data[i].time;
                    myobj.user=data[i].userdetails[0].email;
                    this.state.tabledata.push(myobj)
                }
                //console.log(data)
                //console.log(this.state.tabledata)
                this.setState({isLoading: false,messageAdmin:'Latest Reservations'})
            });

    }
    onSubmit(){
        this.setState({
            isLoading: true,
            tabledata: []
        })
        const from1 = document.getElementById('datepickfrom').value;
        const to1 = document.getElementById('datepickto').value;

        const from = '<'+document.getElementById('datepickfrom').value+'>';
        const to = '<'+document.getElementById('datepickto').value+'>';
        const labname = document.getElementById('labname').value;

        axios.post('http://localhost:5000/getLatestReservationsAdminFromTo' ,{
            datefrom:from,
            dateto:to,
            labname:labname
        })
            .then((response) => {
                var data= response.data.result
                var length = data.length;

                for(var i=length-1;i>-1;i--){
                    let myobj = {}
                    myobj.labname=data[i].name;
                    var date = dateFormat(data[i].date, "isoDate");
                    myobj.date=date;
                    myobj.time=data[i].time;
                    myobj.user=data[i].userdetails[0].email;
                    this.state.tabledata.push(myobj)
                }
                console.log(data)
                console.log(this.state.tabledata)
                this.setState({isLoading: false,messageAdmin:'Reservations from: '+from1+' till: '+to1})
            })
        //console.log(from+to+labname)


    }

    onAdminSubmit(){
        var user= document.getElementById('userinput').value;
        axios.post('http://localhost:5000/makeadmin' ,{
            user:user
        })
            .then((response) => {
                this.setState({
                    makeAdminMessage: response.data.message
                })
                document.getElementById('userinput').value = ''
            })
    }
    render(){
        const {
            signUpError,
            signUpEmail,
            signUpPassword,
            signUpFname,
            signUpLname,
            makeAdminMessage,
            isLoading,
            messageAdmin

        } = this.state;
        const data= this.state.tabledata;
        if(isLoading){
            return(
                <div><p>Loading..</p></div>
            )
        }
        return(


            <div>
                {/*Filter panel*/}
                <div>
                    <div className="card border-dark mb-3">
                        <div className="card-header">Filter Details</div>
                        <div className="card-body text-dark">
                            <div>
                                <div className="row">
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlInput1">Date From:</label>
                                            <Datepickerfrom/>

                                        </div>

                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlInput1">Date To:</label>
                                            <Datepickerto/>

                                        </div>

                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlSelect1">Select Lab:</label>
                                            <select className="form-control" id="labname">
                                                <option value="ALL">ALL</option>
                                                <option value="Lab A">Lab A</option>
                                                <option value="Lab B">Lab B</option>
                                                <option value="Lab C">Lab C</option>
                                                <option value="Lab D">Lab D</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-md-1">
                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlSelect1">²</label>

                                            <button onClick={this.onSubmit} type="button" className="btn btn-primary">Submit</button>

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                {/*table*/}
                <div>
                    <h2>{messageAdmin}</h2>
                    <ReactTable
                        data={data}
                        columns={[
                            {
                                Header: "",
                                columns: [
                                    {
                                        Header: "Lab Name",
                                        accessor: "labname"
                                    },
                                    {
                                        Header: "Date",
                                        accessor: "date"

                                    },
                                    {
                                        Header: "Time Slot",
                                        accessor: "time"

                                    },
                                    {
                                        Header: "User",
                                        accessor: "user"

                                    }
                                ]
                            }

                        ]}
                        defaultPageSize={10}
                        className="-striped -highlight"
                    />


                </div>
                {/*register new user*/}
                <div>
                    <div className="row">
                        <div className="col-md-12">
                            <br/>
                            {
                                (signUpError) ? (
                                    <div className="alert alert-success" role="alert">
                                        {signUpError}
                                    </div>
                                ) : null
                            }
                            <h2>Add New User</h2>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">First name</label>
                                    <input type="text" className="form-control" id="fname"
                                           aria-describedby="emailHelp" placeholder="Enter First Name" value={signUpFname}
                                           onChange={this.onChangeSignUpFname} />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Last name</label>
                                    <input type="text" className="form-control" id="lname"
                                           aria-describedby="emailHelp" placeholder="Enter Last Name" value={signUpLname}
                                           onChange={this.onChangeSignUpLname} />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Email address</label>
                                    <input type="email" className="form-control" id="email"
                                           aria-describedby="emailHelp" placeholder="Enter email" value={signUpEmail}
                                           onChange={this.onChangeSignUpEmail} />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Password</label>
                                    <input type="password" className="form-control" id="password"
                                           placeholder="Password" value={signUpPassword} onChange={this.onChangeSignUpPassword}/>
                                </div>

                                <button onClick={this.onSignUp} type="button" className="btn btn-primary">Submit</button>
                            </form>
                            <br/>
                        </div>

                    </div>

                </div>
                {/*create an admin*/}
                <div>
                    <div className="col-md-12">
                        <div className="row">
                            <h2>Make An Admin</h2>
                        </div>

                        <div className="row">

                            {
                                (makeAdminMessage) ? (
                                    <div className="alert alert-primary" role="alert">
                                        {makeAdminMessage}
                                    </div>
                                ) : null
                            }
                        </div>
                        <div className="row">


                            <form className="form-inline">
                                <div className="form-group mb-2">
                                    <label htmlFor="staticEmail2" className="sr-only">Email</label>
                                    <input type="text" readOnly className="form-control-plaintext" id="staticEmail2"
                                           value="Enter email of the User:"/>
                                </div>
                                <div className="form-group mx-sm-3 mb-2">
                                    <label htmlFor="inputPassword2" className="sr-only">Email</label>
                                    <input type="text" className="form-control" id="userinput"
                                           placeholder="Email.."/>
                                </div>
                                <button onClick={this.onAdminSubmit} type="button" className="btn btn-primary mb-2">Confirm!</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


        );
    }

}
export default Admin_panel1;