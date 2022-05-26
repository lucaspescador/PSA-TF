package com.psa.matriculas2022.service;

import com.psa.matriculas2022.model.Historico;
import com.psa.matriculas2022.repository.HistoryRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class HistoryService {
    @Autowired
    private HistoryRepository historyRepository;

    public List<Historico> getByStudentId(final Integer id) {
        return Optional.of(historyRepository.findByAlunoId(id))
                .orElse(Collections.emptyList());
    }
}
