import React, { Component } from 'react';
import '../assert/Jumbo.css';

class Jumbo extends Component{
    render(){
        return(
            <div>
                <div className="jumbotron jumbotron-fulid">
                    <div className="container">
                        <h1 className="display-3">{this.props.title}</h1>
                        <p className="lead">{this.props.subtitle}</p>
                    </div>

                </div>
            </div>

        );
    }
}

export default Jumbo;
