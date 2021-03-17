import React, { Component } from 'react';

class Div extends Component {
    constructor(props) {
        super(props);
        this.state = {
               
           }
    }


    render() {
        const { className} = this.props
        return (
          <>

          <div className={className}>
          {this.props.children}
          </div>
          
      </>

        );
    }
}

export default Div;