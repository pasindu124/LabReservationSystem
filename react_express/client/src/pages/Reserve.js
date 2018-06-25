import React, { Component } from 'react';
import '../App.css';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Jumbo from '../components/Jumbo';
import Reserve_panel1 from "../components/Reserve_panel1";
import Reserve_panel2 from "../components/Reserve_panel2";


class Reserve extends Component {
    render() {
        return (
            <div>
                <Navbar/>
                <Jumbo title="Reserve Labs" subtitle="Find and reserver.."/>

                <div className="container">
                    <Reserve_panel2/>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default Reserve;
