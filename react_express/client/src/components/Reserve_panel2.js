import React, { Component } from 'react';
import '../assert/style.css';
import ReactTable from "react-table";
import "react-table/react-table.css";
import axios from 'axios';
import Reserve_panel1 from "./Reserve_panel1";
var dateFormat = require('dateformat');

class Reserve_panel2 extends Component{
    constructor(props) {
        super(props);

        this.state = {
            latestdata: [],
            isloading: true
        };

        this.updateCom = this.updateCom.bind(this);

    }

    componentDidMount(){
        this.setState({
            isLoading: true
        })
        axios.get('http://localhost:5000/getLatestReservations')
            .then((response) =>{
                var data = response.data.result;
                var length = data.length;

                for(var i=length-1;i>-1;i--){
                    let myobj = {}
                    myobj.labname=data[i].name;
                    var date = dateFormat(data[i].date, "isoDate");
                    myobj.date=date;
                    myobj.time=data[i].time;
                    this.state.latestdata.push(myobj);



                }

                this.setState({isLoading: false})
            });

    }

    updateCom(){
        this.componentDidMount();
    }
    render(){
        const data=this.state.latestdata;
        if(this.state.isLoading){
            return(
                <div><p>Loading..</p></div>
            )
        }
        return(
            <div>
                <Reserve_panel1/>

                <div className="card border-dark mb-3">
                    <div className="card-header">Latest Reservations</div>
                    <div className="card-body text-dark">
                        <ReactTable
                            data={data}
                            columns={[
                                {
                                    Header: this.props.data,
                                    columns: [
                                        {
                                            Header: "Lab Name",
                                            accessor: "labname"
                                        },
                                        {
                                            Header: "Date",
                                            accessor: "date"

                                        },
                                        {
                                            Header: "Time Slot",
                                            accessor: "time"

                                        }
                                    ]
                                }

                            ]}
                            defaultPageSize={5}
                            className="-striped -highlight"
                        />
                    </div>
                </div>
            </div>
        );


    }
}

export default Reserve_panel2;