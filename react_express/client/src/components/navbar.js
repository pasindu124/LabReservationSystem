import React, { Component } from 'react';
import axios from 'axios';

import {
    getFromStorage,
    setInStorage
} from "../utils/storage";
class Navbar extends Component{
    constructor(props){
        super(props)
        this.state = {
            user: ''
        };
        this.onLogout = this.onLogout.bind(this)
        // noinspection JSAnnotator

    }
    componentDidMount(){

        var user = getFromStorage('the_main_app')['user'];
        //console.log(user)
        axios.get(`http://localhost:5000/getUserDetails?token=`+user)
            .then(res => {
                const user = res.data.result;
                this.setState({
                    user: user[0]
                })
                console.log(this.state.user.firstname)


            })
    }
    onLogout(){
        this.props.func();

    }
    render(){
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="#"><i className="fab fa-rebel"></i></a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText"
                            aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/reserve">Reserve</a>
                            </li>
                            <li className="nav-item">
                                <a onClick={this.onLogout} className="nav-link" href="/">Logout</a>
                            </li>


                        </ul>
                        <span className="navbar-text"><b>Welcome! </b>{this.state.user.firstname} {this.state.user.lastname}</span>
                    </div>
                </nav>
            </div>
        );
    }
}
export default Navbar;