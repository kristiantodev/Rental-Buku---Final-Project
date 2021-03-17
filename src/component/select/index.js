import React, { Component } from 'react';

class Select extends Component {
    constructor(props) {
        super(props);
        this.state = {
               
           }
    }

    render() {
        const {name, onChange, value} = this.props
        return (
          <>
      
      <select name={name} onChange={onChange} value={value} className="custom-select">
            {this.props.children}
      </select>

      </>

        );
    }
}

export default Select;