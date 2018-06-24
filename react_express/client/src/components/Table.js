import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

class Table extends Component{
    constructor(){
        super();
        this.state = {

        }
    }

    componentDidMount(){

    }
    render(){

        return (
            <div>
                <h4>Date: {this.props.date.substring(1,11)}</h4>


                <BootstrapTable width='' data={ this.props.products } striped hover condensed>
                <TableHeaderColumn width='10%' dataField='id' isKey>#</TableHeaderColumn>
                <TableHeaderColumn dataField='on1'>08:00-09:00</TableHeaderColumn>
                <TableHeaderColumn dataField='on2'>09:00-10:00</TableHeaderColumn>
                <TableHeaderColumn dataField='on3'>10:00-11:00</TableHeaderColumn>
                <TableHeaderColumn dataField='on4'>11:00-12:00</TableHeaderColumn>
                <TableHeaderColumn dataField='on5'>13:00-14:00</TableHeaderColumn>
                <TableHeaderColumn dataField='on6'>14:00-15:00</TableHeaderColumn>
                <TableHeaderColumn dataField='on7'>15:00-16:00</TableHeaderColumn>
                <TableHeaderColumn dataField='on8'>16:00-17:00</TableHeaderColumn>

            </BootstrapTable>
            </div>
        );
    }
}


export default Table;