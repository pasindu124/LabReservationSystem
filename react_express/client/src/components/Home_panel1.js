import React, { Component } from 'react';
import '../assert/style.css';
import Datepicker from './Datepicker';
import axios from 'axios';
import Home_panel2 from "./Home_panel2";

class Home_panel1 extends Component{
    constructor(props) {
        super(props);
        this.state = {
            date: '',
            lab: '',
            products: []
        };
        this.checkReserve = this.checkReserve.bind(this)

    }
    componentDidMount() {
        var date = "<" + document.getElementById('datepick').value + ">";
        var lab = document.getElementById('labname').value;
        axios.get('http://localhost:5000/getResDetails?date='+date+'&lab=Lab A')
            .then((response) => {
                console.log(response.data)
                this.state.products.push(response.data)
                this.setState({date:date})
                //console.log(this.state.products)
            });
        axios.get('http://localhost:5000/getResDetails?date='+date+'&lab=Lab B')
            .then((response) => {
                console.log(response.data)
                this.state.products.push(response.data)
                this.setState({date:date})
                //console.log(this.state.products)
            });
        axios.get('http://localhost:5000/getResDetails?date='+date+'&lab=Lab C')
            .then((response) => {
                console.log(response.data)
                this.state.products.push(response.data)
                this.setState({date:date})
                //console.log(this.state.products)
            });
        axios.get('http://localhost:5000/getResDetails?date='+date+'&lab=Lab D')
            .then((response) => {
                console.log(response.data)
                this.state.products.push(response.data)
                this.setState({date:date})
                //console.log(this.state.prod
            });
    }

    checkReserve(event){
        var date = "<"+document.getElementById('datepick').value+">";
        var lab  = document.getElementById('labname').value;
        this.setState({products:[]});
        if(lab!= "ALL"){
            axios.get('http://localhost:5000/getResDetails?date='+date+'&lab='+lab)
                .then((response) => {
                    console.log(response.data)
                    this.state.products.push(response.data)
                    this.setState({date:date})
                    console.log(this.state.products)
                });
        }else {
            this.componentDidMount();
        }



    }

    render(){
        return(
            <div>
                <div className="card border-dark mb-3">
                    <div className="card-header">Filter Details</div>
                    <div className="card-body text-dark">
                        <div>
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

                                        <button onClick={this.checkReserve} type="button" className="btn btn-primary">Submit</button>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <Home_panel2 products={this.state.products} date={this.state.date}/>
            </div>
        );


    }
}

export default Home_panel1;