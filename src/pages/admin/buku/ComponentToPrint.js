import React, { Component } from "react";
import kop from "../../../image/kop.jpg";
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
  
    render() {
      return(
         <>
                     <Center><img src={kop} alt="Buku"/><br/>
                    <h4><Bold> Laporan Data Buku</Bold></h4>
         <TableReport className="table table-striped table-bordered dt-responsive nowrap">
                <TableHead>
                  <TableRow>
                  <TableHeader>No.</TableHeader>
                    <TableHeader>ID Buku</TableHeader>
                    <TableHeader>Judul</TableHeader>
                    <TableHeader>Pengarang</TableHeader>
                    <TableHeader>Jenis Buku</TableHeader>
                    <TableHeader>Stok Tersisa</TableHeader>
                    <TableHeader>Status Buku</TableHeader>
                    <TableHeader>Biaya Sewa</TableHeader>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.props.buku.map((value, index) => {
                    return (
                      <TableRow key={index}>
                        <TableData align="center">{index+1}</TableData>
                        <TableData align="center">{value.idBuku}</TableData>
                        <TableData>{value.judulBuku}</TableData>
                        <TableData>{value.pengarang}</TableData>
                        <TableData>{value.jenisBuku}</TableData>
                        <TableData align="center">{value.stok} buku</TableData>
                        <TableData align="center">{value.isActive === 1 ? "Aktif" : "Tidak Aktif"}</TableData>
                        <TableData align="center">Rp. {this.changeRupiah(value.hargaSewa)}/hari</TableData>
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