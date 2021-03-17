import React, { Component } from 'react';

class SidebarMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
               
           }
    }


    render() {
        return (
          <>

<div id="sidebar-menu">
          {this.props.children}
          </div>
          
      </>

        );
    }
}

export default SidebarMenu;