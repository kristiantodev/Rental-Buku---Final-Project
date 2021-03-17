import React, { Component } from 'react';

class IsiHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
               
           }
    }


    render() {
       
        return (
          <>
<div className="row">
    <div className="col-xl-12">
      <div className="card m-b-20">
        <div className="card-body">
    
          {this.props.children}
      
          </div>
          </div>
        </div>
      </div>

      </>

        );
    }
}

export default IsiHistory;