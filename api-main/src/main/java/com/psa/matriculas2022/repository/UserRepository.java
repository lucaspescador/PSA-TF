package com.psa.matriculas2022.repository;

import com.psa.matriculas2022.model.Usuario;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends CrudRepository<Usuario, Integer> {
    Usuario findByNome(String nome);
}