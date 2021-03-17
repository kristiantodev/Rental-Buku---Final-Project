import React, { Component } from 'react';

class Tabitem extends Component {
    constructor(props) {
        super(props);
        this.state = {
               
           }
    }


    render() {
        const { href, className} = this.props
        return (
          <>
          <a className={className} data-toggle="tab" href={href} role="tab">
          {this.props.children}
              </a>
          
      </>

        );
    }
}

export default Tabitem;