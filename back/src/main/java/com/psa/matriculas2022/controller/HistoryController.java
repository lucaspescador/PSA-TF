package com.psa.matriculas2022.controller;

import com.psa.matriculas2022.constants.HistoryStatus;
import com.psa.matriculas2022.dtos.HistoryStat;
import com.psa.matriculas2022.model.Historico;

import com.psa.matriculas2022.model.Turma;
import com.psa.matriculas2022.model.Usuario;
import com.psa.matriculas2022.service.HistoryService;
import com.psa.matriculas2022.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/historico")
@CrossOrigin()
public class HistoryController {
    @Autowired
    private HistoryService historyService;

    @Autowired
    private UserService userService;

    @GetMapping("/me")
    public ResponseEntity<List<Historico>> getHistoryByStudent() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        final Usuario usuario = userService.findOne(authentication.getName());
        final List<Historico> meuHistorico = historyService
                .getByStudentId(usuario.getId())
                .stream()
                .sorted(Comparator.comparing(Historico::getStatus))
                .collect(Collectors.toList());

        return ResponseEntity.ok(meuHistorico);
    }

    @GetMapping("/me/comprovante")
    public ResponseEntity<List<Historico>> getOnGoingHistory() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        final Usuario usuario = userService.findOne(authentication.getName());
        final List<Historico> matricula = historyService
                .getOnGoingHistory(usuario.getId())
                .stream()
                .sorted(Comparator.comparingInt(Historico::getId).reversed())
                .collect(Collectors.toList());

        return ResponseEntity.ok(matricula);
    }

    @GetMapping("/me/stats")
    public ResponseEntity<HistoryStat> getHistoryStats() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        final Usuario usuario = userService.findOne(authentication.getName());
        final List<Historico> historico = historyService.getByStudentId(usuario.getId());

        final List<Historico> aprovadas = historico.stream()
                .filter(historicoItem -> HistoryStatus.APROVADO.equals(historicoItem.getStatus()))
                .collect(Collectors.toList());

        final List<Historico> reprovadas = historico.stream()
                .filter(historicoItem -> HistoryStatus.REPROVADO.equals(historicoItem.getStatus()))
                .collect(Collectors.toList());

        final double calculoRendimento = (double) aprovadas.size() / (aprovadas.size() + reprovadas.size());

        final HistoryStat rendimento = HistoryStat
                .builder()
                .rendimento(calculoRendimento)
                .build();

        return ResponseEntity.ok(rendimento);
    }
}
