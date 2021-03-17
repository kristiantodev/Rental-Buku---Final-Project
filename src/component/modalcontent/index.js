import React, { Component } from 'react';

class ModalContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
               
           }
    }


    render() {
       
        return (
          <>

<div className={this.props.className} role="document">
            <div className="modal-content">
          {this.props.children}
          </div>
          </div>
          
      </>

        );
    }
}

export default ModalContent;