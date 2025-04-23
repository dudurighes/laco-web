package br.com.lacoweb.domain.service.autenticacao;

import br.com.lacoweb.config.security.DadosTokenJWT;
import br.com.lacoweb.config.security.TokenService;
import br.com.lacoweb.data.entity.usuario.Usuario;
import br.com.lacoweb.domain.dto.autenticacao.DadosAutenticacao;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AutenticacaoServiceImpl implements AutenticacaoService {

    private final AuthenticationManager manager;

    private final TokenService tokenService;

    @Override
    public DadosTokenJWT autenticar(DadosAutenticacao dadosAutenticacao) {
        var authenticationToken = new UsernamePasswordAuthenticationToken(dadosAutenticacao.login(), dadosAutenticacao.senha());
        var authentication = manager.authenticate(authenticationToken);

        var tokenJWT = tokenService.gerarToken((Usuario) authentication.getPrincipal());

        return new DadosTokenJWT(tokenJWT);
    }
}
