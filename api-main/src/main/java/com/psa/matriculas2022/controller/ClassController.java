package com.psa.matriculas2022.controller;

import com.psa.matriculas2022.model.Turma;
import com.psa.matriculas2022.model.Usuario;
import com.psa.matriculas2022.service.ClassService;

import com.psa.matriculas2022.service.UserService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/turmas")
@CrossOrigin()
public class ClassController {
    @Autowired
    private ClassService classService;

    @Autowired
    private UserService userService;

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
                .sorted(Comparator.comparingInt(Turma::getAno).reversed())
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

    @PostMapping("{id}/matricula")
    public ResponseEntity subscribe(
            @PathVariable String id
    ) {
        try{
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            final Usuario usuario = userService.findOne(authentication.getName());
            final Turma turma = classService.findById(Integer.parseInt(id))
                    .orElseThrow(()->new NotFoundException("Turma com "+id+" não encontrada!"));

            final int vagasRestantes = turma.getVagas();

            if (vagasRestantes == 0) {
                return ResponseEntity.badRequest().build();
            }


            classService.save(turma);
            return ResponseEntity.noContent().build();
        } catch (NotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Turma não encontrada", e);
        }
    }
}