package com.nexsoft.buku.repository;

import com.nexsoft.buku.model.CartDetail;

import java.util.List;

public interface CartDetailRepository {
    void addCartDetail(CartDetail detail);
    CartDetail checkBuku(String idCart, String idBuku);
    void deleteById(String id);
    void tambahStokBuku(String idBuku);
    List<CartDetail> getIsiKeranjang(String idCart);
}
