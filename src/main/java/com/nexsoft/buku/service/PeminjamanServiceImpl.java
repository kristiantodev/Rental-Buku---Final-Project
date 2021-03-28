package com.nexsoft.buku.service;

import com.nexsoft.buku.model.Peminjaman;
import com.nexsoft.buku.repository.PeminjamanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("peminjamanService")
public class PeminjamanServiceImpl implements PeminjamanService{
    @Autowired
    PeminjamanRepository peminjamanRepository;

    @Override
    public void save(Peminjaman peminjaman) {
        synchronized (this) {
            peminjamanRepository.save(peminjaman);
        }
    }

    @Override
    public void pengembalianBuku(Peminjaman peminjaman) {
        synchronized (this) {
            peminjamanRepository.pengembalianBuku(peminjaman);
        }
    }

    @Override
    public Peminjaman checkPengembalian(String idUser) {
        Peminjaman pd;
        try{
            pd = peminjamanRepository.checkPengembalian(idUser);
        }catch (IndexOutOfBoundsException e){
            System.out.println(e);
            pd = null;
        }
        return pd;
    }

    @Override
    public List<Peminjaman> dataPengembalianPaging(int page, int limit) {
        List<Peminjaman> pd;

        try{
            pd = peminjamanRepository.dataPengembalianPaging(page, limit);
        }catch (IndexOutOfBoundsException e){
            System.out.println(e);
            pd = null;
        }

        return pd;

    }

    @Override
    public List<Peminjaman> searchPengembalian(String keyword) {
        List<Peminjaman> pd;

        try{
            pd = peminjamanRepository.searchPengembalian(keyword);
        }catch (IndexOutOfBoundsException e){
            System.out.println(e);
            pd = null;
        }

        return pd;

    }

    @Override
    public List<Peminjaman> searchPengembalianPaging(String keyword, int page, int limit) {
        List<Peminjaman> pd;

        try{
            pd = peminjamanRepository.searchPengembalianPaging(keyword, page, limit);
        }catch (IndexOutOfBoundsException e){
            System.out.println(e);
            pd = null;
        }
        return pd;
    }

    @Override
    public List<Peminjaman> riwayatPeminjaman(String idUser) {
        List<Peminjaman> pd;

        try{
            pd = peminjamanRepository.riwayatPeminjaman(idUser);
        }catch (IndexOutOfBoundsException e){
            System.out.println(e);
            pd = null;
        }

        return pd;

    }

    @Override
    public List<Peminjaman> dataLaporan(int page, int limit) {
        List<Peminjaman> pd;

        try{
            pd = peminjamanRepository.dataLaporan(page, limit);
        }catch (IndexOutOfBoundsException e){
            System.out.println(e);
            pd = null;
        }

        return pd;

    }

    @Override
    public List<Peminjaman> cetakAllLaporan() {
        List<Peminjaman> pd;

        try{
            pd = peminjamanRepository.cetakAllLaporan();
        }catch (IndexOutOfBoundsException e){
            System.out.println(e);
            pd = null;
        }

        return pd;

    }

    @Override
    public Peminjaman totalData() {
        Peminjaman pd;

        try{
            pd = peminjamanRepository.totalData();
        }catch (IndexOutOfBoundsException e){
            System.out.println(e);
            pd = null;
        }
        return pd;

    }

    @Override
    public Peminjaman totalDataLaporan() {
        Peminjaman pd;

        try{
            pd = peminjamanRepository.totalDataLaporan();
        }catch (IndexOutOfBoundsException e){
            System.out.println(e);
            pd = null;
        }
        return pd;

    }

    @Override
    public List<Peminjaman> filterLaporan(String keyword, String start, String end) {
        List<Peminjaman> pd;

        try{
            pd = peminjamanRepository.filterLaporan(keyword, start, end);
        }catch (IndexOutOfBoundsException e){
            System.out.println(e);
            pd = null;
        }

        return pd;

    }

    @Override
    public List<Peminjaman> filterLaporanPaging(String keyword, String start, String end, int page, int limit) {
        List<Peminjaman> pd;

        try{
            pd = peminjamanRepository.filterLaporanPaging(keyword, start, end, page, limit);
        }catch (IndexOutOfBoundsException e){
            System.out.println(e);
            pd = null;
        }

        return pd;

    }

}
