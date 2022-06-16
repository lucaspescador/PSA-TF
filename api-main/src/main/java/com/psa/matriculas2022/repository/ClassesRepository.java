package com.psa.matriculas2022.repository;

import com.psa.matriculas2022.model.Turma;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClassesRepository extends CrudRepository<Turma, Integer> {
}