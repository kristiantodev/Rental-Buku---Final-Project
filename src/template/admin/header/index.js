import React, { Component } from 'react';
import logo from '../../../image/logo.png';
import { connect } from "react-redux"
import swal from 'sweetalert';
import {
  Li,
  Span,
  Div,
  Italic, 
  Button,
  UL,
  Nav
} from "../../../component";

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
            <Div className="topbar">
            <Div className="topbar-left">
             
                <Span>
                  <img src={logo} height="67" alt="Gambar"/>
                </Span>
            
            </Div>
            <Nav className="navbar-custom">
            
              <UL className="list-inline menu-right mb-0">
                <Li className="float-right">
                  <Button className="button-menu-mobile btn btn-outline-light waves-effect" onClick={() => { this.doLogout()}}>
                    <Italic className="fas fa-sign-out-alt" /> Keluar
                  </Button>
                </Li>                        
              </UL>
            </Nav>
          </Div>
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