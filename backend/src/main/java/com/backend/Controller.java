package com.backend;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api")
public class Controller {
    
    @GetMapping("/hello")
    public String demo() {
        return "Hello from the backend!";
    }

}
