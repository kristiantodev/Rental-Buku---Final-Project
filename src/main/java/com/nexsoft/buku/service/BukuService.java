package com.nexsoft.buku.service;

import com.nexsoft.buku.model.Buku;

import java.util.List;

public interface BukuService {
    List<Buku> getDataBuku();
    List<Buku> findWithPaging(int page, int limit);
    List<Buku> serchingBuku(String keyword);
    void deleteById(String id);
    void addBuku(Buku buku);
    boolean isIdBukuExist(Buku buku);
    boolean isJudulBukuExist(Buku buku);
    boolean isJudulBukuEditExist(Buku buku);
    void updateBuku(Buku buku);
}
