package com.novruzov.aslan.backend.service;

import com.novruzov.aslan.backend.entity.User;
import org.springframework.data.domain.Page;

import java.util.Optional;

public interface UserService {
    User saveUser(User user);
    Optional<User> getUserById(Long id);
    Optional<User> getUserByUsername(String username);
    Iterable<User> getAllUsers();
    Page<User> getAllUsers(Integer page, Integer size);
    String getUsername(String bearerToken);
    void deleteUser(Long id);
}
