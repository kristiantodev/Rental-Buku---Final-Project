import React, { Component } from 'react';

class TableHead extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <thead>{this.props.children}</thead>
         );
    }
}
 
export default TableHead;