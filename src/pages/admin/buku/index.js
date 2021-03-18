import React, { Component } from "react";
import { connect } from "react-redux";
import { Header, Menu, Footer } from "../../../template/admin";
import ReactTooltip from "react-tooltip";
import { Editor } from "@tinymce/tinymce-react";
import { Markup } from "interweave";
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
  Label,
  Input,
  Select,
  Option,
} from "../../../component";
import TablePagination from "@material-ui/core/TablePagination";
import swal from "sweetalert";
import gambarKomik from "../../../komik.jpg";
import gambarNovel from "../../../novel.jpg";
import gambarEnsiklopedia from "../../../ensiklopedia.jpg";
import $ from 'jquery';

class Buku extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      items: [],
      varianBooks: [],
      page: 0,
      rowsPerPage: 5,
      totalRows: 0,
      detailBuku: {},
      act: 0,
      idBuku: "",
      judulBuku: "",
      pengarang: "",
      idJenisBuku: "",
      hargaSewa: "",
      stok: "",
      keterangan: "",
      disable : false,
      dataEdit : {},
      cari:""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  getBooks() {
    let url = `http://localhost:8080/api/bukupaging/?page=${
      this.state.page + 1
    }&limit=${this.state.rowsPerPage}`;

    Promise.all([
      fetch(url),
      fetch("http://localhost:8080/api/buku/"),
      fetch("http://localhost:8080/api/jenisbuku/"),
    ])
      .then(([response, response2, response3]) =>
        Promise.all([response.json(), response2.json(), response3.json()])
      )
      .then(([json, json2, json3]) => {
        this.setState({
          books: json2,
          items: json,
          varianBooks: json3,
        });

        const total = this.state.books.length;
        this.setState({ totalRows: total });
      })

      .catch(() => {
        swal("Gagal !", "Gagal mengambil data", "error");
      });
  }

  addItemToState = (item) => {
    this.setState((prevState) => ({
      items: [...prevState.items, item],
    }));
  };

  componentDidMount() {
    this.getBooks();
  }

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: parseInt(event.target.value, 10) });
    this.setState({ page: 0 });
  };

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage }, () => {
      if (this.state.cari === "") {
        this.getBooks();
      } else {
        this.searchDataTampung(this.state.cari);
      }
    });
  };

  searchData = (el) => {
    var keyword = el.target.value;
    this.setState({
      cari: keyword,
    });

    if (keyword === "") {
      this.getBooks();
    } else {
      let url = `http://localhost:8080/api/bukuserching/?keyword=${encodeURIComponent(
        keyword
      )}`;

      let url2 = `http://localhost:8080/api/bukuserchingpaging/?page=${
        this.state.page + 1
      }&limit=${this.state.rowsPerPage}&keyword=${encodeURIComponent(keyword)}`;

      Promise.all([fetch(url), fetch(url2)])
        .then(([response, response2]) =>
          Promise.all([response.json(), response2.json()])
        )
        .then(([json, json2]) => {
          this.setState({
            items: json2,
          });

          const total = json.length;
          this.setState({ totalRows: total });
        })
        .catch((e) => {
          console.log(e);
          swal("Gagal !", "Gagal mengambil data", "error");
        });
    }
  };

  searchDataTampung = (keyword) => {
    fetch(
      `http://localhost:8080/api/bukuserchingpaging/?page=${
        this.state.page + 1
      }&limit=${this.state.rowsPerPage}&keyword=${encodeURIComponent(keyword)}`,
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


  detailData = (idBuku) => {
    const indexCari = this.state.books.findIndex((x) => x.idBuku === idBuku);
    const dataDetail = this.state.books[indexCari];
    this.setState({
      detailBuku: dataDetail,
    });
  };

  onClickDelete = (id) => {
    swal({
      title: "Apakah anda yakin ?",
      text: "Buku akan dihapus secara permanen...",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((konfirmasi) => {
      if (konfirmasi) {
        fetch("http://localhost:8080/api/buku/" + id, {
          method: "delete",
          headers: {
            "Content-Type": "application/json; ; charset=utf-8",
            "Access-Control-Allow-Headers": "Authorization, Content-Type",
            "Access-Control-Allow-Origin": "*",
          },
        })
          .then((response) => response.json())
          .then((json) => {
            if (typeof json.errorMessage !== "undefined") {
              swal("Gagal !", json.errorMessage, "error");
            } else if (typeof json.successMessage !== "undefined") {
              swal("Berhasil !", json.successMessage, "success");
              this.getBooks();
            }
          })
          .catch((e) => {});
      } else {
        swal("Batal !", "Hapus buku dibatalkan...", "error");
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
      idBuku: "",
      judulBuku: "",
      pengarang: "",
      idJenisBuku: "",
      hargaSewa: "",
      stok: "",
      keterangan: "",
      act : 0,
      disable : false,
      dataEdit : {}
    });
  };

  tambahBuku = () => {
    let obj = this.state;
    if (
      obj.idBuku === "" ||
      obj.judulBuku === "" ||
      obj.pengarang === "" ||
      obj.idJenisBuku === "" ||
      obj.hargaSewa === "" ||
      obj.stok === "" ||
      obj.keterangan === ""
    ) {
      swal("Gagal !", "Semua Data wajib diisi", "error");
    } else {
      const objekBuku = {
        idBuku: this.state.idBuku,
        judulBuku: this.state.judulBuku,
        pengarang: this.state.pengarang,
        idJenisBuku: this.state.idJenisBuku,
        hargaSewa: this.state.hargaSewa,
        stok: this.state.stok,
        keterangan: this.state.keterangan,
      };

      fetch("http://localhost:8080/api/buku/", {
        method: "post",
        headers: {
          "Content-Type": "application/json; ; charset=utf-8",
          "Access-Control-Allow-Headers": "Authorization, Content-Type",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(objekBuku),
      })
        .then((response) => response.json())
        .then((json) => {
          if (typeof json.errorMessage !== "undefined") {
            swal("Gagal !", json.errorMessage, "error");
          } else if (typeof json.successMessage !== "undefined") {

            swal({
              text: json.successMessage,
              icon: "success",
              title: "Berhasil !!"
              })
              .then((value) => {
                this.clear();
                $("#buku .close").click();
                this.getBooks();
                
              })
            
          }
        })
        .catch((e) => {});
    }
  };

  updateBuku = () => {
    let obj = this.state;
    if (
      obj.idBuku === "" ||
      obj.judulBuku === "" ||
      obj.pengarang === "" ||
      obj.idJenisBuku === "" ||
      obj.hargaSewa === "" ||
      obj.stok === "" ||
      obj.keterangan === ""
    ) {
      swal("Gagal !", "Semua Data wajib diisi", "error");
    } else {
      const objekBuku = {
        idBuku: this.state.idBuku,
        judulBuku: this.state.judulBuku,
        pengarang: this.state.pengarang,
        idJenisBuku: this.state.idJenisBuku,
        hargaSewa: this.state.hargaSewa,
        stok: this.state.stok,
        keterangan: this.state.keterangan,
      };

      fetch("http://localhost:8080/api/buku/", {
        method: "put",
        headers: {
          "Content-Type": "application/json; ; charset=utf-8",
          "Access-Control-Allow-Headers": "Authorization, Content-Type",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(objekBuku),
      })
        .then((response) => response.json())
        .then((json) => {
          if (typeof json.errorMessage !== "undefined") {
            swal("Gagal !", json.errorMessage, "error");
          } else if (typeof json.successMessage !== "undefined") {
            swal({
              text: json.successMessage,
              icon: "success",
              title: "Berhasil !!"
              })
              .then((value) => {
                this.clear();
                $("#buku .close").click();
                this.getBooks();
                
              })
          }
        })
        .catch((e) => {});
    }
  };

  handleChange(keterangan, editor) {
    this.setState({ keterangan });
  }

  editClick = (idBuku) => {
    const indexCari = this.state.books.findIndex((x) => x.idBuku === idBuku);
    const dataDetail = this.state.books[indexCari];
    this.setState({
      idBuku: dataDetail.idBuku,
      judulBuku: dataDetail.judulBuku,
      pengarang: dataDetail.pengarang,
      idJenisBuku: dataDetail.idJenisBuku,
      hargaSewa: dataDetail.hargaSewa,
      stok: dataDetail.stok,
      keterangan: dataDetail.keterangan,
      act : 1,
      disable : true
    });
    
  };

  simpanClick = () => {
    if (this.state.act === 0) {
      this.tambahBuku();
    } else {
      this.updateBuku();
    }
  };

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
            <Title icon="fas fa-book-open" judul="Data Buku" />
            <Div className="state-information d-none d-sm-block">
              <ModalClick datatarget="#buku">
                <Button className="btn btn-primary">
                  <Italic className="fas fa-plus" />
                  &nbsp; Tambah Buku Baru
                </Button>
              </ModalClick>
            </Div>
          </HeaderContent>

          <IsiBody>
            <Row>
              <Div className="col-lg-9 col-md-6 col-5">
                <Div className="form-group row">
                  <Label className="col-sm-2 col-form-label">
                    Cari Data Buku :
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
                      <TableHeader width="20"></TableHeader>
                      <TableHeader>ID Buku</TableHeader>
                      <TableHeader>Judul</TableHeader>
                      <TableHeader>Jenis</TableHeader>
                      <TableHeader>Stok</TableHeader>
                      <TableHeader>Harga Sewa</TableHeader>
                      <TableHeader>Aksi</TableHeader>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.items.map((value, index) => {
                      return (
                        <TableRow key={index}>
                          <TableData>
                            <img
                              src={
                                value.jenisBuku === "Komik"
                                  ? gambarKomik
                                  : value.jenisBuku === "Novel"
                                  ? gambarNovel
                                  : gambarEnsiklopedia
                              }
                              height={50}
                              alt="Buku"
                            />
                          </TableData>
                          <TableData align="center">{value.idBuku}</TableData>
                          <TableData>{value.judulBuku}</TableData>
                          <TableData>{value.jenisBuku}</TableData>
                          <TableData align="center">{value.stok}</TableData>
                          <TableData align="center">
                            Rp. {value.hargaSewa}
                          </TableData>
                          <TableData>
                          <Tooltip keterangan="Detail">
                              <Button
                                className="btn btn-outline-info"
                                datatoggle="modal"
                                datatarget="#bb"
                                onClick={() => {
                                  this.detailData(value.idBuku);
                                }}
                              >
                                <Italic className="fas fa-folder-open" />
                              </Button>
                            </Tooltip>
                            <ReactTooltip />
                            <Tooltip keterangan="Hapus">
                              <Button
                                className="btn btn-outline-danger"
                                onClick={() => this.onClickDelete(value.idBuku)}
                              >
                                <Italic className="fas fa-trash" />
                              </Button>
                            </Tooltip>
                            <ReactTooltip />
                            <Tooltip keterangan="Edit">
                              <Button
                                className="btn btn-outline-warning"
                                datatoggle="modal"
                                datatarget="#buku"
                                onClick={() => this.editClick(value.idBuku)}
                              >
                                <Italic className="fas fa-edit" />
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
                    judul="Komik :"
                    isi={
                      this.state.books.filter((x) => x.jenisBuku === "Komik")
                        .length
                    }
                    icon="fas fa-book display-1"
                  />
                  <Card
                    size="col-xl-12"
                    color="card bg-primary mini-stat position-relative"
                    judul="Novel : "
                    isi={
                      this.state.books.filter((x) => x.jenisBuku === "Novel")
                        .length
                    }
                    icon="fas fa-book display-2"
                  />
                  <Card
                    size="col-xl-12"
                    color="card bg-secondary mini-stat position-relative"
                    judul="Ensiklopedia :"
                    isi={
                      this.state.books.filter(
                        (x) => x.jenisBuku === "Ensiklopedia"
                      ).length
                    }
                    icon="fas fa-book display-1"
                  />
                </Row>
              </Div>
            </Row>
          </IsiBody>
        </Content>
        <Footer />

        <Modal id="buku">
          <ModalContent className="modal-dialog modal-lg">
            <Div className="modal-header bg-primary">
              <ModalHeader judulheader="Form Data Buku" />
            </Div>
            <Div className="modal-body">
              <Div className="row">
                <Div className="col-lg-6 col-md-6 col-6">
                  <Div className="form-group">
                    <Input
                      type="text"
                      placeholder="ID Buku"
                      name="idBuku"
                      onChange={this.setValueInput}
                      value={this.state.idBuku}
                      disabled={this.state.disable}
                    />
                  </Div>
                  <Div className="form-group">
                    <Input
                      type="text"
                      placeholder="Pengarang"
                      name="pengarang"
                      onChange={this.setValueInput}
                      value={this.state.pengarang}
                    />
                  </Div>
                  <Div className="form-group">
                    <Input
                      type="number"
                      placeholder="Harga Sewa"
                      name="hargaSewa"
                      onChange={this.setValueInput}
                      value={this.state.hargaSewa}
                    />
                  </Div>
                </Div>
                <Div className="col-lg-6 col-md-6 col-6">
                  <Div className="form-group">
                    <Input
                      type="text"
                      placeholder="Judul"
                      name="judulBuku"
                      onChange={this.setValueInput}
                      value={this.state.judulBuku}
                    />
                  </Div>
                  <Div className="form-group">
                    <Select
                      value={this.state.idJenisBuku}
                      onChange={this.setValueInput}
                      name="idJenisBuku"
                    >
                      <Option value="">-- Pilih Jenis Buku--</Option>
                      {this.state.varianBooks.map((Item, idx) => (
                        <Option value={Item.idJenisBuku} key={idx}>
                          {Item.jenisBuku}
                        </Option>
                      ))}
                    </Select>
                  </Div>
                  <Div className="form-group">
                    <Input
                      type="number"
                      placeholder="Stok"
                      name="stok"
                      onChange={this.setValueInput}
                      value={this.state.stok}
                    />
                  </Div>
                </Div>
              </Div>
              <Label>Keterangan / Sinopsis :</Label>
              <Editor
                apiKey="g3jud1o4aqn5ch660c6418wr1iv4cdxo4cmf9pnyag9pm2eo"
                value={this.state.keterangan}
                init={{
                  height: 250,
                  menubar: false,
                }}
                onEditorChange={this.handleChange}
              />
            </Div>
            <Div className="modal-footer">
              <Button className="btn btn-primary" onClick={this.simpanClick}>
                <i className="fas fa-save" /> &nbsp;Simpan
              </Button>
            </Div>
          </ModalContent>
        </Modal>

        <Modal id="bb">
          <ModalContent className="modal-dialog modal-lg">
            <Div className="modal-header bg-primary">
              <ModalHeader judulheader="Keterangan Buku" />
            </Div>
            <Div className="modal-body">
              <Table className="table dt-responsive nowrap">
                <TableHead>
                  <TableRow>
                    <TableHeader colSpan="4">
                      Stok Tersisa : {this.state.detailBuku.stok}
                    </TableHeader>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableData rowSpan={5} width="225">
                      <img
                        className="card-img-top"
                        src={
                          this.state.detailBuku.jenisBuku === "Komik"
                            ? gambarKomik
                            : this.state.detailBuku.jenisBuku === "Novel"
                            ? gambarNovel
                            : gambarEnsiklopedia
                        }
                        height={250}
                        alt="Buku"
                      />
                    </TableData>
                    <TableData>ID Buku</TableData>
                    <TableData width={9}>:</TableData>
                    <TableData>{this.state.detailBuku.idBuku}</TableData>
                  </TableRow>
                  <TableRow>
                    <TableData>Judul</TableData>
                    <TableData width={9}>:</TableData>
                    <TableData>{this.state.detailBuku.judulBuku}</TableData>
                  </TableRow>
                  <TableRow>
                    <TableData>Jenis Buku</TableData>
                    <TableData width={9}>:</TableData>
                    <TableData>{this.state.detailBuku.jenisBuku}</TableData>
                  </TableRow>
                  <TableRow>
                    <TableData>Pengarang</TableData>
                    <TableData width={9}>:</TableData>
                    <TableData>{this.state.detailBuku.pengarang}</TableData>
                  </TableRow>
                  <TableRow>
                    <TableData>Keterangan</TableData>
                    <TableData width={9}>:</TableData>
                    <TableData>
                      <Markup content={this.state.detailBuku.keterangan} />
                    </TableData>
                  </TableRow>
                </TableBody>
              </Table>
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

export default connect(mapStateToProps, mapDispatchToProps)(Buku);
