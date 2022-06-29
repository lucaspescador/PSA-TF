package com.psa.matriculas2022.controller;

import com.psa.matriculas2022.constants.HistoryStatus;
import com.psa.matriculas2022.constants.UserRoles;
import com.psa.matriculas2022.dtos.StudentStat;
import com.psa.matriculas2022.model.Disciplina;
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
@RequestMapping("/alunos")
@CrossOrigin()
public class StudentController {

    @Autowired
    private UserService userService;

    @Autowired
    private HistoryService historyService;

    @GetMapping
    public ResponseEntity<List<Usuario>> getStudents() {
        return ResponseEntity.ok(userService.findByRole(UserRoles.ALUNO));
    }

    @GetMapping("{id}/dados")
    public ResponseEntity<StudentStat> getStudentStats(
            @PathVariable String id
    ) {

        final List<Historico> aprovacoes = historyService.getApprovedHistory(Integer.parseInt(id));
        final List<Historico> reprovacoes = historyService.getReprovedHistory(Integer.parseInt(id));

        final double calculoRendimento = (double) aprovacoes.size() / (aprovacoes.size() + reprovacoes.size());
        final int creditosCursados = aprovacoes.stream().map(Historico::getTurma).map(Turma::getDisciplina).mapToInt(Disciplina::getCreditos).sum();

        return ResponseEntity.ok(StudentStat.builder().rendimento(calculoRendimento).creditos(creditosCursados).build());
    }

    @GetMapping("{id}/horarios")
    public ResponseEntity<List<Historico>> getStudentSchedule(
            @PathVariable String id
    ) {
        final List<Historico> matricula = historyService.getOnGoingHistory(Integer.parseInt(id));

        return ResponseEntity.ok(matricula);
    }
}
