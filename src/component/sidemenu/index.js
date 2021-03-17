import React, { Component } from 'react';

class Sidemenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
               
           }
    }


    render() {
        return (
          <>

<div className={this.props.className}>
  <div className="slimscroll-menu" id="remove-scroll">
          {this.props.children}
          <div className="clearfix" />
  </div>
</div>
      </>

        );
    }
}

export default Sidemenu;