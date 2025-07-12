package br.com.atenasbuffet.api.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.atenasbuffet.api.dto.FormularioDTO;
import br.com.atenasbuffet.api.model.Formulario;
import br.com.atenasbuffet.api.repository.FormularioRepository;

@CrossOrigin(origins = "*") 
@RestController
@RequestMapping("/api/formularios")
public class FormularioController {

    private static final Logger logger = LoggerFactory.getLogger(FormularioController.class);

    @Autowired
    private FormularioRepository formularioRepository;

    @PostMapping("/criar")
    public ResponseEntity<?> criarFormulario(@RequestBody FormularioDTO formularioDTO,
                                             @RequestParam("idBuffet") Long idBuffet,
                                             @RequestHeader("userId") Long idCliente) {
        try {
            Formulario formulario = new Formulario();
            
            formulario.setTipoEvento(formularioDTO.getTipoEvento());
            formulario.setDataEvento(formularioDTO.getData());
            formulario.setHorario(formularioDTO.getHorario());
            formulario.setDuracaoEvento(formularioDTO.getDuracao());
            formulario.setNumeroConvidados(formularioDTO.getNumeroConvidados());
            formulario.setCep(formularioDTO.getCep());
            formulario.setLogradouro(formularioDTO.getLogradouro());
            formulario.setNumero(formularioDTO.getNumero());
            formulario.setComplemento(formularioDTO.getComplemento());
            formulario.setEstado(formularioDTO.getEstado());
            formulario.setBairro(formularioDTO.getBairro());
            formulario.setCidade(formularioDTO.getCidade());
            formulario.setPrecisaOrcamentoMenu(formularioDTO.isPrecisaOrcamentoMenu());
            formulario.setEquipamento(formularioDTO.getEquipamento());
            formulario.setOrcamentoMaximo(formularioDTO.getOrcamentoMaximo());
            
            String outrosServicosConcatenados = String.join(", ", formularioDTO.getOutrosServicos());
            formulario.setOutrosServicos(outrosServicosConcatenados);
    
            formulario.setIdCliente(idCliente);
            formulario.setIdBuffet(idBuffet);
    
            // Salva no banco de dados
            formularioRepository.save(formulario);
    
            logger.info("Formulário de evento criado com sucesso para cliente ID {} e buffet ID {}", idCliente, idBuffet);
    
            // Retorna o ID do evento recém-criado como JSON
            return ResponseEntity.ok(Map.of("idEvento", formulario.getIdEvento()));
        } catch (Exception e) {
            logger.error("Erro ao criar o formulário de evento", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao criar o formulário de evento.");
        }
    }
     
    @GetMapping("/eventos")
    public List<FormularioDTO> buscarFormulariosPorBuffet(@RequestParam Long idBuffet) {
        List<Object[]> formulariosComCliente = formularioRepository.findEventosByBuffetWithClienteNome(idBuffet);
        return formulariosComCliente.stream().map(obj -> {
        Formulario formulario = (Formulario) obj[0];
        String nomeCliente = (String) obj[1];

        FormularioDTO dto = new FormularioDTO();
        dto.setIdCliente(formulario.getIdCliente());
        dto.setIdEvento(formulario.getIdEvento());
        dto.setTipoEvento(formulario.getTipoEvento());
        dto.setData(formulario.getDataEvento());
        dto.setHorario(formulario.getHorario());
        dto.setNomeCliente(nomeCliente); 
        dto.setDuracao(formulario.getDuracaoEvento());
        dto.setNumeroConvidados(formulario.getNumeroConvidados());
        dto.setCep(formulario.getCep());
        dto.setLogradouro(formulario.getLogradouro());
        dto.setNumero(formulario.getNumero());
        dto.setComplemento(formulario.getComplemento());
        dto.setEstado(formulario.getEstado());
        dto.setBairro(formulario.getBairro());
        dto.setCidade(formulario.getCidade());
        dto.setPrecisaOrcamentoMenu(formulario.isPrecisaOrcamentoMenu());
        dto.setEquipamento(formulario.getEquipamento());
        dto.setOrcamentoMaximo(formulario.getOrcamentoMaximo());
        dto.setOutrosServicos(formulario.getOutrosServicos());
        dto.setOrcamento(formulario.getOrcamento());
        dto.setStatus(formulario.getStatus());
        return dto;
        }).collect(Collectors.toList());
    }

    @PutMapping("/{eventoId}/atualizar-orcamento")
    public ResponseEntity<String> atualizarOrcamento(@PathVariable Long eventoId, @RequestBody Map<String, Double> payload) {
    Optional<Formulario> optionalFormulario = formularioRepository.findById(eventoId);
        if (optionalFormulario.isPresent()) {
            Formulario formulario = optionalFormulario.get();
            formulario.setOrcamento(payload.get("orcamento"));
            formularioRepository.save(formulario);
            return ResponseEntity.ok("Orçamento atualizado com sucesso!");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Evento não encontrado.");
        }
    }

    @GetMapping("/eventos/cliente")
    public List<FormularioDTO> buscarEventosPorCliente(@RequestParam Long idCliente) {
    List<Formulario> eventos = formularioRepository.findByIdCliente(idCliente);
    return eventos.stream().map(evento -> {
        FormularioDTO dto = new FormularioDTO();
        dto.setIdEvento(evento.getIdEvento());
        dto.setNomeCliente(evento.getCliente().getNome());
        dto.setTipoEvento(evento.getTipoEvento());
        dto.setData(evento.getDataEvento());
        dto.setHorario(evento.getHorario());
        dto.setDuracao(evento.getDuracaoEvento());
        dto.setNumeroConvidados(evento.getNumeroConvidados());
        dto.setEquipamento(evento.getEquipamento());
        dto.setOrcamentoMaximo(evento.getOrcamentoMaximo());
        dto.setOutrosServicos(evento.getOutrosServicos());
        dto.setPrecisaOrcamentoMenu(evento.isPrecisaOrcamentoMenu());
        dto.setLogradouro(evento.getLogradouro());
        dto.setNumero(evento.getNumero());
        dto.setComplemento(evento.getComplemento());
        dto.setBairro(evento.getBairro());
        dto.setCidade(evento.getCidade());
        dto.setEstado(evento.getEstado());
        dto.setCep(evento.getCep());
        dto.setOrcamento(evento.getOrcamento());
        dto.setStatus(evento.getStatus());  

        return dto;
    }).collect(Collectors.toList());
    }

    @PutMapping("/{eventoId}/atualizar-status")
    public ResponseEntity<String> atualizarStatus(@PathVariable Long eventoId, @RequestBody Map<String, String> payload) {
    Optional<Formulario> optionalFormulario = formularioRepository.findById(eventoId);
    if (optionalFormulario.isPresent()) {
        Formulario formulario = optionalFormulario.get();
        formulario.setStatus(payload.get("status"));
        formularioRepository.save(formulario);
        return ResponseEntity.ok("Status atualizado com sucesso!");
    } else {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Evento não encontrado.");
    }
    }

}
