import React, { Component } from 'react';

class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
               
           }
    }


    render() {
        const {id} = this.props
        return (
          <>
<div className="modal fade text-left" id={id} tabIndex={-1} role="dialog" aria-labelledby="myModalLabel16" aria-hidden="true">
    
          {this.props.children}
          
</div>

      </>

        );
    }
}

export default Modal;