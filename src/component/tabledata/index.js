import React, { Component } from 'react';

class TableData extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <td align={this.props.align} colSpan={this.props.colSpan} rowSpan={this.props.rowSpan} width={this.props.width}>{this.props.children}</td>
         );
    }
}
 
export default TableData;