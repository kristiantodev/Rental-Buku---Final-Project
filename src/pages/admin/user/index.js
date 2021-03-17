import React, { Component } from "react";
import { connect } from "react-redux";
import { Header, Menu, Footer } from "../../../template/admin";
import ReactTooltip from "react-tooltip";
import {
  Button,
  IsiBody,
  HeaderContent,
  Content,
  Title,
  Card,
  Modal,
  Row,
  Div,
  ModalHeader,
  ModalContent,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableData,
  Italic,
  ModalClick,
  Tooltip,
  Input,
  Textarea,
  Label,
} from "../../../component";
import TablePagination from "@material-ui/core/TablePagination";
import swal from "sweetalert";
import $ from 'jquery';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      items: [],
      page: 0,
      rowsPerPage: 5,
      totalRows: 0,
      idUser: "",
      username: "",
      password: "",
      namaUser: "",
      alamat: "",
      phone: "",
      email: "",
      passwordUlangi: "",
      cari: "",
    };
  }

  getUsers() {
    let url = `http://localhost:8080/api/userpaging/?page=${
      this.state.page + 1
    }&limit=${this.state.rowsPerPage}`;

    Promise.all([fetch(url), fetch("http://localhost:8080/api/user/")])
      .then(([response, response2]) =>
        Promise.all([response.json(), response2.json()])
      )
      .then(([json, json2]) => {
        this.setState({
          users: json2,
          items: json,
        });

        const total = this.state.users.length;
        this.setState({ totalRows: total });
      })

      .catch(() => {
        swal("Gagal !", "Gagal mengambil data", "error");
      });
  }

  searchData = (el) => {
    var keyword = el.target.value;

    if (keyword === "") {
      this.getUsers();
    } else {
      fetch(
        `http://localhost:8080/api/userserching/?keyword=${encodeURIComponent(
          keyword
        )}`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json; ; charset=utf-8",
            "Access-Control-Allow-Headers": "Authorization, Content-Type",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
        .then((response) => response.json())
        .then((json) => {
          this.setState({
            items: json,
          });
        })
        .catch((e) => {
          console.log(e);
          swal("Gagal !", "Gagal mengambil data", "error");
        });
    }
  };

  addItemToState = (item) => {
    this.setState((prevState) => ({
      items: [...prevState.items, item],
    }));
  };

  componentDidMount() {
    this.getUsers();
  }

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: parseInt(event.target.value, 10) });
    this.setState({ page: 0 });
  };

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage }, () => {
      this.getUsers();
    });
  };

  setValueInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  clear = () => {
    this.setState({
      idUser: "",
      username: "",
      password: "",
      namaUser: "",
      alamat: "",
      phone: "",
      email: "",
      passwordUlangi: "",
    });
  };

  tambahAdmin = () => {
    let obj = this.state;
    console.log(obj.password);
    console.log(obj.passwordUlangi);

    if (
      obj.idUser === "" ||
      obj.username === "" ||
      obj.password === "" ||
      obj.namaUser === "" ||
      obj.alamat === "" ||
      obj.phone === "" ||
      obj.email === ""
    ) {
      swal("Gagal !", "Semua Data wajib diisi", "error");
    } else if (obj.password !== obj.passwordUlangi) {
      swal("Gagal !", "Password dan Konfirmasi password tidak sesuai", "error");
    } else {
      const objekDataAdmin = {
        idUser: this.state.idUser,
        username: this.state.username,
        password: this.state.password,
        namaUser: this.state.namaUser,
        alamat: this.state.alamat,
        phone: this.state.phone,
        email: this.state.email,
        role: "Admin",
      };

      fetch("http://localhost:8080/api/addadmin/", {
        method: "post",
        headers: {
          "Content-Type": "application/json; ; charset=utf-8",
          "Access-Control-Allow-Headers": "Authorization, Content-Type",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(objekDataAdmin),
      })
        .then((response) => response.json())
        .then((json) => {
          if (typeof json.errorMessage !== "undefined") {
            swal("Gagal !", json.errorMessage, "error");
          } else if (typeof json.successMessage !== "undefined") {

            swal({
              text: "Admin Baru berhasil ditambahkan!!",
              icon: "success",
              title: "Berhasil !!"
              })
              .then((value) => {
                this.clear();
                $("#admin .close").click();
                this.getUsers();
              })
          }
        })
        .catch((e) => {});
    }
  };

  updateToMember = (id) => {

    const dataStatus = {
      idUser : id,
      role: "Member",
      
    };

    swal({
      title: "Apakah anda yakin ?",
      text: "Status Umum akan diubah menjadi Member...",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((konfirmasi) => {
      if (konfirmasi) {
      fetch("http://localhost:8080/api/updatestatus/", {
      method: "put",
      headers: {
        "Content-Type": "application/json; ; charset=utf-8",
        "Access-Control-Allow-Headers": "Authorization, Content-Type",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(dataStatus),
    })
      .then((response) => response.json())
      .then((json) => {
        if (typeof json.errorMessage !== "undefined") {
          swal("Gagal !", json.errorMessage, "error");
        } else if(typeof json.successMessage !== "undefined"){
          swal(
            "Berhasil !",
            json.successMessage,
            "success"
          );
          this.getUsers()
        }
      })
      .catch((e) => {
        
      });
      
      } else {
        swal("Batal !", "Update Umum ke Member dibatalkan...", "error");
      }
    });
  }

  updateToUmum = (id) => {

    const dataStatus = {
      idUser : id,
      role: "Umum",
      
    };

    swal({
      title: "Apakah anda yakin ?",
      text: "Status Member akan dihapus menjadi Umum...",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((konfirmasi) => {
      if (konfirmasi) {
      fetch("http://localhost:8080/api/updatestatus/", {
      method: "put",
      headers: {
        "Content-Type": "application/json; ; charset=utf-8",
        "Access-Control-Allow-Headers": "Authorization, Content-Type",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(dataStatus),
    })
      .then((response) => response.json())
      .then((json) => {
        if (typeof json.errorMessage !== "undefined") {
          swal("Gagal !", json.errorMessage, "error");
        } else if(typeof json.successMessage !== "undefined"){
          swal(
            "Berhasil !",
            json.successMessage,
            "success"
          );
          this.getUsers()
        }
      })
      .catch((e) => {
        
      });
      
      } else {
        swal("Batal !", "Hapus status Member menjadi umum dibatalkan", "error");
      }
    });
  }

  resetPassword = (id, defaultPassword) => {

    const dataPassword = {
      idUser : id,
      password: defaultPassword,
      
    };

    swal({
      title: "Apakah anda yakin ?",
      text: "Password Pelanggan akan dirubah ke default (password = username)",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((konfirmasi) => {
      if (konfirmasi) {
      fetch("http://localhost:8080/api/updatepassworddefault/", {
      method: "put",
      headers: {
        "Content-Type": "application/json; ; charset=utf-8",
        "Access-Control-Allow-Headers": "Authorization, Content-Type",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(dataPassword),
    })
      .then((response) => response.json())
      .then((json) => {
        if (typeof json.errorMessage !== "undefined") {
          swal("Gagal !", json.errorMessage, "error");
        } else if(typeof json.successMessage !== "undefined"){
          swal(
            "Berhasil !",
            json.successMessage,
            "success"
          );
          this.getUsers()
        }
      })
      .catch((e) => {
        
      });
      
      } else {
        swal("Batal !", "Reset password ke default dibatalkan...", "error");
      }
    });
  }

  render() {
    if (
      this.props.checkLogin === true &&
      this.props.dataUserLogin.role === "Member"
    ) {
      this.props.history.push("/pelanggan");
    } else if (
      this.props.checkLogin === true &&
      this.props.dataUserLogin.role === "Umum"
    ) {
      this.props.history.push("/pelanggan");
    } else if (this.props.checkLogin === false) {
      this.props.history.push("/login");
    }

    return (
      <>
        <Header />
        <Menu />
        <Content>
          <HeaderContent>
            <Title icon="fas fa-users" judul="Data Pengguna" />
            <Div className="state-information d-none d-sm-block">
              <ModalClick datatarget="#admin">
                <Button className="btn btn-primary">
                  <Italic className="fas fa-user-plus" />
                  &nbsp; Tambah Admin Baru
                </Button>
              </ModalClick>
            </Div>
          </HeaderContent>

          <IsiBody>
            <Row>
              <Div className="col-lg-9 col-md-6 col-5">
                <Div className="form-group row">
                  <Label className="col-sm-2 col-form-label">
                    Cari Pengguna : 
                  </Label>
                  <Div className="col-sm-10">
                    <Input
                      type="text"
                      placeholder="Masukan Kata Kunci Pencarian"
                      name="cari"
                      onChange={this.searchData}
                    />
                  </Div>
                </Div>

                <Table className="table table-striped table-bordered dt-responsive nowrap">
                  <TableHead>
                    <TableRow>
                      <TableHeader>Username</TableHeader>
                      <TableHeader>Nama Lengkap</TableHeader>
                      <TableHeader>Email</TableHeader>
                      <TableHeader>HP</TableHeader>
                      <TableHeader>Status</TableHeader>
                      <TableHeader>Aksi</TableHeader>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.items.map((value, index) => {
                      return (
                        <TableRow key={index}>
                          <TableData>{value.username}</TableData>
                          <TableData>{value.namaUser}</TableData>
                          <TableData>{value.email}</TableData>
                          <TableData>{value.phone}</TableData>
                          <TableData>{value.role}</TableData>
                          <TableData>
                            <Tooltip keterangan="Edit Profil">
                              <Button
                                className="btn btn-outline-warning"
                                onClick={() => this.props.history.push("/admin/profil")}
                                hidden={
                                  value.idUser ===
                                  this.props.dataUserLogin.idUser
                                    ? false
                                    : true
                                }
                              >
                                <Italic className="fas fa-feather" />
                              </Button>
                            </Tooltip>
                            <ReactTooltip />
                            <Tooltip keterangan="Reset Password ke Default">
                              <Button
                                className="btn btn-outline-info"
                                hidden={value.role !== "Admin" ? false : true}
                                onClick={() =>{this.resetPassword(value.idUser, value.username)} }
                              >
                                <Italic className="fas fa-key" />
                              </Button>
                            </Tooltip>
                            <ReactTooltip />
                            <Tooltip keterangan="Jadikan Member">
                              <Button
                                className="btn btn-outline-secondary"
                                hidden={value.role === "Umum" ? false : true}
                                onClick={() =>{this.updateToMember(value.idUser)} }
                              >
                                <Italic className="fas fa-check" />
                              </Button>
                            </Tooltip>
                            <ReactTooltip />
                            <Tooltip keterangan="Hapus dari Member">
                              <Button
                                className="btn btn-outline-danger"
                                hidden={value.role === "Member" ? false : true}
                                onClick={() =>{this.updateToUmum(value.idUser)} }
                              >
                                <Italic className="fas fa-times" />
                              </Button>
                            </Tooltip>
                            <ReactTooltip />
                          </TableData>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
                <TablePagination
                  component="div"
                  count={this.state.totalRows}
                  page={this.state.page}
                  onChangePage={this.handleChangePage}
                  rowsPerPage={this.state.rowsPerPage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
              </Div>
              <Div className="col-lg-3 col-md-6 col-7">
                <Row>
                  <Card
                    size="col-xl-12"
                    color="card bg-secondary mini-stat position-relative"
                    judul="Member :"
                    isi={
                      this.state.users.filter((x) => x.role === "Member").length
                    }
                    icon="fas fa-user display-1"
                  />
                  <Card
                    size="col-xl-12"
                    color="card bg-primary mini-stat position-relative"
                    judul="Admin : "
                    isi={
                      this.state.users.filter((x) => x.role === "Admin").length
                    }
                    icon="fas fa-user-tie display-2"
                  />
                  <Card
                    size="col-xl-12"
                    color="card bg-secondary mini-stat position-relative"
                    judul="Umum :"
                    isi={
                      this.state.users.filter((x) => x.role === "Umum").length
                    }
                    icon="fas fa-user display-1"
                  />
                </Row>
              </Div>
            </Row>
          </IsiBody>
        </Content>
        <Footer />

        <Modal id="admin">
          <ModalContent className="modal-dialog modal-lg">
            <Div className="modal-header bg-primary">
              <ModalHeader judulheader="Form Tambah Admin" />
            </Div>
            <Div className="modal-body">
              <Div className="form-group">
                <Input
                  type="text"
                  placeholder="ID Admin"
                  name="idUser"
                  onChange={this.setValueInput}
                  value={this.state.idUser}
                />
              </Div>
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
                  placeholder="Nama Lengkap"
                  name="namaUser"
                  onChange={this.setValueInput}
                  value={this.state.namaUser}
                />
              </Div>
              <Div className="form-group">
                <Textarea
                  name="alamat"
                  placeholder="Alamat"
                  onChange={this.setValueInput}
                  value={this.state.alamat}
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
              <Div className="form-group">
                <Input
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={this.setValueInput}
                  value={this.state.email}
                />
              </Div>
              <Div className="form-group">
                <Input
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={this.setValueInput}
                  value={this.state.password}
                />
              </Div>
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
            <Div className="modal-footer">
              <Button className="btn btn-primary" onClick={this.tambahAdmin}>
                <i className="fas fa-save" /> &nbsp;Simpan
              </Button>
            </Div>
          </ModalContent>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  checkLogin: state.AReducer.isLogin,
  dataUserLogin: state.AReducer.userLogin,
});

const mapDispatchToProps = (dispatch) => {
  return {
    keluar: () => dispatch({ type: "LOGOUT_SUCCESS" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
