import React, { Component } from 'react';
import App from '../App'
class Navbar extends Component{
    constructor(props){
        super(props)

        this.onLogout = this.onLogout.bind(this)
        // noinspection JSAnnotator

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
                        <span className="navbar-text">Online Lab Reservation</span>
                    </div>
                </nav>
            </div>
        );
    }
}
export default Navbar;