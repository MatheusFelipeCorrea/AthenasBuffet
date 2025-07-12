package br.com.atenasbuffet.api.controller;

import java.util.List;
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
import br.com.atenasbuffet.api.model.OrcamentoRestaurante;
import br.com.atenasbuffet.api.repository.ClienteRepository;
import br.com.atenasbuffet.api.repository.OrcamentoRestauranteRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class OrcamentoRestauranteController {

    private static final Logger logger = LoggerFactory.getLogger(OrcamentoRestauranteController.class);

    @Autowired
    private OrcamentoRestauranteRepository orcamentoRestauranteRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @PostMapping("/EnviarOrcamentoRestaurante")
    public ResponseEntity<String> enviarOrcamento(@RequestBody OrcamentoRestaurante orcamentoRestaurante) {
        
        // Log de entrada no método e dados recebidos
        logger.info("Iniciando processo de envio de orçamento");
        logger.info("Dados recebidos: Nome do Cliente = {}, CPF do Cliente = {}, IDBuffet = {}", 
                    orcamentoRestaurante.getNomeCliente(), orcamentoRestaurante.getCpfCliente(), orcamentoRestaurante.getIdBuffet());

        // Busca o cliente pelo nome e CPF
        Optional<Cliente> clienteOptional = clienteRepository.findByNomeAndCpf(
                orcamentoRestaurante.getNomeCliente(),
                orcamentoRestaurante.getCpfCliente()
        );

        // Verifica se o cliente existe e define o ID dele no orçamento
        if (clienteOptional.isPresent()) {
            Cliente cliente = clienteOptional.get();
            orcamentoRestaurante.setIdCliente(cliente.getIdcliente()); // Associa o ID do cliente ao orçamento
            
            orcamentoRestauranteRepository.save(orcamentoRestaurante);
            logger.info("Orçamento salvo com sucesso para o cliente: Nome = {}, CPF = {}, IDCliente = {}, IDBuffet = {}", 
                        orcamentoRestaurante.getNomeCliente(), orcamentoRestaurante.getCpfCliente(), orcamentoRestaurante.getIdCliente(), orcamentoRestaurante.getIdBuffet());
            return ResponseEntity.ok("Orçamento salvo com sucesso!");
        } else {
            logger.warn("Cliente NÃO encontrado no banco de dados.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Cliente não encontrado. Verifique o nome e o CPF.");
        }
    }

    @GetMapping("/orcamentos/cliente")
    public ResponseEntity<List<OrcamentoRestaurante>> getOrcamentosByClienteId(@RequestParam Long idCliente) {
        List<OrcamentoRestaurante> orcamentos = orcamentoRestauranteRepository.findByIdCliente(idCliente);
        
        // Log para verificar os orçamentos encontrados
        if (orcamentos.isEmpty()) {
            logger.info("Nenhum orçamento encontrado para o cliente com ID: {}", idCliente);
        } else {
            logger.info("Orçamentos encontrados para o cliente com ID {}: {}", idCliente, orcamentos);
        }
        
        return ResponseEntity.ok(orcamentos);
    }

    @PostMapping("/orcamentos/{id}/atualizarStatus")
    public ResponseEntity<String> atualizarStatusOrcamento(
            @PathVariable Long id,
            @RequestParam String status) {
        
        logger.info("Iniciando atualização de status para o orçamento com ID: {} para status: {}", id, status);
        
        Optional<OrcamentoRestaurante> orcamentoOptional = orcamentoRestauranteRepository.findById(id);
        
        if (orcamentoOptional.isPresent()) {
            OrcamentoRestaurante orcamento = orcamentoOptional.get();
            orcamento.setStatus(status);
            orcamentoRestauranteRepository.save(orcamento);
            logger.info("Status atualizado com sucesso para o orçamento com ID: {} para status: {}", id, status);
            return ResponseEntity.ok("Status atualizado com sucesso para: " + status);
        } else {
            logger.warn("Orçamento com ID {} não encontrado para atualização de status.", id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Orçamento não encontrado");
        }
    }
    
    @GetMapping("/orcamentos/buffet")
public ResponseEntity<List<OrcamentoRestaurante>> getOrcamentosByBuffetId(@RequestParam Long idBuffet) {
    List<OrcamentoRestaurante> orcamentos = orcamentoRestauranteRepository.findByIdBuffet(idBuffet);

    if (orcamentos.isEmpty()) {
        logger.info("Nenhum orçamento encontrado para o buffet com ID: {}", idBuffet);
    } else {
        logger.info("Orçamentos encontrados para o buffet com ID {}: {}", idBuffet, orcamentos);
    }

    return ResponseEntity.ok(orcamentos);
}

}
