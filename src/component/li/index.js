import React, { Component } from 'react';

class Li extends Component {
    constructor(props) {
        super(props);
        this.state = {
               
           }
    }


    render() {
        const { className} = this.props
        return (
          <>

          <li className={className}>
          {this.props.children}
          </li>
          
      </>

        );
    }
}

export default Li;