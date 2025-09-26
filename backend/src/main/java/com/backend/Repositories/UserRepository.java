package com.backend.Repositories;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.Entities.User;


public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
