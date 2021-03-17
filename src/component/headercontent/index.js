import React, { Component } from 'react';

class HeaderContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
               
           }
    }


    render() {
       
        return (
          <>
<div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <div className="page-title-box">
    
          {this.props.children}
      
          </div>
          </div>
        </div> 
      </div> 

      </>

        );
    }
}

export default HeaderContent;