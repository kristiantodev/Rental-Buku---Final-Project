import React, { Component } from "react";
import { connect } from "react-redux";
import { Header, Menu, Footer } from "../../../template/pelanggan";
import ReactTooltip from "react-tooltip";
import moment from "moment";
import $ from "jquery";
import swal from "sweetalert";
import gambar from "../../../keranjang.jpg";
import gambarPengembalian from "../../../peminjaman.jpg";
import { Doughnut } from "react-chartjs-2";
import {
  Button,
  IsiBody,
  HeaderContent,
  Content,
  Title,
  Row,
  Div,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableData,
  Italic,
  TextStatus,
  Bold,
  Center,
  Tooltip,
} from "../../../component";
const dt = new Date();
const dtPinjam = new Date();
const dtKembali = dtPinjam.setDate(dtPinjam.getDate() + 5);

class Keranjang extends Component {
  constructor(props) {
    super(props);
    this.state = {
      peminjaman: {},
      listBuku: [],
      checkPengembalian: {},
      statusPeminjaman: "",
      colorText: "",
      disable:false,
      totalPinjamKomik: 0,
      totalPinjamNovel: 0,
      totalPinjamEnsiklopedia: 0,
      totalPinjam: {
        labels: ["Komik", "Novel", "Ensiklopedia"],
        datasets: [
          {
            label: "Jumlah dipinjam",
            backgroundColor: ["#2FDE00", "#00A6B4", "#6800B4"],
            hoverBackgroundColor: ["#175000", "#003350", "#35014F"],
            data: [0, 0, 0],
          },
        ],
      },
    };
  }

