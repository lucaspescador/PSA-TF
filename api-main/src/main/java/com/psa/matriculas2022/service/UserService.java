package com.psa.matriculas2022.service;

import com.psa.matriculas2022.model.Usuario;

public interface UserService {

    Usuario save(Usuario user);

    Usuario findOne(String username);
    
    Usuario findById(int id);
}