import React, { Component } from 'react';

class SidemenuBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
               
           }
    }


    render() {
        return (
          <>

<ul className="metismenu" id="side-menu">
          {this.props.children}
  </ul>
      </>

        );
    }
}

export default SidemenuBody;