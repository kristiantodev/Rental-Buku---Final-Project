import React, { Component } from 'react';

class TableReport extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <center>
            <table className={this.props.className} style={{
                borderCollapse: "collapse",
                borderSpacing: 0,
                width: "95%",
              }}>{this.props.children}</table>
              </center>
         );
    }
}
 
export default TableReport;