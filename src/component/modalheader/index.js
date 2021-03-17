import React, { Component } from 'react';


class ModalHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const { judulheader} = this.props
        return (
            <>
            <h6 className="modal-title">
                  <font color="white">{judulheader}</font>
                </h6>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
            </>
        );
    }
}

export default ModalHeader;