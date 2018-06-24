import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import Home from './pages/Home'
import Reserve from "./pages/Reserve";
import Login from "./pages/Login";

import {
    getFromStorage,
    setInStorage
} from "./utils/storage";





class App extends Component {
    constructor(props){
        super(props)

        this.state = {
            isLoading: true,
            token: '',
            signUpError: '',
            signInError: '',

            signInEmail: '',
            signInPassword: '',
            signUpEmail: '',
            signUpPassword: '',
            signUpFname: '',
            signUpLname: ''

        }
        this.onChangeSignInEmail = this.onChangeSignInEmail.bind(this);
        this.onChangeSignInPassword = this.onChangeSignInPassword.bind(this);
        this.onChangeSignUpFname = this.onChangeSignUpFname.bind(this);
        this.onChangeSignUpLname = this.onChangeSignUpLname.bind(this);
        this.onChangeSignUpEmail = this.onChangeSignUpEmail.bind(this);
        this.onChangeSignUpPassword = this.onChangeSignUpPassword.bind(this);

        this.onSignUp = this.onSignUp.bind(this);
        this.onSignIn = this.onSignIn.bind(this);
        this.logout = this.logout.bind(this);

    }
    componentDidMount() {
        const obj = getFromStorage('the_main_app');

        if(obj && obj.token){
            const {token} = obj;
            fetch('/checkLogin?token='+token)
                .then(res => res.json())
                .then(json => {
                    if(json.success){
                        this.setState({
                            token: token,
                            isLoading: false
                        })
                    }else {
                        this.setState({
                            isLoading: false
                        })
                    }
                })
        }else {
            this.setState({
                isLoading: false
            });
        }
    }
    onChangeSignInEmail(event){
        this.setState({
            signInEmail: event.target.value
        })

    }
    onChangeSignInPassword(event){
        this.setState({
            signInPassword: event.target.value
        })

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

        this.setState({
            isLoading: true
        })
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
                            isLoading: false,
                            signUpEmail: '',
                            signUpPassword:'',
                            signUpFname: '',
                            signUpLname: ''
                        });

                    }else {
                        this.setState({
                            signUpError: json.message,
                            isLoading: false
                        });
                    }
                })


    }

    onSignIn(){
        const {
            signInEmail,
            signInPassword
        }= this.state

        this.setState({
            isLoading: true
        })
        fetch('/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email:signInEmail,
                password:signInPassword
            })
        })
            .then(res => res.json())
            .then(json => {
                if(json.success){
                    setInStorage('the_main_app',{token: json.token});
                    this.setState({
                        signInError: json.message,
                        isLoading: false,
                        signInEmail: '',
                        signInPassword:''
                    });

                }else {
                    this.setState({
                        signInError: json.message,
                        isLoading: false
                    });
                }
            })


    }

    logout(){
        this.setState({
            isLoading:true
        });
        const obj = getFromStorage('the_main_app');
        if(obj && obj.token){
            const {token} = obj;
            fetch('/logout?token='+token)
                .then(res => res.json())
                .then(json => {
                    if(json.success){
                        this.setState({
                            token: '',
                            isLoading: false
                        })
                    }else {
                        this.setState({
                            isLoading: false
                        })
                    }
                })
        }

    }

    render() {
        const {
            isLoading,
            token,
            signInError,
            signUpError,
            signInEmail,
            signInPassword,
            signUpEmail,
            signUpPassword,
            signUpFname,
            signUpLname
        } = this.state;



        if(isLoading){
            return (<div><p>Loading...</p></div>);
        }

        if(!token){
            return (
                <div className="container">

                    <div className="col-md-4">
                        {
                            (signInError) ? (
                                <p>{signInError}</p>
                            ) : null
                        }

                        <h2>Sign In</h2>

                        <form action="/">
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Email address</label>
                                <input type="email" className="form-control" id="signemail"
                                       aria-describedby="emailHelp" placeholder="Enter email" value={signInEmail}
                                       onChange={this.onChangeSignInEmail} />

                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input type="password" className="form-control" id="signpassword"
                                       placeholder="Password" value={signInPassword} onChange={this.onChangeSignInPassword}/>
                            </div>

                            <a href="#/" onClick={this.onSignIn} className="btn btn-primary">Submit</a>
                        </form>
                    </div>
                    <div>
                        {
                            (signUpError) ? (
                                <p>{signUpError}</p>
                            ) : null
                        }
                        <h2>Sign Up</h2>
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
                    </div>
                </div>
            );
        }
        return (
            <Router>
                <div>

                    <Route
                        exact path="/"

                        render={(props) => <Home {...props} func={this.logout} />}
                    />

                    <Route path="/reserve" component={Reserve}/>
                    <Route path="/login" component={Login} />

                </div>
            </Router>
        );
    }
}

export default App;
