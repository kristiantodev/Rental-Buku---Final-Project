package com.nexsoft.buku.repository;

import com.nexsoft.buku.model.Grafik;

import java.util.List;

public interface GrafikRepository {
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
    Grafik bukuKembali();
    Grafik bukuTerpinjamFilter(int bulan, int tahun);
    Grafik bukuKembaliFilter(int bulan, int tahun);
    Grafik totalPendapatanRental();
    Grafik totalPendapatanRentalFilter(int bulan, int tahun);
    Grafik totalPinjamKomik(String idUser);
    Grafik totalPinjamNovel(String idUser);
    Grafik totalPinjamEnsiklopedia(String idUser);
}
