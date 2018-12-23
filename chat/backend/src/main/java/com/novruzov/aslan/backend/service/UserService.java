package com.novruzov.aslan.backend.service;

import com.novruzov.aslan.backend.entity.User;

import java.util.Optional;

public interface UserService {
    User saveUser(User user);
    Optional<User> getUserById(Long id);
    Optional<User> getUserByUsername(String username);
    Iterable<User> getAllUsers();
    void deleteUser(Long id);
}
