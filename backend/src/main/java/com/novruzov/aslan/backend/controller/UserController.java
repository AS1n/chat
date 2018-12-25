package com.novruzov.aslan.backend.controller;

import com.novruzov.aslan.backend.entity.Role;
import com.novruzov.aslan.backend.entity.User;
import com.novruzov.aslan.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<User> getUserById(@PathVariable(name = "id") Long id) {
        Optional<User> user = userService.getUserById(id);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    public Iterable<User> getAllUsers(
            @RequestParam(name = "page") Integer pageNumber,
            @RequestParam(name = "size") Integer size
    ) {
        Page page = userService.getAllUsers(pageNumber, size);
        return page.getContent();
    }

    @RequestMapping(value = "/total-pages", method = RequestMethod.GET)
    public Integer getTotalPages(
            @RequestParam(name = "size") Integer size) {
        Page page = userService.getAllUsers(1, size);
        return page.getTotalPages();
    }

//    @RequestMapping(value = "", method = RequestMethod.GET)
//    public Iterable<User> getAllUsers() {
//        return userService.getAllUsers();
//    }

    @RequestMapping(method = RequestMethod.POST)
    public User saveUser(@RequestBody User user) {
        return userService.saveUser(user);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity deleteUser(@PathVariable(name = "id") Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @RequestMapping(value = "/signup", method = RequestMethod.POST)
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        if (user != null) {
            return ResponseEntity.ok(userService.saveUser(user));
        }
        return null;
    }

    @RequestMapping(value = "/get-current-user", method = RequestMethod.GET)
    public ResponseEntity<User> getCurrentUser(@RequestHeader(value = "Authorization", required = false) String bearerToken) {
        if(bearerToken==null){
            User guest = new User();
            guest.setRole(new Role(3L));
            return ResponseEntity.ok(guest);
        }
        String login = userService.getUsername(bearerToken);
        return ResponseEntity.ok(userService.getUserByUsername(login).get());
    }


//    @RequestMapping(value = "/u/{username}", method = RequestMethod.GET)
//    public ResponseEntity<User> getUserByUsername(@PathVariable(name = "username") String username) {
//        Optional<User> user = userService.getUserByUsername(username);
//        if (user.isPresent()) {
//            return ResponseEntity.ok(user.get());
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//    }

}
