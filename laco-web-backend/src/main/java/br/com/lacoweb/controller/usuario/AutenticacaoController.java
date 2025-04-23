package br.com.lacoweb.controller.usuario;

import br.com.lacoweb.config.security.DadosTokenJWT;
import br.com.lacoweb.domain.dto.autenticacao.DadosAutenticacao;
import br.com.lacoweb.domain.service.autenticacao.AutenticacaoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/login")
@RequiredArgsConstructor
public class AutenticacaoController {

    private final AutenticacaoService autenticacaoService;

    @PostMapping
    public ResponseEntity efetuarLogin(@RequestBody @Valid DadosAutenticacao dados) {
        DadosTokenJWT dadosToken = autenticacaoService.autenticar(dados);

        return ResponseEntity.ok(dadosToken);
    }

}
