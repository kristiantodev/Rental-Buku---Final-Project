import React, { Component } from 'react';
import logo from '../../../logo.png';
import { connect } from "react-redux"
import swal from 'sweetalert';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    doLogout = () => {
      swal({
        title: "Apakah anda yakin ?",
        text: "Anda akan keluar dari sistem...",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((logout) => {
        if (logout) {
          swal("Anda berhasil keluar dari sistem", {
            icon: "success",
          });
          this.props.logoutAction()
        } else {
          swal("Batal !", "Logout dibatalkan...", "error");
        }
      });
      
    }

    render() {
        return (
            <div className="topbar">
            <div className="topbar-left">
             
                <span>
                  <img src={logo} height="67" alt="Gambar"/>
                </span>
            
            </div>
            <nav className="navbar-custom">
            
              <ul className="list-inline menu-right mb-0">
                <li className="float-right">
                  <button className="button-menu-mobile btn btn-outline-light waves-effect" onClick={() => { this.doLogout()}}>
                    <i className="fas fa-sign-out-alt" /> Keluar
                  </button>
                </li>                        
              </ul>
            </nav>
          </div>
        );
    }
}

const mapStateToProps = state => ({
  dataUserLogin: state.AReducer.userLogin
})

const mapDispatchToProps = dispatch => {
  return {
    logoutAction: () => dispatch({ type: "LOGOUT_SUCCESS"})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);