import React, { Component } from 'react';

class TextStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {
               
           }
    }


    render() {
        const { color, status} = this.props
        return (
          <>

          <h3><b><font color={color}>{status}</font></b></h3>
          
      </>

        );
    }
}

export default TextStatus;