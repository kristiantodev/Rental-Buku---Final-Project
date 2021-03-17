import React, { Component } from 'react';

class TableHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <th colSpan={this.props.colSpan} rowSpan={this.props.rowSpan} width={this.props.width}><b><center>{this.props.children}</center></b></th>
         );
    }
}
 
export default TableHeader;