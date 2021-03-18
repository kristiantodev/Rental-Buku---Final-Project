package com.nexsoft.buku.repository;

import com.nexsoft.buku.model.Peminjaman;

import java.util.List;

public interface PeminjamanRepository {
    void save(Peminjaman peminjaman);
    Peminjaman checkPengembalian(String idUser);
    List<Peminjaman> dataPengembalianPaging(int page, int limit);
    Peminjaman totalData();
    Peminjaman totalDataLaporan();
    void pengembalianBuku(Peminjaman peminjaman);
    List<Peminjaman> riwayatPeminjaman(String idUser);
    List<Peminjaman> dataLaporan(int page, int limit);
    List<Peminjaman> filterLaporan(String keyword, String start, String end);
    List<Peminjaman> filterLaporanPaging(String keyword, String start, String end, int page, int limit);
    List<Peminjaman> cetakAllLaporan();
}
