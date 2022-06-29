package com.psa.matriculas2022.controller;

import com.psa.matriculas2022.model.Disciplina;
import com.psa.matriculas2022.service.CourseService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;


import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/disciplinas")
@CrossOrigin()
public class CourseController {
    @Autowired
    private CourseService courseService;


    @GetMapping
    public ResponseEntity<List<Disciplina>> getCourses() {
        return ResponseEntity.ok(courseService.list());
    }
}
