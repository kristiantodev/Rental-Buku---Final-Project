import React, { Component } from 'react';

class Tooltip extends Component {
    constructor(props) {
        super(props);
        this.state = {
               
           }
    }


    render() {
        return (
          <>

<span data-tip={this.props.keterangan}>
    {this.props.children}
    </span>
          
      </>

        );
    }
}

export default Tooltip;