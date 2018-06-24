import React, { Component } from 'react';
import Reserve_panel1 from "./Reserve_panel1";

class Message extends Component{
    render(){
        return(
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <div className={this.props.clsname}>
                            <strong>{this.props.message1}</strong> {this.props.message2}
                        </div>
                    </div>

                </div>


            </div>

        );
    }
}

export default Message;