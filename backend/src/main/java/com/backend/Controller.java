package com.backend;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.backend.Entities.User;
import com.backend.Repositories.UserRepository;

import java.text.DateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.*;

@RestController
@RequestMapping("/api")
public class Controller {

    private final UserRepository userRepo;

    public Controller(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    @GetMapping("/hello")
    public String hello() {
        return "Hello, World!";
    }

    @GetMapping("/get_all_users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(userRepo.findAll());
    }

    @PostMapping("/create_user_demo")
    public ResponseEntity<User> createUser() {
        LocalDate now = LocalDate.now();
        String email = "jhon_doe@pipi.caca";
        if (userRepo.findByEmail(email).isPresent()) return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        User savedUser = userRepo.save(
                new User("john_doe", "John Doe", now, email, "123456")
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }

    @PostMapping("/create_user")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        if (userRepo.findByEmail(user.getEmail()).isPresent()) return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        return ResponseEntity.status(HttpStatus.CREATED).body(userRepo.save(user));
    }

    @DeleteMapping("/delete_all_users")
    public ResponseEntity<User> deleteUser() {
        userRepo.deleteAll();
        return ResponseEntity.status(HttpStatus.ACCEPTED).build();
    }

}
