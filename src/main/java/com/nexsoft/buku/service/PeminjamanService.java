package com.nexsoft.buku.service;

import com.nexsoft.buku.model.Peminjaman;

import java.util.List;

public interface PeminjamanService {
    void save(Peminjaman peminjaman);
    Peminjaman checkPengembalian(String idUser);
    List<Peminjaman> dataPengembalianPaging(int page, int limit);
    List<Peminjaman> dataLaporan(int page, int limit);
    Peminjaman totalData();
    Peminjaman totalDataLaporan();
    void pengembalianBuku(Peminjaman peminjaman);
    List<Peminjaman> riwayatPeminjaman(String idUser);
}