  getPeminjaman = () => {
    fetch(
      `http://localhost:8080/api/peminjaman/?idCart=${encodeURIComponent(
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
          peminjaman: json,
        });

        console.log("data Buku : ", json.listBuku);

        if ($.isEmptyObject(this.state.peminjaman) === true) {
          this.setState({
            listBuku: [],
          });
        } else {
          this.setState({
            listBuku: this.state.peminjaman.listBuku,
          });
        }

        this.getStatusPeminjaman();
      })
      .catch((e) => {});
  };

  componentDidMount() {
    this.getPeminjaman();
    this.checkPengembalian();
    this.getTotalRiwayatPeminjaman();
  }

  getTotalRiwayatPeminjaman = () => {
    Promise.all([
      fetch(
        `http://localhost:8080/api/totalpinjamkomik/?idUser=${encodeURIComponent(
          this.props.dataUserLogin.idUser
        )}`
      ),
      fetch(
        `http://localhost:8080/api/totalpinjamnovel/?idUser=${encodeURIComponent(
          this.props.dataUserLogin.idUser
        )}`
      ),
      fetch(
        `http://localhost:8080/api/totalpinjamensiklopedia/?idUser=${encodeURIComponent(
          this.props.dataUserLogin.idUser
        )}`
      ),
    ])
      .then(([response, response2, response3]) =>
        Promise.all([response.json(), response2.json(), response3.json()])
      )
      .then(([json, json2, json3]) => {
        let jKomik = `Komik(${json.data})`;
        let jNovel = `Novel(${json2.data})`;
        let jEns = `Ensiklopedia(${json3.data})`;

        const updateTotalRiwayat = {
          labels: [jKomik, jNovel, jEns],
          datasets: [
            {
              label: "Jumlah dipinjam",
              backgroundColor: ["#2FDE00", "#00A6B4", "#6800B4"],
              hoverBackgroundColor: ["#175000", "#003350", "#35014F"],
              data: [json.data, json2.data, json3.data],
            },
          ],
        };

        this.setState({
          totalPinjamKomik: json.data,
          totalPinjamNovel: json2.data,
          totalPinjamEnsiklopedia: json3.data,
          totalPinjam: updateTotalRiwayat,
        });

        console.log("komik", this.state.totalPinjamKomik);
        console.log("novel", this.state.totalPinjamNovel);
        console.log("ens", this.state.totalPinjamEnsiklopedia);
        console.log(updateTotalRiwayat);
        this.getStatusPeminjamanUmum();
        this.getStatusPeminjamanMember();
      })
      .catch(() => {});
  };

  getStatusPeminjamanUmum = () => {
    const jumlahPinjamKomik = this.state.listBuku.filter(
      (x) => x.jenisBuku === "Komik"
    ).length;

    const jumlahPinjamNovel = this.state.listBuku.filter(
      (x) => x.jenisBuku === "Novel"
    ).length;

    const jumlahPinjamEnsiklopedia = this.state.listBuku.filter(
      (x) => x.jenisBuku === "Ensiklopedia"
    ).length;

    //1 jika syarat peminjaman sudah memenuhi dalam 1 bulan (checkout gagal)
    if(this.state.totalPinjamNovel === 2 && this.state.totalPinjamKomik === 0 && this.state.totalPinjamEnsiklopedia === 0){
      this.setState({
        statusPeminjaman: "PEMINJAMAN DITOLAK",
        colorText: "#ff4040",
        disable:true,
      });
      //2 jika syarat peminjaman sudah memenuhi dalam 1 bulan (checkout gagal)
     }else if(this.state.totalPinjamNovel === 1 && this.state.totalPinjamKomik === 1 && this.state.totalPinjamEnsiklopedia === 0){
      this.setState({
        statusPeminjaman: "PEMINJAMAN DITOLAK",
        colorText: "#ff4040",
        disable:true,
      });
      //3 jika syarat peminjaman sudah memenuhi dalam 1 bulan (checkout gagal)
    }else if(this.state.totalPinjamNovel === 0 && this.state.totalPinjamKomik === 0 && this.state.totalPinjamEnsiklopedia === 1){
      this.setState({
        statusPeminjaman: "PEMINJAMAN DITOLAK",
        colorText: "#ff4040",
        disable:true,
      });
      //4 jika syarat peminjaman belum memenuhi dalam 1 bulan (checkout bisa)
    }else{
      //4.1
      if(this.state.totalPinjamNovel === 1 && this.state.totalPinjamKomik === 0 && this.state.totalPinjamEnsiklopedia === 0){
        if(jumlahPinjamNovel === 1 && jumlahPinjamKomik === 0 && jumlahPinjamEnsiklopedia === 0){
          this.setState({
            statusPeminjaman: "PEMINJAMAN DITERIMA",
            colorText: "#1aa23e",
            disable:false,
          });
         
        }else if(jumlahPinjamNovel === 0 && jumlahPinjamKomik === 1 && jumlahPinjamEnsiklopedia === 0){
          this.setState({
            statusPeminjaman: "PEMINJAMAN DITERIMA",
            colorText: "#1aa23e",
            disable:false,
          });
        }else{
          this.setState({
            statusPeminjaman: "PEMINJAMAN DITOLAK",
            colorText: "#ff4040",
            disable:true,
          });
        }
         //4.2
       }else if(this.state.totalPinjamNovel === 0 && this.state.totalPinjamKomik === 1 && this.state.totalPinjamEnsiklopedia === 0){
        if(jumlahPinjamNovel === 1 && jumlahPinjamKomik === 0 && jumlahPinjamEnsiklopedia === 0){
          this.setState({
            statusPeminjaman: "PEMINJAMAN DITERIMA",
            colorText: "#1aa23e",
            disable:false,
          });
        }else{
          this.setState({
            statusPeminjaman: "PEMINJAMAN DITOLAK",
            colorText: "#ff4040",
            disable:true,
          });
        }
//4.3 (baru meminjam)
      }else if(this.state.totalPinjamNovel === 0 && this.state.totalPinjamKomik === 0 && this.state.totalPinjamEnsiklopedia === 0){
        if(jumlahPinjamNovel === 2 && jumlahPinjamKomik === 0 && jumlahPinjamEnsiklopedia === 0){
          this.setState({
            statusPeminjaman: "PEMINJAMAN DITERIMA",
            colorText: "#1aa23e",
            disable:false,
          });
        }else if(jumlahPinjamNovel === 1 && jumlahPinjamKomik === 1 && jumlahPinjamEnsiklopedia === 0){
          this.setState({
            statusPeminjaman: "PEMINJAMAN DITERIMA",
            colorText: "#1aa23e",
            disable:false,
          });
        }else if(jumlahPinjamNovel === 0 && jumlahPinjamKomik === 0 && jumlahPinjamEnsiklopedia === 1){
          this.setState({
            statusPeminjaman: "PEMINJAMAN DITERIMA",
            colorText: "#1aa23e",
            disable:false,
          });
        }else if(jumlahPinjamNovel === 1 && jumlahPinjamKomik === 0 && jumlahPinjamEnsiklopedia === 0){
          this.setState({
            statusPeminjaman: "PEMINJAMAN DITERIMA",
            colorText: "#1aa23e",
            disable:false,
          });
        }else if(jumlahPinjamNovel === 0 && jumlahPinjamKomik === 1 && jumlahPinjamEnsiklopedia === 0){
          this.setState({
            statusPeminjaman: "PEMINJAMAN DITERIMA",
            colorText: "#1aa23e",
            disable:false,
          });
        }else if(jumlahPinjamNovel === 0 && jumlahPinjamKomik === 0 && jumlahPinjamEnsiklopedia === 1){
          this.setState({
            statusPeminjaman: "PEMINJAMAN DITERIMA",
            colorText: "#1aa23e",
            disable:false,
          });
        }else{
          this.setState({
            statusPeminjaman: "PEMINJAMAN DITOLAK",
            colorText: "#ff4040",
            disable:true,
          });
        }

       }else{
        this.setState({
          statusPeminjaman: "PEMINJAMAN DITOLAK",
          colorText: "#ff4040",
          disable:true,
        });
       }

    }
    //umum
  }

  getStatusPeminjamanMember = () => {
    const jumlahPinjamKomik = this.state.listBuku.filter(
      (x) => x.jenisBuku === "Komik"
    ).length;

    const jumlahPinjamNovel = this.state.listBuku.filter(
      (x) => x.jenisBuku === "Novel"
    ).length;

    const jumlahPinjamEnsiklopedia = this.state.listBuku.filter(
      (x) => x.jenisBuku === "Ensiklopedia"
    ).length;

    //1 jika syarat peminjaman sudah memenuhi (maka checkout ditolak)
    if(this.state.totalPinjamNovel === 4 && this.state.totalPinjamKomik === 0 && this.state.totalPinjamEnsiklopedia === 0){
      this.setState({
        statusPeminjaman: "PEMINJAMAN DITOLAK",
        colorText: "#ff4040",
        disable:true,
      });
      //2 jika syarat peminjaman sudah memenuhi (maka checkout ditolak)
     }else if(this.state.totalPinjamNovel === 0 && this.state.totalPinjamKomik === 3 && this.state.totalPinjamEnsiklopedia === 0){
      this.setState({
        statusPeminjaman: "PEMINJAMAN DITOLAK",
        colorText: "#ff4040",
        disable:true,
      });
      //3 jika syarat peminjaman sudah memenuhi (maka checkout ditolak)
    }else if(this.state.totalPinjamNovel === 3 && this.state.totalPinjamKomik === 2 && this.state.totalPinjamEnsiklopedia === 0){
      this.setState({
        statusPeminjaman: "PEMINJAMAN DITOLAK",
        colorText: "#ff4040",
        disable:true,
      });

      //4 jika syarat peminjaman sudah memenuhi (maka checkout ditolak)
    }else if(this.state.totalPinjamNovel === 0 && this.state.totalPinjamKomik === 0 && this.state.totalPinjamEnsiklopedia === 2){
      this.setState({
        statusPeminjaman: "PEMINJAMAN DITOLAK",
        colorText: "#ff4040",
        disable:true,
      });

      //5 jika syarat peminjaman sudah memenuhi (maka checkout ditolak)
    }else if(this.state.totalPinjamNovel === 1 && this.state.totalPinjamKomik === 1 && this.state.totalPinjamEnsiklopedia === 1){
      this.setState({
        statusPeminjaman: "PEMINJAMAN DITOLAK",
        colorText: "#ff4040",
        disable:true,
      });

      //6 jika syarat peminjaman belum memenuhi (maka bisa checkout)
    }else{
      //6.1
      if(this.state.totalPinjamNovel === 0 && this.state.totalPinjamKomik === 0 && this.state.totalPinjamEnsiklopedia === 0){
        
        //6.1.1
        if(jumlahPinjamNovel <= 4 && jumlahPinjamKomik === 0 && jumlahPinjamEnsiklopedia === 0){
          this.setState({
            statusPeminjaman: "PEMINJAMAN DITERIMA",
            colorText: "#1aa23e",
            disable:false,
          });
          //6.1.2
        }else if(jumlahPinjamNovel === 0 && jumlahPinjamKomik <= 3 && jumlahPinjamEnsiklopedia === 0){
          this.setState({
            statusPeminjaman: "PEMINJAMAN DITERIMA",
            colorText: "#1aa23e",
            disable:false,
          });
          //6.1.3
        }else if(jumlahPinjamNovel <= 3 && jumlahPinjamKomik <= 2 && jumlahPinjamEnsiklopedia === 0){
          this.setState({
            statusPeminjaman: "PEMINJAMAN DITERIMA",
            colorText: "#1aa23e",
            disable:false,
          });
          //6.1.4
        }else if(jumlahPinjamNovel === 0 && jumlahPinjamKomik === 0 && jumlahPinjamEnsiklopedia <= 2){
          this.setState({
            statusPeminjaman: "PEMINJAMAN DITERIMA",
            colorText: "#1aa23e",
            disable:false,
          });
          //6.1.5
        }else if(jumlahPinjamNovel <= 1 && jumlahPinjamKomik <= 1 && jumlahPinjamEnsiklopedia <= 1){
          this.setState({
            statusPeminjaman: "PEMINJAMAN DITERIMA",
            colorText: "#1aa23e",
            disable:false,
          });
        //   //6.1.6
        // }else if(jumlahPinjamNovel === 1 && jumlahPinjamKomik === 0 && jumlahPinjamEnsiklopedia === 0){
        //   this.setState({
        //     statusPeminjaman: "PEMINJAMAN DITERIMA",
        //     colorText: "#1aa23e",
        //     disable:false,
        //   });
        //   //6.1.7
        // }else if(jumlahPinjamNovel === 0 && jumlahPinjamKomik === 1 && jumlahPinjamEnsiklopedia === 0){
        //   this.setState({
        //     statusPeminjaman: "PEMINJAMAN DITERIMA",
        //     colorText: "#1aa23e",
        //     disable:false,
        //   });
        //   //6.1.8
        // }else if(jumlahPinjamNovel === 0 && jumlahPinjamKomik === 0 && jumlahPinjamEnsiklopedia === 1){
        //   this.setState({
        //     statusPeminjaman: "PEMINJAMAN DITERIMA",
        //     colorText: "#1aa23e",
        //     disable:false,
        //   });
        //   //6.1.9
        // }else if(jumlahPinjamNovel === 1 && jumlahPinjamKomik === 1 && jumlahPinjamEnsiklopedia === 0){
        //   this.setState({
        //     statusPeminjaman: "PEMINJAMAN DITERIMA",
        //     colorText: "#1aa23e",
        //     disable:false,
        //   });
        //   //6.1.10
        // }else if(jumlahPinjamNovel === 1 && jumlahPinjamKomik === 0 && jumlahPinjamEnsiklopedia === 1){
        //   this.setState({
        //     statusPeminjaman: "PEMINJAMAN DITERIMA",
        //     colorText: "#1aa23e",
        //     disable:false,
        //   });
        //   //6.1.11
        // }else if(jumlahPinjamNovel === 0 && jumlahPinjamKomik === 1 && jumlahPinjamEnsiklopedia === 1){
        //   this.setState({
        //     statusPeminjaman: "PEMINJAMAN DITERIMA",
        //     colorText: "#1aa23e",
        //     disable:false,
        //   });
          //6.1.12
        }else{
          this.setState({
            statusPeminjaman: "PEMINJAMAN DITOLAK",
            colorText: "#ff4040",
            disable:true,
          });
        }
       //6.2
      }else if(this.state.totalPinjamNovel === 1 && this.state.totalPinjamKomik === 0 && this.state.totalPinjamEnsiklopedia === 0){
           //6.2.1   
           if(jumlahPinjamNovel <= 3 && jumlahPinjamKomik === 0 && jumlahPinjamEnsiklopedia === 0){
            this.setState({
              statusPeminjaman: "PEMINJAMAN DITERIMA",
              colorText: "#1aa23e",
              disable:false,
            });
            //6.2.2  
           }else if(jumlahPinjamNovel <= 2 && jumlahPinjamKomik <=2 && jumlahPinjamEnsiklopedia === 0){
            this.setState({
              statusPeminjaman: "PEMINJAMAN DITERIMA",
              colorText: "#1aa23e",
              disable:false,
            });
            //6.2.3 
          }else if(jumlahPinjamNovel === 0 && jumlahPinjamKomik <=1 && jumlahPinjamEnsiklopedia <= 1){
            this.setState({
              statusPeminjaman: "PEMINJAMAN DITERIMA",
              colorText: "#1aa23e",
              disable:false,
            });
            //6.2.4  
           }else{
            this.setState({
              statusPeminjaman: "PEMINJAMAN DITOLAK",
              colorText: "#ff4040",
              disable:true,
            });
           }
           //6.3  
      }else if(this.state.totalPinjamNovel === 2 && this.state.totalPinjamKomik === 0 && this.state.totalPinjamEnsiklopedia === 0){
            //6.3.1  
            if(jumlahPinjamNovel <= 2 && jumlahPinjamKomik === 0 && jumlahPinjamEnsiklopedia === 0){
             this.setState({
               statusPeminjaman: "PEMINJAMAN DITERIMA",
               colorText: "#1aa23e",
               disable:false,
             });
             //6.3.2
            }else if(jumlahPinjamNovel <= 1 && jumlahPinjamKomik <=2 && jumlahPinjamEnsiklopedia === 0){
             this.setState({
               statusPeminjaman: "PEMINJAMAN DITERIMA",
               colorText: "#1aa23e",
               disable:false,
             });
             //6.3.3
            }else{
             this.setState({
               statusPeminjaman: "PEMINJAMAN DITOLAK",
               colorText: "#ff4040",
               disable:true,
             });
            }
            //6.4
      }else if(this.state.totalPinjamNovel === 3 && this.state.totalPinjamKomik === 0 && this.state.totalPinjamEnsiklopedia === 0){
        //6.4.1
            if(jumlahPinjamNovel === 1 && jumlahPinjamKomik === 0 && jumlahPinjamEnsiklopedia === 0){
             this.setState({
               statusPeminjaman: "PEMINJAMAN DITERIMA",
               colorText: "#1aa23e",
               disable:false,
             });
             //6.4.2
            }else if(jumlahPinjamNovel === 0 && jumlahPinjamKomik <=2 && jumlahPinjamEnsiklopedia === 0){
             this.setState({
               statusPeminjaman: "PEMINJAMAN DITERIMA",
               colorText: "#1aa23e",
               disable:false,
             });
             //6.4.3
            }else{
             this.setState({
               statusPeminjaman: "PEMINJAMAN DITOLAK",
               colorText: "#ff4040",
               disable:true,
             });
            }
             //6.5
      }else if(this.state.totalPinjamNovel === 0 && this.state.totalPinjamKomik === 1 && this.state.totalPinjamEnsiklopedia === 0){
        //6.5.1
            if(jumlahPinjamNovel === 0 && jumlahPinjamKomik <= 2 && jumlahPinjamEnsiklopedia === 0){
             this.setState({
               statusPeminjaman: "PEMINJAMAN DITERIMA",
               colorText: "#1aa23e",
               disable:false,
             });
             //6.5.2
            }else if(jumlahPinjamNovel <= 3 && jumlahPinjamKomik <=1 && jumlahPinjamEnsiklopedia === 0){
             this.setState({
               statusPeminjaman: "PEMINJAMAN DITERIMA",
               colorText: "#1aa23e",
               disable:false,
             });
             //6.5.3
            }else if(jumlahPinjamNovel <= 1 && jumlahPinjamKomik === 0 && jumlahPinjamEnsiklopedia <= 1){
              this.setState({
                statusPeminjaman: "PEMINJAMAN DITERIMA",
                colorText: "#1aa23e",
                disable:false,
              });
             //6.5.4
            }else{
             this.setState({
               statusPeminjaman: "PEMINJAMAN DITOLAK",
               colorText: "#ff4040",
               disable:true,
             });
            }
            //6.6
      }else if(this.state.totalPinjamNovel === 0 && this.state.totalPinjamKomik === 2 && this.state.totalPinjamEnsiklopedia === 0){
            //6.6.1
                if(jumlahPinjamNovel === 0 && jumlahPinjamKomik <= 1 && jumlahPinjamEnsiklopedia === 0){
                 this.setState({
                   statusPeminjaman: "PEMINJAMAN DITERIMA",
                   colorText: "#1aa23e",
                   disable:false,
                 });
                 //6.6.2
                }else if(jumlahPinjamNovel <= 3 && jumlahPinjamKomik === 0 && jumlahPinjamEnsiklopedia === 0){
                 this.setState({
                   statusPeminjaman: "PEMINJAMAN DITERIMA",
                   colorText: "#1aa23e",
                   disable:false,
                 });
                 //6.6.3
                }else{
                 this.setState({
                   statusPeminjaman: "PEMINJAMAN DITOLAK",
                   colorText: "#ff4040",
                   disable:true,
                 });
                }
                //6.7
        }else if(this.state.totalPinjamNovel === 1 && this.state.totalPinjamKomik === 1 && this.state.totalPinjamEnsiklopedia === 0){
                //6.7.1
                    if(jumlahPinjamNovel <=2 && jumlahPinjamKomik <= 1 && jumlahPinjamEnsiklopedia === 0){
                     this.setState({
                       statusPeminjaman: "PEMINJAMAN DITERIMA",
                       colorText: "#1aa23e",
                       disable:false,
                     });
                     //6.7.2
                    }else{
                     this.setState({
                       statusPeminjaman: "PEMINJAMAN DITOLAK",
                       colorText: "#ff4040",
                       disable:true,
                     });
                    }
          }else if(this.state.totalPinjamNovel === 1 && this.state.totalPinjamKomik === 2 && this.state.totalPinjamEnsiklopedia === 0){
                    //6.8.1
                    if(jumlahPinjamNovel <=2 && jumlahPinjamKomik === 0 && jumlahPinjamEnsiklopedia === 0){
                         this.setState({
                           statusPeminjaman: "PEMINJAMAN DITERIMA",
                           colorText: "#1aa23e",
                           disable:false,
                         });
                         //6.8.2
                    }else{
                         this.setState({
                           statusPeminjaman: "PEMINJAMAN DITOLAK",
                           colorText: "#ff4040",
                           disable:true,
                         });
                        }
          }else if(this.state.totalPinjamNovel === 1 && this.state.totalPinjamKomik === 0 && this.state.totalPinjamEnsiklopedia === 0){
                        //6.9.1
                        if(jumlahPinjamNovel <=2 && jumlahPinjamKomik <= 2 && jumlahPinjamEnsiklopedia === 0){
                             this.setState({
                               statusPeminjaman: "PEMINJAMAN DITERIMA",
                               colorText: "#1aa23e",
                               disable:false,
                             });
                             //6.9.2
                        }else{
                             this.setState({
                               statusPeminjaman: "PEMINJAMAN DITOLAK",
                               colorText: "#ff4040",
                               disable:true,
                             });
                            }
          }else if(this.state.totalPinjamNovel === 2 && this.state.totalPinjamKomik === 0 && this.state.totalPinjamEnsiklopedia === 0){
                            //6.10.1
                            if(jumlahPinjamNovel <= 1 && jumlahPinjamKomik <= 2 && jumlahPinjamEnsiklopedia === 0){
                                 this.setState({
                                   statusPeminjaman: "PEMINJAMAN DITERIMA",
                                   colorText: "#1aa23e",
                                   disable:false,
                                 });
                                 //6.10.2
                            }else{
                                 this.setState({
                                   statusPeminjaman: "PEMINJAMAN DITOLAK",
                                   colorText: "#ff4040",
                                   disable:true,
                                 });
                                }
          }else if(this.state.totalPinjamNovel === 3 && this.state.totalPinjamKomik === 0 && this.state.totalPinjamEnsiklopedia === 0){
                                //6.11.1
                                if(jumlahPinjamNovel === 0 && jumlahPinjamKomik <= 2 && jumlahPinjamEnsiklopedia === 0){
                                     this.setState({
                                       statusPeminjaman: "PEMINJAMAN DITERIMA",
                                       colorText: "#1aa23e",
                                       disable:false,
                                     });
                                     //6.12.2
                                }else{
                                     this.setState({
                                       statusPeminjaman: "PEMINJAMAN DITOLAK",
                                       colorText: "#ff4040",
                                       disable:true,
                                     });
                                    }
          }else if(this.state.totalPinjamNovel === 2 && this.state.totalPinjamKomik === 1 && this.state.totalPinjamEnsiklopedia === 0){
                                    //6.13.1
                                    if(jumlahPinjamNovel <= 1 && jumlahPinjamKomik <= 1 && jumlahPinjamEnsiklopedia === 0){
                                         this.setState({
                                           statusPeminjaman: "PEMINJAMAN DITERIMA",
                                           colorText: "#1aa23e",
                                           disable:false,
                                         });
                                         //6.13.2
                                    }else{
                                         this.setState({
                                           statusPeminjaman: "PEMINJAMAN DITOLAK",
                                           colorText: "#ff4040",
                                           disable:true,
                                         });
                                        }
          }else if(this.state.totalPinjamNovel === 2 && this.state.totalPinjamKomik === 2 && this.state.totalPinjamEnsiklopedia === 0){
                                        //6.14.1
                                        if(jumlahPinjamNovel <= 1 && jumlahPinjamKomik === 0 && jumlahPinjamEnsiklopedia === 0){
                                             this.setState({
                                               statusPeminjaman: "PEMINJAMAN DITERIMA",
                                               colorText: "#1aa23e",
                                               disable:false,
                                             });
                                             //6.14.2
                                        }else{
                                             this.setState({
                                               statusPeminjaman: "PEMINJAMAN DITOLAK",
                                               colorText: "#ff4040",
                                               disable:true,
                                             });
                                            }

          }else if(this.state.totalPinjamNovel === 3 && this.state.totalPinjamKomik === 1 && this.state.totalPinjamEnsiklopedia === 0){
                                            //6.15.1
                                            if(jumlahPinjamNovel === 0 && jumlahPinjamKomik <= 1 && jumlahPinjamEnsiklopedia === 0){
                                                 this.setState({
                                                   statusPeminjaman: "PEMINJAMAN DITERIMA",
                                                   colorText: "#1aa23e",
                                                   disable:false,
                                                 });
                                                 //6.15.2
                                            }else{
                                                 this.setState({
                                                   statusPeminjaman: "PEMINJAMAN DITOLAK",
                                                   colorText: "#ff4040",
                                                   disable:true,
                                                 });
                                                }
      }else{
        this.setState({
          statusPeminjaman: "PEMINJAMAN DITOLAK",
          colorText: "#ff4040",
          disable:true,
        });
      }

    }
    
  }

  getStatusPeminjaman = () => {
    
    if (this.props.dataUserLogin.role === "Member") {
      this.getStatusPeminjamanMember();
      //umum
    } else if (this.props.dataUserLogin.role === "Umum") {
      this.getStatusPeminjamanUmum();
    }
  };

  changeRupiah = (bilangan) => {
    var reverse = bilangan.toString().split("").reverse().join(""),
    ribuan = reverse.match(/\d{1,3}/g);
    ribuan = ribuan.join(".").split("").reverse().join("");
    return ribuan;
  };

  updateStok = (idBuku) => {
    fetch("http://localhost:8080/api/cartdetail/" + idBuku, {
      method: "put",
      headers: {
        "Content-Type": "application/json; ; charset=utf-8",
        "Access-Control-Allow-Headers": "Authorization, Content-Type",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((json) => {})
      .catch((e) => {});
  };

  onClickDelete = (id, idBuku) => {
    swal({
      title: "Apakah anda yakin ?",
      text: "Buku akan dihapus dari keranjang...",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((konfirmasi) => {
      if (konfirmasi) {
        fetch("http://localhost:8080/api/cartdetail/" + id, {
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
              this.updateStok(idBuku);
              this.getPeminjaman();
              this.getStatusPeminjamanUmum();
              this.getStatusPeminjamanMember();
            }
          })
          .catch((e) => {});
      } else {
        swal("Batal !", "Hapus buku dari keranjang dibatalkan...", "error");
      }
    });
  };

  simpanPeminjaman = () => {
    fetch("http://localhost:8080/api/rental/", {
      method: "post",
      headers: {
        "Content-Type": "application/json; ; charset=utf-8",
        "Access-Control-Allow-Headers": "Authorization, Content-Type",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(this.state.peminjaman),
    })
      .then((response) => response.json())
      .then((json) => {
        if (typeof json.errorMessage !== "undefined") {
          swal("Gagal !", json.errorMessage, "error");
        } else if (typeof json.successMessage !== "undefined") {
          swal("Berhasil !", json.successMessage, "success");
          this.getPeminjaman();
          this.checkPengembalian();
          this.getStatusPeminjamanUmum();
          this.getStatusPeminjamanMember();
        }
      })
      .catch((e) => {});
  };

  simpanPeminjamanUmum = () => {
    const jumlahPinjamKomik = this.state.listBuku.filter(
      (x) => x.jenisBuku === "Komik"
    ).length;

    const jumlahPinjamNovel = this.state.listBuku.filter(
      (x) => x.jenisBuku === "Novel"
    ).length;

    const jumlahPinjamEnsiklopedia = this.state.listBuku.filter(
      (x) => x.jenisBuku === "Ensiklopedia"
    ).length;

    //1 jika syarat peminjaman sudah memenuhi
    if(this.state.totalPinjamNovel === 2 && this.state.totalPinjamKomik === 0 && this.state.totalPinjamEnsiklopedia === 0){
      this.infoPeminjamanTolak();
      //2 jika syarat peminjaman sudah memenuhi
     }else if(this.state.totalPinjamNovel === 1 && this.state.totalPinjamKomik === 1 && this.state.totalPinjamEnsiklopedia === 0){
      this.infoPeminjamanTolak();
      //3 jika syarat peminjaman sudah memenuhi
    }else if(this.state.totalPinjamNovel === 0 && this.state.totalPinjamKomik === 0 && this.state.totalPinjamEnsiklopedia === 1){
      this.infoPeminjamanTolak();
      //4 jika syarat peminjaman belum memenuhi
    }else{
      //4.1
      if(this.state.totalPinjamNovel === 1 && this.state.totalPinjamKomik === 0 && this.state.totalPinjamEnsiklopedia === 0){
        if(jumlahPinjamNovel === 1 && jumlahPinjamKomik === 0 && jumlahPinjamEnsiklopedia === 0){
          this.simpanPeminjaman();
         
        }else if(jumlahPinjamNovel === 0 && jumlahPinjamKomik === 1 && jumlahPinjamEnsiklopedia === 0){
          this.simpanPeminjaman();
        }else{
          this.infoPeminjamanTolak();
        }
         //4.2
       }else if(this.state.totalPinjamNovel === 0 && this.state.totalPinjamKomik === 1 && this.state.totalPinjamEnsiklopedia === 0){
        if(jumlahPinjamNovel === 1 && jumlahPinjamKomik === 0 && jumlahPinjamEnsiklopedia === 0){
          this.simpanPeminjaman();
        }else{
          this.infoPeminjamanTolak();
        }
//4.3 (baru meminjam)
      }else if(this.state.totalPinjamNovel === 0 && this.state.totalPinjamKomik === 0 && this.state.totalPinjamEnsiklopedia === 0){
        if(jumlahPinjamNovel === 2 && jumlahPinjamKomik === 0 && jumlahPinjamEnsiklopedia === 0){
          this.simpanPeminjaman();
        }else if(jumlahPinjamNovel === 1 && jumlahPinjamKomik === 1 && jumlahPinjamEnsiklopedia === 0){
          this.simpanPeminjaman();
        }else if(jumlahPinjamNovel === 0 && jumlahPinjamKomik === 0 && jumlahPinjamEnsiklopedia === 1){
          this.simpanPeminjaman();
        }else if(jumlahPinjamNovel === 1 && jumlahPinjamKomik === 0 && jumlahPinjamEnsiklopedia === 0){
          this.simpanPeminjaman();
        }else if(jumlahPinjamNovel === 0 && jumlahPinjamKomik === 1 && jumlahPinjamEnsiklopedia === 0){
          this.simpanPeminjaman();
        }else if(jumlahPinjamNovel === 0 && jumlahPinjamKomik === 0 && jumlahPinjamEnsiklopedia === 1){
          this.simpanPeminjaman();
        }else{
          this.infoPeminjamanTolak();
        }

       }else{
        this.infoPeminjamanTolak();
       }

    }
    //umum
  }

  simpanPeminjamanByRole = () => {
    const jumlahPinjamKomik = this.state.listBuku.filter(
      (x) => x.jenisBuku === "Komik"
    ).length;

    const jumlahPinjamNovel = this.state.listBuku.filter(
      (x) => x.jenisBuku === "Novel"
    ).length;

    const jumlahPinjamEnsiklopedia = this.state.listBuku.filter(
      (x) => x.jenisBuku === "Ensiklopedia"
    ).length;

    console.log("Komik", jumlahPinjamKomik);
    console.log("Novel", jumlahPinjamNovel);
    console.log("Ensiklopedia", jumlahPinjamEnsiklopedia);

    if (this.props.dataUserLogin.role === "Member") {
      if (
        jumlahPinjamNovel === 4 &&
        jumlahPinjamKomik === 0 &&
        jumlahPinjamEnsiklopedia === 0
      ) {
        this.simpanPeminjaman();
      } else if (
        jumlahPinjamNovel === 0 &&
        jumlahPinjamKomik === 3 &&
        jumlahPinjamEnsiklopedia === 0
      ) {
        this.simpanPeminjaman();
      } else if (
        jumlahPinjamNovel === 3 &&
        jumlahPinjamKomik === 2 &&
        jumlahPinjamEnsiklopedia === 0
      ) {
        this.simpanPeminjaman();
      } else if (
        jumlahPinjamNovel === 0 &&
        jumlahPinjamKomik === 0 &&
        jumlahPinjamEnsiklopedia === 2
      ) {
        this.simpanPeminjaman();
      } else if (
        jumlahPinjamNovel === 1 &&
        jumlahPinjamKomik === 1 &&
        jumlahPinjamEnsiklopedia === 1
      ) {
        this.simpanPeminjaman();
      } else {
        this.infoPeminjamanTolak();
      }
    } else if (this.props.dataUserLogin.role === "Umum") {
      this.simpanPeminjamanUmum();
    }
  };

  konfirmasiPeminjaman = () => {
    swal({
      title: "Apakah anda yakin ?",
      text:
        "Setelah anda meminjam, anda harus mengembalikan terlebih dahulu untuk meminjam kembali...",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((konfirmasi) => {
      if (konfirmasi) {
        this.simpanPeminjamanByRole();
      } else {
        swal("Konfirmasi dibatalkan !", "", "error");
      }
    });
  };

  onClickBatalPeminjaman = (id) => {
    swal({
      title: "Apakah anda yakin ?",
      text:
        "Peminjaman akan dibatalkan dan semua buku dalam keranjang akan dihapus...",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((konfirmasi) => {
      if (konfirmasi) {
        fetch("http://localhost:8080/api/cart/" + id, {
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
              this.getPeminjaman();
              this.getStatusPeminjamanUmum();
              this.getStatusPeminjamanMember();
            }
          })
          .catch((e) => {});
      } else {
        swal("Dibatalkan !", "", "error");
      }
    });
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

  infoPeminjamanTolak = () => {
    if (this.props.dataUserLogin.role === "Member") {
      swal(
        "Ditolak !!",
        "Pelanggan MEMBER bisa meminjam hingga 5 buku dalam kurun waktu tertentu, dengan syarat: \n4 buku novel \n3 buku komik. \n3 buku novel dan 2 buku komik. \n2 buku ensiklopedia \nMasing-masing jenis buku 1.",
        "warning"
      );
    } else {
      swal(
        "Ditolak !!",
        "Pelanggan UMUM hanya bisa meminjam paling banyak 3 buku dalam kurun waktu tertentu, dengan syarat: \n 2 buku novel. \n 1 buku novel dan buku komik. \n 1 buku ensiklopedia.",
        "warning"
      );
    }
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

  checkAkses = () => {
    if (
      this.props.checkLogin === true &&
      this.props.dataUserLogin.role === "Admin"
    ) {
      this.props.history.push("/admin");
    } else if (this.props.checkLogin === false) {
      this.props.history.push("/login");
    }
  };

  render() {
    this.checkAkses();
    return (
      <>
        <Header />
        <Menu />
        <Content>
          <HeaderContent>
            <Title
              icon="fas fa-cart-arrow-down"
              judul="Keranjang Peminjaman Buku"
            />
            <Div className="state-information d-none d-sm-block">
              <Button
                className="btn btn-primary"
                onClick={() => this.props.history.push("/pelanggan/bukulist")}
              >
                <Italic className="fas fa-angle-double-left" />
                &nbsp;Daftar Buku
              </Button>
            </Div>
          </HeaderContent>

          <IsiBody>
            {$.isEmptyObject(this.state.checkPengembalian) === false ? (
              <>
                <Center>
                  <img src={gambarPengembalian} alt="Check Pengembalian" />
                </Center>
              </>
            ) : $.isEmptyObject(this.state.listBuku) === true ? (
              <>
                <Center>
                  <img src={gambar} alt="Keranjang Kosong" />
                </Center>
              </>
            ) : (
              <>
                <Table className="table dt-responsive nowrap">
                  <TableHead></TableHead>
                  <TableBody>
                    <TableRow>
                      <TableData width="20">Nama Peminjam</TableData>
                      <TableData width="30">:</TableData>
                      <TableData>{this.state.peminjaman.namaUser}</TableData>
                      <TableData rowSpan="3" width="250" align="center">
                        <TextStatus
                          color={this.state.colorText}
                          status={this.state.statusPeminjaman}
                        />
                      </TableData>
                    </TableRow>
                    <TableRow>
                      <TableData width="250">Tanggal Peminjaman</TableData>
                      <TableData width="30">:</TableData>
                      <TableData>
                        {moment(dt).format("DD MMM YYYY, HH:MM:SS")}
                      </TableData>
                    </TableRow>
                    <TableRow>
                      <TableData width="250">Batas Pengembalian</TableData>
                      <TableData width="30">:</TableData>
                      <TableData>
                        {moment(dtKembali).format("DD MMM YYYY, HH:MM:SS")}
                      </TableData>
                    </TableRow>
                  </TableBody>
                </Table>
                <Row>
                  <Div className="col-lg-9 col-md-6 col-5">
                    <Table className="table dt-responsive nowrap">
                      <TableHead>
                        <TableRow>
                          <TableHeader>ID Buku</TableHeader>
                          <TableHeader>Judul</TableHeader>
                          <TableHeader>Jenis Buku</TableHeader>
                          <TableHeader>Harga Sewa</TableHeader>
                          <TableHeader>Aksi</TableHeader>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {this.state.listBuku.map((value, index) => {
                          return (
                            <TableRow key={index}>
                              <TableData align="center">
                                {value.idBuku}
                              </TableData>
                              <TableData>{value.judulBuku}</TableData>
                              <TableData align="center">
                                {value.jenisBuku}
                              </TableData>
                              <TableData align="center">
                                Rp. {this.changeRupiah(value.hargaSewa)}
                              </TableData>
                              <TableData align="center">
                                <Tooltip keterangan="Hapus Item">
                                  <Button
                                    className="btn btn-outline-danger"
                                    onClick={() =>
                                      this.onClickDelete(
                                        value.idDetail,
                                        value.idBuku
                                      )
                                    }
                                  >
                                    <Italic className="fas fa-trash" />
                                  </Button>
                                </Tooltip>
                                <ReactTooltip />
                              </TableData>
                            </TableRow>
                          );
                        })}
                        <TableRow>
                          <TableData colSpan="2" align="right">
                            Total Pinjam Komik
                          </TableData>
                          <TableData align="center">
                            {
                              this.state.listBuku.filter(
                                (x) => x.jenisBuku === "Komik"
                              ).length
                            }
                          </TableData>
                          <TableData align="center" colSpan="2">
                            <Button
                              className="btn btn-success col-10"
                              onClick={() => this.konfirmasiPeminjaman()}
                              disabled={this.state.disable}
                            >
                              <Italic className="far fa-check-circle" />
                              &nbsp; Konfirmasi Peminjaman
                            </Button>
                          </TableData>
                        </TableRow>
                        <TableRow>
                          <TableData colSpan="2" align="right">
                            Total Pinjam Novel
                          </TableData>
                          <TableData align="center">
                            {
                              this.state.listBuku.filter(
                                (x) => x.jenisBuku === "Novel"
                              ).length
                            }
                          </TableData>
                          <TableData align="center" colSpan="2">
                            <Button
                              className="btn btn-outline-danger col-10"
                              onClick={() =>
                                this.onClickBatalPeminjaman(
                                  this.state.peminjaman.idCart
                                )
                              }
                            >
                              <Italic className="fas fa-times-circle" />
                              &nbsp; Batalkan Peminjaman
                            </Button>
                          </TableData>
                        </TableRow>
                        <TableRow>
                          <TableData colSpan="2" align="right">
                            Total Pinjam Ensiklopedia
                          </TableData>
                          <TableData align="center">
                            {
                              this.state.listBuku.filter(
                                (x) => x.jenisBuku === "Ensiklopedia"
                              ).length
                            }
                          </TableData>
                          <TableData align="center" colSpan="2">
                            <Button
                              className="btn btn-outline-info col-10"
                              onClick={() => this.infoPeminjaman()}
                            >
                              <Italic className="fas fa-info-circle" />
                              &nbsp; Aturan Peminjaman Buku
                            </Button>
                          </TableData>
                        </TableRow>

                        <TableRow>
                          <TableData colSpan="2">
                            <Bold>Total Pinjam Buku</Bold>
                          </TableData>
                          <TableData align="center">
                            <Bold>{this.state.listBuku.length} Buku</Bold>
                          </TableData>
                        </TableRow>

                        <TableRow>
                          <TableData colSpan="3">
                            <Bold>Total Biaya Peminjaman</Bold>
                          </TableData>
                          <TableData align="center">
                            <Bold>
                              Rp.{" "}
                              {this.changeRupiah(
                                this.state.listBuku
                                  .map((x) => x.hargaSewa)
                                  .reduce((result, item) => result + item, 0)
                              )}
                            </Bold>
                          </TableData>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </Div>
                  <Div className="col-lg-3 col-md-6 col-7">
                    <Center>
                      <Doughnut
                        data={this.state.totalPinjam}
                        options={{
                          title: {
                            display: true,
                            text: "Riwayat Peminjaman Bulan Ini",
                            fontSize: 10,
                          },
                          legend: {
                            display: true,
                            position: "right",
                          },
                        }}
                      />
                    </Center>
                  </Div>
                </Row>
              </>
            )}
          </IsiBody>
        </Content>
        <Footer />
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

export default connect(mapStateToProps, mapDispatchToProps)(Keranjang);
