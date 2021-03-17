import React, { Component } from 'react';

class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {
               
           }
    }


    render() {
        const {onClick, className} = this.props
        return (
          <>

      <button onClick={onClick} className={className} disabled={this.props.disabled} hidden={this.props.hidden} data-toggle={this.props.datatoggle} data-target={this.props.datatarget}>
          {this.props.children}
      </button>

      </>

        );
    }
}

export default Button;