package com.nexsoft.buku.repository;

import com.nexsoft.buku.model.Grafik;

import java.util.List;

public interface GrafikRepository {
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
