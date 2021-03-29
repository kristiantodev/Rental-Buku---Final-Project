package com.nexsoft.buku.service;

import com.nexsoft.buku.model.Cart;
import com.nexsoft.buku.model.CartDetail;
import com.nexsoft.buku.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("cartService")
public class CartServiceImpl implements CartService{
    @Autowired
    CartRepository cartRepository;

    @Override
    public void addCart(Cart cart) {
        synchronized (this) {
            cartRepository.addCart(cart);
        }
    }

    @Override
    public void isiKeranjang(CartDetail detail) {
        synchronized (this) {
            cartRepository.isiKeranjang(detail);
        }
    }

    @Override
    public boolean checkIsiKeranjang(CartDetail detail) {
        CartDetail pd;
        try{
            pd = cartRepository.checkIsiKeranjang(detail.getIdCart(), detail.getIdBuku());
        }catch (IndexOutOfBoundsException e){
            System.out.println(e);
            pd = null;
        }

        if(pd != null){
            return true;
        }else{
            return false;
        }
    }

    @Override
    public List<CartDetail> getIsiKeranjang(String idCart) {
        List<CartDetail> pd;

        try{
            pd = cartRepository.getIsiKeranjang(idCart);
        }catch (IndexOutOfBoundsException e){
            System.out.println(e);
            pd = null;
        }

        return pd;

    }

    @Override
    public void deleteDetailById(String id) {
        synchronized (this) {
            cartRepository.deleteDetailById(id);
        }
    }

    @Override
    public Cart findById(String idUser) {
        Cart pd;
        try{
            pd = cartRepository.findById(idUser);
        }catch (IndexOutOfBoundsException e){
            System.out.println(e);
            pd = null;
        }
        return pd;
    }

    @Override
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

    @Override
    public void deleteById(String id) {
        synchronized (this) {
            cartRepository.deleteById(id);
        }
    }

}
