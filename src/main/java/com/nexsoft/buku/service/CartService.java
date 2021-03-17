package com.nexsoft.buku.service;

import com.nexsoft.buku.model.Cart;

import java.util.List;

public interface CartService {
    void addCart(Cart cart);
    Cart findById(String idCart);
    Cart listPeminjaman(String idCart);
    void deleteById(String id);
}
