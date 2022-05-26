package com.psa.matriculas2022.controller;

import com.psa.matriculas2022.model.Historico;

import com.psa.matriculas2022.service.HistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/historico")
@CrossOrigin()
public class HistoryController {
    @Autowired
    private HistoryService historyService;


    @GetMapping("/me/{student_id}")
    public ResponseEntity<List<Historico>> getHistoryByStudent(@PathVariable String student_id) {
        return ResponseEntity.ok(historyService.getByStudentId(Integer.parseInt(student_id)));
    }
}
