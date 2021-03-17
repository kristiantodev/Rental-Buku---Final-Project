import React, { Component } from 'react';

class Option extends Component {
    constructor(props) {
        super(props);
        this.state = {
               
           }
    }

    render() {
        const {value} = this.props
        return (
          <>
      
      <option value={value}>
            {this.props.children}
      </option>

      </>

        );
    }
}

export default Option;