import React, { Component } from 'react';
import '../App.css';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Jumbo from '../components/Jumbo';
import Admin_panel1 from "../components/Admin_panel1";




class Admin extends Component {
    render() {
        return (
            <div>
                <Navbar func={this.props.func}/>
                <Jumbo title="Welcome" subtitle="Lab allocations.."/>

                <div className="container">
                    <h2>Admin Panel</h2>
                    <Admin_panel1/>


                </div>
                <Footer/>
            </div>
        );
    }
}

export default Admin;
