package com.psa.matriculas2022.service;

import com.psa.matriculas2022.model.Turma;
import com.psa.matriculas2022.repository.ClassesRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class ClassService {
    @Autowired
    private ClassesRepository classesRepository;

    public List<Turma> list() {
        return (List<Turma>) Optional.of(classesRepository.findAll())
                .orElse(Collections.emptyList());
    }

    public Optional<Turma> findById(Integer id) {
        return classesRepository.findById(id);
    }

    public Turma save(Turma turma) {
        return classesRepository.save(turma);
    }
}