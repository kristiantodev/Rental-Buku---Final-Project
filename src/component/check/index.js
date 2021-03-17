import React, { Component } from 'react';

class Check extends Component {
    constructor(props) {
        super(props);
        this.state = {
               
           }
    }


    render() {
        const { type, name, onClick, value} = this.props
        return (
          <>

      <input type={type} name={name} onClick={onClick} value={value} />

      </>

        );
    }
}

export default Check;