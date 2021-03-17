import React, { Component } from "react";
import { connect } from "react-redux";
import logo from "../../img.png";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import {
  Button,
  Input,
  Textarea,
  Div,
  Italic,
  Logo,
  LogoHeader,
  AccountPage,
  Fitur,
  Span,
  LinkCenter,
} from "../../component";

class Registrasi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      namaUser: "",
      alamat: "",
      phone: "",
      email: "",
      passwordUlangi: "",
    };
  }

  setValueInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  clear = () => {
    this.setState({
      username: "",
      password: "",
      namaUser: "",
      alamat: "",
      phone: "",
      email: "",
      passwordUlangi: "",
    });
  };

  registrasi = () => {
    let obj = this.state;
    console.log(obj.password);
    console.log(obj.passwordUlangi);

    if (
      obj.username === "" ||
      obj.password === "" ||
      (obj.namaUser === "") | (obj.alamat === "") ||
      obj.phone === "" ||
      obj.email === ""
    ) {
      swal("Gagal !", "Semua Data wajib diisi", "error");
      // }else if(obj.username.length < 6 || obj.username.length > 8){
      //   swal("Gagal !", "Panjang username antara 6-8 huruf", "error");
      // }else if(!(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(obj.email))){
      //   swal("Gagal !", "Format Email Tidak Sesuai", "error");
      // }else if(!(/^(^\+62|62|^08)(\d{3,4}-?){2}\d{3,4}$/i.test(obj.phone))){
      //   swal("Gagal !", "Format No.HP Tidak Sesuai", "error");
      // }else if(!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,8}$/i.test(obj.password))){
      //   swal("Gagal !", "Password minimal 6 karakter dan maksimal 8 karakter yang terdiri dari minimal 1 huruf besar, 1 huruf kecil, satu angka", "error");
    } else if (obj.password !== obj.passwordUlangi) {
      swal("Gagal !", "Password dan Konfirmasi password tidak sesuai", "error");
    } else {
      const objekRegistrasi = {
        username: this.state.username,
        password: this.state.password,
        namaUser: this.state.namaUser,
        alamat: this.state.alamat,
        phone: this.state.phone,
        email: this.state.email,
        role: "Umum",
      };

      fetch("http://localhost:8080/api/registrasi/", {
        method: "post",
        headers: {
          "Content-Type": "application/json; ; charset=utf-8",
          "Access-Control-Allow-Headers": "Authorization, Content-Type",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(objekRegistrasi),
      })
        .then((response) => response.json())
        .then((json) => {
          if (typeof json.errorMessage !== "undefined") {
            swal("Gagal !", json.errorMessage, "error");
          } else if (typeof json.successMessage !== "undefined") {
            swal("Berhasil !", json.successMessage, "success");
            this.clear();
            this.props.history.push("/login");
          }
        })
        .catch((e) => {});
    }
  };

  render() {
    if (
      this.props.checkLogin === true &&
      this.props.dataUserLogin.role === "Admin"
    ) {
      this.props.history.push("/admin");
    } else if (
      this.props.checkLogin === true &&
      this.props.dataUserLogin.role === "Member"
    ) {
      this.props.history.push("/pelanggan");
    } else if (
      this.props.checkLogin === true &&
      this.props.dataUserLogin.role === "Umum"
    ) {
      this.props.history.push("/pelanggan");
    }

    return (
      <>
        <AccountPage className="wrapper-registrasi">
          <Logo logo={logo} />
          <Div className="p-1">
            <LogoHeader header="Registrasi Peminjaman Buku" />
            <Div className="row">
              <Div className="col-lg-6 col-md-6 col-6">
                <Div className="form-group">
                  <Input
                    type="text"
                    placeholder="Nama Pengguna / username"
                    name="username"
                    onChange={this.setValueInput}
                    value={this.state.username}
                  />
                </Div>
                <Div className="form-group">
                  <Input
                    type="text"
                    placeholder="No.HP"
                    name="phone"
                    onChange={this.setValueInput}
                    value={this.state.phone}
                  />
                </Div>
              </Div>
              <Div className="col-lg-6 col-md-6 col-6">
                <Div className="form-group">
                  <Input
                    type="text"
                    placeholder="Nama Lengkap"
                    name="namaUser"
                    onChange={this.setValueInput}
                    value={this.state.namaUser}
                  />
                </Div>
                <Div className="form-group">
                  <Input
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={this.setValueInput}
                    value={this.state.email}
                  />
                </Div>
              </Div>
            </Div>

            <Div className="form-group">
              <Textarea
                name="alamat"
                placeholder="Alamat"
                onChange={this.setValueInput}
                value={this.state.alamat}
              />
            </Div>
            <Div className="row">
              <Div className="col-lg-6 col-md-6 col-6">
                <Div className="form-group">
                  <Input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={this.setValueInput}
                    value={this.state.password}
                  />
                </Div>
              </Div>
              <Div className="col-lg-6 col-md-6 col-6">
                <Div className="form-group">
                  <Input
                    type="password"
                    placeholder="Konfirmasi password"
                    name="passwordUlangi"
                    onChange={this.setValueInput}
                    value={this.state.passwordUlangi}
                  />
                </Div>
              </Div>
            </Div>

            <Div className="form-group row m-t-20">
              <Div className="col-12 text-right">
                <Button
                  className="btn btn-success waves-effect waves-light form-control"
                  onClick={this.registrasi}
                >
                  <Italic className="fas fa-paper-plane" />
                  &nbsp; Daftar
                </Button>
                <LinkCenter>
                  <Link to="/login">
                    <Fitur onClick={() => this.props.history.push("/login")}>
                      <Span> Sudah punya akun ? Login disini</Span>
                    </Fitur>
                  </Link>
                </LinkCenter>
              </Div>
            </Div>
          </Div>
        </AccountPage>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  checkLogin: state.AReducer.isLogin,
  dataUser: state.UReducer.users,
  dataUserLogin: state.AReducer.userLogin,
});

const mapDispatchToProps = (dispatch) => {
  return {
    submitLogin: (data) => dispatch({ type: "LOGIN_SUCCESS", payload: data }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Registrasi);
