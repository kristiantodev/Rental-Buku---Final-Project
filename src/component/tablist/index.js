import React, { Component } from 'react';

class Tablist extends Component {
    constructor(props) {
        super(props);
        this.state = {
               
           }
    }


    render() {
  
        return (
          <>

<ul className="nav nav-tabs" role="tablist">
          {this.props.children}
          </ul>
          
      </>

        );
    }
}

export default Tablist;