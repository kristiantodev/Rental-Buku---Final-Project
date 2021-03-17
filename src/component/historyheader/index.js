import React, { Component } from 'react';


class HistoryJudul extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const { judul} = this.props
        return (
          <center>
            <h4 className="mt-0 header-title">
            <b><i className="far fa-calendar"/> {judul} </b>
            </h4>
            </center>
        );
    }
}

export default HistoryJudul;