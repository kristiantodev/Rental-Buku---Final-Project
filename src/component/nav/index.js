import React, { Component } from 'react';

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
               
           }
    }


    render() {
        const { className} = this.props
        return (
          <>

          <nav className={className}>
          {this.props.children}
          </nav>
          
      </>

        );
    }
}

export default Nav;