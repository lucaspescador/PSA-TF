package com.psa.matriculas2022.controller;

import com.psa.matriculas2022.model.Turma;
import com.psa.matriculas2022.service.ClassService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/turmas")
@CrossOrigin()
public class ClassController {
    @Autowired
    private ClassService classService;


    @GetMapping
    public ResponseEntity<List<Turma>> getCourses(
            @RequestParam(required = false) String nome,
            @RequestParam(required = false) String codigo,
            @RequestParam(required = false) String horarios
    ) {
        final boolean applyNameFilter = nome != null && !nome.isEmpty();
        final boolean applyCodeFilter = codigo != null && !codigo.isEmpty();
        final boolean applyTimeFilter = horarios != null && !horarios.isEmpty();

        return ResponseEntity.ok(classService.list()
                .stream()
                .filter(turma -> {
                    if (applyNameFilter) {
                        return turma.getNome().contains(nome);
                    }

                    return true;
                })
                .filter(turma -> {
                    if (applyCodeFilter) {
                        return turma.getDisciplina().getCodigo().contains(codigo);
                    }

                    return true;
                })
                .filter(turma -> {
                    if (applyTimeFilter) {
                        return turma.getHorarios().contains(horarios);
                    }

                    return true;
                })
                .collect(Collectors.toList()));
    }
}
