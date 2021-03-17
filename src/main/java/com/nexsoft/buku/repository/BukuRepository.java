package com.nexsoft.buku.repository;

import com.nexsoft.buku.model.Buku;

import java.util.List;

public interface BukuRepository {
    List<Buku> getDataBuku();
    List<Buku> findWithPaging(int page, int limit);
    List<Buku> serchingBuku(String keyword);
    void deleteById(String id);
    void addBuku(Buku buku);
    Buku findById(String idBuku);
    Buku findByJudul(String judulBuku);
    Buku findByJudulEdit(String idBuku, String judulBuku);
    void updateBuku(Buku buku);
}
