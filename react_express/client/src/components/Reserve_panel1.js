import React, { Component } from 'react';
import '../assert/style.css';
import Datepicker from './Datepicker';
import axios from 'axios';
import Message from "./Message";

class Reserve_panel1 extends Component{
    constructor(props) {
        super(props);

        this.state = {flag: '',message1:'',message2:'',clsname: '',visibi: 'row invisible'};

        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkClick = this.checkClick.bind(this);

    }
    checkClick(event){
        this.setState({flag: true});

        var date = "<"+document.getElementById('datepick').value+">";
        var time = document.getElementById('labtime').value;
        var name = document.getElementById('labname').value;


        const data = {
            date: date,
            time: time,
            name: name

        }
        axios.post('http://localhost:5000/checkAvalable' ,{data})
            .then((response) => {
                if(response.data != null){
                    this.setState({message1: "Not Available..",message2: "Sorry your time slot is not available!",clsname: "alert alert-danger text-center",visibi:"row invisible"})
                }else {
                    this.setState({message1: "Available..",message2: "Time slot is available. you can reserve it now!",clsname: "alert alert-success text-center",visibi:"row"})
                }
            })



    }


    handleSubmit(event){

        var date = "<"+document.getElementById('datepick').value+">";
        var time = document.getElementById('labtime').value;
        var name = document.getElementById('labname').value;


        const data = {
            date: date,
            time: time,
            name: name

        }
        axios.post('http://localhost:5000/insertdata' ,{data})
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
        this.setState({message1: "Success..",message2: "You have successfully reserve this time slot!",clsname: "alert alert-info text-center",visibi:"row"})

    }

    render(){
        return(
            <div>
                <div className="card border-dark mb-3">
                    <div className="card-header">Filter Details</div>
                    <div className="card-body text-dark">

                        <div>
                            <form>
                                <div className="row">

                                    <div className="col-md-3">

                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlInput1">Date:</label>
                                            <Datepicker/>
                                        </div>
                                    </div>

                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlSelect1">Select Lab:</label>
                                            <select className="form-control" id="labname" name="labname" >
                                                <option value="Lab A">Lab A</option>
                                                <option value="Lab B">Lab B</option>
                                                <option value="Lab C">Lab C</option>
                                                <option value="Lab D">Lab D</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlSelect1" id="" >Time Slot:</label>
                                            <select className="form-control" id="labtime" name="labtime" >
                                                <option value="08.00-09.00">08.00-09.00</option>
                                                <option value="09.00-10.00">09.00-10.00</option>
                                                <option value="10.00-11.00">10.00-11.00</option>
                                                <option value="11.00-12.00">11.00-12.00</option>
                                                <option value="13.00-14.00">13.00-14.00</option>
                                                <option value="14.00-15.00">14.00-15.00</option>
                                                <option value="15.00-16.00">15.00-16.00</option>
                                                <option value="16.00-17.00">16.00-17.00</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlSelect1" id="" >Click</label>
                                            <button onClick={this.checkClick} type="button" className="btn btn-default">Check Avalability</button>



                                        </div>

                                    </div>

                                </div>

                                {this.state.flag && <Message message1={this.state.message1} message2={this.state.message2} clsname={this.state.clsname}/> }



                                <div className={this.state.visibi}>
                                    <div className="col-md-12">
                                        <div align="center">
                                            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">RESERVE</button>


                                            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div class="modal-dialog" role="document">
                                                    <div class="modal-content">
                                                        <div class="modal-header">
                                                            <h5 class="modal-title" id="exampleModalLabel">Confirm Your Reservation..</h5>
                                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                <span aria-hidden="true">&times;</span>
                                                            </button>
                                                        </div>
                                                        <div class="modal-body">
                                                            ...
                                                        </div>
                                                        <div class="modal-footer">
                                                            <button  type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                                            <button onClick={this.handleSubmit} data-dismiss="modal" type="button" class="btn btn-primary">Save changes</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );


    }
}

export default Reserve_panel1;