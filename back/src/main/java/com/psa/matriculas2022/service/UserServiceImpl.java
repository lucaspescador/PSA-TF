package com.psa.matriculas2022.service;

import com.psa.matriculas2022.constants.UserRoles;
import com.psa.matriculas2022.model.Usuario;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.psa.matriculas2022.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;


@Service(value = "userService")
public class UserServiceImpl implements UserDetailsService, UserService {

    @Autowired
    private UserRepository userRepository;

    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Usuario user = userRepository.findByNome(username);
        if(user == null){
            throw new UsernameNotFoundException("Invalid username or password.");
        }
        return new User(user.getNome(), user.getSenha(), getAuthority());
    }

    private List<SimpleGrantedAuthority> getAuthority() {
        return Arrays.asList(new SimpleGrantedAuthority("ROLE_ADMIN"));
    }

    @Override
    public Usuario findOne(String username) {
        return userRepository.findByNome(username);
    }

    @Override
    public Usuario findById(int id) {
        Optional<Usuario> optionalUser = userRepository.findById(id);
        return optionalUser.isPresent() ? optionalUser.get() : null;
    }

    @Override
    public List<Usuario> findByRole(UserRoles role) {
        List<Usuario> alunos = userRepository.findByRole(UserRoles.ALUNO);
        return alunos;
    }

    @Override
    public Usuario save(Usuario user) {
        return userRepository.save(user);
    }
}
