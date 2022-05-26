package com.psa.matriculas2022.repository;

import com.psa.matriculas2022.model.Disciplina;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepository extends CrudRepository<Disciplina, Integer> {}
