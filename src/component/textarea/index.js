import React, { Component } from 'react';

class Textarea extends Component {
    constructor(props) {
        super(props);
        this.state = {
               
           }
    }

    render() {
        const { name, onChange, value } = this.props
        return (
          <>
      <textarea name={name} className="form-control" placeholder={this.props.placeholder} value={value} onChange={onChange}/>
      </>

        );
    }
}

export default Textarea;