package com.nexsoft.buku.service;

import com.nexsoft.buku.model.CartDetail;

import java.util.List;

public interface CartDetailService {
    void addCartDetail(CartDetail detail);
    boolean checkBuku(CartDetail detail);
    void deleteById(String id);
    void tambahStokBuku(String idBuku);
    List<CartDetail> getIsiKeranjang(String idCart);
}
