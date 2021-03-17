import React, { Component } from 'react';

class Fieldset extends Component {
    constructor(props) {
        super(props);
        this.state = {
               
           }
    }


    render() {
       
        return (
          <>
<fieldset className="form-group floating-label-form-group">
    
          {this.props.children}
          
</fieldset>

      </>

        );
    }
}

export default Fieldset;