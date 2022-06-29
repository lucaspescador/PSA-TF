package com.psa.matriculas2022.repository;

import com.psa.matriculas2022.constants.HistoryStatus;
import com.psa.matriculas2022.model.Historico;
import com.psa.matriculas2022.model.Turma;
import com.psa.matriculas2022.model.Usuario;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HistoryRepository extends CrudRepository<Historico, Integer> {
    List<Historico> findByAlunoId(Integer aluno_id);
    List<Historico> findByAlunoIdAndStatus(Integer aluno_id, HistoryStatus status);

    List<Historico> findByTurmaAndStatus(Turma turma, HistoryStatus status);

    Historico findOneByTurmaAndStatusAndAlunoId(Turma turma, HistoryStatus status, Integer aluno_id);

}
