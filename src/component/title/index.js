import React, { Component } from 'react';


class Title extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const { judul, icon} = this.props
        return (
          <>
          <h3 className="page-title"><b><i className={icon} />&nbsp; {judul}</b></h3>
          <ol className="breadcrumb">
            <li className="breadcrumb-item active">Rental Buku Kharisma</li>
          </ol>
          </>
        );
    }
}

export default Title;