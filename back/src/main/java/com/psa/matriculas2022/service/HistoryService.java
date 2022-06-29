package com.psa.matriculas2022.service;

import com.psa.matriculas2022.constants.HistoryStatus;
import com.psa.matriculas2022.model.Historico;
import com.psa.matriculas2022.model.Turma;
import com.psa.matriculas2022.model.Usuario;
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

    public List<Historico> getByTurmaAndStatus(final Turma turma, final HistoryStatus status) {
        return Optional.of(historyRepository.findByTurmaAndStatus(turma, status))
                .orElse(Collections.emptyList());
    }

    public List<Historico> getOnGoingHistory(final Integer aluno_id) {
        return Optional.of(historyRepository.findByAlunoIdAndStatus(aluno_id, HistoryStatus.CURSANDO))
                .orElse(Collections.emptyList());
    }

    public List<Historico> getApprovedHistory(final Integer aluno_id) {
        return Optional.of(historyRepository.findByAlunoIdAndStatus(aluno_id, HistoryStatus.APROVADO))
                .orElse(Collections.emptyList());
    }

    public List<Historico> getReprovedHistory(final Integer aluno_id) {
        return Optional.of(historyRepository.findByAlunoIdAndStatus(aluno_id, HistoryStatus.REPROVADO))
                .orElse(Collections.emptyList());
    }

    public Optional<Historico> findOneByTurmaAndStatusAndAluno(final Turma turma, final HistoryStatus status, final Integer aluno_id) {
        return Optional.ofNullable(historyRepository.findOneByTurmaAndStatusAndAlunoId(turma, status, aluno_id));
    }
    public Historico save(Historico historico) {
        return historyRepository.save(historico);
    }

    public void delete(Historico historico) {
        historyRepository.delete(historico);
    }

}
