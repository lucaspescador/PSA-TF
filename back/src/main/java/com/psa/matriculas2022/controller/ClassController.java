package com.psa.matriculas2022.controller;

import com.psa.matriculas2022.constants.HistoryStatus;
import com.psa.matriculas2022.model.Historico;
import com.psa.matriculas2022.model.Turma;
import com.psa.matriculas2022.model.Usuario;
import com.psa.matriculas2022.service.ClassService;

import com.psa.matriculas2022.service.HistoryService;
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
import java.util.stream.Collectors;

@RestController
@RequestMapping("/turmas")
@CrossOrigin()
public class ClassController {
    @Autowired
    private ClassService classService;

    @Autowired
    private UserService userService;

    @Autowired
    private HistoryService historyService;

    @GetMapping
    public ResponseEntity<List<Turma>> getCourses(
            @RequestParam(required = false) String nome,
            @RequestParam(required = false) String codigo,
            @RequestParam(required = false) String horarios
    ) {
        final boolean applyNameFilter = nome != null && !nome.isEmpty();
        final boolean applyCodeFilter = codigo != null && !codigo.isEmpty();
        final boolean applyTimeFilter = horarios != null && !horarios.isEmpty();

        final List<Turma> todasTurmas = classService.list().stream()
                .map(x -> {
                    final List<Historico> alunosMatriculados = historyService.getByTurmaAndStatus(x, HistoryStatus.CURSANDO);
                    x.setMatriculados(alunosMatriculados.size());
                    return x;
                })
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
                .collect(Collectors.toList());

        return ResponseEntity.ok(todasTurmas);
    }

    @GetMapping("{id}/alunos")
    public ResponseEntity<List<Historico>> getClassStudents(
            @PathVariable String id
    ) {
        try {
            final Turma turma = classService.findById(Integer.parseInt(id))
                    .orElseThrow(()->new NotFoundException("Turma com "+id+" não encontrada!"));

            final List<Historico> alunosMatriculados = historyService.getByTurmaAndStatus(turma, HistoryStatus.CURSANDO);


            return ResponseEntity.ok(alunosMatriculados);
        } catch (NotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Turma não encontrada", e);
        }
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

            final List<Historico> matriculas = historyService.getByTurmaAndStatus(turma, HistoryStatus.CURSANDO);

            if (matriculas.size() >= turma.getVagas()) { // valida se a turma possúi vagas
                return ResponseEntity.badRequest().build();
            }

           final Historico historico = Historico.builder()
                   .turma(turma)
                   .aluno(usuario)
                   .status(HistoryStatus.CURSANDO)
                   .build();

           historyService.save(historico);

            return ResponseEntity.noContent().build();
        } catch (NotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Turma não encontrada", e);
        }
    }

    @DeleteMapping("{id}/matricula")
    public ResponseEntity unsubscribe(
            @PathVariable String id
    ) {
        try{
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            final Usuario usuario = userService.findOne(authentication.getName());

            final Turma turma = classService.findById(Integer.parseInt(id))
                    .orElseThrow(()->new NotFoundException("Turma com "+id+" não encontrada!"));

            final Historico historico = historyService.findOneByTurmaAndStatusAndAluno(turma, HistoryStatus.CURSANDO, usuario.getId())
                    .orElseThrow(()->new NotFoundException("Historico com "+id+" não encontrada!"));

            historyService.delete(historico);

            return ResponseEntity.noContent().build();
        } catch (NotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Registro não encontrado", e);
        }
    }
}
