import React, { Component } from "react";
import { connect } from "react-redux";
import { Header, Menu, Footer } from "../../../template/pelanggan";
import gambarKomik from "../../../komik.jpg";
import gambarNovel from "../../../novel.jpg";
import gambarEnsiklopedia from "../../../ensiklopedia.jpg";
import TablePagination from "@material-ui/core/TablePagination";
import swal from "sweetalert";
import { Markup } from "interweave";
import $ from "jquery";
import {
  Button,
  IsiBody,
  HeaderContent,
  Content,
  Title,
  Card,
  Modal,
  Tablist,
  Li,
  Tabitem,
  Tabpane,
  Tabcontent,
  CardBuku,
  Row,
  Div,
  ModalHeader,
  ModalContent,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableData,
  Center,
  Italic,
  Label,
  Input,
  TextStatus,
  Bold
} from "../../../component";

class BukuList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      items: [],
      novel: [],
      komik: [],
      ensiklopedia: [],
      page: 0,
      rowsPerPage: 6,
      totalRows: 0,
      detailBuku: {},
      cart: {},
      checkPengembalian: {},
      listBuku : [],
      hargaSewa : 0
    };
  }

  getBooks() {
    let url = `http://localhost:8080/api/bukupaging/?page=${
      this.state.page + 1
    }&limit=${this.state.rowsPerPage}`;

    Promise.all([
      fetch(url),
      fetch("http://localhost:8080/api/buku/"),
      fetch(`http://localhost:8080/api/isikeranjang/?idCart=${encodeURIComponent(
        this.props.dataUserLogin.idUser
      )}`)
    ])
      .then(([response, response2, response3]) =>
        Promise.all([response.json(), response2.json(), response3.json()])
      )
      .then(([json, json2, json3]) => {
        this.setState({
          books: json2,
          items: json,
          listBuku:json3
        });

        let dataKomik = this.state.books.filter((x) => x.jenisBuku === "Komik");
        let dataNovel = this.state.books.filter((x) => x.jenisBuku === "Novel");
        let dataEnsiklopedia = this.state.books.filter(
          (x) => x.jenisBuku === "Ensiklopedia"
        );
        const total = this.state.books.length;

        this.setState({
          totalRows: total,
          komik: dataKomik,
          novel: dataNovel,
          ensiklopedia: dataEnsiklopedia,
        });
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
    this.checkCart();
    this.checkPengembalian();
  }

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: parseInt(event.target.value, 10) });
    this.setState({ page: 0 });
  };

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage }, () => {
      this.getBooks();
    });
  };

  searchData = (el) => {
    var keyword = el.target.value;

    if (keyword === "") {
      this.getBooks();
    } else {
      fetch(
        `http://localhost:8080/api/bukuserching/?keyword=${encodeURIComponent(
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

  detailData = (idBuku) => {
    const indexCari = this.state.books.findIndex((x) => x.idBuku === idBuku);
    const dataDetail = this.state.books[indexCari];
    this.setState({
      detailBuku: dataDetail,
      hargaSewa:dataDetail.hargaSewa
    });
  };

  changeRupiah = (bilangan) => {
    var reverse = bilangan.toString().split("").reverse().join(""),
      ribuan = reverse.match(/\d{1,3}/g);
    ribuan = ribuan.join(".").split("").reverse().join("");
    return ribuan;
  };

  infoPeminjaman = () => {
    if (this.props.dataUserLogin.role === "Member") {
      swal(
        "Informasi",
        "Pelanggan MEMBER bisa meminjam hingga 5 buku dalam kurun waktu tertentu, dengan syarat: \n4 buku novel \n3 buku komik. \n3 buku novel dan 2 buku komik. \n2 buku ensiklopedia \nMasing-masing jenis buku 1.",
        "warning"
      );
    } else {
      swal(
        "Informasi",
        "Pelanggan UMUM hanya bisa meminjam paling banyak 3 buku dalam kurun waktu tertentu, dengan syarat: \n 2 buku novel. \n 1 buku novel dan buku komik. \n 1 buku ensiklopedia.",
        "warning"
      );
    }
  };

  addKeranjang = (idBuku) => {
    const objekBuku = {
      idCart: this.props.dataUserLogin.idUser,
      idUser: this.props.dataUserLogin.idUser,
    };

    fetch("http://localhost:8080/api/cart/", {
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
        }
        
      })
      .catch((e) => {});
  };

  addIsiKeranjang = (idBuku) => {
    const objekBuku = {
      idCart: this.props.dataUserLogin.idUser,
      idBuku: idBuku,
      qty: 1,
    };

    fetch("http://localhost:8080/api/cartdetail/", {
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
              $("#bb .close").click();
            })
            this.getBooks();
        }
      })
      .catch((e) => {});
  };

  checkCart = () => {
    fetch(
      `http://localhost:8080/api/cart/?idCart=${encodeURIComponent(
        this.props.dataUserLogin.idUser
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
          cart: json,
        });
      })
      .catch((e) => {});
  };

  checkPengembalian = () => {
    fetch(
      `http://localhost:8080/api/checkpengembalian/?idUser=${encodeURIComponent(
        this.props.dataUserLogin.idUser
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
          checkPengembalian: json,
        });
      })
      .catch((e) => {});
  };

  pinjamClick = (idBuku) => {
    if ($.isEmptyObject(this.state.checkPengembalian) === false) {

      swal({
        text: "Anda telah meminjam, untuk meminjam kembali, peminjaman sebelumnya harap dikembalikan... Terimakasih...",
        icon: "warning",
        title: "Peringatan!"
        })
        .then((value) => {
          $("#bb .close").click();
        })

    } else {

      if ($.isEmptyObject(this.state.cart) === true) {

        this.addKeranjang();
        this.setState({
          cart: { cart: false },
        });
        this.addIsiKeranjang(idBuku);
        this.props.history.push("/pelanggan/bukulist");

      } else if ($.isEmptyObject(this.state.cart) === false) {
        this.addIsiKeranjang(idBuku);
      }
      
    }
  };

  render() {
    if (
      this.props.checkLogin === true &&
      this.props.dataUserLogin.role === "Admin"
    ) {
      this.props.history.push("/admin");
    } else if (this.props.checkLogin === false) {
      this.props.history.push("/login");
    }
    return (
      <>
        <Header />
        <Menu />
        <Content>
          <HeaderContent>
            <Title icon="fas fa-book" judul="List Peminjaman Buku" />
            <Div className="state-information d-none d-sm-block">
              <Button
                className="btn btn-primary"
                onClick={() => this.props.history.push("/pelanggan/keranjang")}
              >
                Check Keranjang <Italic className="fas fa-angle-double-right" />
              </Button>
            </Div>
          </HeaderContent>

          <IsiBody>
            <Row>
              <Div className="col-lg-9 col-md-6 col-5">
                <Tablist>
                  <Li className="nav-item">
                    <Tabitem className="nav-link active" href="#allBuku">
                      Semua Buku ({this.state.books.length})
                    </Tabitem>
                  </Li>
                  <Li className="nav-item">
                    <Tabitem className="nav-link" href="#komik">
                      Komik (
                      {
                        this.state.books.filter((x) => x.jenisBuku === "Komik")
                          .length
                      }
                      )
                    </Tabitem>
                  </Li>
                  <Li className="nav-item">
                    <Tabitem className="nav-link" href="#novel">
                      Novel (
                      {
                        this.state.books.filter((x) => x.jenisBuku === "Novel")
                          .length
                      }
                      )
                    </Tabitem>
                  </Li>
                  <Li className="nav-item">
                    <Tabitem className="nav-link" href="#ensiklopedia">
                      Ensiklopedia (
                      {
                        this.state.books.filter(
                          (x) => x.jenisBuku === "Ensiklopedia"
                        ).length
                      }
                      )
                    </Tabitem>
                  </Li>
                </Tablist>

                <Tabcontent>
                  <Tabpane className="tab-pane active p-3" id="allBuku">
                    <Div className="form-group row">
                      <Label className="col-sm-2 col-form-label">
                        Pencarian Buku
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
                    <Row>
                      {this.state.items.map((value, index) => {
                        return (
                          <CardBuku
                            key={index}
                            src={
                              value.jenisBuku === "Komik"
                                ? gambarKomik
                                : value.jenisBuku === "Novel"
                                ? gambarNovel
                                : gambarEnsiklopedia
                            }
                            datatarget="#bb"
                            judul={value.judulBuku}
                            pengarang={value.pengarang}
                            sewa={this.changeRupiah(value.hargaSewa)}
                            onClick={() => {
                              this.detailData(value.idBuku);
                            }}
                          />
                        );
                      })}
                    </Row>
                    <TablePagination
                      component="div"
                      count={this.state.totalRows}
                      page={this.state.page}
                      onChangePage={this.handleChangePage}
                      rowsPerPage={this.state.rowsPerPage}
                      onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                  </Tabpane>
                  <Tabpane className="tab-pane p-3" id="komik">
                    <Row>
                      {this.state.komik.map((value, index) => {
                        return (
                          <CardBuku
                            key={index}
                            src={
                              value.jenisBuku === "Komik"
                                ? gambarKomik
                                : value.jenisBuku === "Novel"
                                ? gambarNovel
                                : gambarEnsiklopedia
                            }
                            datatarget="#bb"
                            judul={value.judulBuku}
                            pengarang={value.pengarang}
                            sewa={this.changeRupiah(value.hargaSewa)}
                            onClick={() => {
                              this.detailData(value.idBuku);
                            }}
                          />
                        );
                      })}
                    </Row>
                  </Tabpane>
                  <Tabpane className="tab-pane p-3" id="novel">
                    <Row>
                      {this.state.novel.map((value, index) => {
                        return (
                          <CardBuku
                            key={index}
                            src={
                              value.jenisBuku === "Komik"
                                ? gambarKomik
                                : value.jenisBuku === "Novel"
                                ? gambarNovel
                                : gambarEnsiklopedia
                            }
                            datatarget="#bb"
                            judul={value.judulBuku}
                            pengarang={value.pengarang}
                            sewa={this.changeRupiah(value.hargaSewa)}
                            onClick={() => {
                              this.detailData(value.idBuku);
                            }}
                          />
                        );
                      })}
                    </Row>
                  </Tabpane>
                  <Tabpane className="tab-pane p-3" id="ensiklopedia">
                    <Row>
                      {this.state.ensiklopedia.map((value, index) => {
                        return (
                          <CardBuku
                            key={index}
                            src={
                              value.jenisBuku === "Komik"
                                ? gambarKomik
                                : value.jenisBuku === "Novel"
                                ? gambarNovel
                                : gambarEnsiklopedia
                            }
                            datatarget="#bb"
                            judul={value.judulBuku}
                            pengarang={value.pengarang}
                            sewa={this.changeRupiah(value.hargaSewa)}
                            onClick={() => {
                              this.detailData(value.idBuku);
                            }}
                          />
                        );
                      })}
                    </Row>
                  </Tabpane>
                </Tabcontent>
              </Div>
              <Div className="col-lg-3 col-md-6 col-7">
                <Center>
                  <Button
                    className="btn btn-info"
                    onClick={() => this.infoPeminjaman()}
                  >
                    <Italic className="fas fa-info-circle" />
                    &nbsp; Info / Aturan Peminjaman Buku
                  </Button>
                </Center>
                <br />
                <Row>
                  <Card
                    size="col-xl-12"
                    color="card bg-secondary mini-stat position-relative"
                    judul="Keranjang :"
                    isi={this.state.listBuku.length}
                    icon="fas fa-cart-arrow-down display-1"
                  />
                  <Card
                    size="col-xl-12"
                    color="card bg-primary mini-stat position-relative"
                    judul="Batas Pinjam : "
                    isi={
                      this.props.dataUserLogin.role === "Member"
                        ? "5 Buku"
                        : "3 Buku"
                    }
                    icon="fas fa-book display-2"
                  />
                </Row>
              </Div>
            </Row>
          </IsiBody>
        </Content>
        <Footer />

        <Modal id="bb">
          <ModalContent className="modal-dialog modal-lg">
            <Div className="modal-header bg-primary">
              <ModalHeader judulheader="Keterangan Peminjaman Buku" />
            </Div>
            <Div className="modal-body">
              <Table className="table dt-responsive nowrap">
                <TableHead>
                  
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableData rowSpan={6} width="225">
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
                      <Center><TextStatus color="#00a0df" status={"Rp. "+ this.changeRupiah(this.state.hargaSewa)}/></Center>
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
                    <TableData>Stok</TableData>
                    <TableData width={9}>:</TableData>
                    <TableData><Bold><font color={this.state.detailBuku.stok === 0 ? "red" : ""}>{this.state.detailBuku.stok} Buku</font></Bold></TableData>
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
            <Div className="modal-footer">
              <Button
                className="btn btn-primary"
                onClick={() => this.pinjamClick(this.state.detailBuku.idBuku)}
                disabled={this.state.detailBuku.stok === 0 ? true : false}
              >
                <i className="fas fa-cart-arrow-down" /> &nbsp;Pinjam Buku
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

export default connect(mapStateToProps, mapDispatchToProps)(BukuList);
