package com.psa.matriculas2022.controller;

import com.psa.matriculas2022.model.Historico;

import com.psa.matriculas2022.model.Usuario;
import com.psa.matriculas2022.service.HistoryService;
import com.psa.matriculas2022.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

        return ResponseEntity.ok(historyService.getByStudentId(usuario.getId()));
    }
}