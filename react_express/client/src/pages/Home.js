import React, { Component } from 'react';
import '../App.css';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Jumbo from '../components/Jumbo';
import Home_panel1 from "../components/Home_panel1";



class Home extends Component {
    render() {
        return (
            <div>
                <Navbar func={this.props.func}/>
                <Jumbo title="Welcome" subtitle="Lab allocations.."/>

                <div className="container">
                    <h2>{this.props.isAuthed}</h2>
                    <Home_panel1/>


                </div>
                <Footer/>
            </div>
        );
    }
}

export default Home;
