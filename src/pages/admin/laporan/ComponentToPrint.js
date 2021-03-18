import React, { Component } from "react";
import moment from "moment";
import kop from "../../../kop.jpg";
import {
  TableReport,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableData,
  Center,
  Bold
} from "../../../component";


class ComponentToPrint extends Component {
    constructor(props) {
      super(props);
      this.state = {};
    }
  
    changeRupiah = (bilangan) => {
      var reverse = bilangan.toString().split("").reverse().join(""),
        ribuan = reverse.match(/\d{1,3}/g);
      ribuan = ribuan.join(".").split("").reverse().join("");
      return ribuan;
    };
  
    getTotalBayar = (biaya, denda) => {
      var totalbayar = biaya + denda;
      return totalbayar;
    };
  
    render() {
      return(
         <>
                     <Center><img src={kop} alt="Buku"/><br/>
                    <h4><Bold> Laporan Peminjaman Buku</Bold></h4>
         <TableReport className="table table-striped table-bordered dt-responsive nowrap">
                <TableHead>
                  <TableRow>
                    <TableHeader>Nama</TableHeader>
                    <TableHeader>Tanggal Pinjam</TableHeader>
                    <TableHeader>Tanggal Kembali</TableHeader>
                    <TableHeader>Jumlah Pinjam</TableHeader>
                    <TableHeader>Biaya Rental</TableHeader>
                    <TableHeader>Denda</TableHeader>
                    <TableHeader>Total Bayar</TableHeader>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.props.items.map((value, index) => {
                    return (
                      <TableRow align="center" key={index}>
                        <TableData align="left">{value.namaUser}</TableData>
                        <TableData>
                          {moment(value.tglPinjam).format("YYYY-MM-DD")}
                        </TableData>
                        <TableData>{value.tglKembali}</TableData>
                        <TableData>
                        {value.listBuku.length}
                        </TableData>
                        <TableData>
                          Rp.{" "}
                          {this.changeRupiah(
                            value.listBuku
                              .map((x) => x.hargaSewa)
                              .reduce((result, item) => result + item, 0)
                          )}
                        </TableData>
                        <TableData align="left">
                          &nbsp;&nbsp;Rp. {this.changeRupiah(value.denda)}
                        </TableData>
                        <TableData>
                          Rp.{" "}
                          {this.changeRupiah(
                            this.getTotalBayar(
                              value.listBuku
                                .map((x) => x.hargaSewa)
                                .reduce((result, item) => result + item, 0),
                              value.denda
                            )
                          )}
                        </TableData>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </TableReport>
              </Center>

         </>
      );
    }
  }

export default ComponentToPrint;