import React, { Component } from 'react';

class TableBody extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <tbody>{this.props.children}</tbody>
         );
    }
}
 
export default TableBody;