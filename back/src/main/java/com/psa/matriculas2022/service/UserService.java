package com.psa.matriculas2022.service;

import com.psa.matriculas2022.constants.UserRoles;
import com.psa.matriculas2022.model.Usuario;

import java.util.List;

public interface UserService {

    Usuario save(Usuario user);

    Usuario findOne(String username);
    
    Usuario findById(int id);

    List<Usuario> findByRole(UserRoles role);
}
