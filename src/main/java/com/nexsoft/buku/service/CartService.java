package com.nexsoft.buku.service;

import com.nexsoft.buku.model.Cart;
import com.nexsoft.buku.model.CartDetail;

import java.util.List;

public interface CartService {
    void addCart(Cart cart);
    void isiKeranjang(CartDetail detail);
    boolean checkIsiKeranjang(CartDetail detail);
    Cart findById(String idUser);
    Cart listPeminjaman(String idCart);
    void deleteById(String id);
    List<CartDetail> getIsiKeranjang(String idCart);
    void deleteDetailById(String id);
}
