package br.com.atenasbuffet.api.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "vaga_garcom")
public class VagaGarcom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idVaga;
    
    private Long idBuffet;
    private Integer idadeMinima;
    private String cargo;
    private String descricaoVaga;
    private String experienciaPrevia;
    private String qualificacoesProcuradas;
    private String habilidadesExigidas;
    private String atuacao;
    private String jornadaTrabalho;
    private String cep;
    private String bairro;
    private String rua;
    private String numero;
    private Double salario;
    private String beneficios;
    private String status;

    // Getters e Setters
    public Long getIdVaga() {
        return idVaga;
    }

    public void setIdVaga(Long idVaga) {
        this.idVaga = idVaga;
    }

    public Long getIdBuffet() {
        return idBuffet;
    }

    public void setIdBuffet(Long idBuffet) {
        this.idBuffet = idBuffet;
    }

    public Integer getIdadeMinima() {
        return idadeMinima;
    }

    public void setIdadeMinima(Integer idadeMinima) {
        this.idadeMinima = idadeMinima;
    }

    public String getCargo() {
        return cargo;
    }

    public void setCargo(String cargo) {
        this.cargo = cargo;
    }

    public String getDescricaoVaga() {
        return descricaoVaga;
    }

    public void setDescricaoVaga(String descricaoVaga) {
        this.descricaoVaga = descricaoVaga;
    }

    public String getExperienciaPrevia() {
        return experienciaPrevia;
    }

    public void setExperienciaPrevia(String experienciaPrevia) {
        this.experienciaPrevia = experienciaPrevia;
    }

    public String getQualificacoesProcuradas() {
        return qualificacoesProcuradas;
    }

    public void setQualificacoesProcuradas(String qualificacoesProcuradas) {
        this.qualificacoesProcuradas = qualificacoesProcuradas;
    }

    public String getHabilidadesExigidas() {
        return habilidadesExigidas;
    }

    public void setHabilidadesExigidas(String habilidadesExigidas) {
        this.habilidadesExigidas = habilidadesExigidas;
    }

    public String getAtuacao() {
        return atuacao;
    }

    public void setAtuacao(String atuacao) {
        this.atuacao = atuacao;
    }

    public String getJornadaTrabalho() {
        return jornadaTrabalho;
    }

    public void setJornadaTrabalho(String jornadaTrabalho) {
        this.jornadaTrabalho = jornadaTrabalho;
    }

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public String getBairro() {
        return bairro;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getRua() {
        return rua;
    }

    public void setRua(String rua) {
        this.rua = rua;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public Double getSalario() {
        return salario;
    }

    public void setSalario(Double salario) {
        this.salario = salario;
    }

    public String getBeneficios() {
        return beneficios;
    }

    public void setBeneficios(String beneficios) {
        this.beneficios = beneficios;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
