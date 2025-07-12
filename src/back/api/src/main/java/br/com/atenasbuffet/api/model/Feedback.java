package br.com.atenasbuffet.api.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "feedback")
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_feedback;

    private String nome;
    private String email;
    private Double avaliacao;
    private int avaliacaoGarcom;
    private int avaliacaoOrganizacao;
    private int avaliacaoEquipe;
    private int avaliacaoPratos;
    private String comentariosAdicionais;
    private String respostaBuffet;
    @Column(name = "id_evento")
    private Long idEvento;
    @Column(name = "id_buffet")
    private Long idBuffet;
    @Column(name = "id_cliente")
    private Long idCliente;

    public void calcularMediaAvaliacao() {
        int totalAvaliacoes = 4; // Número de critérios avaliados
        this.avaliacao = (this.avaliacaoGarcom +
                          this.avaliacaoOrganizacao +
                          this.avaliacaoEquipe +
                          this.avaliacaoPratos) / (double) totalAvaliacoes;
    }

    // Getters e Setters
    public Long getId_feedback() {
        return id_feedback;
    }

    public void setId_feedback(Long id_feedback) {
        this.id_feedback = id_feedback;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getAvaliacaoGarcom() {
        return avaliacaoGarcom;
    }

    public void setAvaliacaoGarcom(int avaliacaoGarcom) {
        this.avaliacaoGarcom = avaliacaoGarcom;
    }

    public int getAvaliacaoOrganizacao() {
        return avaliacaoOrganizacao;
    }

    public void setAvaliacaoOrganizacao(int avaliacaoOrganizacao) {
        this.avaliacaoOrganizacao = avaliacaoOrganizacao;
    }

    public int getAvaliacaoEquipe() {
        return avaliacaoEquipe;
    }

    public void setAvaliacaoEquipe(int avaliacaoEquipe) {
        this.avaliacaoEquipe = avaliacaoEquipe;
    }

    public int getAvaliacaoPratos() {
        return avaliacaoPratos;
    }

    public void setAvaliacaoPratos(int avaliacaoPratos) {
        this.avaliacaoPratos = avaliacaoPratos;
    }

    public String getComentariosAdicionais() {
        return comentariosAdicionais;
    }

    public void setComentariosAdicionais(String comentariosAdicionais) {
        this.comentariosAdicionais = comentariosAdicionais;
    }

    public String getRespostaBuffet() {
        return respostaBuffet;
    }

    public void setRespostaBuffet(String respostaBuffet) {
        this.respostaBuffet = respostaBuffet;
    }

    public Long getIdEvento() {
        return idEvento;
    }

    public void setIdEvento(Long idEvento) {
        this.idEvento = idEvento;
    }

    public Long getIdBuffet() {
        return idBuffet;
    }

    public void setIdBuffet(Long idBuffet) {
        this.idBuffet = idBuffet;
    }

    public Long getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(Long idCliente) {
        this.idCliente = idCliente;
    }

    public Double getAvaliacao() {
        return avaliacao;
    }
    
    public void setAvaliacao(Double avaliacao) {
        this.avaliacao = avaliacao;
    }
}
