package com.backend.Entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

import java.time.LocalDate;
import java.util.Date;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nick_name", nullable = false)
    private String nickName;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    public User(String nickName, String fullName, LocalDate dateOfBirth, String email, String password) {
        this.nickName = nickName;
        this.fullName = fullName;
        this.dateOfBirth = dateOfBirth;
        // Email validation
        if (email == null || !email.contains("@")) {
            throw new IllegalArgumentException("Email cannot be null or empty");
        }
        this.email = email;

        this.password = password;
    }

    public User() {
        this.nickName = "nickName";
        this.fullName = "fullName";
        this.dateOfBirth = LocalDate.now();
        this.email = "email";
        this.password = "password";
    }

    public Long getId() {
        return id;
    }

    public String getNickName() {
        return nickName;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public String getFullName() {
        return fullName;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }
}