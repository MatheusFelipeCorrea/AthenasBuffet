package br.com.atenasbuffet.api.model;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.DecimalMin;


@Entity
@Table(name = "evento")
public class Formulario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idEvento;
    private Long idCliente; 
    private Long idBuffet;  
    private String tipoEvento;
    private LocalDate dataEvento;
    private LocalTime horario;
    private Double duracaoEvento;
    private Integer numeroConvidados;
    private String cep;
    private String logradouro;
    private Integer numero;
    private String complemento;
    private String estado;
    private String bairro;
    private String cidade;
    private boolean precisaOrcamentoMenu;
    private String equipamento;
    private Double orcamento;
    private String status;


    @DecimalMin(value = "0.0", inclusive = false, message = "Orçamento máximo deve ser maior que zero")
    private Double orcamentoMaximo;

    private String outrosServicos;

    // Relacionamento com a entidade Cliente para buscar o nome do cliente
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idCliente", insertable = false, updatable = false)
    private Cliente cliente;

    // Getters e Setters

    public Long getIdEvento() {
        return idEvento;
    }

    public void setIdEvento(Long idEvento) {
        this.idEvento = idEvento;
    }

    public Long getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(Long idCliente) {
        this.idCliente = idCliente;
    }

    public Long getIdBuffet() {
        return idBuffet;
    }

    public void setIdBuffet(Long idBuffet) {
        this.idBuffet = idBuffet;
    }

    public String getTipoEvento() {
        return tipoEvento;
    }

    public void setTipoEvento(String tipoEvento) {
        this.tipoEvento = tipoEvento;
    }

    public LocalDate getDataEvento() {
        return dataEvento;
    }

    public void setDataEvento(LocalDate dataEvento) {
        this.dataEvento = dataEvento;
    }

    public LocalTime getHorario() {
        return horario;
    }

    public void setHorario(LocalTime horario) {
        this.horario = horario;
    }

    public Double getDuracaoEvento() {
        return duracaoEvento;
    }

    public void setDuracaoEvento(Double duracaoEvento) {
        this.duracaoEvento = duracaoEvento;
    }

    public Integer getNumeroConvidados() {
        return numeroConvidados;
    }

    public void setNumeroConvidados(Integer numeroConvidados) {
        this.numeroConvidados = numeroConvidados;
    }

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public String getLogradouro() {
        return logradouro;
    }

    public void setLogradouro(String logradouro) {
        this.logradouro = logradouro;
    }

    public Integer getNumero() {
        return numero;
    }

    public void setNumero(Integer numero) {
        this.numero = numero;
    }

    public String getComplemento() {
        return complemento;
    }

    public void setComplemento(String complemento) {
        this.complemento = complemento;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getBairro() {
        return bairro;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public boolean isPrecisaOrcamentoMenu() {
        return precisaOrcamentoMenu;
    }

    public void setPrecisaOrcamentoMenu(boolean precisaOrcamentoMenu) {
        this.precisaOrcamentoMenu = precisaOrcamentoMenu;
    }

    public String getEquipamento() {
        return equipamento;
    }

    public void setEquipamento(String equipamento) {
        this.equipamento = equipamento;
    }

    public Double getOrcamentoMaximo() {
        return orcamentoMaximo;
    }

    public void setOrcamentoMaximo(Double orcamentoMaximo) {
        this.orcamentoMaximo = orcamentoMaximo;
    }

    public String getOutrosServicos() {
        return outrosServicos;
    }

    public void setOutrosServicos(String outrosServicos) {
        this.outrosServicos = outrosServicos;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public Double getOrcamento() {
        return orcamento;
    }
    
    public void setOrcamento(Double orcamento) {
        this.orcamento = orcamento;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
