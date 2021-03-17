import React, { Component } from 'react';

class Center extends Component {
    constructor(props) {
        super(props);
        this.state = {
               
           }
    }


    render() {
        return (
          <>

          <center>
          {this.props.children}
          </center>
          
      </>

        );
    }
}

export default Center;