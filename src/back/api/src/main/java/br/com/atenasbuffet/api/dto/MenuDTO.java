package br.com.atenasbuffet.api.dto;

import java.time.LocalDate;

public class MenuDTO {
    private String sobremesa;
    private String pratoPrincipal;
    private String acompanhamento;
    private String bebidas;
    private String entrada;
    private String vegetariano;
    private Double orcamentoMaximo;
    private String observacoes;
    private LocalDate dataEvento;
    private String tipoEvento;
    private String nomeCliente;
    private Long eventoId;
    private Long idCliente;
    
    // Getters e Setters
    public Long getEventoId() {
        return eventoId;
    }
    
    public void setEventoId(Long eventoId) {
        this.eventoId = eventoId;
    }
    
    public Long getIdCliente() {
        return idCliente;
    }
    
    public void setIdCliente(Long idCliente) {
        this.idCliente = idCliente;
    }
    
    // Getters e Setters
    public String getSobremesa() {
        return sobremesa;
    }

    public void setSobremesa(String sobremesa) {
        this.sobremesa = sobremesa;
    }

    public String getPratoPrincipal() {
        return pratoPrincipal;
    }

    public void setPratoPrincipal(String pratoPrincipal) {
        this.pratoPrincipal = pratoPrincipal;
    }

    public String getAcompanhamento() {
        return acompanhamento;
    }

    public void setAcompanhamento(String acompanhamento) {
        this.acompanhamento = acompanhamento;
    }

    public String getBebidas() {
        return bebidas;
    }

    public void setBebidas(String bebidas) {
        this.bebidas = bebidas;
    }

    public String getEntrada() {
        return entrada;
    }

    public void setEntrada(String entrada) {
        this.entrada = entrada;
    }

    public String getVegetariano() {
        return vegetariano;
    }

    public void setVegetariano(String vegetariano) {
        this.vegetariano = vegetariano;
    }

    public Double getOrcamentoMaximo() {
        return orcamentoMaximo;
    }

    public void setOrcamentoMaximo(Double orcamentoMaximo) {
        this.orcamentoMaximo = orcamentoMaximo;
    }

    public String getObservacoes() {
        return observacoes;
    }

    public void setObservacoes(String observacoes) {
        this.observacoes = observacoes;
    }

    public LocalDate getDataEvento() {
        return dataEvento;
    }

    public void setDataEvento(LocalDate dataEvento) {
        this.dataEvento = dataEvento;
    }

    public String getTipoEvento() {
        return tipoEvento;
    }

    public void setTipoEvento(String tipoEvento) {
        this.tipoEvento = tipoEvento;
    }

    public String getNomeCliente() {
        return nomeCliente;
    }

    public void setNomeCliente(String nomeCliente) {
        this.nomeCliente = nomeCliente;
    }

    @Override
    public String toString() {
        return "MenuDTO{" +
                "sobremesa='" + sobremesa + '\'' +
                ", pratoPrincipal='" + pratoPrincipal + '\'' +
                ", acompanhamento='" + acompanhamento + '\'' +
                ", bebidas='" + bebidas + '\'' +
                ", entrada='" + entrada + '\'' +
                ", vegetariano='" + vegetariano + '\'' +
                ", orcamentoMaximo=" + orcamentoMaximo +
                ", observacoes='" + observacoes + '\'' +
                ", dataEvento=" + dataEvento +
                ", tipoEvento='" + tipoEvento + '\'' +
                ", nomeCliente='" + nomeCliente + '\'' +
                '}';
    }
}
