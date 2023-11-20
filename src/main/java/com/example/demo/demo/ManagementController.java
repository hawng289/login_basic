package com.example.demo.demo;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/management")

public class ManagementController {

    @GetMapping("/get")
    public String get() {
        return "GET:: management controller";
    }
    @PostMapping("/post")
    public String post() {
        return "POST:: management controller";
    }
    @PutMapping("/put")
    public String put() {
        return "PUT:: management controller";
    }
    @DeleteMapping("/delete")
    public String delete() {
        return "DELETE:: management controller";
    }
}
