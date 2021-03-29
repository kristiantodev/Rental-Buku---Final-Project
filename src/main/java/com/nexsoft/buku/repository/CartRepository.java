package com.nexsoft.buku.repository;

import com.nexsoft.buku.model.Cart;
import com.nexsoft.buku.model.CartDetail;

import java.util.List;

public interface CartRepository {
    void addCart(Cart cart);
    void isiKeranjang(CartDetail detail);
    CartDetail checkIsiKeranjang(String idCart, String idBuku);
    Cart findById(String idUser);
    Cart listPeminjaman(String idCart);
    void deleteById(String id);
    List<CartDetail> getIsiKeranjang(String idCart);
    void deleteDetailById(String id);
}
