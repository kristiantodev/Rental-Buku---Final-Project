package com.nexsoft.buku.service;

import com.nexsoft.buku.model.CartDetail;
import com.nexsoft.buku.repository.CartDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("cartDetailService")
public class CartDetailServiceImpl implements CartDetailService{
    @Autowired
    CartDetailRepository cartDetailRepository;

    public void addCartDetail(CartDetail detail) {
        synchronized (this) {
            cartDetailRepository.addCartDetail(detail);
        }
    }

    public List<CartDetail> getIsiKeranjang(String idCart) {
        List<CartDetail> pd;

        try{
            pd = cartDetailRepository.getIsiKeranjang(idCart);
        }catch (IndexOutOfBoundsException e){
            System.out.println(e);
            pd = null;
        }

        return pd;

    }

    public boolean checkBuku(CartDetail detail) {
        CartDetail pd;
        try{
            pd = cartDetailRepository.checkBuku(detail.getIdCart(), detail.getIdBuku());
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

    public void deleteById(String id) {
        synchronized (this) {
            cartDetailRepository.deleteById(id);
        }
    }

    public void tambahStokBuku(String id) {
        synchronized (this) {
            cartDetailRepository.tambahStokBuku(id);
        }
    }

}
