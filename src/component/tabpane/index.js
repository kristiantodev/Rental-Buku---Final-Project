import React, { Component } from 'react';

class Tabpane extends Component {
    constructor(props) {
        super(props);
        this.state = {
               
           }
    }


    render() {
        const { id, className} = this.props
        return (
          <>
          <div className={className} id={id} role="tabpanel">
          {this.props.children}
              </div>
          
      </>

        );
    }
}

export default Tabpane;