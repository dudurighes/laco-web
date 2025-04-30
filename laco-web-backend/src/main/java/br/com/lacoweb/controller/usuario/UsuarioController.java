package br.com.lacoweb.controller.usuario;

import br.com.lacoweb.domain.dto.usuario.UsuarioCadastroForm;
import br.com.lacoweb.domain.service.usuario.UsuarioService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/usuario")
@AllArgsConstructor
public class UsuarioController {

    private UsuarioService usuarioService;

    @PostMapping
    public void cadastrar(@RequestBody UsuarioCadastroForm usuarioForm) {
        usuarioService.salvar(usuarioForm);
    }
}
