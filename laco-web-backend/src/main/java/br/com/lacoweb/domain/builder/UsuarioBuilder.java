package br.com.lacoweb.domain.builder;

import br.com.lacoweb.data.entity.usuario.Usuario;
import br.com.lacoweb.domain.dto.usuario.UsuarioCadastroForm;
import br.com.lacoweb.domain.dto.usuario.UsuarioDados;
import org.springframework.stereotype.Component;

@Component
public class UsuarioBuilder {

    public Usuario build(UsuarioCadastroForm usuarioCadastroForm) {

        Usuario usuario = new Usuario();
        usuario.setLogin(usuarioCadastroForm.login());
        usuario.setSenha(usuarioCadastroForm.senha());

        return usuario;
    }

    public UsuarioDados build(Usuario usuario) {
        return new UsuarioDados(usuario.getId(), usuario.getLogin());
    }

}
