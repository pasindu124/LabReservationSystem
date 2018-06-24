import React, { Component } from 'react';
import '../assert/style.css';
import Table from "./Table";
class Home_panel2 extends Component{
    constructor(){
        super();
        this.state = {
            date: '',
            lab: ''
        }


    }

    componentDidMount(){


    }



    render(){
        return(
            <div>
                <div className="card border-dark mb-3">
                    <div className="card-header">Reservation Table</div>
                    <div className="card-body text-dark">
                        {/*<h4>{this.props.date}</h4>*/}
                        {/*<h4>{this.props.lab}</h4>*/}
                        <Table products={this.props.products} date={this.props.date}/>
                    </div>
                </div>
            </div>
        );


    }
}

export default Home_panel2;