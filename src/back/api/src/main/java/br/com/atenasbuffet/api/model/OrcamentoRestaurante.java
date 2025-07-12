package br.com.atenasbuffet.api.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "orcamento_restaurante")
public class OrcamentoRestaurante {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idOrcamentoRestaurante;

    private String nomeCliente;
    private String cpfCliente;
    private String nomeRestaurante;
    private String cnpjRestaurante;
    private String cepRestaurante;
    private String ruaRestaurante;
    private String numeroRestaurante;
    private String telefoneRestaurante;
    private String precoRestaurante;
    private Long idBuffet;
    private Long idCliente;
    private Long idEvento;

    private String status;

    // Getters e Setters

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
    
    public Long getIdOrcamentoRestaurante() {
        return idOrcamentoRestaurante;
    }

    public void setIdOrcamentoRestaurante(Long idOrcamentoRestaurante) {
        this.idOrcamentoRestaurante = idOrcamentoRestaurante;
    }
    
    public String getNomeCliente() {
        return nomeCliente;
    }

    public void setNomeCliente(String nomeCliente) {
        this.nomeCliente = nomeCliente;
    }

    public String getCpfCliente() {
        return cpfCliente;
    }

    public void setCpfCliente(String cpfCliente) {
        this.cpfCliente = cpfCliente;
    }

    public String getNomeRestaurante() {
        return nomeRestaurante;
    }

    public void setNomeRestaurante(String nomeRestaurante) {
        this.nomeRestaurante = nomeRestaurante;
    }

    public String getCnpjRestaurante() {
        return cnpjRestaurante;
    }

    public void setCnpjRestaurante(String cnpjRestaurante) {
        this.cnpjRestaurante = cnpjRestaurante;
    }

    public String getCepRestaurante() {
        return cepRestaurante;
    }

    public void setCepRestaurante(String cepRestaurante) {
        this.cepRestaurante = cepRestaurante;
    }

    public String getRuaRestaurante() {
        return ruaRestaurante;
    }

    public void setRuaRestaurante(String ruaRestaurante) {
        this.ruaRestaurante = ruaRestaurante;
    }

    public String getNumeroRestaurante() {
        return numeroRestaurante;
    }

    public void setNumeroRestaurante(String numeroRestaurante) {
        this.numeroRestaurante = numeroRestaurante;
    }

    public String getTelefoneRestaurante() {
        return telefoneRestaurante;
    }

    public void setTelefoneRestaurante(String telefoneRestaurante) {
        this.telefoneRestaurante = telefoneRestaurante;
    }

    public String getPrecoRestaurante() {
        return precoRestaurante;
    }

    public void setPrecoRestaurante(String precoRestaurante) {
        this.precoRestaurante = precoRestaurante;
    }
    
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
