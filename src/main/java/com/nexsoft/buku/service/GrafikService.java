package com.nexsoft.buku.service;

import com.nexsoft.buku.model.Grafik;

import java.util.List;

public interface GrafikService {
    List<Grafik> pelangganTeraktif();
    List<Grafik> pelangganTeraktifFilter(int bulan, int tahun);
    List<Grafik> bukuPopuler();
    List<Grafik> bukuPopulerFilter(int bulan, int tahun);
    List<Grafik> allPendapatan();
    List<Grafik> allPendapatanFilter(int bulan, int tahun);
    List<Grafik> pengeluaranPelanggan(String idUser);
    List<Grafik> pengeluaranPelangganFilter(String idUser, int bulan, int tahun);
    Grafik totalBukuPinjam(String idUser);
    Grafik totalBukuBelumDikembalikan(String idUser);
    Grafik totalPengeluaran(String idUser);
    Grafik totalPengeluaranFilter(String idUser, int bulan, int tahun);
    Grafik bukuTerpinjam();
    Grafik totalPendapatanRental();
    Grafik totalPendapatanRentalFilter(int bulan, int tahun);
    Grafik totalPinjamKomik(String idUser);
    Grafik totalPinjamNovel(String idUser);
    Grafik totalPinjamEnsiklopedia(String idUser);
}
