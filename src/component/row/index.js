import React, { Component } from 'react';

class Row extends Component {
    constructor(props) {
        super(props);
        this.state = {
               
           }
    }


    render() {
       
        return (
          <>
<div className="row"> 
    
          {this.props.children}
          
</div>

      </>

        );
    }
}

export default Row;