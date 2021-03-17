import React, { Component } from 'react';

class IsiDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
               
           }
    }


    render() {
       
        return (
          <>
<div className="page-content-wrapper">
    <div className="row">
    
          {this.props.children}
      
          </div>
          </div>

      </>

        );
    }
}

export default IsiDashboard;