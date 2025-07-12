package br.com.atenasbuffet.api.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public class FormularioDTO {

    private Long idEvento; 
    private String nomeCliente;  
    
    @NotEmpty(message = "Tipo de evento é obrigatório")
    private String tipoEvento;

    @NotNull(message = "Data é obrigatória")
    private LocalDate data;

    @NotNull(message = "Horário é obrigatório")
    private LocalTime horario;

    @Pattern(regexp = "\\d{5}-\\d{3}", message = "CEP inválido")
    private String cep;

    @NotEmpty(message = "Logradouro é obrigatório")
    private String logradouro;

    @NotNull(message = "Número é obrigatório")
    private Integer numero;

    private String complemento;

    @NotEmpty(message = "Bairro é obrigatório")
    private String bairro;

    @NotEmpty(message = "Estado é obrigatório")
    private String estado;

    @NotEmpty(message = "Cidade é obrigatória")
    private String cidade;

    @NotNull(message = "Duração do evento é obrigatória")
    private Double duracao;

    @Min(value = 1, message = "Número de convidados deve ser no mínimo 1")
    private int numeroConvidados;

    private boolean precisaOrcamentoMenu;

    private String equipamento;

    private Double orcamento;

    private String status;  

    @DecimalMin(value = "0.0", inclusive = false, message = "Orçamento máximo deve ser maior que zero")
    @NotNull(message = "Orçamento máximo é obrigatório")
    private Double orcamentoMaximo;

    private String outrosServicos;

    private Long idCliente; 

    // Getters e Setters

    public Double getOrcamento() {
        return orcamento;
    }
    
    public void setOrcamento(Double orcamento) {
        this.orcamento = orcamento;
    }

    public Long getIdEvento() {
        return idEvento;
    }

    public void setIdEvento(Long idEvento) {
        this.idEvento = idEvento;
    }

    public String getNomeCliente() {
        return nomeCliente;
    }

    public void setNomeCliente(String nomeCliente) {
        this.nomeCliente = nomeCliente;
    }

    public String getTipoEvento() {
        return tipoEvento;
    }

    public void setTipoEvento(String tipoEvento) {
        this.tipoEvento = tipoEvento;
    }

    public LocalDate getData() {
        return data;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public LocalTime getHorario() {
        return horario;
    }

    public void setHorario(LocalTime horario) {
        this.horario = horario;
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

    public String getBairro() {
        return bairro;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public Double getDuracao() {
        return duracao;
    }

    public void setDuracao(Double duracao) {
        this.duracao = duracao;
    }

    public int getNumeroConvidados() {
        return numeroConvidados;
    }

    public void setNumeroConvidados(int numeroConvidados) {
        this.numeroConvidados = numeroConvidados;
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Long getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(Long idCliente) {
        this.idCliente = idCliente;
    }
}
