package com.psa.matriculas2022.service;

import com.psa.matriculas2022.model.Disciplina;
import com.psa.matriculas2022.repository.CourseRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class CourseService {
    @Autowired
    private CourseRepository courseRepository;

    public List<Disciplina> list() {
        return (List<Disciplina>) Optional.of(courseRepository.findAll())
                .orElse(Collections.emptyList());
    }
}
