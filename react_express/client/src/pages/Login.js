import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';




class Login extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event){
        var email = document.getElementById('inputEmail').value;
        var password = document.getElementById('inputPassword').value;

        console.log(email+" "+password);
        axios.post('http://localhost:5000/login', {
            email: email,
            password: password
        })
            .then(function (response) {
                console.log(response)
                if(response.data){
                    console.log("yes")
                }else {
                    console.log("no")
                }
            })


    }

    render() {
        return (
            <div className="text-center" id="login">
                <form action="/" className="form-signin">
                    <img className="mb-4" src="https://getbootstrap.com/assets/brand/bootstrap-solid.svg" alt=""
                         width="72" height="72" />
                        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                        <label htmlFor="inputEmail" className="sr-only">Email address</label>
                        <input type="email" id="inputEmail" className="form-control" placeholder="Email address"
                               required autoFocus />
                    <br/>
                        <label htmlFor="inputPassword" className="sr-only">Password</label>
                        <input type="password" id="inputPassword" className="form-control" placeholder="Password"
                               required />
                    <br/>
                        <button onClick={this.handleSubmit} className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                        <p className="mt-5 mb-3 text-muted">&copy; Lab Reservation System</p>
                </form>
            </div>
        );
    }
}

export default Login;
