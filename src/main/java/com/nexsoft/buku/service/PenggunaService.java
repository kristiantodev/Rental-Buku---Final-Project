package com.nexsoft.buku.service;

import com.nexsoft.buku.model.User;

import java.util.List;

public interface PenggunaService {
    User login(String username, String password);
    void registrasi(User user);
    User GetProfil(String idUser);
    void updatePassword(User user);
    void updateProfil(User user);
    void updateStatus(User user);
    boolean isIdUserExist(User user);
    boolean isUsernameExist(User user);
    boolean isEmailExist(User user);
    boolean isPhoneExist(User user);
    boolean isUsernameEditExist(User user);
    boolean isEmailEditExist(User user);
    boolean isPhoneEditExist(User user);
    List<User> getDataUser();
    List<User> serchingUser(String keyword);
    List<User> findWithPaging(int page, int limit);
    List<User> searchWithPaging(int page, int limit, String keyword);
    int totalUserPaging(String keyword);
}
