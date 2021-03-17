package com.nexsoft.buku.repository;

import com.nexsoft.buku.model.Cart;

import java.util.List;

public interface CartRepository {
    void addCart(Cart cart);
    Cart findById(String idCart);
    Cart listPeminjaman(String idCart);
    void deleteById(String id);
}
