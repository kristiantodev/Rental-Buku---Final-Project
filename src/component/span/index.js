import React, { Component } from 'react';

class Span extends Component {
    constructor(props) {
        super(props);
        this.state = {
               
           }
    }


    render() {
        return (
          <>

<span>
          {this.props.children}
  </span>
      </>

        );
    }
}

export default Span;