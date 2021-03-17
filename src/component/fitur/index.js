import React, { Component } from 'react';

class Fitur extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const {redirect, children } = this.props
        return (
            <div className="waves-effect" onClick={redirect} > { children}</div>
        );
    }
}

export default Fitur;