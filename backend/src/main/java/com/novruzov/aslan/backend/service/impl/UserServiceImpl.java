package com.novruzov.aslan.backend.service.impl;

import com.novruzov.aslan.backend.config.Constants;
import com.novruzov.aslan.backend.config.JwtTokenUtil;
import com.novruzov.aslan.backend.entity.User;
import com.novruzov.aslan.backend.repository.UserRepository;
import com.novruzov.aslan.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
        if(user.getId()==null && repository.findByUsername(user.getUsername()).isPresent())
            return null;
        user.setPassword(bcryptEncoder.encode(user.getPassword()));
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
    public Page<User> getAllUsers(Integer page, Integer size) {
        Pageable pageable = new PageRequest(page-1, size, new Sort(Sort.Direction.ASC, "id"));
        return repository.findAll(pageable);
    }


    @Override
    public String getUsername(String bearerToken) {
        String login = null;
        String authToken = bearerToken.replace(Constants.TOKEN_PREFIX, "");
        try {
            login = jwtTokenUtil.getUsernameFromToken(authToken);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return login;
    }

    @Override
    public void deleteUser(Long id) {
        repository.deleteById(id);
    }
}
