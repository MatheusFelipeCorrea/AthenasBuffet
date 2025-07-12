package br.com.atenasbuffet.api.dto;

import lombok.Data;

@Data
public class FeedbackDTO {
    private String nome;
    private String email;
    private int avaliacaoGarcom;
    private int avaliacaoOrganizacao;
    private int avaliacaoEquipe;
    private int avaliacaoPratos;
    private String comentariosAdicionais;
    private String respostaBuffet;
}
