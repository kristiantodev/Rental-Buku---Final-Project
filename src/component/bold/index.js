import React, { Component } from 'react';

class Bold extends Component {
    constructor(props) {
        super(props);
        this.state = {
               
           }
    }


    render() {
        return (
          <>

          <b>
          {this.props.children}
          </b>
          
      </>

        );
    }
}

export default Bold;