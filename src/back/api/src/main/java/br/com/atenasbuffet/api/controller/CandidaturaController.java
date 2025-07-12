package br.com.atenasbuffet.api.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.atenasbuffet.api.model.Candidatura;
import br.com.atenasbuffet.api.model.Garcom;
import br.com.atenasbuffet.api.model.VagaGarcom;
import br.com.atenasbuffet.api.repository.CandidaturaRepository;
import br.com.atenasbuffet.api.repository.GarcomRepository;
import br.com.atenasbuffet.api.repository.VagaGarcomRepository;

@CrossOrigin(origins = "*") 
@RestController
@RequestMapping("/api/candidaturas")
public class CandidaturaController {

    @Autowired
    private CandidaturaRepository candidaturaRepository;

    @Autowired
    private GarcomRepository garcomRepository;

    @Autowired
    private VagaGarcomRepository vagaGarcomRepository;

    @PostMapping("/candidatar-se")
    public ResponseEntity<?> candidatarSe(@RequestParam Long idGarcom, @RequestParam Long idVaga) {
        try {
            Garcom garcom = garcomRepository.findById(idGarcom)
                            .orElseThrow(() -> new RuntimeException("Garçom não encontrado"));

            VagaGarcom vagaGarcom = vagaGarcomRepository.findById(idVaga)
                            .orElseThrow(() -> new RuntimeException("Vaga não encontrada"));

            // Cria a candidatura e preenche com os dados da vaga e do garçom
            Candidatura candidatura = new Candidatura();
            candidatura.setIdGarcom(garcom.getIdgarcom());
            candidatura.setNome(garcom.getNome());
            candidatura.setTelefone(garcom.getTelefone());
            candidatura.setIdVaga(idVaga);
            candidatura.setStatus("Pendente");
            candidatura.setCargo(vagaGarcom.getCargo());
            candidatura.setBairro(vagaGarcom.getBairro());
            candidatura.setRua(vagaGarcom.getRua());
            candidatura.setNumero(vagaGarcom.getNumero());
            candidatura.setCep(vagaGarcom.getCep());

            Candidatura novaCandidatura = candidaturaRepository.save(candidatura);

            return ResponseEntity.ok(novaCandidatura);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao processar a candidatura: " + e.getMessage());
        }
    }

    @GetMapping("/garcom/{idGarcom}")
    public ResponseEntity<List<Candidatura>> getCandidaturasPorGarcom(@PathVariable Long idGarcom) {
        List<Object[]> results = candidaturaRepository.findCandidaturasWithBuffetDetails(idGarcom);
        List<Candidatura> candidaturas = new ArrayList<>();
        
        for (Object[] row : results) {
            Candidatura candidatura = (Candidatura) row[0];
            String nomeBuffet = (String) row[1];
            Double salario = (Double) row[2];
            String jornadaTrabalho = (String) row[3];
    
            candidatura.setNomeBuffet(nomeBuffet);
            candidatura.setSalario(salario);
            candidatura.setJornadaTrabalho(jornadaTrabalho);
            
            candidaturas.add(candidatura);
        }
        
        return ResponseEntity.ok(candidaturas);
    }
    
    @GetMapping("/vaga/{idVaga}")
    public ResponseEntity<List<Candidatura>> getCandidaturasPorVaga(@PathVariable Long idVaga) {
        List<Candidatura> candidaturas = candidaturaRepository.findByIdVaga(idVaga);
        if (candidaturas.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(candidaturas);
    }

    @PutMapping("/{idCandidatura}/atualizar-status")
    public ResponseEntity<?> atualizarStatusCandidatura(@PathVariable Long idCandidatura, @RequestBody Map<String, String> body) {
    return candidaturaRepository.findById(idCandidatura)
            .map(candidatura -> {
                candidatura.setStatus(body.get("status"));
                candidaturaRepository.save(candidatura);
                return ResponseEntity.ok(candidatura);
            })
            .orElseGet(() -> ResponseEntity.notFound().build());
}

}
