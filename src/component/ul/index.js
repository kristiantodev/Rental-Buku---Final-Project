import React, { Component } from 'react';

class UL extends Component {
    constructor(props) {
        super(props);
        this.state = {
               
           }
    }


    render() {
        const { className} = this.props
        return (
          <>

          <ul className={className}>
          {this.props.children}
          </ul>
          
      </>

        );
    }
}

export default UL;