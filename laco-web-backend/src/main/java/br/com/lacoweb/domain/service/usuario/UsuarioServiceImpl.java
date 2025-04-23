package br.com.lacoweb.domain.service.usuario;

import br.com.lacoweb.data.entity.usuario.Usuario;
import br.com.lacoweb.data.repository.usuario.UsuarioRepository;
import br.com.lacoweb.domain.builder.UsuarioBuilder;
import br.com.lacoweb.domain.dto.usuario.UsuarioCadastroForm;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UsuarioServiceImpl implements UsuarioService, UserDetailsService {

    private final UsuarioRepository usuarioRepository;

    private final PasswordEncoder passwordEncoder;

    private final UsuarioBuilder usuarioBuilder;

    @Override
    public void salvar(UsuarioCadastroForm usuarioForm) {

        Usuario usuario = usuarioBuilder.build(usuarioForm);
        usuario.setSenha(passwordEncoder.encode(usuarioForm.senha()));

        usuarioRepository.save(usuario);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return usuarioRepository.findByLogin(username);
    }
}
