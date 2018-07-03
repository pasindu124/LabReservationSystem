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
import Admin from "./pages/Admin";





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
            signUpLname: '',

            role: ''

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
            const {token,role} = obj;
            fetch('/checkLogin?token='+token)
                .then(res => res.json())
                .then(json => {
                    if(json.success){
                        this.setState({
                            token: token,
                            role: role,
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
                    setInStorage('the_main_app',{token: json.token,user:json.user,role:json.role});
                    this.setState({
                        signInError: json.message,
                        isLoading: false,
                        signInEmail: '',
                        signInPassword:''
                    });
                    this.componentDidMount();

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
                            role: '',
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
                <div className="container-fulid overlay" id="loginbody">
                    <div className="col-md-12 text-center">
                        <div className="row center-div">
                            <img src="http://2.bp.blogspot.com/-n31qNm8G8JY/TcTC4GfvQuI/AAAAAAAAAHY/ODaq0QyuiqM/s400/Home.png" alt=""/>
                        </div>
                        <div className="row">
                            <div id="addQuestion">
                                <div className="col-md-5">
                                    {
                                        (signInError) ? (
                                            <div className="alert alert-danger" role="alert">
                                                {signInError}
                                            </div>
                                        ) : null
                                    }

                                    <h2>UCSC Lab Reservation System</h2>
                                    <br/>
                                    <form>
                                        <div className="form-group">
                                            <input type="email" className="form-control" id="signemail"
                                                   aria-describedby="emailHelp" placeholder="Enter email" value={signInEmail}
                                                   onChange={this.onChangeSignInEmail} />

                                        </div>
                                        <br/>
                                        <div className="form-group">
                                            <input type="password" className="form-control" id="signpassword"
                                                   placeholder="Password" value={signInPassword} onChange={this.onChangeSignInPassword}/>
                                        </div>

                                        <a onClick={this.onSignIn} className="btn btn-primary">Log In</a>
                                    </form>
                                </div>
                            </div>
                        </div>


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

                    {
                        (this.state.role=='admin') ? (
                            <Route path="/admin" component={Admin} />
                        ) : null

                    }


                </div>
            </Router>
        );
    }
}

export default App;
