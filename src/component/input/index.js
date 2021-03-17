import React, { Component } from 'react';

class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
               
           }
    }

    render() {
        const { type, name, onChange, placeholder, value } = this.props
        return (
          <>

      <input type={type} className="form-control" disabled={this.props.disabled} name={name} onChange={onChange} placeholder={placeholder} value={value}/>

      </>

        );
    }
}

export default Input;