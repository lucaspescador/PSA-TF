package com.psa.matriculas2022.repository;

import com.psa.matriculas2022.model.Historico;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HistoryRepository extends CrudRepository<Historico, Integer> {
    List<Historico> findByAlunoId(Integer aluno_id);
}
