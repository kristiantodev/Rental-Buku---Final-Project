import React, { Component } from 'react';

class Radio extends Component {
    constructor(props) {
        super(props);
        this.state = {
               
           }
    }

    render() {
        const { type, name, onChange, value} = this.props
        return (
          <>

      <input type={type} name={name} checked={this.props.checked} onChange={onChange} value={value} />

      </>

        );
    }
}

export default Radio;