import React, { Component } from 'react';

class ModalClick extends Component {
    constructor(props) {
        super(props);
        this.state = {
               
           }
    }


    render() {
        return (
          <>
<div data-toggle="modal" className="waves-effect" data-target={this.props.datatarget}>
    
          {this.props.children}
          
</div>

      </>

        );
    }
}

export default ModalClick;