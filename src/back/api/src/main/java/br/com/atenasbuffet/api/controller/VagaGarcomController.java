package br.com.atenasbuffet.api.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

import br.com.atenasbuffet.api.model.VagaGarcom;
import br.com.atenasbuffet.api.repository.CandidaturaRepository;
import br.com.atenasbuffet.api.repository.VagaGarcomRepository;

@RestController
@RequestMapping("/api/vagas")
@CrossOrigin(origins = "*")
public class VagaGarcomController {

    @Autowired
    private VagaGarcomRepository vagaGarcomRepository;

    @Autowired
    private CandidaturaRepository candidaturaRepository;

    @GetMapping("/todas")
    public List<Map<String, Object>> getTodasVagas() {
        List<Object[]> vagasWithBuffet = vagaGarcomRepository.findAllVagasWithBuffetName();

        List<Map<String, Object>> resultado = new ArrayList<>();
        for (Object[] obj : vagasWithBuffet) {
            VagaGarcom vaga = (VagaGarcom) obj[0];
            String nomeBuffet = (String) obj[1];

            Map<String, Object> vagaMap = new HashMap<>();
            vagaMap.put("idVaga", vaga.getIdVaga());
            vagaMap.put("cargo", vaga.getCargo());
            vagaMap.put("idadeMinima", vaga.getIdadeMinima());
            vagaMap.put("descricaoVaga", vaga.getDescricaoVaga());
            vagaMap.put("experienciaPrevia", vaga.getExperienciaPrevia());
            vagaMap.put("qualificacoesProcuradas", vaga.getQualificacoesProcuradas());
            vagaMap.put("habilidadesExigidas", vaga.getHabilidadesExigidas());
            vagaMap.put("atuacao", vaga.getAtuacao());
            vagaMap.put("salario", vaga.getSalario());
            vagaMap.put("beneficios", vaga.getBeneficios());
            vagaMap.put("rua", vaga.getRua());
            vagaMap.put("numero", vaga.getNumero());
            vagaMap.put("bairro", vaga.getBairro());
            vagaMap.put("cep", vaga.getCep());
            vagaMap.put("jornadaTrabalho", vaga.getJornadaTrabalho());
            vagaMap.put("nomeBuffet", nomeBuffet);
            vagaMap.put("status", vaga.getStatus());

            resultado.add(vagaMap);
        }

        return resultado;
    }

    @GetMapping
    public List<VagaGarcom> getVagasByBuffet(@RequestParam Long idBuffet) {
        return vagaGarcomRepository.findByIdBuffet(idBuffet);
    }

    @PostMapping
public ResponseEntity<?> criarVaga(@RequestBody VagaGarcom vaga) {
    try {
        System.out.println("Recebendo vaga: " + vaga);
        VagaGarcom novaVaga = vagaGarcomRepository.save(vaga);
        System.out.println("Vaga criada com sucesso: " + novaVaga);
        return new ResponseEntity<>(novaVaga, HttpStatus.CREATED);
    } catch (Exception e) {
        System.err.println("Erro ao criar vaga: " + e.getMessage());
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                             .body("Erro ao criar a vaga: " + e.getMessage());
    }
}


    @PutMapping("/{id}/fechar")
    public ResponseEntity<?> fecharVaga(@PathVariable Long id) {
        return vagaGarcomRepository.findById(id).map(vaga -> {
            vaga.setStatus("fechado"); // Altera o status para "fechado"
            vagaGarcomRepository.save(vaga); // Salva a vaga atualizada
            return ResponseEntity.ok("Vaga fechada com sucesso!");
        }).orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body("Vaga não encontrada"));
    }

    @GetMapping("/vagas-com-candidaturas")
public List<Map<String, Object>> getVagasComCandidaturas(@RequestParam Long idBuffet) {
    List<VagaGarcom> vagas = vagaGarcomRepository.findByIdBuffet(idBuffet);

    List<Map<String, Object>> resultado = new ArrayList<>();

    for (VagaGarcom vaga : vagas) {
        long numeroCandidaturas = candidaturaRepository.countByIdVaga(vaga.getIdVaga());

        Map<String, Object> vagaMap = new HashMap<>();
        vagaMap.put("idVaga", vaga.getIdVaga());
        vagaMap.put("cargo", vaga.getCargo());
        vagaMap.put("numeroCandidaturas", numeroCandidaturas);

        resultado.add(vagaMap);
    }

    return resultado;
}

}
