package br.com.atenasbuffet.api.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.atenasbuffet.api.model.Cliente;
import br.com.atenasbuffet.api.model.Feedback;
import br.com.atenasbuffet.api.model.Formulario;
import br.com.atenasbuffet.api.repository.ClienteRepository;
import br.com.atenasbuffet.api.repository.FeedbackRepository;
import br.com.atenasbuffet.api.repository.FormularioRepository;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/feedback")
public class FeedbackController {

    @Autowired
    private FeedbackRepository feedbackRepository;
    
    @Autowired
    private FormularioRepository formularioRepository; 

    @Autowired
    private ClienteRepository clienteRepository;

    private static final Logger log = LoggerFactory.getLogger(FeedbackController.class);

    // Endpoint para salvar feedback
    @PostMapping
    public ResponseEntity<Feedback> salvarFeedback(@RequestBody Feedback feedback) {
        try {
            // Define o valor padrão para a resposta do buffet, se for null
            if (feedback.getRespostaBuffet() == null || feedback.getRespostaBuffet().trim().isEmpty()) {
                feedback.setRespostaBuffet("Não há resposta ainda");
            }
    
            feedback.calcularMediaAvaliacao();
            Feedback novoFeedback = feedbackRepository.save(feedback);
            log.info("Feedback salvo com sucesso: {}", novoFeedback);
            return ResponseEntity.status(HttpStatus.CREATED).body(novoFeedback);
        } catch (Exception e) {
            log.error("Erro ao salvar feedback", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    

    // Endpoint para buscar todos os feedbacks
    @GetMapping
    public ResponseEntity<?> listarFeedbacks() {
        try {
            List<Feedback> feedbacks = feedbackRepository.findAll();
            log.info("Lista de feedbacks carregada: {} itens encontrados", feedbacks.size());
            return ResponseEntity.ok(feedbacks);
        } catch (Exception e) {
            log.error("Erro ao listar feedbacks", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Endpoint para buscar feedback por ID
    @GetMapping("/{id}")
    public ResponseEntity<Feedback> buscarFeedbackPorId(@PathVariable Long id) {
        try {
            Optional<Feedback> feedbackOpt = feedbackRepository.findById(id);
            if (feedbackOpt.isPresent()) {
                log.info("Feedback encontrado com ID {}: {}", id, feedbackOpt.get());
                return ResponseEntity.ok(feedbackOpt.get());
            } else {
                log.warn("Feedback com ID {} não encontrado", id);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        } catch (Exception e) {
            log.error("Erro ao buscar feedback por ID {}", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Endpoint para adicionar uma resposta ao feedback e atualizar o idEvento
    @PostMapping("/evento/{idEvento}/responder")
public ResponseEntity<?> responderFeedbackPorEvento(@PathVariable Long idEvento, @RequestBody Map<String, String> payload) {
    try {
        Optional<Feedback> feedbackOpt = feedbackRepository.findByIdEvento(idEvento);
        if (feedbackOpt.isPresent()) {
            Feedback feedback = feedbackOpt.get();
            feedback.setRespostaBuffet(payload.get("resposta"));
            feedbackRepository.save(feedback);
            return ResponseEntity.ok("Resposta enviada com sucesso.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Feedback para o evento não encontrado.");
        }
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao processar a resposta.");
    }
}


    // Endpoint para buscar feedback por ID do evento
    @GetMapping("/evento/{idEvento}")
    public ResponseEntity<Feedback> buscarFeedbackPorIdEvento(@PathVariable Long idEvento) {
        try {
            Optional<Feedback> feedbackOpt = feedbackRepository.findByIdEvento(idEvento);
            if (feedbackOpt.isPresent()) {
                log.info("Feedback encontrado para evento com ID {}: {}", idEvento, feedbackOpt.get());
                return ResponseEntity.ok(feedbackOpt.get());
            } else {
                log.warn("Feedback para evento com ID {} não encontrado", idEvento);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        } catch (Exception e) {
            log.error("Erro ao buscar feedback para evento com ID {}", idEvento, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Endpoint para obter o ID do buffet associado ao evento
    @GetMapping("/{idEvento}/buffet")
    public ResponseEntity<Long> obterIdBuffetDoEvento(@PathVariable Long idEvento) {
        try {
            Optional<Formulario> formularioOpt = formularioRepository.findById(idEvento);
            if (formularioOpt.isPresent()) {
                Long idBuffet = formularioOpt.get().getIdBuffet();
                log.info("ID do buffet encontrado para o evento com ID {}: {}", idEvento, idBuffet);
                return ResponseEntity.ok(idBuffet);
            } else {
                log.warn("Nenhum formulário encontrado para evento com ID {}", idEvento);
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            log.error("Erro ao buscar ID do buffet para o evento com ID {}", idEvento, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Endpoint para listar avaliações por buffet
    @GetMapping("/buffet")
public ResponseEntity<List<Feedback>> listarAvaliacoesPorBuffet(@RequestParam Long idBuffet) {
    try {
        List<Feedback> avaliacoes = feedbackRepository.findAllByBuffet(idBuffet);
        log.info("Avaliações encontradas para buffet com ID {}: {} itens", idBuffet, avaliacoes.size());
        return ResponseEntity.ok(avaliacoes);
    } catch (Exception e) {
        log.error("Erro ao listar avaliações para buffet com ID {}", idBuffet, e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
}   

     @GetMapping("/cliente/{idCliente}")
    public ResponseEntity<?> buscarClientePorId(@PathVariable Long idCliente) {
        try {
            Optional<Cliente> clienteOpt = clienteRepository.findById(idCliente);
            if (clienteOpt.isPresent()) {
                Cliente cliente = clienteOpt.get();
                return ResponseEntity.ok(cliente); // Retorna os dados do cliente
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cliente não encontrado.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao buscar cliente.");
        }
    }
    @GetMapping("/existe")
    public ResponseEntity<Map<String, Boolean>> verificarFeedback(@RequestParam Long eventoId) {
        boolean existe = feedbackRepository.existsByIdEvento(eventoId);
        return ResponseEntity.ok(Map.of("existe", existe));
    }

    @GetMapping("/evento/{idEvento}/avaliacao")
public ResponseEntity<Map<String, Object>> buscarAvaliacaoERespostaPorIdEvento(@PathVariable Long idEvento) {
    try {
        Optional<Feedback> feedbackOpt = feedbackRepository.findByIdEvento(idEvento);
        if (feedbackOpt.isPresent()) {
            Feedback feedback = feedbackOpt.get();

            // Retornar apenas a avaliação e a resposta
            Map<String, Object> avaliacaoResposta = Map.of(
                "avaliacao", feedback.getAvaliacao(),
                "respostaBuffet", feedback.getRespostaBuffet() != null ? feedback.getRespostaBuffet() : "Não Respondido"
            );

            return ResponseEntity.ok(avaliacaoResposta);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of(
                "mensagem", "Feedback não encontrado para o evento",
                "avaliacao", "N/A",
                "respostaBuffet", "Não Respondido"
            ));
        }
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
            "mensagem", "Erro ao buscar avaliação e resposta"
        ));
    }
}

}