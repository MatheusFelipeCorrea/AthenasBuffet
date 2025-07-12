package br.com.atenasbuffet.api.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.atenasbuffet.api.model.Buffet;
import br.com.atenasbuffet.api.model.Cliente;
import br.com.atenasbuffet.api.model.Garcom;
import br.com.atenasbuffet.api.model.UserCredentials;
import br.com.atenasbuffet.api.repository.BuffetRepository;
import br.com.atenasbuffet.api.repository.ClienteRepository;
import br.com.atenasbuffet.api.repository.GarcomRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/auth")
public class LoginController {

    private final ClienteRepository clienteRepository;
    private final BuffetRepository buffetRepository;
    private final GarcomRepository garcomRepository;

    @Autowired
    public LoginController(ClienteRepository clienteRepository, BuffetRepository buffetRepository, GarcomRepository garcomRepository) {
        this.clienteRepository = clienteRepository;
        this.buffetRepository = buffetRepository;
        this.garcomRepository = garcomRepository;
    }

    @PostMapping("/register")
public ResponseEntity<Map<String, String>> register(@RequestBody Map<String, Object> registration) {
    Map<String, String> response = new HashMap<>();

    String email = (String) registration.get("email");
    String identificador = (String) registration.get("identificador");

    // Verificar se o email já existe em qualquer tabela
    boolean emailExists = clienteRepository.findByEmail(email).isPresent()
                       || buffetRepository.findByEmail(email).isPresent()
                       || garcomRepository.findByEmail(email).isPresent();

    if (emailExists) {
        response.put("message", "Este email já está cadastrado.");
        return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
    }

    // Coleta e converte os dados comuns do usuário
    String nome = (String) registration.get("nome");
    String senha = (String) registration.get("senha");
    String telefone = (String) registration.get("telefone");
    String bairro = (String) registration.get("bairro");
    String cep = (String) registration.get("cep");
    String complemento = (String) registration.get("complemento");
    String numero = (String) registration.get("numero");
    String rua = (String) registration.get("rua");

    // Salva em tabelas diferentes com base no identificador
    if ("Cliente".equalsIgnoreCase(identificador)) {
        Cliente cliente = new Cliente();
        cliente.setNome(nome);
        cliente.setEmail(email);
        cliente.setSenha(senha);
        cliente.setCpf((String) registration.get("cpf"));
        cliente.setTelefone(telefone);
        cliente.setBairro(bairro);
        cliente.setCep(cep);
        cliente.setComplemento(complemento);
        cliente.setNumero(numero);
        cliente.setRua(rua);
        cliente.setIdentificador(identificador);
        clienteRepository.save(cliente);

    } else if ("Buffet".equalsIgnoreCase(identificador)) {
        Buffet buffet = new Buffet();
        buffet.setNomeEstabelecimento(nome);
        buffet.setEmail(email);
        buffet.setSenha(senha);
        buffet.setCnpj((String) registration.get("cnpj"));
        buffet.setTelefone(telefone);
        buffet.setBairro(bairro);
        buffet.setCep(cep);
        buffet.setComplemento(complemento);
        buffet.setNumero(numero);
        buffet.setRua(rua);
        buffet.setIdentificador(identificador);
        buffetRepository.save(buffet);

    } else if ("Garcom".equalsIgnoreCase(identificador)) {
        Garcom garcom = new Garcom();
        garcom.setNome(nome);
        garcom.setEmail(email);
        garcom.setSenha(senha);
        garcom.setCpf((String) registration.get("cpf"));
        garcom.setTelefone(telefone);
        garcom.setBairro(bairro);
        garcom.setCep(cep);
        garcom.setComplemento(complemento);
        garcom.setNumero(numero);
        garcom.setRua(rua);
        garcom.setIdentificador(identificador);
        garcomRepository.save(garcom);

    } else {
        response.put("message", "Tipo de usuário inválido.");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    response.put("message", "Usuário cadastrado com sucesso!");
    return ResponseEntity.status(HttpStatus.CREATED).body(response);
}


@PostMapping("/login")
public ResponseEntity<Map<String, String>> login(@RequestBody UserCredentials loginRequest) {
    Map<String, String> response = new HashMap<>();

    String identificador = loginRequest.getIdentificador();
    String email = loginRequest.getEmail();
    String senha = loginRequest.getPassword();

    System.out.println("Tentativa de login com identificador: " + identificador + ", email: " + email);

    if ("Cliente".equalsIgnoreCase(identificador)) {
        Optional<Cliente> clienteOpt = clienteRepository.findByEmail(email);
        if (clienteOpt.isPresent()) {
            System.out.println("Usuário Cliente encontrado no banco de dados.");
            if (clienteOpt.get().getSenha().equals(senha)) {
                response.put("message", "Login realizado com sucesso!");
                response.put("userId", String.valueOf(clienteOpt.get().getIdcliente())); // Adiciona o ID do usuário na resposta
                return ResponseEntity.ok(response);
            } else {
                System.out.println("Senha incorreta para Cliente.");
            }
        } else {
            System.out.println("Cliente não encontrado com o email fornecido.");
        }
    } else if ("Buffet".equalsIgnoreCase(identificador)) {
        Optional<Buffet> buffetOpt = buffetRepository.findByEmail(email);
        if (buffetOpt.isPresent()) {
            System.out.println("Usuário Buffet encontrado no banco de dados.");
            if (buffetOpt.get().getSenha().equals(senha)) {
                response.put("message", "Login realizado com sucesso!");
                response.put("userId", String.valueOf(buffetOpt.get().getIdbuffet()));
                return ResponseEntity.ok(response);
            } else {
                System.out.println("Senha incorreta para Buffet.");
            }
        } else {
            System.out.println("Buffet não encontrado com o email fornecido.");
        }
    } else if ("Garcom".equalsIgnoreCase(identificador)) {
        Optional<Garcom> garcomOpt = garcomRepository.findByEmail(email);
        if (garcomOpt.isPresent()) {
            System.out.println("Usuário Garcom encontrado no banco de dados.");
            if (garcomOpt.get().getSenha().equals(senha)) {
                response.put("message", "Login realizado com sucesso!");
                response.put("userId", String.valueOf(garcomOpt.get().getIdgarcom())); 
                return ResponseEntity.ok(response);
            } else {
                System.out.println("Senha incorreta para Garcom.");
            }
        } else {
            System.out.println("Garcom não encontrado com o email fornecido.");
        }
    } else {
        response.put("message", "Tipo de usuário inválido.");
        System.out.println("Tipo de usuário inválido: " + identificador);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    response.put("message", "Credenciais inválidas.");
    System.out.println("Credenciais inválidas para o email: " + email);
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }
}
