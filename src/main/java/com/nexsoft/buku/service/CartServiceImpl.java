package com.nexsoft.buku.service;

import com.nexsoft.buku.model.Cart;
import com.nexsoft.buku.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("cartService")
public class CartServiceImpl implements CartService{
    @Autowired
    CartRepository cartRepository;

    public void addCart(Cart cart) {
        synchronized (this) {
            cartRepository.addCart(cart);
        }
    }

    public Cart findById(String idCart) {
        Cart pd;
        try{
            pd = cartRepository.findById(idCart);
        }catch (IndexOutOfBoundsException e){
            System.out.println(e);
            pd = null;
        }
        return pd;
    }

    public Cart listPeminjaman(String idCart) {
        Cart pd;
        try{
            pd = cartRepository.listPeminjaman(idCart);
        }catch (IndexOutOfBoundsException e){
            System.out.println(e);
            pd = null;
        }
        return pd;
    }

    public void deleteById(String id) {
        synchronized (this) {
            cartRepository.deleteById(id);
        }
    }

}
