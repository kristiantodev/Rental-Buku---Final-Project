package com.nexsoft.buku.repository;
import com.nexsoft.buku.model.User;

import java.util.List;

public interface PenggunaRepository {
    User login(String username, String password);
    User GetProfil(String idUser);
    void registrasi(User user);
    void updatePassword(User user);
    void updateStatus(User user);
    void updateProfil(User user);
    User findById(String idUser);
    User findByUsername(String Username);
    User findByEmail(String email);
    User findByPhone(String Phone);
    User findByUsernameEdit(String Username, String idUser);
    User findByEmailEdit(String email, String idUser);
    User findByPhoneEdit(String Phone, String idUser);
    List<User> getDataUser();
    List<User> findWithPaging(int page, int limit);
    List<User> searchWithPaging(int page, int limit, String keyword);
    List<User> serchingUser(String keyword);
}
