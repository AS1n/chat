package com.novruzov.aslan.backend.service.impl;

import com.novruzov.aslan.backend.config.JwtTokenUtil;
import com.novruzov.aslan.backend.entity.User;
import com.novruzov.aslan.backend.repository.UserRepository;
import com.novruzov.aslan.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Component
public class UserServiceImpl implements UserDetailsService, UserService {
    private UserRepository repository;

    @Autowired
    private BCryptPasswordEncoder bcryptEncoder;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    public UserServiceImpl(UserRepository repository) {
        this.repository = repository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = getUserByUsername(username).get();
        if (user == null)
            throw new UsernameNotFoundException("Invalid username or password.");
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), getAuthority(user));
    }

    private Set getAuthority(User user) {
        Set authorities = new HashSet<>();
        authorities.add(new SimpleGrantedAuthority(user.getRole().getName()));
        return authorities;
    }

    @Override
    public User saveUser(User user) {
        return repository.save(user);
    }

    @Override
    public Optional<User> getUserById(Long id) {
        return repository.findById(id);
    }

    @Override
    public Optional<User> getUserByUsername(String username) {
        return repository.findByUsername(username);
    }

    @Override
    public Iterable<User> getAllUsers() {
        return repository.findAll();
    }

    @Override
    public void deleteUser(Long id) {
        repository.deleteById(id);
    }
}
