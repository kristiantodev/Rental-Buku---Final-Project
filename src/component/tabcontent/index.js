import React, { Component } from 'react';

class Tabcontent extends Component {
    constructor(props) {
        super(props);
        this.state = {
               
           }
    }


    render() {
        return (
          <>
         <div className="tab-content">
          {this.props.children}
              </div>
          
      </>

        );
    }
}

export default Tabcontent;