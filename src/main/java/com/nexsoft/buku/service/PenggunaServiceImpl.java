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

    public void registrasi(User user) {
        synchronized (this) {
            penggunaRepository.registrasi(user);
        }
    }

    public void addAdmin(User user) {
        synchronized (this) {
            penggunaRepository.addAdmin(user);
        }
    }

    public void updatePassword(User user) {
        synchronized (this) {
            penggunaRepository.updatePassword(user);
        }
    }

    public void updateStatus(User user) {
        synchronized (this) {
            penggunaRepository.updateStatus(user);
        }
    }

    public void updateProfil(User user) {
        synchronized (this) {
            penggunaRepository.updateProfil(user);
        }
    }

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
