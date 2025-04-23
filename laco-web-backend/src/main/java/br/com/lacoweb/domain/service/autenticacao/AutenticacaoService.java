package br.com.lacoweb.domain.service.autenticacao;

import br.com.lacoweb.config.security.DadosTokenJWT;
import br.com.lacoweb.domain.dto.autenticacao.DadosAutenticacao;

public interface AutenticacaoService {

    DadosTokenJWT autenticar(DadosAutenticacao dadosAutenticacao);

}
