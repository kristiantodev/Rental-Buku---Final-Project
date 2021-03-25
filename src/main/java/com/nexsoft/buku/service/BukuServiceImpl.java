package com.nexsoft.buku.service;

import com.nexsoft.buku.model.Buku;
import com.nexsoft.buku.repository.BukuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("bukuService")
public class BukuServiceImpl implements BukuService{
    @Autowired
    BukuRepository bukuRepository;

    public void addBuku(Buku buku) {
        synchronized (this) {
            bukuRepository.addBuku(buku);
        }
    }

    public void updateBuku(Buku buku) {
        synchronized (this) {
            bukuRepository.updateBuku(buku);
        }
    }

    public List<Buku> getDataBuku() {
        List<Buku> pd;

        try{
            pd = bukuRepository.getDataBuku();
        }catch (IndexOutOfBoundsException e){
            System.out.println(e);
            pd = null;
        }

        return pd;

    }

    public Buku checkStok(String idBuku) {
        Buku pd;

        try{
            pd = bukuRepository.findById(idBuku);
        }catch (IndexOutOfBoundsException e){
            System.out.println(e);
            pd = null;
        }

        return pd;

    }

    public List<Buku> findWithPaging(int page, int limit) {
        List<Buku> pd;

        try{
            pd = bukuRepository.findWithPaging(page, limit);
        }catch (IndexOutOfBoundsException e){
            System.out.println(e);
            pd = null;
        }

        return pd;

    }

    public List<Buku> searchWithPaging(int page, int limit, String keyword) {
        List<Buku> pd;

        try{
            pd = bukuRepository.searchWithPaging(page, limit, keyword);
        }catch (IndexOutOfBoundsException e){
            System.out.println(e);
            pd = null;
        }

        return pd;

    }

    public List<Buku> serchingBuku(String keyword) {
        List<Buku> pd;

        try{
            pd = bukuRepository.serchingBuku(keyword);
        }catch (IndexOutOfBoundsException e){
            System.out.println(e);
            pd = null;
        }

        return pd;

    }

    public void deleteById(String id) {
        synchronized (this) {
            bukuRepository.deleteById(id);
        }
    }

    public boolean isIdBukuExist(Buku buku) {
        Buku pd;
        try{
            pd = bukuRepository.findById(buku.getIdBuku());
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

    public boolean isJudulBukuExist(Buku buku) {
        Buku pd;
        try{
            pd = bukuRepository.findByJudul(buku.getJudulBuku());
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

    public boolean isJudulBukuEditExist(Buku buku) {
        Buku pd;
        try{
            pd = bukuRepository.findByJudulEdit(buku.getIdBuku(), buku.getJudulBuku());
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

}
