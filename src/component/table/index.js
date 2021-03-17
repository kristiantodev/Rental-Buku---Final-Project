import React, { Component } from 'react';

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <table className={this.props.className} style={{
                borderCollapse: "collapse",
                borderSpacing: 0,
                width: "100%",
              }}>{this.props.children}</table>
         );
    }
}
 
export default Table;