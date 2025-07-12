package br.com.atenasbuffet.api.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.atenasbuffet.api.dto.ClienteDTO;
import br.com.atenasbuffet.api.model.Cliente;
import br.com.atenasbuffet.api.repository.ClienteRepository;

@RestController
@RequestMapping("/api/clientes")
@CrossOrigin(origins = "*") // Permite acesso de diferentes origens (frontend)
public class ClienteController {

    @Autowired
    private ClienteRepository clienteRepository;

    @GetMapping("/{idcliente}")
    public ResponseEntity<?> getClienteById(@PathVariable Long idcliente) {
    Optional<Cliente> clienteOptional = clienteRepository.findById(idcliente);

        if (clienteOptional.isPresent()) {
            Cliente cliente = clienteOptional.get();

            // Cria o DTO com os dados necessários
            ClienteDTO clienteDTO = new ClienteDTO(
                cliente.getIdcliente(),
                cliente.getNome(),
                cliente.getCpf(),
                cliente.getTelefone(),
                cliente.getBairro(),
                cliente.getCep(),
                cliente.getComplemento(),
                cliente.getNumero(),
                cliente.getRua()
            );

            // Retorna o DTO
            return ResponseEntity.ok(clienteDTO);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cliente não encontrado com o ID: " + idcliente);
        }
    }   
}