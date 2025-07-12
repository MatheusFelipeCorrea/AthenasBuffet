package br.com.atenasbuffet.api.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Evento {
    private String cliente;
    private LocalTime horario;
    private LocalDate data;
    private String tipoEvento;
    private String cep;
    private int duracaoHoras;
    private int numConvidados;

    // Métodos de negócio
    public boolean isEventoValido() {
        return cliente != null && !cliente.isEmpty() && data != null && numConvidados > 0;
    }

    public LocalTime getHorarioFim() {
        return horario.plusHours(duracaoHoras);
    }
}
