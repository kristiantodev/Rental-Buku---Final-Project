package com.nexsoft.buku.service;

import com.nexsoft.buku.model.User;
import com.nexsoft.buku.repository.PenggunaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("penggunaService")
public class PenggunaServiceImpl implements PenggunaService{
    @Autowired
    PenggunaRepository penggunaRepository;

    @Override
    public User login(String username, String password) {
        User pd;
        try{
            pd = penggunaRepository.login(username, password);
        }catch (IndexOutOfBoundsException e){
            System.out.println(e);
            pd = null;
        }
        return pd;
    }

    @Override
    public User GetProfil(String idUser) {
        User pd;
        try{
            pd = penggunaRepository.GetProfil(idUser);
        }catch (IndexOutOfBoundsException e){
            System.out.println(e);
            pd = null;
        }
        return pd;
    }

    @Override
    public List<User> getDataUser() {
        List<User> pd;

        try{
            pd = penggunaRepository.getDataUser();
        }catch (IndexOutOfBoundsException e){
            System.out.println(e);
            pd = null;
        }

        return pd;

    }

    @Override
    public List<User> serchingUser(String keyword) {
        List<User> pd;

        try{
            pd = penggunaRepository.serchingUser(keyword);
        }catch (IndexOutOfBoundsException e){
            System.out.println(e);
            pd = null;
        }

        return pd;

    }

    @Override
    public List<User> findWithPaging(int page, int limit) {
        List<User> pd;

        try{
            pd = penggunaRepository.findWithPaging(page, limit);
        }catch (IndexOutOfBoundsException e){
            System.out.println(e);
            pd = null;
        }

        return pd;

    }

    @Override
    public List<User> searchWithPaging(int page, int limit, String keyword) {
        List<User> pd;

        try{
            pd = penggunaRepository.searchWithPaging(page, limit, keyword);
        }catch (IndexOutOfBoundsException e){
            System.out.println(e);
            pd = null;
        }

        return pd;

    }

    @Override
    public void registrasi(User user) {
        synchronized (this) {
            penggunaRepository.registrasi(user);
        }
    }

    @Override
    public void updatePassword(User user) {
        synchronized (this) {
            penggunaRepository.updatePassword(user);
        }
    }

    @Override
    public void updateStatus(User user) {
        synchronized (this) {
            penggunaRepository.updateStatus(user);
        }
    }

    @Override
    public void updateProfil(User user) {
        synchronized (this) {
            penggunaRepository.updateProfil(user);
        }
    }

    @Override
    public boolean isIdUserExist(User user) {
        User pd;
        try{
            pd = penggunaRepository.findById(user.getIdUser());
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
    public boolean isUsernameExist(User user) {
        User pd;
        try{
            pd = penggunaRepository.findByUsername(user.getUsername());
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
    public boolean isEmailExist(User user) {
        User pd;
        try{
            pd = penggunaRepository.findByEmail(user.getEmail());
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
    public boolean isPhoneExist(User user) {
        User pd;
        try{
            pd = penggunaRepository.findByPhone(user.getPhone());
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
    public boolean isUsernameEditExist(User user) {
        User pd;
        try{
            pd = penggunaRepository.findByUsernameEdit(user.getUsername(), user.getIdUser());
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
    public boolean isEmailEditExist(User user) {
        User pd;
        try{
            pd = penggunaRepository.findByEmailEdit(user.getEmail(), user.getIdUser());
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
    public boolean isPhoneEditExist(User user) {
        User pd;
        try{
            pd = penggunaRepository.findByPhoneEdit(user.getPhone(), user.getIdUser());
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
