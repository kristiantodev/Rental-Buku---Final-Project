package com.nexsoft.buku.service;

import com.nexsoft.buku.model.Grafik;

import java.util.List;

public interface GrafikService {
    List<Grafik> pelangganTeraktif();
    List<Grafik> bukuPopuler();
    List<Grafik> allPendapatan();
    List<Grafik> pengeluaranPelanggan(String idUser);
    Grafik totalBukuPinjam(String idUser);
    Grafik totalBukuBelumDikembalikan(String idUser);
    Grafik totalPengeluaran(String idUser);
    Grafik bukuTerpinjam();
    Grafik totalPendapatanRental();
}
