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
import $ from "jquery";
import ReactToPrint from "react-to-print";
import ComponentToPrint from './ComponentToPrint';

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
      namaUser: "",
      alamat: "",
      phone: "",
      email: "",
      cari: "",
    };
  }

  getUsers(rowsPerPage) {
    if(rowsPerPage){

    }else{
      rowsPerPage = this.state.rowsPerPage
    }

    let url = `http://localhost:8080/api/userpaging/?page=${
      this.state.page + 1
    }&limit=${rowsPerPage}`;

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
    let keyword = el.target.value;
    this.setState({
      cari: keyword,
    });

    if (keyword === "") {
      this.getUsers();
    } else {
      let url = `http://localhost:8080/api/totaluserpaging/?keyword=${keyword}`;

      let url2 = `http://localhost:8080/api/userserchingpaging/?page=${
        this.state.page + 1}&limit=${this.state.rowsPerPage}&keyword=${keyword}`;

      Promise.all([fetch(url), fetch(url2)])
        .then(([response, response2]) =>
          Promise.all([response.json(), response2.json()])
        )
        .then(([json, json2]) => {
          this.setState({
            items: json2,
            totalRows:json
          });

        })
        .catch((e) => {
          console.log(e);
          swal("Gagal !", "Gagal mengambil data", "error");
        });
    }
  };

  searchDataTampung = (keyword) => {
    fetch(
      `http://localhost:8080/api/userserchingpaging/?page=${
        this.state.page + 1
      }&limit=${this.state.rowsPerPage}&keyword=${keyword}`,
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
  };

  componentDidMount() {
    this.getUsers();
  }

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: parseInt(event.target.value, 10) });
    this.setState({ page: 0 });
    this.getUsers(event.target.value)

  };

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage }, () => {
      if (this.state.cari === "") {
        this.getUsers(this.state.rowsPerPage);
      } else {
        this.searchDataTampung(this.state.cari);
      }
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

    if (
      obj.username === "" ||
      obj.namaUser === "" ||
      obj.alamat === "" ||
      obj.phone === "" ||
      obj.email === ""
    ) {
      swal("Gagal !", "Semua Data wajib diisi", "error");
    }else if(Number(obj.namaUser.length) >= 51){
      swal("Gagal !", "Nama Lengkap terlalu Panjang, maksimal 50 Karakter", "error");
    } else {
      const objekDataAdmin = {
        username: this.state.username,
        password: this.state.username,
        namaUser: this.state.namaUser,
        alamat: this.state.alamat,
        phone: this.state.phone,
        email: this.state.email,
        role: "Admin",
      };

      fetch("http://localhost:8080/api/tambahadmin/", {
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
              title: "Berhasil !!",
            }).then((value) => {
              this.clear();
              $("#admin .close").click();
              this.getUsers();
            });
          }
        })
        .catch((e) => {});
    }
  };

  updateStatusPelanggan = (id, status) => {
    const dataStatus = {
      idUser: id,
      role: status,
    };

    swal({
      title: "Apakah anda yakin ?",
      text: "Status pelanggan akan dirubah...",
      icon: "warning",
      buttons: true,
      dangerMode: false,
    }).then((konfirmasi) => {
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
            } else if (typeof json.successMessage !== "undefined") {
              swal("Berhasil !", json.successMessage, "success");
              this.getUsers();
            }
          })
          .catch((e) => {});
      } else {
        swal("Batal !", "Perubahan status pelangggan dibatalkan", "error");
      }
    });
  };

  resetPassword = (id, defaultPassword) => {
    const dataPassword = {
      idUser: id,
      password: defaultPassword,
    };

    swal({
      title: "Apakah anda yakin ?",
      text: "Password Pelanggan akan dirubah ke default (password = username)",
      icon: "warning",
      buttons: true,
      dangerMode: false,
    }).then((konfirmasi) => {
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
            } else if (typeof json.successMessage !== "undefined") {
              swal("Berhasil !", json.successMessage, "success");
              this.getUsers();
            }
          })
          .catch((e) => {});
      } else {
        swal("Batal !", "Reset password ke default dibatalkan...", "error");
      }
    });
  };

  checkAkses = () =>{
    if (this.props.checkLogin === true && this.props.dataUserLogin.role === "Admin" && this.props.dataUserLogin.password === this.props.dataUserLogin.username) {
      this.props.history.push("/ubahpassworddefault");
    }else if (this.props.checkLogin === true &&this.props.dataUserLogin.role === "Member") {
      this.props.history.push("/pelanggan");
    } else if (this.props.checkLogin === true && this.props.dataUserLogin.role === "Umum") {
      this.props.history.push("/pelanggan");
    } else if (this.props.checkLogin === false) {
      this.props.history.push("/login");
    }
  }

  render() {
    this.checkAkses();
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
              </ModalClick>&nbsp;
              <ModalClick>
            <ReactToPrint
                trigger={() => {
                  return (
                    <Button className="btn btn-primary">
                      <Italic className="fas fa-print" />
                      &nbsp; Cetak Data Pelanggan
                    </Button>
                  );
                }}
                content={() => this.componentRef}
              />
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
                      value={this.state.cari}
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
                          <TableData align="center">
                            <Tooltip keterangan="Reset Password ke Default">
                              <Button
                                className="btn btn-outline-info"
                                hidden={value.role !== "Admin" ? false : true}
                                onClick={() => {
                                  this.resetPassword(
                                    value.idUser,
                                    value.username
                                  );
                                }}
                              >
                                <Italic className="fas fa-key" />
                              </Button>
                            </Tooltip>
                            <ReactTooltip />
                            <Tooltip keterangan="Jadikan Member">
                              <Button
                                className="btn btn-outline-secondary"
                                hidden={value.role === "Umum" ? false : true}
                                onClick={() => {
                                  this.updateStatusPelanggan(value.idUser, "Member");
                                }}
                              >
                                <Italic className="fas fa-check" />
                              </Button>
                            </Tooltip>
                            <ReactTooltip />
                            <Tooltip keterangan="Hapus dari Member">
                              <Button
                                className="btn btn-outline-danger"
                                hidden={value.role === "Member" ? false : true}
                                onClick={() => {
                                  this.updateStatusPelanggan(value.idUser, "Umum");
                                }}
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
            </Div>
            <Div className="modal-footer">
              <Button className="btn btn-primary" onClick={this.tambahAdmin}>
                <i className="fas fa-save" /> &nbsp;Simpan
              </Button>
            </Div>
          </ModalContent>
        </Modal>

        <Modal id="laporan">
        <ComponentToPrint ref={el => (this.componentRef = el)} users={this.state.users}/>
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
